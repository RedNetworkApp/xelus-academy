'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchSuggestion } from '@/types/search';
import { useDebounce } from '@/hooks/useDebounce';

interface Props {
  initialQuery: string;
}

export default function SearchBar({ initialQuery }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // This would be an API call in a real app
        const mockSuggestions: SearchSuggestion[] = [
          {
            type: 'course',
            id: '1',
            title: 'Web Development Fundamentals',
            subtitle: 'Learn the basics of web development',
            thumbnail: '/images/courses/web-dev.jpg',
            url: '/courses/web-development-fundamentals',
          },
          {
            type: 'category',
            id: 'dev',
            title: 'Development',
            subtitle: '500+ courses',
            url: '/courses/category/development',
          },
          {
            type: 'instructor',
            id: '1',
            title: 'John Doe',
            subtitle: '15 courses',
            thumbnail: '/images/avatars/john.jpg',
            url: '/instructors/john-doe',
          },
          {
            type: 'tag',
            id: 'web',
            title: 'Web Development',
            subtitle: '200+ courses',
            url: '/courses/tag/web-development',
          },
        ];

        setSuggestions(mockSuggestions);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    router.push(suggestion.url);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for courses, topics, or instructors..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (query.trim() || isLoading) && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((suggestion) => (
                <li key={`${suggestion.type}-${suggestion.id}`}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                  >
                    {suggestion.thumbnail && (
                      <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden">
                        <img
                          src={suggestion.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <div className="font-medium">{suggestion.title}</div>
                      {suggestion.subtitle && (
                        <div className="text-sm text-gray-500">
                          {suggestion.subtitle}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {suggestion.type}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            query.trim() && (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
