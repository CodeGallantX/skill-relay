import React from 'react';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, PlayCircle, Plus, BarChart3 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import LessonGrid from '@/components/explore/LessonGrid';
import { generateMockLessons } from '@/lib/mockData';

const MyLessonsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { state } = useApp();
  
  // Mock creator's lessons
  const myLessons = generateMockLessons(5);

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

  // Only show for creators
  if (state.onboardingData.role !== 'creator') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Creator Access Only</h2>
          <p className="text-muted-foreground mb-4">This page is only available for content creators.</p>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-yellow-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <title>My Lessons - Skill Relay</title>
      <meta name="description" content="Manage your created lessons and track their performance." />
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <PlayCircle className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold gradient-text">My Lessons</h1>
              </div>
              <Button className="shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create Lesson
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{myLessons.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5K</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.2%</div>
                  <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {myLessons.length > 0 ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Published Lessons</CardTitle>
                    <CardDescription>
                      Manage and track the performance of your content
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <LessonGrid lessons={myLessons} />
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <PlayCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <CardTitle className="mb-2">No Lessons Yet</CardTitle>
                  <CardDescription className="mb-6">
                    Start sharing your knowledge by creating your first lesson
                  </CardDescription>
                  <Button className="shadow-glow">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Lesson
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

export default MyLessonsPage;