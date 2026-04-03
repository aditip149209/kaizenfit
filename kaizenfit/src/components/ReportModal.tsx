import React, { useState } from 'react';

export interface ReportData {
  reportType: string;
  includeMetrics: boolean;
  includeNutrition: boolean;
  includeWorkouts: boolean;
}

export interface ReportPreviewData {
  journalId: string;
  reportType: string;
  reportText: string;
  payload: any;
}

export interface JournalHistoryItem {
  id: string;
  title: string;
  createdAt: string;
  request: {
    reportType: string;
    includeMetrics: boolean;
    includeNutrition: boolean;
    includeWorkouts: boolean;
  };
  reports: Array<{
    id: string;
    reportType: string;
    content: string;
    createdAt: string;
  }>;
}

export interface SavedReportDetail {
  id: string;
  reportType: string;
  reportText: string;
  createdAt: string;
  journalTitle?: string;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: ReportData) => Promise<ReportPreviewData>;
  onSave: (preview: ReportPreviewData) => Promise<void>;
  onLoadHistory: () => Promise<JournalHistoryItem[]>;
  onOpenSavedReport: (reportId: string) => Promise<SavedReportDetail>;
}

export default function ReportModal({ isOpen, onClose, onGenerate, onSave, onLoadHistory, onOpenSavedReport }: ReportModalProps) {
  const [reportType, setReportType] = useState('weekly');
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [includeNutrition, setIncludeNutrition] = useState(true);
  const [includeWorkouts, setIncludeWorkouts] = useState(true);
  const [mode, setMode] = useState<'configure' | 'preview' | 'history' | 'historyReport'>('configure');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingSavedReport, setIsLoadingSavedReport] = useState(false);
  const [preview, setPreview] = useState<ReportPreviewData | null>(null);
  const [selectedSavedReport, setSelectedSavedReport] = useState<SavedReportDetail | null>(null);
  const [history, setHistory] = useState<JournalHistoryItem[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!includeMetrics && !includeNutrition && !includeWorkouts) {
      setLocalError('Select at least one section to include.');
      return;
    }

    setLocalError(null);
    setIsGenerating(true);

    try {
      const generated = await onGenerate({
        reportType,
        includeMetrics,
        includeNutrition,
        includeWorkouts,
      });

      setPreview(generated);
      setMode('preview');
    } catch (error) {
      setLocalError('Failed to generate report preview.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!preview) {
      return;
    }

    setIsSaving(true);
    setLocalError(null);

    try {
      await onSave(preview);
    } catch (error) {
      setLocalError('Failed to save report.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadHistory = async () => {
    setIsLoadingHistory(true);
    setLocalError(null);

    try {
      const rows = await onLoadHistory();
      setHistory(rows);
      setMode('history');
    } catch (error) {
      setLocalError('Failed to load journal history.');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleOpenSavedReport = async (reportId: string) => {
    setIsLoadingSavedReport(true);
    setLocalError(null);

    try {
      const report = await onOpenSavedReport(reportId);
      setSelectedSavedReport(report);
      setMode('historyReport');
    } catch (error) {
      setLocalError('Failed to load saved report.');
    } finally {
      setIsLoadingSavedReport(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
          <div className="w-10" aria-hidden="true"></div>
          <h2 className="font-heading text-xl uppercase text-center">GENERATE REPORT</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-red-500 font-bold text-xl transition-colors"
            aria-label="Close report modal"
          >
            ✕
          </button>
        </div>

        {mode === 'configure' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              </select>
            </div>

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

            <div className="bg-kaizen-lightgreen/30 border-2 border-kaizen-green p-3">
              <p className="font-mono text-xs text-gray-700">
                Request is saved first. Generated report is previewed, then you can save it to history.
              </p>
            </div>

            {localError && (
              <div className="border-2 border-black bg-red-100 text-red-700 font-mono text-xs p-2 uppercase">
                {localError}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleLoadHistory}
                disabled={isLoadingHistory}
                className="flex-1 bg-white border-2 border-black py-2 px-4 font-heading uppercase hover:bg-gray-100 transition-colors disabled:opacity-60"
              >
                {isLoadingHistory ? 'LOADING...' : 'VIEW JOURNALS'}
              </button>
              <button
                type="submit"
                disabled={isGenerating}
                className="flex-1 bg-kaizen-green text-black border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint transition-colors disabled:opacity-60"
              >
                {isGenerating ? 'GENERATING...' : 'GENERATE'}
              </button>
            </div>
          </form>
        )}

        {mode === 'preview' && preview && (
          <div className="p-6 space-y-4">
            <div className="bg-kaizen-lightgreen/30 border-2 border-kaizen-green p-3">
              <p className="font-heading text-sm uppercase">Report Preview</p>
              <p className="font-mono text-xs text-gray-700 mt-1">Review output, then save to history only if you want to persist it.</p>
            </div>

            <textarea
              readOnly
              value={preview.reportText}
              className="w-full h-72 border-2 border-black p-3 font-mono text-xs resize-none"
            />

            {localError && (
              <div className="border-2 border-black bg-red-100 text-red-700 font-mono text-xs p-2 uppercase">
                {localError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMode('configure')}
                className="flex-1 bg-white border-2 border-black py-2 px-4 font-heading uppercase hover:bg-gray-100"
              >
                BACK
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-kaizen-green border-2 border-black py-2 px-4 font-heading uppercase hover:bg-kaizen-mint disabled:opacity-60"
              >
                {isSaving ? 'SAVING...' : 'SAVE REPORT'}
              </button>
            </div>
          </div>
        )}

        {mode === 'history' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-heading uppercase text-sm">Previous Journals</p>
              <button
                type="button"
                onClick={() => setMode('configure')}
                className="border-2 border-black px-3 py-1 font-heading uppercase text-xs hover:bg-gray-100"
              >
                Back
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {history.map((item) => (
                <div key={item.id} className="border-2 border-black p-3 bg-white">
                  <p className="font-heading uppercase text-xs">{item.title}</p>
                  <p className="font-mono text-[11px] text-gray-600 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                  <p className="font-mono text-[11px] mt-2 uppercase">
                    {item.request.reportType} | M:{item.request.includeMetrics ? 'Y' : 'N'} N:{item.request.includeNutrition ? 'Y' : 'N'} W:{item.request.includeWorkouts ? 'Y' : 'N'}
                  </p>
                  <p className="font-mono text-[11px] mt-1">Saved reports: {item.reports.length}</p>

                  {item.reports.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {item.reports.map((report) => (
                        <button
                          key={report.id}
                          type="button"
                          onClick={() => handleOpenSavedReport(report.id)}
                          className="w-full text-left border-2 border-black bg-kaizen-lightgreen/40 px-2 py-2 font-mono text-[11px] uppercase hover:bg-kaizen-lightgreen"
                        >
                          Open saved {report.reportType} report ({new Date(report.createdAt).toLocaleDateString()})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {history.length === 0 && (
                <p className="font-mono text-xs text-gray-600 uppercase">No journal history yet.</p>
              )}
            </div>

            {isLoadingSavedReport && (
              <p className="font-mono text-xs uppercase text-gray-600">Loading report...</p>
            )}
          </div>
        )}

        {mode === 'historyReport' && selectedSavedReport && (
          <div className="p-6 space-y-4">
            <div className="bg-kaizen-lightgreen/30 border-2 border-kaizen-green p-3">
              <p className="font-heading text-sm uppercase">
                Saved {selectedSavedReport.reportType} Report
              </p>
              <p className="font-mono text-xs text-gray-700 mt-1">
                {selectedSavedReport.journalTitle ?? 'Report'} • {new Date(selectedSavedReport.createdAt).toLocaleString()}
              </p>
            </div>

            <textarea
              readOnly
              value={selectedSavedReport.reportText}
              className="w-full h-72 border-2 border-black p-3 font-mono text-xs resize-none"
            />

            <button
              type="button"
              onClick={() => setMode('history')}
              className="w-full bg-white border-2 border-black py-2 px-4 font-heading uppercase hover:bg-gray-100"
            >
              Back To Journal List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
