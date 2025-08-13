import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import LessonGrid from '@/components/explore/LessonGrid'; // Reusing LessonGrid
import InfiniteScrollWrapper from '@/components/common/InfiniteScrollWrapper';
import TimeframeFilter from '@/components/trending/TimeframeFilter';
import TrendingTagsSection from '@/components/trending/TrendingTagsSection';
import TrendingCreatorsSection from '@/components/trending/TrendingCreatorsSection';
import {
  mockTrendingLessons,
  mockTrendingTags,
  mockTrendingCreators,
  generateMockLessons,
} from '@/lib/mockData';

const ITEMS_PER_PAGE = 12;

export const TrendingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [trendingLessons, setTrendingLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [currentTimeframe, setCurrentTimeframe] = useState('week');
  const { isAuthenticated } = useAuth();

  const fetchTrendingLessons = useCallback(async (currentPage, timeframe) => {
    // Simulate API call based on timeframe
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredLessons = [...mockTrendingLessons];

        // Simple filtering based on timeframe (mocking)
        if (timeframe === 'week') {
          filteredLessons = filteredLessons.slice(0, Math.floor(filteredLessons.length * 0.6));
        } else if (timeframe === 'month') {
          filteredLessons = filteredLessons.slice(0, Math.floor(filteredLessons.length * 0.8));
        }

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const newLessons = filteredLessons.slice(startIndex, endIndex);

        resolve({
          lessons: newLessons,
          hasMore: endIndex < filteredLessons.length,
        });
      }, 1000);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchTrendingLessons(1, currentTimeframe).then(({ lessons: newLessons, hasMore: newHasMore }) => {
      setTrendingLessons(newLessons);
      setHasMore(newHasMore);
      setIsLoading(false);
    });
  }, [currentTimeframe, fetchTrendingLessons]);

  const loadMoreLessons = useCallback(() => {
    if (!hasMore || isLoading) return;

    const nextPage = page + 1;
    setIsLoading(true);
    fetchTrendingLessons(nextPage, currentTimeframe).then(({ lessons: newLessons, hasMore: newHasMore }) => {
      setTrendingLessons((prevLessons) => [...prevLessons, ...newLessons]);
      setHasMore(newHasMore);
      setPage(nextPage);
      setIsLoading(false);
    });
  }, [hasMore, isLoading, page, currentTimeframe, fetchTrendingLessons]);

  const handleTimeframeChange = (timeframe) => {
    setCurrentTimeframe(timeframe);
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
      <title>Trending - Skill Relay</title>
      <meta name="description" content="Discover trending lessons, tags, and creators on Skill Relay. See what's popular right now." />
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

          {/* Trending Content */}
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold gradient-text mb-6">Trending Lessons</h1>
            
            <TimeframeFilter 
              currentTimeframe={currentTimeframe}
              onTimeframeChange={handleTimeframeChange}
            />

            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                {isLoading && trendingLessons.length === 0 ? (
                  <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <InfiniteScrollWrapper
                    loadMore={loadMoreLessons}
                    hasMore={hasMore}
                    isLoading={isLoading}
                  >
                    <LessonGrid lessons={trendingLessons} />
                  </InfiniteScrollWrapper>
                )}
              </div>
              <div className="lg:col-span-1 space-y-6">
                <TrendingTagsSection tags={mockTrendingTags} />
                <TrendingCreatorsSection creators={mockTrendingCreators} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
