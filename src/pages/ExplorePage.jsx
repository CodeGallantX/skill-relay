import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import LessonGrid from '@/components/explore/LessonGrid';
import FilterSortBar from '@/components/explore/FilterSortBar';
import VideoPreviewModal from '@/components/explore/VideoPreviewModal';
import InfiniteScrollWrapper from '@/components/common/InfiniteScrollWrapper';
import { generateMockLessons, mockExploreLessons } from '@/lib/mockData';

const ITEMS_PER_PAGE = 12;

export const ExplorePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [currentSort, setCurrentSort] = useState('popular');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchLessons = useCallback(async (currentPage, sort, filter) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredLessons = mockExploreLessons;

        if (filter !== 'all') {
          filteredLessons = filteredLessons.filter(lesson => lesson.category === filter);
        }

        if (sort === 'newest') {
          filteredLessons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === 'popular') {
          filteredLessons.sort((a, b) => b.views - a.views); // Sort by views for popularity
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
    fetchLessons(1, currentSort, currentFilter).then(({ lessons: newLessons, hasMore: newHasMore }) => {
      setLessons(newLessons);
      setHasMore(newHasMore);
      setIsLoading(false);
    });
  }, [currentSort, currentFilter, fetchLessons]);

  const loadMoreLessons = useCallback(() => {
    if (!hasMore || isLoading) return;

    const nextPage = page + 1;
    setIsLoading(true);
    fetchLessons(nextPage, currentSort, currentFilter).then(({ lessons: newLessons, hasMore: newHasMore }) => {
      setLessons((prevLessons) => [...prevLessons, ...newLessons]);
      setHasMore(newHasMore);
      setPage(nextPage);
      setIsLoading(false);
    });
  }, [hasMore, isLoading, page, currentSort, currentFilter, fetchLessons]);

  const handleSortChange = (value) => {
    setCurrentSort(value);
  };

  const handleFilterChange = (value) => {
    setCurrentFilter(value);
  };

  const handleCardClick = (lesson) => {
    // In a real app, this would navigate to the lesson detail page
    console.log("Navigate to lesson:", lesson.id);
    // For now, let's open the video preview modal
    setSelectedVideo(lesson.videoPreview);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
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
      <title>Explore - Skill Relay</title>
      <meta name="description" content="Explore thousands of bite-sized video lessons on Skill Relay. Filter by category and sort by popularity or newest content." />
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

          {/* Explore Content */}
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold gradient-text mb-6">Explore Lessons</h1>
            
            <FilterSortBar 
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
              currentSort={currentSort}
              currentFilter={currentFilter}
            />

            {isLoading && lessons.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : (
              <InfiniteScrollWrapper
                loadMore={loadMoreLessons}
                hasMore={hasMore}
                isLoading={isLoading}
              >
                <LessonGrid lessons={lessons} onCardClick={handleCardClick} />
              </InfiniteScrollWrapper>
            )}
          </div>
        </main>
      </div>
      <VideoPreviewModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        videoUrl={selectedVideo} 
        title="Lesson Preview"
      />
    </div>
  );
};
