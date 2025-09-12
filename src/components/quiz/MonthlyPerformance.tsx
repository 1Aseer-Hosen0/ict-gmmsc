import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Brain, Zap, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MonthlyStats {
  section: string;
  totalAttempts: number;
  totalScore: number;
  averageScore: number;
  bestScore: number;
}

interface MonthlyPerformanceProps {
  userId?: string;
}

const MonthlyPerformance: React.FC<MonthlyPerformanceProps> = ({ userId }) => {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [loading, setLoading] = useState(false);

  const sections = [
    { name: 'Science', icon: Zap, color: 'bg-blue-500' },
    { name: 'General Knowledge', icon: BookOpen, color: 'bg-green-500' },
    { name: 'IQ', icon: Brain, color: 'bg-purple-500' }
  ];

  useEffect(() => {
    if (userId) {
      fetchMonthlyStats();
    }
  }, [userId]);

  const fetchMonthlyStats = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Get current month start
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('section, score, correct_answers, wrong_answers, total_questions')
        .eq('user_id', userId)
        .gte('created_at', startOfMonth.toISOString());

      if (error) throw error;

      // Process stats by section
      const statsBySection: Record<string, MonthlyStats> = {};
      
      sections.forEach(section => {
        const sectionAttempts = data?.filter(attempt => attempt.section === section.name) || [];
        
        if (sectionAttempts.length > 0) {
          const totalScore = sectionAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
          const scores = sectionAttempts.map(attempt => attempt.score);
          
          statsBySection[section.name] = {
            section: section.name,
            totalAttempts: sectionAttempts.length,
            totalScore: totalScore,
            averageScore: totalScore / sectionAttempts.length,
            bestScore: Math.max(...scores)
          };
        }
      });

      setMonthlyStats(Object.values(statsBySection));
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!userId || loading) {
    return null;
  }

  if (monthlyStats.length === 0) {
    return null;
  }

  const totalScore = monthlyStats.reduce((sum, stat) => sum + stat.totalScore, 0);
  const totalAttempts = monthlyStats.reduce((sum, stat) => sum + stat.totalAttempts, 0);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Monthly Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-primary">{totalScore.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Score</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalAttempts}</div>
            <p className="text-sm text-muted-foreground">Total Attempts</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(2) : '0.00'}
            </div>
            <p className="text-sm text-muted-foreground">Average Score</p>
          </div>
        </div>

        {/* Section Breakdown */}
        <div>
          <h4 className="font-semibold mb-3">Performance by Category</h4>
          <div className="grid gap-3">
            {monthlyStats.map((stat) => {
              const sectionInfo = sections.find(s => s.name === stat.section);
              const Icon = sectionInfo?.icon || BookOpen;
              
              return (
                <div key={stat.section} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${sectionInfo?.color} text-white`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium">{stat.section}</h5>
                      <p className="text-sm text-muted-foreground">
                        {stat.totalAttempts} attempt{stat.totalAttempts > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">{stat.totalScore.toFixed(2)} points</div>
                    <div className="text-sm text-muted-foreground">
                      Best: {stat.bestScore.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyPerformance;