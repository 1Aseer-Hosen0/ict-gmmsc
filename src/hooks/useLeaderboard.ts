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
  const [previousMonthTop3, setPreviousMonthTop3] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Current month leaderboard
      const { data, error } = await supabase.rpc('get_leaderboard');

      if (error) throw error;

      const leaderboardData = data || [];
      setLeaderboard(leaderboardData.slice(0, 5)); // Top 5

      // Find current user's rank
      if (user) {
        const currentUserRank = leaderboardData.find((entry: LeaderboardEntry) => 
          entry.user_id === user.id
        );
        setUserRank(currentUserRank || null);
      }

      // Fetch previous month's top 3
      await fetchPreviousMonthTop3();

    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousMonthTop3 = async () => {
    try {
      // Get previous month's date range
      const now = new Date();
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

      const { data, error } = await supabase
        .from('quiz_attempts')
        .select(`
          user_id,
          score,
          club_members (
            full_name,
            avatar_url
          )
        `)
        .gte('created_at', prevMonth.toISOString())
        .lte('created_at', prevMonthEnd.toISOString());

      if (error) throw error;

      // Group by user and sum scores
      const userScores: Record<string, { total_score: number; user_data: any }> = {};
      
      data?.forEach((attempt: any) => {
        if (!userScores[attempt.user_id]) {
          userScores[attempt.user_id] = {
            total_score: 0,
            user_data: attempt.club_members
          };
        }
        userScores[attempt.user_id].total_score += attempt.score;
      });

      // Convert to array and sort
      const sortedUsers = Object.entries(userScores)
        .map(([user_id, data]) => ({
          user_id,
          full_name: data.user_data?.full_name || 'Unknown',
          avatar_url: data.user_data?.avatar_url || null,
          total_score: data.total_score,
          rank_position: 0
        }))
        .sort((a, b) => b.total_score - a.total_score)
        .slice(0, 3)
        .map((entry, index) => ({
          ...entry,
          rank_position: index + 1
        }));

      setPreviousMonthTop3(sortedUsers);
    } catch (error) {
      console.error('Error fetching previous month leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  return {
    loading,
    leaderboard,
    userRank,
    previousMonthTop3,
    fetchLeaderboard
  };
};