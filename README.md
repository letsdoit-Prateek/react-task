# React Post Pagination with React Query

A modern React application demonstrating efficient pagination implementation using React Query (TanStack Query) and Tailwind CSS. This project showcases best practices for data fetching, caching, and user interface optimization for paginated post data.

## 🚀 Features

- **Efficient Pagination**: Smooth navigation between pages with Previous/Next controls
- **Smart Caching**: React Query handles intelligent caching and background refetching
- **Prefetching**: Next and previous pages are prefetched for instant navigation
- **Loading States**: Skeleton loaders and loading spinners for better UX
- **Error Handling**: Graceful error states with retry functionality
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance Optimized**: Memoization and optimized re-renders

## 🛠 Technology Stack

- **React 18** - Latest React with functional components and hooks
- **TypeScript** - Type safety and better development experience
- **React Query v5** (@tanstack/react-query) - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **JSONPlaceholder API** - Mock REST API for post data

## 📦 Installation

1. Clone the repository:
```
git clone <your-repo-url>
cd react-post-pagination-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3002](http://localhost:3002) to view the app in your browser.

## 🏗 Project Structure

```
src/
├── components/          # React components
│   ├── PostListContainer.tsx   # Main container component
│   ├── PostList.tsx           # Post list display
│   ├── PostCard.tsx           # Individual post card
│   ├── Pagination.tsx         # Pagination controls
│   ├── SkeletonLoader.tsx     # Loading skeleton
│   ├── LoadingSpinner.tsx     # Spinner component
│   └── ErrorMessage.tsx       # Error handling
├── hooks/              # Custom React hooks
│   └── usePosts.ts     # Post data fetching hook
├── services/           # API service layer
│   └── api.ts          # API functions
├── types/              # TypeScript type definitions
│   └── index.ts        # Type declarations
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── index.css           # Tailwind CSS imports
```

## 📡 API Configuration

The application uses JSONPlaceholder API for demo data:

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoint**: `/posts`
- **Pagination**: Simulated client-side (5 posts per page)
- **Total Posts**: 100 posts from JSONPlaceholder

### API Response Format

The application transforms the API response into a standardized pagination format:

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

## ⚡ Performance Optimizations

### React Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 minutes
      gcTime: 10 * 60 * 1000,          // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Caching Strategy

- **Stale Time**: 5 minutes - Data is considered fresh for 5 minutes
- **Garbage Collection**: 10 minutes - Cached data is kept for 10 minutes
- **Background Refetch**: Disabled on window focus for better performance
- **Retry Logic**: Automatic retry up to 3 times on failure

### Prefetching Implementation

```typescript
// Prefetch next and previous pages
useEffect(() => {
  if (data?.hasNext) {
    prefetchNextPage();
  }
  if (data?.hasPrevious) {
    prefetchPreviousPage();
  }
}, [currentPage, data?.hasNext, data?.hasPrevious]);
```

## 🎨 UI Components

### Skeleton Loader
- Animated placeholders while data is loading
- Matches the actual content layout
- Improves perceived performance

### Error Handling
- User-friendly error messages
- Retry functionality
- Clear visual indicators

### Responsive Pagination
- Mobile-friendly navigation
- Desktop pagination with page numbers
- Disabled states for boundary conditions

## 🚀 Available Scripts

- `npm start` - Runs the development server
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: Stack navigation, simplified pagination
- **Tablet**: Enhanced layout with more spacing
- **Desktop**: Full feature set with page numbers

## 🔄 State Management

Uses React Query for:
- **Server State**: API data, loading states, error states
- **Local State**: Current page number with useState
- **Cache Management**: Automatic cache invalidation and updates

## 🧪 Testing Strategy

The application is structured for easy testing:
- **Components**: Isolated, functional components
- **Hooks**: Custom hooks can be tested independently
- **API Layer**: Separate service layer for API calls
- **Types**: TypeScript ensures type safety

## 🚀 Deployment

Build the production version:
```bash
npm run build
```

The build folder contains optimized static files ready for deployment to any static hosting service.

## 📋 Assignment Requirements Checklist

### ✅ Core Requirements
- [x] React Query for data fetching and caching
- [x] Pagination with real API data (JSONPlaceholder)
- [x] Previous/Next navigation buttons
- [x] Cache maintenance between pages
- [x] Loading and error state handling
- [x] Clean and reusable code structure

### ✅ Bonus Features
- [x] Skeleton Loader for better UX
- [x] Prefetching for next pages
- [x] TypeScript for type safety
- [x] Performance optimizations

### ✅ Performance Optimizations
- [x] Optimized queries with staleTime and cacheTime
- [x] Memoization to avoid unnecessary re-renders
- [x] Prefetch next page data
- [x] Smart background refetch behavior

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Query](https://tanstack.com/query) for excellent data fetching
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing mock API
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Heroicons](https://heroicons.com/) for beautiful SVG icons