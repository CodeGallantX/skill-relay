import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LessonGrid from '@/components/explore/LessonGrid';
import { generateMockLessons } from '@/lib/mockData';

const LikedPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Mock liked lessons
  const likedLessons = generateMockLessons(7);

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
      <title>Liked - Skill Relay</title>
      <meta name="description" content="View all the lessons you've liked on Skill Relay." />
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
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-3xl font-bold gradient-text">Liked Lessons</h1>
            </div>

            {likedLessons.length > 0 ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Liked Content</CardTitle>
                    <CardDescription>
                      Lessons you've shown love to - {likedLessons.length} total
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <LessonGrid lessons={likedLessons} />
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <CardTitle className="mb-2">No Liked Lessons Yet</CardTitle>
                  <CardDescription className="mb-6">
                    Start liking lessons to build your collection of favorites
                  </CardDescription>
                  <Button asChild>
                    <a href="/dashboard/explore">Discover Lessons</a>
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

export default LikedPage;