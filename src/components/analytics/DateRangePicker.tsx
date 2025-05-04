'use client';

import { useState } from 'react';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange?: (range: DateRange) => void;
  initialRange?: DateRange;
}

type PresetRange = {
  label: string;
  days: number | 'ytd';
};

const PRESET_RANGES: PresetRange[] = [
  { label: 'Last 7 Days', days: 7 },
  { label: 'Last 30 Days', days: 30 },
  { label: 'Last 90 Days', days: 90 },
  { label: 'Year to Date', days: 'ytd' },
  { label: 'Last 12 Months', days: 365 },
];

export default function DateRangePicker({ startDate, endDate, onChange, initialRange }: DateRangePickerProps) {
  const [start, setStart] = useState<Date>(initialRange?.startDate || new Date(startDate));
  const [end, setEnd] = useState<Date>(initialRange?.endDate || new Date(endDate));

  const handlePresetClick = (days: number | 'ytd') => {
    const endDate = new Date();
    let startDate = new Date();

    if (days === 'ytd') {
      startDate = new Date(endDate.getFullYear(), 0, 1); // January 1st of current year
    } else {
      startDate.setDate(endDate.getDate() - days);
    }

    setStart(startDate);
    setEnd(endDate);
    onChange?.({ startDate, endDate });
  };

  const handleDateChange = (date: Date, isStart: boolean) => {
    if (isStart) {
      setStart(date);
      onChange?.({ startDate: date, endDate: end });
    } else {
      setEnd(date);
      onChange?.({ startDate: start, endDate: date });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Start Date</label>
          <input
            type="date"
            className="border rounded-md p-2"
            value={start.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value), true)}
            max={end.toISOString().split('T')[0]}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">End Date</label>
          <input
            type="date"
            className="border rounded-md p-2"
            value={end.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value), false)}
            min={start.toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESET_RANGES.map((range) => (
          <button
            key={range.label}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
            onClick={() => handlePresetClick(range.days)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}
