import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, Siren as Fire, Clock, Users, Tag } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import { mockVideos } from '@/lib/mockData';

const timeframes = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'all', label: 'All Time' }
];

const trendingTags = [
  { name: 'React', count: 1240 },
  { name: 'Design', count: 980 },
  { name: 'Python', count: 756 },
  { name: 'Marketing', count: 654 },
  { name: 'Photography', count: 543 }
];

const trendingCreators = [
  { id: 1, name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=1', followers: '125K', growth: '+12%' },
  { id: 2, name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/150?img=2', followers: '98K', growth: '+8%' },
  { id: 3, name: 'Aisha Patel', avatar: 'https://i.pravatar.cc/150?img=3', followers: '87K', growth: '+15%' }
];

const TrendingPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Sort videos by views for trending
  const trendingVideos = [...mockVideos].sort((a, b) => b.views - a.views);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center space-x-3 mb-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">Trending</h1>
        </div>
        <p className="text-muted-foreground">
          Discover what's popular right now
        </p>
      </div>

      {/* Timeframe Filter */}
      <div className="animate-slide-up">
        <div className="flex flex-wrap gap-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe.value}
              variant={selectedTimeframe === timeframe.value ? 'default' : 'outline'}
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className="transition-all duration-200"
            >
              {timeframe.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Hot Right Now */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Fire className="h-5 w-5 text-orange-500" />
                <span>Hot Right Now</span>
              </CardTitle>
              <CardDescription>
                The most popular videos this {selectedTimeframe === 'today' ? 'day' : selectedTimeframe}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingVideos.slice(0, 6).map((video, index) => (
                  <div key={video.id} className="relative">
                    <Badge 
                      className="absolute -top-2 -left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500"
                    >
                      #{index + 1}
                    </Badge>
                    <div className="transform hover:scale-105 transition-transform duration-200">
                      <VideoCard video={video} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rising Stars */}
          <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Rising Stars</span>
              </CardTitle>
              <CardDescription>
                Videos gaining momentum fast
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingVideos.slice(3, 6).map((video) => (
                  <div key={video.id} className="transform hover:scale-105 transition-transform duration-200">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Tags */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-primary" />
                <span>Trending Tags</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTags.map((tag, index) => (
                <div key={tag.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <span className="font-medium">#{tag.name}</span>
                  </div>
                  <Badge variant="secondary">{tag.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trending Creators */}
          <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Trending Creators</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingCreators.map((creator, index) => (
                <div key={creator.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{creator.name}</p>
                    <p className="text-xs text-muted-foreground">{creator.followers} followers</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {creator.growth}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Platform Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">2.4M</p>
                <p className="text-sm text-muted-foreground">Videos watched today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">156K</p>
                <p className="text-sm text-muted-foreground">Active learners</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">8.9K</p>
                <p className="text-sm text-muted-foreground">New videos this week</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;