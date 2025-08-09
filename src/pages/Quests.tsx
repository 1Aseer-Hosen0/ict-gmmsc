import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const setSEO = (title: string, description: string) => {
  document.title = title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  } else {
    const m = document.createElement('meta');
    m.name = 'description';
    m.content = description;
    document.head.appendChild(m);
  }
  const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonical) {
    canonical.href = window.location.href;
  } else {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = window.location.href;
    document.head.appendChild(link);
  }
};

const Quests = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setSEO('Quests | GIC', 'Explore quests and challenges at GIC.');
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (!isAuthenticated) return null;

  return (
    <main className="container mx-auto px-6 py-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Quests</h1>
      </header>
      <section className="text-muted-foreground">
        Coming soon.
      </section>
    </main>
  );
};

export default Quests;
