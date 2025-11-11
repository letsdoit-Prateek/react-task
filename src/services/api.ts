import { Post, PaginatedResponse } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const POSTS_PER_PAGE = 5;

export const fetchPosts = async (page: number = 1): Promise<PaginatedResponse<Post>> => {
  try {
    // JSONPlaceholder doesn't support pagination, so we'll simulate it
    const response = await fetch(`${API_BASE_URL}/posts`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    const allPosts: Post[] = await response.json();
    
    console.log('Fetched posts:', allPosts);
    // Simulate pagination
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    
    return {
      data: paginatedPosts,
      total: totalPosts,
      page,
      limit: POSTS_PER_PAGE,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Helper function to calculate total pages from total count
export const calculateTotalPages = (totalCount: number): number => {
  return Math.ceil(totalCount / POSTS_PER_PAGE);
};