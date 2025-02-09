export interface LessonContent {
  type: 'text' | 'video' | 'exercise';
  text?: string;
  duration?: string;
}
