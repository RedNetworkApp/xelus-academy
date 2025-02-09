'use client';

import { FaSearch } from 'react-icons/fa';

interface CourseFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedLevels: string[];
  setSelectedLevels: (levels: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const categories = [
  { id: 'development', name: 'Development', count: 2 },
  { id: 'agriculture', name: 'Agriculture', count: 0 },
  { id: 'mobile-repair', name: 'Mobile Repair', count: 0 },
  { id: 'business', name: 'Business', count: 0 },
  { id: 'digital-media', name: 'Digital Media', count: 0 },
  { id: 'design', name: 'Design', count: 0 }
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default function CourseFilters({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  selectedLevels,
  setSelectedLevels,
  priceRange,
  setPriceRange
}: CourseFiltersProps) {
  return (
    <div className="lg:w-1/4 space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category.id]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                  }
                }}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{category.name}</span>
              <span className="ml-auto text-gray-500 text-sm">{category.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Level</h3>
        <div className="space-y-2">
          {levels.map(level => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedLevels.includes(level)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedLevels([...selectedLevels, level]);
                  } else {
                    setSelectedLevels(selectedLevels.filter(l => l !== level));
                  }
                }}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <input
          type="range"
          min="0"
          max="200"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between mt-2 text-gray-600">
          <span>Free</span>
          <span>${priceRange[1]}+</span>
        </div>
      </div>
    </div>
  );
}
