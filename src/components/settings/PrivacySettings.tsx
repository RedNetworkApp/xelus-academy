'use client';

import { useState } from 'react';
import { UserProfile } from '@/types/profile';

interface Props {
  privacy: UserProfile['preferences']['privacy'];
}

export default function PrivacySettings({ privacy }: Props) {
  const [settings, setSettings] = useState(privacy);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // API call to update privacy settings would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <PrivacyToggle
          id="showProfile"
          label="Public Profile"
          description="Allow other users to view your profile information."
          checked={settings.showProfile}
          onChange={(checked) =>
            setSettings({ ...settings, showProfile: checked })
          }
        />

        <PrivacyToggle
          id="showCourses"
          label="Course Enrollment Visibility"
          description="Show which courses you're enrolled in on your public profile."
          checked={settings.showCourses}
          onChange={(checked) =>
            setSettings({ ...settings, showCourses: checked })
          }
        />

        <PrivacyToggle
          id="showAchievements"
          label="Achievement Visibility"
          description="Display your badges and achievements on your public profile."
          checked={settings.showAchievements}
          onChange={(checked) =>
            setSettings({ ...settings, showAchievements: checked })
          }
        />
      </div>

      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Privacy Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Your privacy is important to us. These settings control what
                information is visible to other users on the platform. Your email
                address and payment information will always remain private.
              </p>
            </div>
          </div>
        </div>
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

interface PrivacyToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function PrivacyToggle({
  id,
  label,
  description,
  checked,
  onChange,
}: PrivacyToggleProps) {
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
