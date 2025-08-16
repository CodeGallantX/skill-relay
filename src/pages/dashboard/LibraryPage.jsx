import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FolderOpen, 
  History, 
  List, 
  Search, 
  Upload, 
  Play, 
  Clock,
  Heart,
  Bookmark,
  Star
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import VideoCard from '@/components/video/VideoCard';
import { generateMockLessons } from '@/lib/mockData';

const LibraryPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const watchHistory = generateMockLessons(8).map(lesson => ({
    ...lesson,
    watchedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    progress: Math.floor(Math.random() * 100),
    duration: Math.floor(Math.random() * 30 + 5) + ' min'
  }));

  const playlists = [
    {
      id: 1,
      name: 'AI & Machine Learning',
      description: 'Advanced AI tutorials and concepts',
      videoCount: 12,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop',
      createdAt: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Web Development Basics',
      description: 'Frontend and backend fundamentals',
      videoCount: 8,
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
      createdAt: '1 month ago'
    },
    {
      id: 3,
      name: 'Design Principles',
      description: 'UI/UX design best practices',
      videoCount: 15,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      createdAt: '3 weeks ago'
    }
  ];

  const myUploads = generateMockLessons(4).map(lesson => ({
    ...lesson,
    uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    views: Math.floor(Math.random() * 1000 + 100),
    status: Math.random() > 0.5 ? 'published' : 'draft'
  }));

  const filteredHistory = watchHistory.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const LibraryStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <History className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Watch History</p>
              <p className="text-2xl font-bold">{watchHistory.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <List className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Playlists</p>
              <p className="text-2xl font-bold">{playlists.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Upload className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">My Uploads</p>
              <p className="text-2xl font-bold">{myUploads.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hours Watched</p>
              <p className="text-2xl font-bold">47</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library</h1>
          <p className="text-muted-foreground">
            Your personal learning hub
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <LibraryStats />

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="uploads">My Uploads</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Watched</h2>
            <Button variant="outline" size="sm">Clear History</Button>
          </div>
          
          {filteredHistory.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <History className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No watch history</h3>
                <p className="text-muted-foreground text-center">
                  Start watching tutorials to see your history here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {item.duration}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.instructor}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Watched {item.watchedAt.toLocaleDateString()}</span>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>
                        {item.progress > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Playlists</h2>
            <Button>
              <List className="mr-2 h-4 w-4" />
              Create Playlist
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative">
                  <img 
                    src={playlist.thumbnail} 
                    alt={playlist.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {playlist.videoCount} videos
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                  <p className="text-xs text-muted-foreground">Created {playlist.createdAt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Uploads</h2>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload New
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myUploads.map((upload) => (
              <Card key={upload.id} className="hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={upload.thumbnail} 
                    alt={upload.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      upload.status === 'published' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                  >
                    {upload.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-2">{upload.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{upload.views} views</span>
                    <span>{upload.uploadedAt.toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryPage;