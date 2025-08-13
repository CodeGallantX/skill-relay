import React, { useEffect, useRef, useCallback } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const InfiniteScrollWrapper = ({ children, loadMore, hasMore, isLoading }) => {
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore]
  );

  return (
    <div className="w-full">
      {children}
      {hasMore && (
        <div ref={lastElementRef} className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
      {!hasMore && !isLoading && children.length > 0 && (
        <p className="text-center text-muted-foreground py-4">You've reached the end!</p>
      )}
    </div>
  );
};

export default InfiniteScrollWrapper;
