import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, User } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const Leaderboard = () => {
  const { loading, leaderboard, userRank, previousMonthTop3 } = useLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">1st Place</Badge>;
      case 2:
        return <Badge className="bg-gray-400 hover:bg-gray-500">2nd Place</Badge>;
      case 3:
        return <Badge className="bg-amber-600 hover:bg-amber-700">3rd Place</Badge>;
      default:
        return <Badge variant="outline">#{rank}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">Loading leaderboard...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Monthly Leaderboard</h2>
        <p className="text-muted-foreground">
          Top performers based on combined quiz scores this month
        </p>
      </div>

      {/* Top 5 Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {leaderboard.length > 0 ? (
            leaderboard.map((entry) => (
              <div
                key={entry.user_id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  entry.rank_position <= 3
                    ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20'
                    : 'bg-muted/50'
                }`}
              >
                <div className="flex-shrink-0">
                  {getRankIcon(Number(entry.rank_position))}
                </div>

                <Avatar className="h-12 w-12">
                  <AvatarImage src={entry.avatar_url || undefined} />
                  <AvatarFallback>
                    {entry.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-semibold">{entry.full_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Total Score: {Number(entry.total_score).toFixed(2)} points
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {getRankBadge(Number(entry.rank_position))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No scores yet this month. Be the first to take a quiz!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current User Rank */}
      {userRank && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex-shrink-0">
                <span className="text-lg font-bold text-primary">
                  #{userRank.rank_position}
                </span>
              </div>

              <Avatar className="h-12 w-12">
                <AvatarImage src={userRank.avatar_url || undefined} />
                <AvatarFallback>
                  {userRank.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="font-semibold">{userRank.full_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Total Score: {Number(userRank.total_score).toFixed(2)} points
                </p>
              </div>

              <Badge variant="outline">Your Position</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Month Top 3 */}
      {previousMonthTop3.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Last Month's Champions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {previousMonthTop3.map((entry) => (
              <div
                key={entry.user_id}
                className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg border border-amber-200"
              >
                <div className="flex-shrink-0">
                  {getRankIcon(Number(entry.rank_position))}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.avatar_url || undefined} />
                  <AvatarFallback>
                    {entry.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h4 className="font-medium">{entry.full_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {Number(entry.total_score).toFixed(2)} points
                  </p>
                </div>

                <Badge variant="outline" className="text-amber-700 border-amber-300">
                  Last Month
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Score Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">How Scoring Works</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-medium text-green-800">Correct Answer</div>
                <div className="text-green-600">+1.00 point</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="font-medium text-red-800">Wrong Answer</div>
                <div className="text-red-600">-0.25 points</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-medium text-blue-800">Combined Score</div>
                <div className="text-blue-600">All 3 sections</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Leaderboard resets monthly • Quiz attempts reset weekly
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;