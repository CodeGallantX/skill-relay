import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Star
} from 'lucide-react';

// Skeleton Components
const SkeletonCard = () => (
  <Card className="animate-pulse">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-muted rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="flex space-x-4 mt-4">
          <div className="h-8 bg-muted rounded w-16"></div>
          <div className="h-8 bg-muted rounded w-16"></div>
          <div className="h-8 bg-muted rounded w-16"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatCard = ({ icon: Icon, title, value, change, loading = false }) => (
  <Card className="hover:shadow-glow transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {loading ? (
            <div className="h-8 bg-muted rounded w-20 mt-2 animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold">{value}</p>
          )}
          {change && !loading && (
            <p className="text-xs text-green-600 mt-1">
              +{change}% from last week
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

          {/* Dashboard Content */}
          <div className="container mx-auto px-4 py-6">
            {/* Welcome Section */}
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold gradient-text">Welcome back!</h1>
                  <p className="text-muted-foreground mt-2">
                    Here's what's happening with your learning journey today.
                  </p>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  🎉 New features coming soon!
                </Badge>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
              <StatCard
                icon={BookOpen}
                title="Lessons Completed"
                value={isLoading ? null : "24"}
                change="12"
                loading={isLoading}
              />
              <StatCard
                icon={Clock}
                title="Hours Learned"
                value={isLoading ? null : "18.5"}
                change="8"
                loading={isLoading}
              />
              <StatCard
                icon={TrendingUp}
                title="Streak Days"
                value={isLoading ? null : "7"}
                change="15"
                loading={isLoading}
              />
              <StatCard
                icon={Star}
                title="Skill Points"
                value={isLoading ? null : "1,240"}
                change="25"
                loading={isLoading}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="h-5 w-5 text-primary" />
                      <span>Continue Learning</span>
                    </CardTitle>
                    <CardDescription>
                      Pick up where you left off
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoading ? (
                      <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                      </>
                    ) : (
                      <>
                        {/* Sample lesson cards */}
                        <div className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">Advanced React Patterns</h4>
                            <p className="text-sm text-muted-foreground">Progress: 65% complete</p>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          <Badge variant="secondary">5 min left</Badge>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">UI/UX Design Principles</h4>
                            <p className="text-sm text-muted-foreground">Progress: 30% complete</p>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                              <div className="bg-secondary h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                          <Badge variant="secondary">12 min left</Badge>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse Lessons
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Find Creators
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Progress
                    </Button>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-3">
                        <div className="h-4 bg-muted rounded animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">First Lesson Complete!</p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">7-Day Streak</p>
                            <p className="text-xs text-muted-foreground">Today</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
