import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';

interface MemberProfile {
  id: string;
  full_name: string;
  email: string;
  class: string;
  section: string;
  student_id: string;
  phone?: string | null;
  fb_link?: string | null;
  created_at: string;
}

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

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [fetching, setFetching] = useState(false);

  const slug = useMemo(() => encodeURIComponent((profile?.full_name ?? user?.full_name ?? '').trim().replace(/\s+/g, '-')), [profile?.full_name, user?.full_name]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;
    const fetchProfile = async () => {
      setFetching(true);
      try {
        const { data } = await supabase
          .from('club_members')
          .select('id, full_name, email, class, section, student_id, phone, fb_link, created_at')
          .eq('id', user.id)
          .single();
        if (isMounted && data) setProfile(data as MemberProfile);
      } finally {
        if (isMounted) setFetching(false);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, [user?.id]);

  useEffect(() => {
    const titleName = profile?.full_name || user?.full_name || 'Profile';
    setSEO(`${titleName} | Profile`, `Profile page for ${titleName} at GIC.`);
    if (username && slug && username !== slug) {
      navigate(`/profile/${slug}`, { replace: true });
    }
  }, [profile?.full_name, user?.full_name, slug, username, navigate]);

  if (!isAuthenticated) return null;

  const info = profile ?? (user as unknown as MemberProfile);

  return (
    <main className="container mx-auto px-6 py-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
      </header>

      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={''} alt={info.full_name} />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{info.full_name}</CardTitle>
            <p className="text-sm text-muted-foreground">Member since {new Date(info.created_at).toLocaleDateString()}</p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{info.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Student ID</p>
            <p className="font-medium">{info.student_id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Class</p>
            <p className="font-medium">{info.class}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Section</p>
            <p className="font-medium">{info.section}</p>
          </div>
          {info.phone && (
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{info.phone}</p>
            </div>
          )}
          {info.fb_link && (
            <div>
              <p className="text-sm text-muted-foreground">Facebook</p>
              <a href={info.fb_link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                {info.fb_link}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default Profile;
