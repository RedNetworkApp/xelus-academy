export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  requiredSkills: Skill[];
  recommendedSkills: Skill[];
  estimatedTimeToAchieve: string;
  averageSalary: {
    min: number;
    max: number;
    currency: string;
  };
  demandLevel: 'low' | 'medium' | 'high';
  industryTrends: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  prerequisites: string[];
  estimatedTimeToMaster: string;
  relevance: number; // 0-1 score indicating importance for career goal
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  milestones: Milestone[];
  preferences: LearningPreferences;
  timeCommitment: TimeCommitment;
  totalDuration: string;
  progress?: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  courseId: string;
  duration: string;
  order: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'locked';
  progress: number;
  prerequisites?: string[];
  courses?: PathCourse[];
  projects?: Project[];
  assessments?: Assessment[];
}

export interface LearningPreferences {
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusAreas: string[];
  excludedTopics: string[];
}

export interface TimeCommitment {
  hoursPerWeek: number;
  totalWeeks: number;
}

export interface MilestoneTemplate extends Omit<Milestone, 'status' | 'progress'> {
  courses?: PathCourse[];
  projects?: Project[];
  assessments?: Assessment[];
  prerequisites?: string[];
  lessons?: {
    id: string;
    title: string;
    duration: string;
    type?: string;
    videoUrl?: string;
    quizQuestions?: any[];
    content?: any;
  }[];
}

export interface PathTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  milestones: MilestoneTemplate[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
}

export interface PathCourse {
  courseId: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  skills: string[];
  required: boolean;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: string;
  estimatedDuration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  requirements: string[];
  resources: {
    title: string;
    url: string;
    type: string;
  }[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'project_review' | 'peer_review' | 'certification';
  skills: string[];
  passingScore: number;
  attempts: {
    date: string;
    score: number;
    passed: boolean;
    feedback?: string;
  }[];
  status: 'locked' | 'available' | 'completed';
}

export interface LearningPathTemplate {
  id: string;
  title: string;
  description: string;
  careerGoal: CareerGoal;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  prerequisites: Skill[];
  milestones: MilestoneTemplate[];
  popularity: number;
  rating: number;
  totalStudents: number;
  successRate: number;
}

export interface PathGeneratorOptions {
  careerGoal: string;
  currentSkills: string[];
  skillLevels: Record<string, Skill['level']>;
  timeCommitment: {
    hoursPerWeek: number;
    totalWeeks: number;
  };
  preferences: {
    learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    focusAreas: string[];
    excludedTopics: string[];
  };
}
