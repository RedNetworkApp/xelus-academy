import {
  LearningPath,
  PathGeneratorOptions,
  CareerGoal,
  Skill,
  Milestone,
  PathCourse,
  Project,
  Assessment,
  LearningPathTemplate,
} from '@/types/learning-path';

export class PathGenerator {
  private static instance: PathGenerator;

  private constructor() {}

  public static getInstance(): PathGenerator {
    if (!PathGenerator.instance) {
      PathGenerator.instance = new PathGenerator();
    }
    return PathGenerator.instance;
  }

  public async generatePath(
    userId: string,
    options: PathGeneratorOptions
  ): Promise<LearningPath> {
    const careerGoal = await this.getCareerGoal(options.careerGoal);
    const template = await this.findBestTemplate(careerGoal, options);
    const customizedPath = await this.customizeTemplate(template, options);

    return {
      id: this.generateId(),
      userId,
      title: `Path to ${careerGoal.title}`,
      description: `Personalized learning path for becoming a ${careerGoal.title}`,
      careerGoal,
      milestones: customizedPath.milestones,
      totalDuration: this.calculateTotalDuration(customizedPath.milestones),
      difficulty: options.preferences.difficulty,
      status: 'draft',
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  private async getCareerGoal(goalId: string): Promise<CareerGoal> {
    // This would typically fetch from an API
    return {
      id: goalId,
      title: 'Full Stack Developer',
      description: 'Become a proficient full stack developer',
      requiredSkills: [],
      recommendedSkills: [],
      estimatedTimeToAchieve: '12 months',
      averageSalary: {
        min: 70000,
        max: 120000,
        currency: 'USD',
      },
      demandLevel: 'high',
      industryTrends: [
        'Growing demand for full stack developers',
        'Emphasis on cloud technologies',
      ],
    };
  }

  private async findBestTemplate(
    careerGoal: CareerGoal,
    options: PathGeneratorOptions
  ): Promise<LearningPathTemplate> {
    // This would typically involve complex matching logic
    return {
      id: '1',
      title: 'Full Stack Developer Path',
      description: 'Comprehensive path to becoming a full stack developer',
      careerGoal,
      difficulty: 'intermediate',
      estimatedDuration: '12 months',
      prerequisites: [],
      milestones: [],
      popularity: 95,
      rating: 4.8,
      totalStudents: 1500,
      successRate: 85,
    };
  }

  private async customizeTemplate(
    template: LearningPathTemplate,
    options: PathGeneratorOptions
  ): Promise<LearningPathTemplate> {
    // Adjust difficulty
    const adjustedTemplate = {
      ...template,
      difficulty: options.preferences.difficulty,
    };

    // Customize milestones based on user's current skills
    adjustedTemplate.milestones = await this.customizeMilestones(
      template.milestones,
      options
    );

    return adjustedTemplate;
  }

  private async customizeMilestones(
    milestones: Omit<Milestone, 'status' | 'progress'>[],
    options: PathGeneratorOptions
  ): Promise<Milestone[]> {
    const customizedMilestones: Milestone[] = [];

    for (const milestone of milestones) {
      const customizedMilestone: Milestone = {
        ...milestone,
        status: 'locked',
        progress: 0,
        courses: await this.customizeCourses(milestone.courses, options),
        projects: await this.customizeProjects(milestone.projects, options),
        assessments: await this.customizeAssessments(
          milestone.assessments,
          options
        ),
      };

      customizedMilestones.push(customizedMilestone);
    }

    return this.optimizeMilestoneOrder(customizedMilestones, options);
  }

  private async customizeCourses(
    courses: PathCourse[],
    options: PathGeneratorOptions
  ): Promise<PathCourse[]> {
    return courses.map((course) => ({
      ...course,
      status: 'not_started',
      progress: 0,
    }));
  }

  private async customizeProjects(
    projects: Project[],
    options: PathGeneratorOptions
  ): Promise<Project[]> {
    return projects.map((project) => ({
      ...project,
      status: 'not_started',
    }));
  }

  private async customizeAssessments(
    assessments: Assessment[],
    options: PathGeneratorOptions
  ): Promise<Assessment[]> {
    return assessments.map((assessment) => ({
      ...assessment,
      status: 'locked',
      attempts: [],
    }));
  }

  private optimizeMilestoneOrder(
    milestones: Milestone[],
    options: PathGeneratorOptions
  ): Milestone[] {
    // Sort milestones based on prerequisites and user's current skills
    return milestones.sort((a, b) => {
      // If a is a prerequisite of b, a should come first
      if (b.prerequisites.includes(a.id)) return -1;
      if (a.prerequisites.includes(b.id)) return 1;

      // If user has completed prerequisites for one milestone but not the other,
      // prioritize the one with completed prerequisites
      const aPrereqsMet = this.checkPrerequisitesMet(a, options.currentSkills);
      const bPrereqsMet = this.checkPrerequisitesMet(b, options.currentSkills);
      if (aPrereqsMet && !bPrereqsMet) return -1;
      if (!aPrereqsMet && bPrereqsMet) return 1;

      return 0;
    });
  }

  private checkPrerequisitesMet(
    milestone: Milestone,
    currentSkills: string[]
  ): boolean {
    return milestone.prerequisites.every((prereq) =>
      currentSkills.includes(prereq)
    );
  }

  private calculateTotalDuration(milestones: Milestone[]): string {
    const totalHours = milestones.reduce((total, milestone) => {
      const durationMatch = milestone.duration.match(/(\d+)\s*(hour|day|week|month)/);
      if (!durationMatch) return total;

      const [, amount, unit] = durationMatch;
      const hours = this.convertToHours(parseInt(amount), unit);
      return total + hours;
    }, 0);

    if (totalHours < 24) {
      return `${totalHours} hours`;
    } else if (totalHours < 168) {
      return `${Math.round(totalHours / 24)} days`;
    } else if (totalHours < 720) {
      return `${Math.round(totalHours / 168)} weeks`;
    } else {
      return `${Math.round(totalHours / 720)} months`;
    }
  }

  private convertToHours(amount: number, unit: string): number {
    switch (unit) {
      case 'hour':
        return amount;
      case 'day':
        return amount * 24;
      case 'week':
        return amount * 168;
      case 'month':
        return amount * 720;
      default:
        return amount;
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
