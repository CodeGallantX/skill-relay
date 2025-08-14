import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Tag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LessonGrid from '@/components/explore/LessonGrid';
import FilterSortBar from '@/components/explore/FilterSortBar';
import { generateMockLessons } from '@/lib/mockData';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('popular');
  const { isAuthenticated } = useAuth();
  
  // Format category name for display
  const displayName = categoryName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';
  
  // Mock category lessons
  const categoryLessons = generateMockLessons(12);

  const handleSortChange = (value) => {
    setCurrentSort(value);
    // In a real app, this would trigger a new API call with the sort parameter
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to continue</h2>
          <Button onClick={() => window.location.href = '/'}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-yellow-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <title>{displayName} - Skill Relay</title>
      <meta name="description" content={`Explore ${displayName} lessons and courses on Skill Relay.`} />
      <Header />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <main className="flex-1 lg:ml-64">
          {/* Mobile Header */}
          <div className="lg:hidden p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center space-x-3 mb-6">
              <Tag className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">{displayName}</h1>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Explore {displayName}</CardTitle>
                <CardDescription>
                  Discover lessons and courses in {displayName.toLowerCase()} from expert creators
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="mb-6">
              <FilterSortBar 
                onSortChange={handleSortChange}
                onFilterChange={() => {}} // Category is already filtered
                currentSort={currentSort}
                currentFilter="all"
                hideFilter={true} // Hide category filter since we're already in a category
              />
            </div>

            {categoryLessons.length > 0 ? (
              <LessonGrid lessons={categoryLessons} />
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Tag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <CardTitle className="mb-2">No Content Yet</CardTitle>
                  <CardDescription className="mb-6">
                    We're working on adding more {displayName.toLowerCase()} content. Check back soon!
                  </CardDescription>
                  <Button asChild>
                    <a href="/dashboard/explore">Explore All Categories</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;