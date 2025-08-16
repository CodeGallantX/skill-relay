import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Menu, FolderOpen, BookOpen, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LessonGrid from '@/components/explore/LessonGrid';
import { generateMockLessons } from '@/lib/mockData';

const LibraryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Mock library content
  const purchasedLessons = generateMockLessons(6);
  const enrolledCourses = generateMockLessons(4);
  const downloadedContent = generateMockLessons(3);

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
      <title>Library - Skill Relay</title>
      <meta name="description" content="Access your purchased lessons, enrolled courses, and downloaded content." />
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
              <FolderOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">My Library</h1>
            </div>

            <Tabs defaultValue="purchased" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="purchased">Purchased</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="downloads">Downloads</TabsTrigger>
              </TabsList>

              <TabsContent value="purchased" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Purchased Lessons</span>
                    </CardTitle>
                    <CardDescription>
                      Individual lessons you've purchased
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                {purchasedLessons.length > 0 ? (
                  <LessonGrid lessons={purchasedLessons} />
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <CardTitle className="mb-2">No Purchased Lessons</CardTitle>
                      <CardDescription className="mb-6">
                        Start building your library by purchasing lessons
                      </CardDescription>
                      <Button asChild>
                        <a href="/dashboard/explore">Browse Lessons</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                    <CardDescription>
                      Multi-lesson courses you're enrolled in
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                {enrolledCourses.length > 0 ? (
                  <LessonGrid lessons={enrolledCourses} />
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <CardTitle className="mb-2">No Enrolled Courses</CardTitle>
                      <CardDescription className="mb-6">
                        Enroll in comprehensive courses to learn step by step
                      </CardDescription>
                      <Button asChild>
                        <a href="/dashboard/explore">Find Courses</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="downloads" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-5 w-5 text-primary" />
                      <span>Downloaded Content</span>
                    </CardTitle>
                    <CardDescription>
                      Content available offline
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                {downloadedContent.length > 0 ? (
                  <LessonGrid lessons={downloadedContent} />
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Download className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <CardTitle className="mb-2">No Downloaded Content</CardTitle>
                      <CardDescription className="mb-6">
                        Download lessons to watch offline
                      </CardDescription>
                      <Button asChild>
                        <a href="/dashboard/library?tab=purchased">View Purchased</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LibraryPage;