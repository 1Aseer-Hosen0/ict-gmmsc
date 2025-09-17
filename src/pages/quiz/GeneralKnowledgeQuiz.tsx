import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizSection from '@/components/quiz/QuizSection';
import { useQuiz } from '@/hooks/useQuiz';

const GeneralKnowledgeQuiz = () => {
  useDocumentTitle('General Knowledge Quiz | GIC');
  
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const quiz = useQuiz();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated && !quiz.loading) {
      quiz.loadQuestions('General Knowledge');
      quiz.startQuiz();
    }
  }, [isAuthenticated, quiz.loading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    await quiz.submitQuiz();
    navigate('/quests/general-knowledge/result');
  };

  if (!isAuthenticated) return null;

  if (quiz.loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 py-24">
          <div className="text-center">
            <p className="text-lg">Loading quiz...</p>
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
        <QuizSection
          quiz={quiz}
          formatTime={formatTime}
          onSubmit={handleSubmit}
        />
      </main>
      <Footer />
    </div>
  );
};

export default GeneralKnowledgeQuiz;