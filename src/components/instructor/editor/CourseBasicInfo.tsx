'use client';

import { useState } from 'react';
import { CourseFormData } from '@/types/courseEditor';
import Image from 'next/image';

interface Props {
  data: CourseFormData;
  onChange: (data: Partial<CourseFormData>) => void;
  onNext: () => void;
}

export default function CourseBasicInfo({ data, onChange, onNext }: Props) {
  const [objectives, setObjectives] = useState<string[]>(data.objectives);
  const [newObjective, setNewObjective] = useState('');

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      const updatedObjectives = [...objectives, newObjective.trim()];
      setObjectives(updatedObjectives);
      onChange({ objectives: updatedObjectives });
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index: number) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(updatedObjectives);
    onChange({ objectives: updatedObjectives });
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this to your storage service
      const imageUrl = URL.createObjectURL(file);
      onChange({ thumbnail: imageUrl });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Course Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Course Title
        </label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Web Development Fundamentals"
        />
      </div>

      {/* Course Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Course Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe what students will learn in this course..."
        />
      </div>

      {/* Category and Level */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={data.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="development">Development</option>
            <option value="business">Business</option>
            <option value="farming">Farming</option>
            <option value="mobile-repair">Mobile Repair</option>
          </select>
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Level
          </label>
          <select
            id="level"
            value={data.level}
            onChange={(e) => {
              // Ensure value is one of the allowed enum values
              const value = e.target.value;
              const validValue = 
                value === 'Beginner' || value === 'Intermediate' || value === 'Advanced'
                ? value as 'Beginner' | 'Intermediate' | 'Advanced'
                : 'Beginner';
              onChange({ level: validValue });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Duration and Price */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            value={data.duration}
            onChange={(e) => onChange({ duration: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., 6 weeks"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            value={data.price}
            onChange={(e) => onChange({ price: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="49.99"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Course Objectives */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Objectives
        </label>
        <div className="mt-2 space-y-2">
          {objectives.map((objective, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="flex-1 text-sm">{objective}</span>
              <button
                onClick={() => handleRemoveObjective(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add a learning objective..."
          />
          <button
            onClick={handleAddObjective}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Course Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Thumbnail
        </label>
        <div className="mt-2 flex items-center space-x-4">
          {data.thumbnail && (
            <div className="relative w-32 h-24">
              <Image
                src={data.thumbnail}
                alt="Course thumbnail"
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Add Course Content
        </button>
      </div>
    </div>
  );
}
