'use client';

import { useEffect, useState } from 'react';
import { ProgressTracker } from '@/lib/realtime/ProgressTracker';
import { ProgressUpdate, VideoProgress } from '@/types/realtime';

interface Props {
  userId: string;
  courseId: string;
  lessonId?: string;
}

export default function RealTimeProgress({ userId, courseId, lessonId }: Props) {
  const [progress, setProgress] = useState<ProgressUpdate['updates']>();
  const [videoProgress, setVideoProgress] = useState<VideoProgress>();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const tracker = ProgressTracker.getInstance();
    const session = tracker.startSession(userId, courseId);

    // Subscribe to progress updates
    const unsubscribe = tracker.subscribe({
      userId,
      courseId,
      callback: (update) => {
        setProgress(update.updates);
      },
    });

    // Track user activity
    let activityTimeout: NodeJS.Timeout;
    const updateActivity = () => {
      setIsActive(true);
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        setIsActive(false);
      }, 60000); // 1 minute of inactivity

      // Update session
      tracker.updateSession(session.sessionId, {
        timeSpent: (session.progress.timeSpent || 0) + 1,
        currentLesson: lessonId,
      });
    };

    // Set up activity listeners
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('scroll', updateActivity);

    // Initial activity update
    updateActivity();

    return () => {
      unsubscribe();
      tracker.endSession(session.sessionId);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      clearTimeout(activityTimeout);
    };
  }, [userId, courseId, lessonId]);

  // Track video progress if this is a video lesson
  const handleVideoProgress = (progress: VideoProgress) => {
    setVideoProgress(progress);
    const tracker = ProgressTracker.getInstance();

    // Track video progress event
    tracker.trackEvent({
      type: 'lesson_start',
      userId,
      courseId,
      lessonId,
      timestamp: new Date().toISOString(),
      data: {
        progress: (progress.currentTime / progress.duration) * 100,
        timeSpent: progress.currentTime,
      },
    });

    // If video is complete, track completion
    if (progress.status === 'ended') {
      tracker.trackEvent({
        type: 'lesson_complete',
        userId,
        courseId,
        lessonId,
        timestamp: new Date().toISOString(),
        data: {
          progress: 100,
          timeSpent: progress.duration,
        },
      });
    }
  };

  return (
    <div className="fixed bottom-0 right-0 p-4">
      {/* Progress Indicator */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-64">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900">Course Progress</h3>
          <span
            className={`inline-flex h-2 w-2 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        </div>

        {/* Overall Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Overall Progress</span>
            <span>{progress?.overallProgress || 0}%</span>
          </div>
          <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress?.overallProgress || 0}%` }}
            />
          </div>
        </div>

        {/* Video Progress (if applicable) */}
        {videoProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Video Progress</span>
              <span>
                {Math.round((videoProgress.currentTime / videoProgress.duration) * 100)}%
              </span>
            </div>
            <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(videoProgress.currentTime / videoProgress.duration) * 100}%`,
                }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
              <span>
                {Math.floor(videoProgress.currentTime / 60)}:
                {Math.floor(videoProgress.currentTime % 60)
                  .toString()
                  .padStart(2, '0')}
              </span>
              <span>
                {Math.floor(videoProgress.duration / 60)}:
                {Math.floor(videoProgress.duration % 60)
                  .toString()
                  .padStart(2, '0')}
              </span>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {progress?.lessonProgress && (
          <div className="text-sm text-gray-500">
            <p>
              Current Lesson:{' '}
              <span className="font-medium text-gray-900">
                {progress.lessonProgress.status}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-64">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={() => {/* Handle continue learning */}}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue Learning
          </button>
          <button
            onClick={() => {/* Handle take notes */}}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Take Notes
          </button>
        </div>
      </div>
    </div>
  );
}
