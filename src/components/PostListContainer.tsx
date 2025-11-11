import React, { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { calculateTotalPages } from '../services/api';
import PostList from './PostList';
import Pagination from './Pagination';
import SkeletonLoader from './SkeletonLoader';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

const PostListContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error, refetch, prefetchNextPage, prefetchPreviousPage } = usePosts(currentPage);

  // Prefetch adjacent pages when current page changes
  useEffect(() => {
    if (data?.hasNext) {
      prefetchNextPage();
    }
    if (data?.hasPrevious) {
      prefetchPreviousPage();
    }
  }, [currentPage, data?.hasNext, data?.hasPrevious, prefetchNextPage, prefetchPreviousPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
            <p className="text-sm text-gray-600 mt-1">Loading post data...</p>
          </div>
          <LoadingSpinner />
        </div>
        <SkeletonLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
          <p className="text-sm text-gray-600 mt-1">Failed to load post data</p>
        </div>
        <ErrorMessage
          message={error instanceof Error ? error.message : 'An unexpected error occurred'}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
          <p className="text-sm text-gray-600 mt-1">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {data.data.length} of {data.total} posts
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Page {data.page}
          </div>
        </div>
      </div>

      {/* Post List */}
      <PostList posts={data.data} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasNext={data.hasNext}
        hasPrevious={data.hasPrevious}
        totalPages={calculateTotalPages(data.total)}
      />
    </div>
  );
};

export default PostListContainer;