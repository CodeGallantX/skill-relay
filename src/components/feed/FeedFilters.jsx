import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'programming', label: 'Programming' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'photography', label: 'Photography' },
  { value: 'music', label: 'Music' },
  { value: 'business', label: 'Business' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'fitness', label: 'Fitness' },
];

const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const priceFilters = [
  { value: 'all', label: 'All Prices' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
  { value: 'premium', label: 'Premium' },
];

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'rating', label: 'Highest Rated' },
];

export const FeedFilters = ({ isOpen, onToggle }) => {
  const { state, updateFeedFilters } = useApp();
  const { feedFilters } = state;

  const handleFilterChange = (key, value) => {
    updateFeedFilters({ [key]: value });
  };

  const clearFilters = () => {
    updateFeedFilters({
      category: 'all',
      difficulty: 'all',
      price: 'all',
      sortBy: 'recent'
    });
  };

  const hasActiveFilters = 
    feedFilters.category !== 'all' || 
    feedFilters.difficulty !== 'all' || 
    feedFilters.price !== 'all' ||
    feedFilters.sortBy !== 'recent';

  if (!isOpen) {
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              Active
            </Badge>
          )}
        </Button>

        <Select value={feedFilters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
          <SelectTrigger className="w-40">
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
      </div>
    );
  }

  return (
    <div className="p-4 border-b bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filters</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={feedFilters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Difficulty</label>
          <Select value={feedFilters.difficulty} onValueChange={(value) => handleFilterChange('difficulty', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Price</label>
          <Select value={feedFilters.price} onValueChange={(value) => handleFilterChange('price', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priceFilters.map((price) => (
                <SelectItem key={price.value} value={price.value}>
                  {price.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Sort by</label>
          <Select value={feedFilters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger>
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
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {feedFilters.category !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{categories.find(c => c.value === feedFilters.category)?.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange('category', 'all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {feedFilters.difficulty !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{difficulties.find(d => d.value === feedFilters.difficulty)?.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange('difficulty', 'all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {feedFilters.price !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{priceFilters.find(p => p.value === feedFilters.price)?.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange('price', 'all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};