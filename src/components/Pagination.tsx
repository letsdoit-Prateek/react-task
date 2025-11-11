import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  hasNext,
  hasPrevious,
  totalPages,
}) => {
  // Configuration for pagination display
  const maxVisiblePages = 5; // Maximum number of page buttons to show
  const siblingCount = 1; // Number of pages to show on each side of current page

  const handlePrevious = () => {
    if (hasPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    // If total pages is small, show all pages
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate start and end of visible range around current page
    const startPage = Math.max(1, currentPage - siblingCount);
    const endPage = Math.min(totalPages, currentPage + siblingCount);

    // Determine if we need ellipsis
    const shouldShowLeftEllipsis = startPage > 2;
    const shouldShowRightEllipsis = endPage < totalPages - 1;

    const pages: (number | string)[] = [];

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      
      // Add left ellipsis if there's a gap
      if (shouldShowLeftEllipsis) {
        pages.push('left-ellipsis');
      }
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      // Add right ellipsis if there's a gap
      if (shouldShowRightEllipsis) {
        pages.push('right-ellipsis');
      }
      
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 border border-gray-200 rounded-lg">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
          
          {/* Direct page navigation for large page counts */}
          {totalPages > 10 && (
            <div className="flex items-center space-x-2 ml-4">
              <label htmlFor="pageInput" className="text-sm text-gray-700">
                Go to:
              </label>
              <input
                id="pageInput"
                type="number"
                min="1"
                max={totalPages}
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = parseInt((e.target as HTMLInputElement).value);
                    if (page >= 1 && page <= totalPages) {
                      onPageChange(page);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
                placeholder={currentPage.toString()}
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Jump to first page (only show if we're not near the beginning and there are many pages) */}
          {currentPage > 3 && totalPages > 7 && (
            <button
              onClick={() => onPageChange(1)}
              className="relative inline-flex items-center rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 transition-colors"
              title="First page"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-offset-0 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
            Previous
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => {
              if (typeof page === 'string') {
                // Render ellipsis
                return (
                  <span
                    key={page}
                    className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-700"
                  >
                    ...
                  </span>
                );
              }

              // Render page number button
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                    page === currentPage
                      ? 'bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-offset-0 transition-colors"
          >
            Next
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Jump to last page (only show if we're not near the end and there are many pages) */}
          {currentPage < totalPages - 2 && totalPages > 7 && (
            <button
              onClick={() => onPageChange(totalPages)}
              className="relative inline-flex items-center rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 transition-colors"
              title="Last page"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.21 5.23a.75.75 0 011.06-.02l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08L8.168 10 4.23 6.29a.75.75 0 01-.02-1.06zm6 0a.75.75 0 011.06-.02l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08L14.168 10 10.23 6.29a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;