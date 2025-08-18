import React, { useState } from 'react';
// import { Header } from '@/components/layout/Header';
// import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Bookmark } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LessonGrid from '@/components/explore/LessonGrid';
import { generateMockLessons } from '@/lib/mockData';

const FavoritesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Mock favorite lessons
  const favoriteLessons = generateMockLessons(6);

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <title>Favorites - Skill Relay</title>
      <meta name="description" content="Access your favorite lessons and courses on Skill Relay." />
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
              <Bookmark className="h-8 w-8 text-yellow-500" />
              <h1 className="text-3xl font-bold gradient-text">Favorites</h1>
            </div>

            {favoriteLessons.length > 0 ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Favorite Content</CardTitle>
                    <CardDescription>
                      Your most treasured lessons and courses - {favoriteLessons.length} total
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <LessonGrid lessons={favoriteLessons} />
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Bookmark className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <CardTitle className="mb-2">No Favorites Yet</CardTitle>
                  <CardDescription className="mb-6">
                    Bookmark your favorite lessons and courses to find them easily
                  </CardDescription>
                  <Button asChild>
                    <a href="/dashboard/explore">Discover Content</a>
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

export default FavoritesPage;