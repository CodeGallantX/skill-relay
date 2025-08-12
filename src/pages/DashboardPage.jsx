import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LessonCard } from '@/components/feed/LessonCard';
import { FeedFilters } from '@/components/feed/FeedFilters';
import { LoadingSpinner, LoadingCard } from '@/components/common/LoadingSpinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/context/AppContext';
import { contentApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();
  const { state } = useApp();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['feed', state.feedFilters],
    queryFn: ({ pageParam = 1 }) => contentApi.getFeed(pageParam, state.feedFilters),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
    enabled: isAuthenticated,
  });

  const { ref } = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  const lessons = data?.pages.flatMap(page => page.lessons) || [];

  const handleLike = (lessonId, liked) => {
    // Handle like action
    console.log('Liked lesson:', lessonId, liked);
  };

  const handleComment = (lessonId) => {
    // Handle comment action
    console.log('Comment on lesson:', lessonId);
  };

  const handleShare = (lessonId) => {
    // Handle share action
    console.log('Share lesson:', lessonId);
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <main className="flex-1 lg:ml-64">
          {/* Mobile Menu Button */}
          <div className="lg:hidden p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Filters */}
          <FeedFilters 
            isOpen={showFilters} 
            onToggle={() => setShowFilters(!showFilters)} 
          />

          {/* Feed Content */}
          <div className="container mx-auto px-4 py-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Failed to load lessons</h3>
                <p className="text-muted-foreground mb-4">Please try again later</p>
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : lessons.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or check back later</p>
              </div>
            ) : (
              <>
                {/* TikTok-style vertical feed for mobile */}
                <div className="md:hidden space-y-6">
                  {lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                  ))}
                </div>

                {/* Grid layout for desktop */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                  ))}
                </div>

                {/* Load More Trigger */}
                <div ref={ref} className="flex justify-center py-8">
                  {isFetchingNextPage && <LoadingSpinner />}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};