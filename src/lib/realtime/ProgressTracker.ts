import {
  ProgressEvent,
  ProgressUpdate,
  ProgressSubscription,
  LearningSession,
} from '@/types/realtime';

export class ProgressTracker {
  private static instance: ProgressTracker;
  private subscriptions: Map<string, ProgressSubscription[]>;
  private activeSessions: Map<string, LearningSession>;
  private eventBuffer: ProgressEvent[];
  private bufferTimeout: NodeJS.Timeout | null;

  private constructor() {
    this.subscriptions = new Map();
    this.activeSessions = new Map();
    this.eventBuffer = [];
    this.bufferTimeout = null;
  }

  public static getInstance(): ProgressTracker {
    if (!ProgressTracker.instance) {
      ProgressTracker.instance = new ProgressTracker();
    }
    return ProgressTracker.instance;
  }

  public subscribe(subscription: ProgressSubscription): () => void {
    const key = this.getSubscriptionKey(subscription.userId, subscription.courseId);
    const subs = this.subscriptions.get(key) || [];
    subs.push(subscription);
    this.subscriptions.set(key, subs);

    // Return unsubscribe function
    return () => {
      const subs = this.subscriptions.get(key) || [];
      const index = subs.indexOf(subscription);
      if (index > -1) {
        subs.splice(index, 1);
        if (subs.length === 0) {
          this.subscriptions.delete(key);
        } else {
          this.subscriptions.set(key, subs);
        }
      }
    };
  }

  public trackEvent(event: ProgressEvent): void {
    this.eventBuffer.push(event);
    this.scheduleProcessing();
  }

  public startSession(userId: string, courseId: string): LearningSession {
    const session: LearningSession = {
      sessionId: this.generateSessionId(),
      userId,
      courseId,
      startTime: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      deviceInfo: this.getDeviceInfo(),
      progress: {
        lessonsCompleted: [],
        timeSpent: 0,
      },
    };

    this.activeSessions.set(session.sessionId, session);
    return session;
  }

  public updateSession(
    sessionId: string,
    updates: Partial<LearningSession['progress']>
  ): void {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      session.lastActive = new Date().toISOString();
      session.progress = {
        ...session.progress,
        ...updates,
      };
      this.activeSessions.set(sessionId, session);
    }
  }

  public endSession(sessionId: string): void {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      // Process final progress update
      this.trackEvent({
        type: 'lesson_complete',
        userId: session.userId,
        courseId: session.courseId,
        timestamp: new Date().toISOString(),
        data: {
          timeSpent: session.progress.timeSpent,
        },
      });

      this.activeSessions.delete(sessionId);
    }
  }

  private scheduleProcessing(): void {
    if (this.bufferTimeout) {
      clearTimeout(this.bufferTimeout);
    }

    // Process events in batches every 1 second
    this.bufferTimeout = setTimeout(() => {
      this.processEvents();
    }, 1000);
  }

  private async processEvents(): Promise<void> {
    const events = [...this.eventBuffer];
    this.eventBuffer = [];

    // Group events by user and course
    const groupedEvents = this.groupEvents(events);

    // Process each group and generate updates
    for (const [key, events] of groupedEvents.entries()) {
      const [userId, courseId] = key.split(':');
      const update = await this.calculateProgressUpdate(userId, courseId, events);
      this.notifySubscribers(update);
    }
  }

  private groupEvents(
    events: ProgressEvent[]
  ): Map<string, ProgressEvent[]> {
    const grouped = new Map<string, ProgressEvent[]>();

    for (const event of events) {
      const key = this.getSubscriptionKey(event.userId, event.courseId);
      const groupEvents = grouped.get(key) || [];
      groupEvents.push(event);
      grouped.set(key, groupEvents);
    }

    return grouped;
  }

  private async calculateProgressUpdate(
    userId: string,
    courseId: string,
    events: ProgressEvent[]
  ): Promise<ProgressUpdate> {
    // This would typically involve complex calculations based on course structure
    // For now, we'll return a simplified update
    const update: ProgressUpdate = {
      userId,
      courseId,
      timestamp: new Date().toISOString(),
      updates: {
        overallProgress: 0,
      },
    };

    // Process each event
    for (const event of events) {
      switch (event.type) {
        case 'lesson_complete':
          update.updates.lessonProgress = {
            lessonId: event.lessonId!,
            progress: 100,
            status: 'completed',
          };
          break;
        case 'quiz_attempt':
          update.updates.quizProgress = {
            quizId: event.quizId!,
            score: event.data.score || 0,
            passed: (event.data.score || 0) >= 70,
          };
          break;
        case 'assignment_submit':
          update.updates.assignmentProgress = {
            assignmentId: event.assignmentId!,
            status: 'submitted',
          };
          break;
      }
    }

    // Calculate overall progress
    update.updates.overallProgress = await this.calculateOverallProgress(
      userId,
      courseId,
      events
    );

    return update;
  }

  private async calculateOverallProgress(
    userId: string,
    courseId: string,
    events: ProgressEvent[]
  ): Promise<number> {
    // This would typically fetch course structure and calculate real progress
    // For now, return a mock value
    return Math.min(
      100,
      Math.round(
        events.reduce((acc, event) => {
          switch (event.type) {
            case 'lesson_complete':
              return acc + 10;
            case 'quiz_attempt':
              return acc + (event.data.score || 0) / 10;
            case 'assignment_submit':
              return acc + 15;
            default:
              return acc;
          }
        }, 0)
      )
    );
  }

  private notifySubscribers(update: ProgressUpdate): void {
    const key = this.getSubscriptionKey(update.userId, update.courseId);
    const subscribers = this.subscriptions.get(key) || [];
    subscribers.forEach((sub) => sub.callback(update));
  }

  private getSubscriptionKey(userId: string, courseId: string): string {
    return `${userId}:${courseId}`;
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private getDeviceInfo() {
    // This would typically use a library like ua-parser-js
    return {
      type: 'desktop',
      browser: 'chrome',
      os: 'macos',
    };
  }
}
