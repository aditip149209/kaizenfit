import React, { useState } from 'react';

export interface ReportData {
  reportType: string;
  dateRange: string;
  includeMetrics: boolean;
  includeNutrition: boolean;
  includeWorkouts: boolean;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ReportData) => void;
}

export default function ReportModal({ isOpen, onClose, onConfirm }: ReportModalProps) {
  const [reportType, setReportType] = useState('weekly');
  const [dateRange, setDateRange] = useState('last-7-days');
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [includeNutrition, setIncludeNutrition] = useState(true);
  const [includeWorkouts, setIncludeWorkouts] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      reportType,
      dateRange,
      includeMetrics,
      includeNutrition,
      includeWorkouts,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 border-b-4 border-black">
          <h2 className="font-heading text-xl uppercase text-center">GENERATE REPORT</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Report Type */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono"
              required
            >
              <option value="daily">Daily Summary</option>
              <option value="weekly">Weekly Overview</option>
              <option value="monthly">Monthly Progress</option>
              <option value="custom">Custom Analysis</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block font-heading uppercase text-sm mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono"
              required
            >
              <option value="today">Today</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="this-month">This Month</option>
              <option value="all-time">All Time</option>
            </select>
          </div>

          {/* Include Options */}
          <div className="space-y-3">
            <label className="block font-heading uppercase text-sm mb-2">
              Include in Report
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMetrics}
                onChange={(e) => setIncludeMetrics(e.target.checked)}
                className="w-5 h-5 border-2 border-black accent-kaizen-green"
              />
              <span className="font-mono text-sm">Body Metrics & Weight</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNutrition}
                onChange={(e) => setIncludeNutrition(e.target.checked)}
                className="w-5 h-5 border-2 border-black accent-kaizen-green"
              />
              <span className="font-mono text-sm">Nutrition & Macros</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeWorkouts}
                onChange={(e) => setIncludeWorkouts(e.target.checked)}
                className="w-5 h-5 border-2 border-black accent-kaizen-green"
              />
              <span className="font-mono text-sm">Workouts & Exercises</span>
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-kaizen-lightgreen/30 border-2 border-kaizen-green p-3">
            <p className="font-mono text-xs text-gray-700">
              Your report will include AI-powered insights based on your selected data and timeframe.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border-2 border-black py-2 px-4 font-heading uppercase hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 bg-kaizen-green text-black border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint transition-colors"
            >
              GENERATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
