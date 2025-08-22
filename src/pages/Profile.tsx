import { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Camera, Lock } from 'lucide-react';
import PasswordResetModal from '@/components/PasswordResetModal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useProfile } from '@/contexts/ProfileContext';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/config/cloudinary';

interface MemberProfile {
  id: string;
  full_name: string;
  email: string;
  class: string;
  section: string;
  student_id: string;
  phone?: string | null;
  fb_link?: string | null;
  avatar_url?: string | null;
  location?: string | null;
  bio?: string | null;
  date_of_birth?: string | null; // ISO date string (YYYY-MM-DD)
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

declare global {
  interface Window { cloudinary?: any }
}

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const { updateAvatarUrl } = useProfile();
  const { toast } = useToast();

  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [fetching, setFetching] = useState(false);

  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [fbLink, setFbLink] = useState('');
  const [dob, setDob] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const slug = useMemo(
    () => encodeURIComponent((profile?.full_name ?? user?.full_name ?? '').trim().replace(/\s+/g, '-')),
    [profile?.full_name, user?.full_name]
  );

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;
    const fetchProfile = async () => {
      setFetching(true);
      try {
        const { data, error } = await supabase
          .from('club_members')
          .select('id, full_name, email, class, section, student_id, phone, fb_link, avatar_url, location, bio, date_of_birth, created_at')
          .eq('id', user.id)
          .single();
        if (error) console.error('Profile fetch error', error);
        if (isMounted && data) {
          const p = data as MemberProfile;
          setProfile(p);
          setLocation(p.location ?? '');
          setBio(p.bio ?? '');
          setFbLink(p.fb_link ?? '');
          setDob(p.date_of_birth ?? '');
          setAvatarUrl(p.avatar_url ?? '');
        }
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

  // Set dynamic document title
  useDocumentTitle(`${profile?.full_name || user?.full_name || 'Profile'} | GIC`);

  const openUploadWidget = useCallback(() => {
    if (!window.cloudinary) {
      toast({ title: 'Upload not ready', description: 'Cloudinary widget not loaded yet.', variant: 'destructive' });
      return;
    }
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      toast({ title: 'Missing Cloudinary config', description: 'Please provide cloud name and upload preset.', variant: 'destructive' });
      return;
    }
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: false,
        folder: 'avatars',
      },
      async (error: any, result: any) => {
        if (error) {
          console.error(error);
          toast({ title: 'Upload failed', description: 'Please try again.', variant: 'destructive' });
          return;
        }
        if (result && result.event === 'success') {
          const url: string = result.info.secure_url;
          setAvatarUrl(url);
          if (!user?.id) return;
          const { error: upErr } = await supabase
            .from('club_members')
            .update({ avatar_url: url })
            .eq('id', user.id);
          if (upErr) {
            console.error(upErr);
            toast({ title: 'Failed to save photo', description: 'Please try again.', variant: 'destructive' });
          } else {
            setProfile((prev) => (prev ? { ...prev, avatar_url: url } : prev));
            updateAvatarUrl(url); // Update context to sync across app
            toast({ title: 'Profile photo updated', description: 'Your avatar was saved successfully.' });
          }
        }
      }
    );
    widget.open();
  }, [toast, user?.id]);

  const handleSave = async () => {
    if (!profile || !user?.id) return;
    if (!location.trim() || !bio.trim()) {
      toast({ title: 'Missing information', description: 'Location and Bio cannot be empty.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const payload: Partial<MemberProfile> = {
        location: location.trim(),
        bio: bio.trim(),
        fb_link: fbLink.trim() || null,
        date_of_birth: dob || null,
      } as any;
      const { error } = await supabase
        .from('club_members')
        .update(payload)
        .eq('id', user.id);
      if (error) throw error;
      toast({ title: 'Profile updated successfully' });
      setProfile((prev) => prev ? { ...prev, ...payload } as MemberProfile : prev);
    } catch (e) {
      console.error(e);
      toast({ title: 'Failed to update profile', description: 'Please try again', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) return null;

  const info = profile ?? (user as unknown as MemberProfile);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Banner */}
      <section className="relative">
        <div className="h-56 md:h-72 w-full bg-gradient-to-br from-primary/30 to-primary/10" />
        <div className="container mx-auto px-6">
          <div className="-mt-20 md:-mt-24 flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-32 w-32 ring-4 ring-background shadow-xl">
                <AvatarImage src={avatarUrl || ''} alt={info.full_name} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <button
                onClick={openUploadWidget}
                className="absolute inset-0 rounded-full bg-background/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                aria-label="Change Photo"
              >
                <span className="inline-flex items-center gap-2 text-sm"><Camera className="h-4 w-4" /> Change Photo</span>
              </button>
            </div>
            <div className="mt-4 text-center">
              <h1 className="text-2xl md:text-3xl font-bold">{info.full_name}</h1>
              <p className="text-sm text-muted-foreground">{info.email}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <Card className="bg-background/70 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={info.full_name} disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={info.email} disabled />
                </div>
                {info.phone && (
                  <div>
                    <Label>Phone</Label>
                    <Input value={info.phone} disabled />
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowPasswordModal(true)}
                >
                  <Lock className="h-4 w-4 mr-2" /> Change Password
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Editable Form */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-background/70 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-5 mt-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Bio / About Me</Label>
                  <Textarea
                    placeholder="Tell us a bit about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <div>
                  <Label>Facebook</Label>
                  <Input
                    placeholder="https://facebook.com/your-profile"
                    value={fbLink}
                    onChange={(e) => setFbLink(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={dob || ''}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                {/* Desktop Save Button */}
                <div className="hidden md:flex justify-end pt-2">
                  <Button onClick={handleSave} disabled={saving} className="transition-transform hover:scale-[1.03] bg-gradient-to-r from-primary to-primary/80">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Save Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t border-border p-4">
        <Button onClick={handleSave} disabled={saving} className="w-full transition-transform hover:scale-[1.03] bg-gradient-to-r from-primary to-primary/80">
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Footer />

      {/* Password Reset Modal */}
      <PasswordResetModal
        open={showPasswordModal}
        onOpenChange={setShowPasswordModal}
        userEmail={info.email}
        userId={info.id}
      />
    </div>
  );
};

export default Profile;
