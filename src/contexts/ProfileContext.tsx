import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProfileContextType {
  avatarUrl: string;
  updateAvatarUrl: (url: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');

  // Fetch user's avatar when user changes
  useEffect(() => {
    if (user?.id) {
      const fetchUserAvatar = async () => {
        const { data } = await supabase
          .from('club_members')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
        
        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      };
      fetchUserAvatar();
    } else {
      setAvatarUrl('');
    }
  }, [user?.id]);

  const updateAvatarUrl = (url: string) => {
    setAvatarUrl(url);
  };

  return (
    <ProfileContext.Provider value={{ avatarUrl, updateAvatarUrl }}>
      {children}
    </ProfileContext.Provider>
  );
};