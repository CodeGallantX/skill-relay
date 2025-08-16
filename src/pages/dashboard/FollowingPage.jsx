import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Clock, Play, TrendingUp, Compass } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import VideoCard from '@/components/video/VideoCard';
import { generateMockLessons } from '@/lib/mockData';

const FollowingPage = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('latest');
  
  // Mock data for followed creators
  const followedCreators = [
    { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', followers: '12.5K' },
    { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', followers: '8.2K' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3', followers: '15.7K' }
  ];

  // Mock lessons from followed creators
  const followingLessons = generateMockLessons(6).map(lesson => ({
    ...lesson,
    creator: followedCreators[Math.floor(Math.random() * followedCreators.length)]
  }));

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-purple-100 to-yellow-100 dark:from-purple-900/20 dark:to-yellow-900/20 flex items-center justify-center">
        <Users className="w-16 h-16 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-2xl font-bold mb-2">You're not following anyone yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Discover amazing creators and start following them to see their latest content here.
      </p>
      <Button asChild className="shadow-glow">
        <a href="/dashboard/explore">
          <Compass className="mr-2 h-4 w-4" />
          Explore Creators
        </a>
      </Button>
    </div>
  );

  const FilterButton = ({ filter, label, icon: Icon }) => (
    <Button
      variant={activeFilter === filter ? 'default' : 'ghost'}
      onClick={() => setActiveFilter(filter)}
      className="flex items-center gap-2"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Following</h1>
          <p className="text-muted-foreground">
            Latest content from creators you follow
          </p>
        </div>
        
        {followedCreators.length > 0 && (
          <div className="flex gap-2">
            <FilterButton filter="latest" label="Latest" icon={Clock} />
            <FilterButton filter="popular" label="Popular" icon={TrendingUp} />
            <FilterButton filter="live" label="Live" icon={Play} />
          </div>
        )}
      </div>

      {followedCreators.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {/* Followed Creators Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Creators
              </CardTitle>
              <CardDescription>
                Quick access to creators you follow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {followedCreators.map((creator) => (
                  <div key={creator.id} className="flex flex-col items-center min-w-[80px] cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-2 ring-2 ring-purple-500 ring-offset-2">
                      <img 
                        src={creator.avatar} 
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-center">{creator.name}</span>
                    <span className="text-xs text-muted-foreground">{creator.followers}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Updates</h2>
              <Badge variant="secondary">{followingLessons.length} new videos</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {followingLessons.map((lesson) => (
                <VideoCard
                  key={lesson.id}
                  video={lesson}
                  onLike={(id) => console.log('Liked:', id)}
                  onComment={(id) => console.log('Comment:', id)}
                  onShare={(id) => console.log('Share:', id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowingPage;