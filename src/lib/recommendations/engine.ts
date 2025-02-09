import {
  RecommendationContext,
  RecommendationResult,
  RecommendationScore,
  UserBehavior,
  UserPreferences,
} from '@/types/recommendations';

export class RecommendationEngine {
  private static instance: RecommendationEngine;

  private constructor() {}

  public static getInstance(): RecommendationEngine {
    if (!RecommendationEngine.instance) {
      RecommendationEngine.instance = new RecommendationEngine();
    }
    return RecommendationEngine.instance;
  }

  public async getRecommendations(
    context: RecommendationContext,
    limit: number = 10
  ): Promise<RecommendationResult[]> {
    const scores = await this.calculateScores(context);
    const topCourses = this.getTopCourses(scores, limit);
    return this.formatResults(topCourses, context);
  }

  private async calculateScores(
    context: RecommendationContext
  ): Promise<RecommendationScore[]> {
    const scores: RecommendationScore[] = [];

    // This would typically involve complex calculations using real data
    // For now, we'll return mock data
    scores.push({
      courseId: '1',
      score: 0.95,
      factors: {
        relevance: 0.9,
        popularity: 0.8,
        userPreference: 1.0,
        trending: 0.7,
        personalized: 0.9,
      },
    });

    return scores;
  }

  private getTopCourses(
    scores: RecommendationScore[],
    limit: number
  ): RecommendationScore[] {
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private async formatResults(
    scores: RecommendationScore[],
    context: RecommendationContext
  ): Promise<RecommendationResult[]> {
    // This would typically fetch course details from a database
    // For now, we'll return mock data
    return scores.map((score) => ({
      courseId: score.courseId,
      title: 'Advanced Web Development',
      description: 'Master modern web development techniques',
      thumbnail: '/images/courses/web-dev-advanced.jpg',
      instructor: {
        id: '1',
        name: 'John Doe',
        avatar: '/images/avatars/john.jpg',
      },
      category: 'Development',
      level: 'advanced',
      duration: 'medium',
      price: 79.99,
      rating: 4.8,
      totalStudents: 1500,
      matchScore: score.score,
      reasons: this.generateRecommendationReasons(score, context),
    }));
  }

  private generateRecommendationReasons(
    score: RecommendationScore,
    context: RecommendationContext
  ): string[] {
    const reasons: string[] = [];

    if (score.factors.userPreference > 0.8) {
      reasons.push('Matches your interests and skill level');
    }

    if (score.factors.trending > 0.8) {
      reasons.push('Popular among students like you');
    }

    if (score.factors.relevance > 0.8) {
      reasons.push('Relevant to your learning goals');
    }

    if (context.currentCourseId && score.factors.personalized > 0.8) {
      reasons.push('Similar to courses you\'ve enjoyed');
    }

    return reasons;
  }

  // Helper methods for different types of recommendations

  public async getSimilarCourses(
    courseId: string,
    limit: number = 4
  ): Promise<RecommendationResult[]> {
    return this.getRecommendations(
      {
        userId: 'anonymous',
        currentCourseId: courseId,
        timestamp: new Date().toISOString(),
      },
      limit
    );
  }

  public async getPersonalizedRecommendations(
    userId: string,
    limit: number = 10
  ): Promise<RecommendationResult[]> {
    const context = await this.buildUserContext(userId);
    return this.getRecommendations(context, limit);
  }

  public async getTrendingCourses(
    category?: string,
    limit: number = 10
  ): Promise<RecommendationResult[]> {
    return this.getRecommendations(
      {
        userId: 'anonymous',
        currentCategory: category,
        timestamp: new Date().toISOString(),
      },
      limit
    );
  }

  private async buildUserContext(
    userId: string
  ): Promise<RecommendationContext> {
    // This would typically fetch user data from a database
    // For now, we'll return mock data
    const mockPreferences: UserPreferences = {
      interests: ['web development', 'mobile development'],
      skillLevel: 'intermediate',
      learningGoals: ['career advancement', 'skill development'],
      preferredLanguages: ['english'],
      preferredDuration: ['medium', 'long'],
      priceRange: { min: 0, max: 100 },
    };

    const mockBehavior: UserBehavior = {
      viewedCourses: [],
      enrolledCourses: [],
      completedCourses: [],
      searchHistory: [],
      categoryInteractions: [],
    };

    return {
      userId,
      userPreferences: mockPreferences,
      userBehavior: mockBehavior,
      timestamp: new Date().toISOString(),
    };
  }
}
