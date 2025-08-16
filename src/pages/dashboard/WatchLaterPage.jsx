import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, Play, X, Grid3X3, List, Filter, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import VideoCard from '@/components/video/VideoCard';
import { generateMockLessons } from '@/lib/mockData';

const WatchLaterPage = () => {
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  
  // Mock watch later lessons
  const watchLaterLessons = generateMockLessons(10).map(lesson => ({
    ...lesson,
    addedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
    progress: Math.random() > 0.7 ? Math.floor(Math.random() * 80) : 0,
    estimatedTime: Math.floor(Math.random() * 45 + 5) + ' min'
  }));

  const sortedLessons = [...watchLaterLessons].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.addedAt) - new Date(a.addedAt);
      case 'oldest':
        return new Date(a.addedAt) - new Date(b.addedAt);
      case 'duration':
        return parseInt(a.estimatedTime) - parseInt(b.estimatedTime);
      case 'progress':
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

  const totalDuration = watchLaterLessons.reduce((acc, lesson) => 
    acc + parseInt(lesson.estimatedTime), 0
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <Clock className="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-2xl font-bold mb-2">No videos saved for later</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Save videos to watch later when you have more time. Build your learning queue!
      </p>
      <Button asChild className="shadow-glow">
        <a href="/dashboard/explore">
          Browse Videos
        </a>
      </Button>
    </div>
  );

  const WatchLaterStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Videos</p>
              <p className="text-2xl font-bold">{watchLaterLessons.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Play className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Duration</p>
              <p className="text-2xl font-bold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</p>
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
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold">
                {watchLaterLessons.filter(lesson => 
                  new Date(lesson.addedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Play className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">
                {watchLaterLessons.filter(lesson => lesson.progress > 0).length}
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
                  {lesson.estimatedTime}
                </div>
                {lesson.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 rounded-b-lg">
                    <Progress value={lesson.progress} className="h-1" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold line-clamp-2">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.instructor}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Added {lesson.addedAt.toLocaleDateString()}</span>
                  <Badge variant="secondary">{lesson.category}</Badge>
                  {lesson.progress > 0 && (
                    <span className="text-blue-600 dark:text-blue-400">
                      {lesson.progress}% watched
                    </span>
                  )}
                </div>
                {lesson.progress > 0 && (
                  <div className="space-y-1">
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4" />
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
            <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            Watch Later
          </h1>
          <p className="text-muted-foreground">
            Your curated learning queue
          </p>
        </div>
        
        {watchLaterLessons.length > 0 && (
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="duration">Shortest First</SelectItem>
                <SelectItem value="progress">Most Progress</SelectItem>
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
            
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        )}
      </div>

      {watchLaterLessons.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <WatchLaterStats />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {sortedLessons.length} Video{sortedLessons.length !== 1 ? 's' : ''} in Queue
              </h2>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  Estimated: {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                </Badge>
                <Button className="shadow-glow">
                  <Play className="h-4 w-4 mr-2" />
                  Play All
                </Button>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedLessons.map((lesson) => (
                  <VideoCard
                    key={lesson.id}
                    video={lesson}
                    onLike={(id) => console.log('Like:', id)}
                    onComment={(id) => console.log('Comment:', id)}
                    onShare={(id) => console.log('Share:', id)}
                    showProgress={lesson.progress > 0}
                    progress={lesson.progress}
                    showWatchLater={true}
                    addedAt={lesson.addedAt}
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

export default WatchLaterPage;