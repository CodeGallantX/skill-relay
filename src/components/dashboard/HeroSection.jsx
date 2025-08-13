import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Clock, TrendingUp, Star } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value }) => (
  <Card className="flex-1 p-4 text-center">
    <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
    <p className="text-xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{title}</p>
  </Card>
);

const HeroSection = ({ userStats }) => {
  const { user } = useAuth();

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Welcome back, {user?.name || user?.email || 'Learner'}!</h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your learning journey today.
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          🎉 New features coming soon!
        </Badge>
      </div>

      {userStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} title="Lessons Completed" value={userStats.lessonsCompleted} />
          <StatCard icon={Clock} title="Hours Learned" value={userStats.hoursLearned} />
          <StatCard icon={TrendingUp} title="Streak Days" value={userStats.streakDays} />
          <StatCard icon={Star} title="Skill Points" value={userStats.skillPoints} />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
