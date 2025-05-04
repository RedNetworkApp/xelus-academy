import { Metadata } from 'next';
import { SearchResult, SearchFilters, CourseLevel, CourseDuration } from '@/types/search';
import SearchBar from '@/components/search/SearchBar';
import SearchFiltersPanel from '@/components/search/SearchFiltersPanel';
import SearchResults from '@/components/search/SearchResults';
import CourseRecommendations from '@/components/search/CourseRecommendations';

export const metadata: Metadata = {
  title: 'Search Courses - Xelus Academy',
  description: 'Search and discover courses across various categories.',
};

// This would typically come from an API
const searchCourses = async (
  query: string,
  filters: SearchFilters,
  page: number = 1
): Promise<SearchResult> => {
  // Simulated API response
  return {
    totalCourses: 100,
    currentPage: page,
    totalPages: 10,
    courses: [
      {
        id: '1',
        title: 'Web Development Fundamentals',
        slug: 'web-development-fundamentals',
        description: 'Learn the basics of web development',
        thumbnail: '/images/courses/web-dev.jpg',
        instructor: {
          id: '1',
          name: 'John Doe',
          avatar: '/images/avatars/john.jpg',
        },
        category: 'Development',
        level: 'beginner',
        duration: 'medium',
        rating: 4.5,
        totalReviews: 120,
        totalStudents: 1500,
        price: 49.99,
        tags: ['web', 'html', 'css', 'javascript'],
        language: 'English',
        lastUpdated: '2025-01-01',
        highlights: ['Modern web technologies', 'Hands-on projects'],
      },
      // Add more courses...
    ],
    facets: {
      categories: [
        { value: 'development', label: 'Development', count: 50 },
        { value: 'business', label: 'Business', count: 30 },
        { value: 'design', label: 'Design', count: 20 },
      ],
      levels: [
        { value: 'beginner', label: 'Beginner', count: 40 },
        { value: 'intermediate', label: 'Intermediate', count: 35 },
        { value: 'advanced', label: 'Advanced', count: 25 },
      ],
      priceRanges: [
        { value: 'free', label: 'Free', count: 10 },
        { value: '1-50', label: '$1-$50', count: 45 },
        { value: '51-100', label: '$51-$100', count: 30 },
        { value: '100+', label: '$100+', count: 15 },
      ],
      durations: [
        { value: 'short', label: '0-3 hours', count: 30 },
        { value: 'medium', label: '3-10 hours', count: 45 },
        { value: 'long', label: '10+ hours', count: 25 },
      ],
      languages: [
        { value: 'english', label: 'English', count: 80 },
        { value: 'spanish', label: 'Spanish', count: 15 },
        { value: 'french', label: 'French', count: 5 },
      ],
      instructors: [
        { value: '1', label: 'John Doe', count: 15 },
        { value: '2', label: 'Jane Smith', count: 12 },
      ],
      tags: [
        { value: 'web', label: 'Web Development', count: 25 },
        { value: 'mobile', label: 'Mobile Development', count: 20 },
        { value: 'ai', label: 'Artificial Intelligence', count: 15 },
      ],
    },
  };
};

interface SearchParams {
  q?: string;
  category?: string;
  level?: string;
  price?: string;
  duration?: string;
  language?: string;
  instructor?: string;
  tag?: string;
  page?: string;
}

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: SearchParams
}) {
  const query = searchParams.q || '';
  const page = parseInt(searchParams.page || '1');

  // Convert URL parameters to filters
  const filters: SearchFilters = {
    categories: searchParams.category ? [searchParams.category] : undefined,
    levels: searchParams.level ? [searchParams.level as CourseLevel] : undefined,
    priceRange: searchParams.price
      ? {
          min: 0,
          max: parseInt(searchParams.price.split('-')[1] || '1000'),
        }
      : undefined,
    duration: searchParams.duration ? [searchParams.duration as CourseDuration] : undefined,
    language: searchParams.language ? [searchParams.language] : undefined,
    instructors: searchParams.instructor ? [searchParams.instructor] : undefined,
    tags: searchParams.tag ? [searchParams.tag] : undefined,
  };

  const searchResult = await searchCourses(query, filters, page);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar initialQuery={query} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel */}
          <div className="w-full lg:w-1/4">
            <SearchFiltersPanel
              facets={searchResult.facets}
              activeFilters={filters}
            />
          </div>

          <div className="w-full lg:w-3/4">
            {/* Search Results */}
            <SearchResults
              results={searchResult}
              currentPage={page}
            />

            {/* Course Recommendations */}
            {searchResult.courses.length > 0 && (
              <div className="mt-12">
                <CourseRecommendations
                  type="similar"
                  category={filters.categories?.[0]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
