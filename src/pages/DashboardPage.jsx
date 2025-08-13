import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import HeroSection from '@/components/dashboard/HeroSection';
import LessonCarousel from '@/components/dashboard/LessonCarousel';
import LessonCard from '@/components/dashboard/LessonCard';
import InfiniteScrollWrapper from '@/components/common/InfiniteScrollWrapper';
import {
  mockUserStats,
  mockContinueWatching,
  mockFollowedCreatorsLessons,
  mockRecommendedLessons,
  mockNewCategoryLessons,
  mockMainFeedInitial,
  fetchMoreMockLessons,
} from '@/lib/mockData';

export const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mainFeedLessons, setMainFeedLessons] = useState([]);
  const [hasMoreMainFeed, setHasMoreMainFeed] = useState(true);
  const [isMainFeedLoadingMore, setIsMainFeedLoadingMore] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setMainFeedLessons(mockMainFeedInitial);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const loadMoreMainFeed = async () => {
    if (isMainFeedLoadingMore || !hasMoreMainFeed) return;

    setIsMainFeedLoadingMore(true);
    try {
      const { lessons, nextPageToken } = await fetchMoreMockLessons();
      setMainFeedLessons((prevLessons) => [...prevLessons, ...lessons]);
      setHasMoreMainFeed(!!nextPageToken);
    } catch (error) {
      console.error("Failed to load more lessons:", error);
      setHasMoreMainFeed(false); // Stop trying to load more on error
    } finally {
      setIsMainFeedLoadingMore(false);
    }
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
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <HeroSection userStats={mockUserStats} />

                {mockContinueWatching.length > 0 && (
                  <LessonCarousel title="Continue Watching" lessons={mockContinueWatching} />
                )}
                {mockFollowedCreatorsLessons.length > 0 && (
                  <LessonCarousel title="From Your Followed Creators" lessons={mockFollowedCreatorsLessons} />
                )}
                {mockRecommendedLessons.length > 0 && (
                  <LessonCarousel title="Recommended for You" lessons={mockRecommendedLessons} />
                )}
                {mockNewCategoryLessons.length > 0 && (
                  <LessonCarousel title="New in Your Categories" lessons={mockNewCategoryLessons} />
                )}

                <h2 className="text-2xl font-bold mb-4">Main Feed</h2>
                <InfiniteScrollWrapper
                  loadMore={loadMoreMainFeed}
                  hasMore={hasMoreMainFeed}
                  isLoading={isMainFeedLoadingMore}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mainFeedLessons.map((lesson) => (
                      <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                  </div>
                </InfiniteScrollWrapper>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};