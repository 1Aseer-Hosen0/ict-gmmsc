import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizResults from '@/components/quiz/QuizResults';
import { supabase } from '@/integrations/supabase/client';

const QuizResult = () => {
  const { category } = useParams<{ category: string }>();
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);

  useDocumentTitle(`${category?.charAt(0).toUpperCase()}${category?.slice(1)} Quiz Results | GIC`);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (user && category) {
      loadQuizResults();
    }
  }, [user, category]);

  const loadQuizResults = async () => {
    if (!user || !category) return;

    try {
      setLoadingResults(true);
      
      // Map URL category to database category
      const categoryMap: Record<string, string> = {
        'science': 'Science',
        'general-knowledge': 'General Knowledge',
        'iq': 'IQ'
      };
      
      const dbCategory = categoryMap[category];
      
      // Get the most recent quiz attempt for this category
      const { data: attempt, error: attemptError } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .eq('section', dbCategory)
        .order('created_at', { ascending: false })
        .limit(1);

      if (attemptError) throw attemptError;

      if (!attempt || attempt.length === 0) {
        navigate('/quests');
        return;
      }

      const latestAttempt = attempt[0];

      // Get the questions for this attempt
      const questionIds = latestAttempt.answers.map((answer: any) => answer.question_id);
      const { data: fetchedQuestions, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .in('id', questionIds);

      if (questionsError) throw questionsError;

      setQuestions(fetchedQuestions || []);
      setQuizResults({
        score: latestAttempt.score,
        correctAnswers: latestAttempt.correct_answers,
        wrongAnswers: latestAttempt.wrong_answers,
        totalQuestions: latestAttempt.total_questions,
        answers: latestAttempt.answers
      });
    } catch (error) {
      console.error('Error loading quiz results:', error);
      navigate('/quests');
    } finally {
      setLoadingResults(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loadingResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 py-24">
          <div className="text-center">
            <p className="text-lg">Loading results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!quizResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 py-24">
          <div className="text-center">
            <p className="text-lg">No results found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-24">
        <QuizResults
          results={quizResults}
          questions={questions}
          onBackToSections={() => navigate('/quests')}
        />
      </main>
      <Footer />
    </div>
  );
};

export default QuizResult;