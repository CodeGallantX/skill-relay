import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, TrendingUp, Grid3X3, List, Filter } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import VideoCard from '@/components/video/VideoCard';
import { generateMockLessons } from '@/lib/mockData';

const LikedPage = () => {
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  
  // Mock liked lessons
  const likedLessons = generateMockLessons(12).map(lesson => ({
    ...lesson,
    likedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    likes: Math.floor(Math.random() * 1000 + 100)
  }));

  const sortedLessons = [...likedLessons].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.likedAt) - new Date(a.likedAt);
      case 'oldest':
        return new Date(a.likedAt) - new Date(b.likedAt);
      case 'popular':
        return b.likes - a.likes;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 flex items-center justify-center">
        <Heart className="w-16 h-16 text-red-500" />
      </div>
      <h3 className="text-2xl font-bold mb-2">No liked videos yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start liking videos you enjoy to build your personal collection of favorites.
      </p>
      <Button asChild className="shadow-glow">
        <a href="/dashboard/explore">
          Explore Videos
        </a>
      </Button>
    </div>
  );

  const LikedStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Liked</p>
              <p className="text-2xl font-bold">{likedLessons.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">
                {likedLessons.filter(lesson => 
                  new Date(lesson.likedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-2xl font-bold">
                {new Set(likedLessons.map(lesson => lesson.category)).size}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {sortedLessons.map((lesson) => (
        <Card key={lesson.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative">
                <img 
                  src={lesson.thumbnail} 
                  alt={lesson.title}
                  className="w-40 h-24 object-cover rounded-lg"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {lesson.duration}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold line-clamp-2">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.instructor}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Liked {lesson.likedAt.toLocaleDateString()}</span>
                  <Badge variant="secondary">{lesson.category}</Badge>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3 fill-current text-red-500" />
                    {lesson.likes}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 fill-current text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Liked Videos
          </h1>
          <p className="text-muted-foreground">
            Your collection of favorite tutorials
          </p>
        </div>
        
        {likedLessons.length > 0 && (
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Liked</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {likedLessons.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <LikedStats />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {sortedLessons.length} Liked Video{sortedLessons.length !== 1 ? 's' : ''}
              </h2>
              <Badge variant="outline">
                Sorted by {sortBy === 'recent' ? 'Most Recent' : 
                          sortBy === 'oldest' ? 'Oldest First' : 
                          sortBy === 'popular' ? 'Most Liked' : 'Title A-Z'}
              </Badge>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedLessons.map((lesson) => (
                  <VideoCard
                    key={lesson.id}
                    video={lesson}
                    onLike={(id) => console.log('Unlike:', id)}
                    onComment={(id) => console.log('Comment:', id)}
                    onShare={(id) => console.log('Share:', id)}
                    showLikedDate={true}
                    likedAt={lesson.likedAt}
                  />
                ))}
              </div>
            ) : (
              <ListView />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LikedPage;