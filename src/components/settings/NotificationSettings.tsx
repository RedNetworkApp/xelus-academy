'use client';

import { useState } from 'react';
import { UserProfile } from '@/types/profile';

interface Props {
  notifications: UserProfile['preferences']['emailNotifications'];
}

export default function NotificationSettings({ notifications }: Props) {
  const [settings, setSettings] = useState(notifications);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // API call to update notification settings would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <NotificationToggle
          id="courseUpdates"
          label="Course Updates"
          description="Get notified when your enrolled courses have new content or announcements."
          checked={settings.courseUpdates}
          onChange={(checked) =>
            setSettings({ ...settings, courseUpdates: checked })
          }
        />

        <NotificationToggle
          id="newCourses"
          label="New Courses"
          description="Receive updates about new courses in your areas of interest."
          checked={settings.newCourses}
          onChange={(checked) =>
            setSettings({ ...settings, newCourses: checked })
          }
        />

        <NotificationToggle
          id="promotions"
          label="Promotions"
          description="Stay informed about special offers and discounts."
          checked={settings.promotions}
          onChange={(checked) =>
            setSettings({ ...settings, promotions: checked })
          }
        />

        <NotificationToggle
          id="achievements"
          label="Achievements"
          description="Get notified when you earn new badges or complete courses."
          checked={settings.achievements}
          onChange={(checked) =>
            setSettings({ ...settings, achievements: checked })
          }
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md ${
            isSaving
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

interface NotificationToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function NotificationToggle({
  id,
  label,
  description,
  checked,
  onChange,
}: NotificationToggleProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex items-center h-6">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
