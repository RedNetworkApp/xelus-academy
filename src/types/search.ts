export interface SearchFilters {
  categories?: string[];
  levels?: CourseLevel[];
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: CourseDuration[];
  rating?: number;
  language?: string[];
  instructors?: string[];
  tags?: string[];
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type CourseDuration = 'short' | 'medium' | 'long';

export interface SearchResult {
  totalCourses: number;
  currentPage: number;
  totalPages: number;
  courses: CourseSearchItem[];
  facets: SearchFacets;
}

export interface CourseSearchItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  level: CourseLevel;
  duration: CourseDuration;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  price: number;
  originalPrice?: number;
  tags: string[];
  language: string;
  lastUpdated: string;
  highlights?: string[];
}

export interface SearchFacets {
  categories: FacetItem[];
  levels: FacetItem[];
  priceRanges: FacetItem[];
  durations: FacetItem[];
  languages: FacetItem[];
  instructors: FacetItem[];
  tags: FacetItem[];
}

export interface FacetItem {
  value: string;
  label: string;
  count: number;
}

export interface SearchSuggestion {
  type: 'course' | 'category' | 'instructor' | 'tag';
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  url: string;
}

export interface RecommendationParams {
  userId?: string;
  courseId?: string;
  category?: string;
  limit?: number;
  type: 'similar' | 'popular' | 'personalized' | 'trending';
}
