import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizInterface from '@/components/quiz/QuizInterface';
import Leaderboard from '@/components/quiz/Leaderboard';

const Quests = () => {
  useDocumentTitle('Quests | GIC');
  
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'quiz' | 'leaderboard'>('quiz');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    // SEO setup
    document.title = 'Quests | GIC';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Test your knowledge with weekly quiz challenges and compete on the leaderboard. Science, General Knowledge, and IQ categories.');
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'Test your knowledge with weekly quiz challenges and compete on the leaderboard. Science, General Knowledge, and IQ categories.';
      document.head.appendChild(m);
    }
  }, []);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-24">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Quest Zone</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with weekly quizzes and climb the leaderboard. 
            Test your knowledge across Science, General Knowledge, and IQ categories.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Quiz
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'leaderboard'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Leaderboard
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="fade-in">
          {activeTab === 'quiz' ? <QuizInterface /> : <Leaderboard />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quests;
