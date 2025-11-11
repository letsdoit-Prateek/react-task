import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostListContainer from './components/PostListContainer';

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              React Post Pagination with React Query
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Efficient post data fetching and caching with pagination
            </p>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PostListContainer />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;