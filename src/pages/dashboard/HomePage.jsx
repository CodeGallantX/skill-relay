import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, TrendingUp, Star, Play } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOnboarding } from '@/context/OnboardingContext';
import VideoCard from '@/components/video/VideoCard';
import { mockVideos } from '@/lib/mockData';

const StatCard = ({ icon: Icon, title, value, description }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const HomePage = () => {
  const { user } = useAuth();
  const { role, interests, skills } = useOnboarding();

  // Mock user stats
  const userStats = {
    lessonsCompleted: 24,
    hoursLearned: 18.5,
    streakDays: 7,
    skillPoints: 1240,
  };

  // Filter videos based on user interests/skills
  const personalizedVideos = mockVideos.filter(video => {
    if (role === 'learner' && interests.length > 0) {
      return video.tags.some(tag => 
        interests.some(interest => 
          interest.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      );
    }
    if (role === 'creator' && skills.length > 0) {
      return video.tags.some(tag => 
        skills.some(skill => 
          skill.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Welcome back, {user?.name || 'Learner'}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your learning journey today.
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            🎉 New features coming soon!
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={BookOpen} 
            title="Lessons Completed" 
            value={userStats.lessonsCompleted}
            description="+3 this week"
          />
          <StatCard 
            icon={Clock} 
            title="Hours Learned" 
            value={`${userStats.hoursLearned}h`}
            description="+2.5h this week"
          />
          <StatCard 
            icon={TrendingUp} 
            title="Streak Days" 
            value={userStats.streakDays}
            description="Keep it up!"
          />
          <StatCard 
            icon={Star} 
            title="Skill Points" 
            value={userStats.skillPoints}
            description="+120 this week"
          />
        </div>
      </div>

      {/* Continue Watching Section */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-primary" />
            <span>Continue Watching</span>
          </CardTitle>
          <CardDescription>
            Pick up where you left off
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVideos.slice(0, 3).map((video) => (
              <div key={video.id} className="transform hover:scale-105 transition-transform duration-200">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <span>Recommended for You</span>
          </CardTitle>
          <CardDescription>
            Based on your {role === 'learner' ? 'interests' : 'skills'} and learning history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedVideos.slice(0, 6).map((video) => (
              <div key={video.id} className="transform hover:scale-105 transition-transform duration-200">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending This Week */}
      <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Trending This Week</span>
          </CardTitle>
          <CardDescription>
            Popular content from the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVideos.slice(2, 5).map((video) => (
              <div key={video.id} className="transform hover:scale-105 transition-transform duration-200">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;