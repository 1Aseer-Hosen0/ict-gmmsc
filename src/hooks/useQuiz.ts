import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Question {
  id: string;
  section: string;
  question: string;
  correct_answer: string;
}

export interface QuizAttempt {
  id: string;
  section: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  week_id: number;
  completed_at: string;
}

export const useQuiz = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [weeklyAttempts, setWeeklyAttempts] = useState<Record<string, QuizAttempt>>({});

  // Get current week ID
  const getCurrentWeekId = () => {
    const now = new Date();
    const day = now.getDate();
    return Math.ceil(day / 7);
  };

  // Check if user has attempted quiz this week
  const checkWeeklyAttempts = async () => {
    if (!user) return;

    try {
      const weekId = getCurrentWeekId();
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .eq('week_id', weekId);

      if (error) throw error;

      const attempts: Record<string, QuizAttempt> = {};
      data?.forEach((attempt) => {
        attempts[attempt.section] = attempt;
      });
      setWeeklyAttempts(attempts);
    } catch (error) {
      console.error('Error checking weekly attempts:', error);
    }
  };

  // Load questions for a section
  const loadQuestions = async (section: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const weekId = getCurrentWeekId();
      
      // First check if questions exist for this week
      const { data: existingQuestions, error: fetchError } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('section', section)
        .eq('week_id', weekId)
        .order('created_at');

      if (fetchError) throw fetchError;

      if (existingQuestions && existingQuestions.length > 0) {
        setQuestions(existingQuestions);
      } else {
        // Generate new questions
        const { data, error } = await supabase.functions.invoke('generate-quiz-questions', {
          body: { section, weekId }
        });

        if (error) throw error;
        setQuestions(data.questions);
      }

      setUserAnswers(new Array(10).fill(''));
      setCurrentQuestionIndex(0);
      setQuizCompleted(false);
      setQuizResults(null);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Start quiz timer
  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(15 * 60);
  };

  // Timer effect
  useEffect(() => {
    if (!quizStarted || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted]);

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && quizStarted && !quizCompleted) {
        submitQuiz();
        toast({
          title: "Quiz Auto-Submitted",
          description: "Quiz was submitted because you switched tabs",
          variant: "destructive",
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [quizStarted, quizCompleted]);

  // Submit quiz
  const submitQuiz = async () => {
    if (!user || !questions.length) return;

    setLoading(true);
    setQuizCompleted(true);

    try {
      // Validate each answer with AI
      const validationPromises = userAnswers.map(async (answer, index) => {
        if (!answer.trim()) return { isCorrect: false, userAnswer: answer };

        const { data, error } = await supabase.functions.invoke('validate-answer', {
          body: {
            question: questions[index].question,
            correctAnswer: questions[index].correct_answer,
            userAnswer: answer
          }
        });

        if (error) throw error;
        return { isCorrect: data.isCorrect, userAnswer: answer };
      });

      const results = await Promise.all(validationPromises);
      
      const correctAnswers = results.filter(r => r.isCorrect).length;
      const wrongAnswers = results.filter(r => !r.isCorrect).length;
      const score = correctAnswers * 1 - wrongAnswers * 0.25;

      // Save attempt to database
      const { error: insertError } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          section: questions[0].section,
          answers: results,
          score,
          total_questions: questions.length,
          correct_answers: correctAnswers,
          wrong_answers: wrongAnswers,
          week_id: getCurrentWeekId()
        });

      if (insertError) throw insertError;

      setQuizResults({
        score,
        correctAnswers,
        wrongAnswers,
        totalQuestions: questions.length,
        results
      });

      // Refresh weekly attempts
      await checkWeeklyAttempts();

    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to submit quiz",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update answer
  const updateAnswer = (index: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  // Navigation
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  useEffect(() => {
    checkWeeklyAttempts();
  }, [user]);

  return {
    loading,
    questions,
    currentQuestionIndex,
    userAnswers,
    timeLeft,
    quizStarted,
    quizCompleted,
    quizResults,
    weeklyAttempts,
    loadQuestions,
    startQuiz,
    submitQuiz,
    updateAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    checkWeeklyAttempts,
    getCurrentWeekId
  };
};