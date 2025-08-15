import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import { mockVideos } from '@/lib/mockData';

const categories = [
  'All', 'Programming', 'Design', 'Marketing', 'Photography', 
  'Music', 'Business', 'Cooking', 'Fitness', 'Art'
];

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'rating', label: 'Highest Rated' }
];

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
                           video.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text mb-2">Explore</h1>
        <p className="text-muted-foreground">
          Discover amazing content from creators around the world
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="animate-slide-up">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos, creators, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Filters */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {filteredVideos.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <CardTitle className="mb-2">No videos found</CardTitle>
              <CardDescription className="mb-6">
                Try adjusting your search terms or filters
              </CardDescription>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;