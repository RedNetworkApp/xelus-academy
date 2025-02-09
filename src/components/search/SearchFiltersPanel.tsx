'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchFacets, SearchFilters, FacetItem } from '@/types/search';

interface Props {
  facets: SearchFacets;
  activeFilters: SearchFilters;
}

export default function SearchFiltersPanel({ facets, activeFilters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    categories: true,
    levels: true,
    price: true,
    duration: false,
    language: false,
    instructors: false,
    tags: false,
  });

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = params.get(key);

    if (currentValue === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filters change
    params.delete('page');

    router.push(`/courses/search?${params.toString()}`);
  };

  const toggleSection = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderFacetSection = (
    title: string,
    items: FacetItem[],
    paramKey: string,
    activeValue?: string[]
  ) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => toggleSection(paramKey)}
        className="flex justify-between items-center w-full"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <span className="ml-6 h-7 flex items-center">
          <svg
            className={`rotate-0 h-5 w-5 transform ${
              expanded[paramKey] ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </span>
      </button>

      {expanded[paramKey] && (
        <div className="pt-4 space-y-2">
          {items.map((item) => (
            <div key={item.value} className="flex items-center">
              <input
                type="checkbox"
                id={`${paramKey}-${item.value}`}
                checked={activeValue?.includes(item.value)}
                onChange={() => updateFilters(paramKey, item.value)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`${paramKey}-${item.value}`}
                className="ml-3 text-sm text-gray-600"
              >
                {item.label}
                <span className="ml-1 text-gray-400">({item.count})</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <button
          onClick={() => router.push('/courses/search')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {renderFacetSection(
        'Categories',
        facets.categories,
        'category',
        activeFilters.categories
      )}

      {renderFacetSection(
        'Level',
        facets.levels,
        'level',
        activeFilters.levels
      )}

      {renderFacetSection(
        'Price',
        facets.priceRanges,
        'price',
        activeFilters.priceRange
          ? [`${activeFilters.priceRange.min}-${activeFilters.priceRange.max}`]
          : undefined
      )}

      {renderFacetSection(
        'Duration',
        facets.durations,
        'duration',
        activeFilters.duration
      )}

      {renderFacetSection(
        'Language',
        facets.languages,
        'language',
        activeFilters.language
      )}

      {renderFacetSection(
        'Instructors',
        facets.instructors,
        'instructor',
        activeFilters.instructors
      )}

      {renderFacetSection(
        'Topics',
        facets.tags,
        'tag',
        activeFilters.tags
      )}
    </div>
  );
}
