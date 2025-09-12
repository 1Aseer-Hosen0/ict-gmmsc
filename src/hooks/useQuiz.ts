import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Question {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface QuizAttempt {
  id: string;
  section: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
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
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [weeklyAttempts, setWeeklyAttempts] = useState<Record<string, QuizAttempt>>({});

  // Check if user has attempted quiz for each category this month
  const checkWeeklyAttempts = async () => {
    if (!user) return;

    try {
      // Get attempts for current month
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString());

      if (error) throw error;

      const attempts: Record<string, QuizAttempt> = {};
      data?.forEach((attempt) => {
        attempts[attempt.section] = attempt;
      });
      setWeeklyAttempts(attempts);
    } catch (error) {
      console.error('Error checking monthly attempts:', error);
    }
  };

  // Load questions for a section
  const loadQuestions = async (section: string) => {
    if (!user) return;

    setLoading(true);
    setSelectedSection(section);
    
    try {
      // Fetch questions from the selected category
      const { data: fetchedQuestions, error: fetchError } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('category', section)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (!fetchedQuestions || fetchedQuestions.length === 0) {
        throw new Error('No questions available for this category');
      }

      // Shuffle and take 10 questions
      const shuffled = fetchedQuestions.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, 10);

      setQuestions(selectedQuestions);
      setUserAnswers(new Array(selectedQuestions.length).fill(''));
      setCurrentQuestionIndex(0);
      setQuizCompleted(false);
      setQuizResults(null);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
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
      // Validate answers with simple string comparison
      const validatedAnswers = [];
      let correctCount = 0;
      let wrongCount = 0;

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const userAnswer = userAnswers[i].trim();

        if (userAnswer === '') {
          // Empty answer counts as wrong
          validatedAnswers.push({
            question_id: question.id,
            user_answer: userAnswer,
            correct_answer: question.answer,
            is_correct: false
          });
          wrongCount++;
          continue;
        }

        // Simple string comparison (case-insensitive)
        const isCorrect = userAnswer.toLowerCase() === question.answer.toLowerCase();

        validatedAnswers.push({
          question_id: question.id,
          user_answer: userAnswer,
          correct_answer: question.answer,
          is_correct: isCorrect
        });

        isCorrect ? correctCount++ : wrongCount++;
      }

      // Calculate score with negative marking (1 point for correct, -0.25 for wrong)
      const score = (correctCount * 1) + (wrongCount * -0.25);

      // Save quiz attempt
      const { error: insertError } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          section: selectedSection,
          answers: validatedAnswers,
          score: score,
          total_questions: questions.length,
          correct_answers: correctCount,
          wrong_answers: wrongCount
        });

      if (insertError) throw insertError;

      setQuizResults({
        score: score,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        totalQuestions: questions.length,
        answers: validatedAnswers
      });

      // Refresh monthly attempts
      await checkWeeklyAttempts();

      toast({
        title: "Quiz Completed!",
        description: `You scored ${score.toFixed(2)} out of ${questions.length}`,
      });

    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
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
    selectedSection,
    loadQuestions,
    startQuiz,
    submitQuiz,
    updateAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    checkWeeklyAttempts
  };
};