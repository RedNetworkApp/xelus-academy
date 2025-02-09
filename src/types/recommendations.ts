export interface UserPreferences {
  interests: string[];
  skillLevel: string;
  learningGoals: string[];
  preferredLanguages: string[];
  preferredDuration: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface UserBehavior {
  viewedCourses: CourseInteraction[];
  enrolledCourses: CourseInteraction[];
  completedCourses: CourseInteraction[];
  searchHistory: SearchEvent[];
  categoryInteractions: CategoryInteraction[];
}

export interface CourseInteraction {
  courseId: string;
  timestamp: string;
  duration: number; // Time spent in seconds
  progress?: number;
  rating?: number;
  review?: string;
  completed: boolean;
}

export interface SearchEvent {
  query: string;
  timestamp: string;
  filters: {
    category?: string;
    level?: string;
    price?: string;
    duration?: string;
  };
  resultsClicked: string[]; // Course IDs
}

export interface CategoryInteraction {
  categoryId: string;
  timestamp: string;
  viewCount: number;
  enrollmentCount: number;
  completionCount: number;
}

export interface RecommendationScore {
  courseId: string;
  score: number;
  factors: {
    relevance: number;
    popularity: number;
    userPreference: number;
    trending: number;
    personalized: number;
  };
}

export interface RecommendationContext {
  userId: string;
  currentCourseId?: string;
  currentCategory?: string;
  userPreferences?: UserPreferences;
  userBehavior?: UserBehavior;
  timestamp: string;
}

export interface RecommendationResult {
  courseId: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  level: string;
  duration: string;
  price: number;
  rating: number;
  totalStudents: number;
  matchScore: number;
  reasons: string[];
}
