import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, calculateTotalPages } from '../services/api';

export const usePosts = (page: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // Prefetch next and previous pages for smooth navigation
  const prefetchNextPage = () => {
    if (query.data) {
      const totalPages = calculateTotalPages(query.data.total);
      if (page < totalPages) {
        queryClient.prefetchQuery({
          queryKey: ['posts', page + 1],
          queryFn: () => fetchPosts(page + 1),
          staleTime: 5 * 60 * 1000,
        });
      }
    }
  };

  const prefetchPreviousPage = () => {
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['posts', page - 1],
        queryFn: () => fetchPosts(page - 1),
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  return {
    ...query,
    prefetchNextPage,
    prefetchPreviousPage,
  };
};