import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Folder, 
  Plus, 
  Search, 
  Grid3X3, 
  List, 
  MoreVertical,
  Edit,
  Trash2,
  FolderOpen
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import VideoCard from '@/components/video/VideoCard';
import { generateMockLessons } from '@/lib/mockData';

const FavoritesPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeFolder, setActiveFolder] = useState('all');
  
  // Mock favorite folders
  const favoriteFolders = [
    {
      id: 'all',
      name: 'All Favorites',
      description: 'All your favorite videos',
      count: 24,
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      icon: Star
    },
    {
      id: 'js-tricks',
      name: 'JavaScript Tricks',
      description: 'Advanced JS techniques and tips',
      count: 8,
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      icon: Folder,
      createdAt: '2 weeks ago'
    },
    {
      id: 'design-inspiration',
      name: 'Design Inspiration',
      description: 'Beautiful UI/UX designs and concepts',
      count: 12,
      color: 'bg-gradient-to-br from-pink-400 to-purple-600',
      icon: Folder,
      createdAt: '1 month ago'
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      description: 'Cutting-edge AI tutorials',
      count: 6,
      color: 'bg-gradient-to-br from-blue-400 to-indigo-600',
      icon: Folder,
      createdAt: '3 weeks ago'
    }
  ];

  // Mock favorite lessons
  const allFavorites = generateMockLessons(24).map(lesson => ({
    ...lesson,
    favoritedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    folderId: Math.random() > 0.2 ? favoriteFolders[Math.floor(Math.random() * (favoriteFolders.length - 1)) + 1].id : null
  }));

  const filteredFavorites = allFavorites.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFolder === 'all' || lesson.folderId === activeFolder;
    return matchesSearch && matchesFolder;
  });

  const currentFolder = favoriteFolders.find(folder => folder.id === activeFolder);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 flex items-center justify-center">
        <Star className="w-16 h-16 text-yellow-500" />
      </div>
      <h3 className="text-2xl font-bold mb-2">No favorites yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start building your personal collection by adding videos to your favorites.
      </p>
      <Button asChild className="shadow-glow">
        <a href="/dashboard/explore">
          Discover Videos
        </a>
      </Button>
    </div>
  );

  const FolderCard = ({ folder }) => {
    const Icon = folder.icon;
    return (
      <Card 
        className={`cursor-pointer transition-all hover:shadow-lg ${
          activeFolder === folder.id ? 'ring-2 ring-primary' : ''
        }`}
        onClick={() => setActiveFolder(folder.id)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${folder.color} flex items-center justify-center`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            {folder.id !== 'all' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <h3 className="font-semibold mb-1">{folder.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{folder.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{folder.count} videos</Badge>
            {folder.createdAt && (
              <span className="text-xs text-muted-foreground">{folder.createdAt}</span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const ListView = () => (
    <div className="space-y-4">
      {filteredFavorites.map((lesson) => (
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
                  <span>Added {lesson.favoritedAt.toLocaleDateString()}</span>
                  <Badge variant="secondary">{lesson.category}</Badge>
                  {lesson.folderId && (
                    <Badge variant="outline">
                      <Folder className="h-3 w-3 mr-1" />
                      {favoriteFolders.find(f => f.id === lesson.folderId)?.name}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
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
            <Star className="h-8 w-8 text-yellow-500" />
            Favorites
          </h1>
          <p className="text-muted-foreground">
            Your curated collection of favorite content
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="folders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="videos">All Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="folders" className="space-y-6">
          {/* Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteFolders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
          </div>

          {/* Selected Folder Content */}
          {activeFolder && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${currentFolder?.color} flex items-center justify-center`}>
                    {currentFolder?.icon && <currentFolder.icon className="h-4 w-4 text-white" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{currentFolder?.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {filteredFavorites.length} video{filteredFavorites.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                
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

              {filteredFavorites.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No videos in this folder</h3>
                    <p className="text-muted-foreground text-center">
                      {searchQuery ? 'No videos match your search.' : 'This folder is empty.'}
                    </p>
                  </CardContent>
                </Card>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavorites.map((lesson) => (
                    <VideoCard
                      key={lesson.id}
                      video={lesson}
                      onLike={(id) => console.log('Like:', id)}
                      onComment={(id) => console.log('Comment:', id)}
                      onShare={(id) => console.log('Share:', id)}
                      showFavoriteDate={true}
                      favoritedAt={lesson.favoritedAt}
                    />
                  ))}
                </div>
              ) : (
                <ListView />
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {allFavorites.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  All Favorite Videos ({allFavorites.length})
                </h2>
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

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allFavorites.map((lesson) => (
                    <VideoCard
                      key={lesson.id}
                      video={lesson}
                      onLike={(id) => console.log('Like:', id)}
                      onComment={(id) => console.log('Comment:', id)}
                      onShare={(id) => console.log('Share:', id)}
                      showFavoriteDate={true}
                      favoritedAt={lesson.favoritedAt}
                    />
                  ))}
                </div>
              ) : (
                <ListView />
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FavoritesPage;