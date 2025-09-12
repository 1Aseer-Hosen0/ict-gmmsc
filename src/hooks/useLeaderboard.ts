import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  total_score: number;
  rank_position: number;
}

export const useLeaderboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_leaderboard');

      if (error) throw error;

      const leaderboardData = data || [];
      setLeaderboard(leaderboardData.slice(0, 5)); // Top 5

      // Find current user's rank (only if rank is 6 or higher)
      if (user) {
        const currentUserRank = leaderboardData.find((entry: LeaderboardEntry) => 
          entry.user_id === user.id
        );
        // Only show user rank if they're not in top 5
        setUserRank(currentUserRank && currentUserRank.rank_position > 5 ? currentUserRank : null);
      }

    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  return {
    loading,
    leaderboard,
    userRank,
    fetchLeaderboard
  };
};