import { useState, useMemo } from 'react';
import { AnalyticsRow, AnalyticsSummary, PharmacyProfile } from '../types/pharmacy';
import { parseCSV, computeAnalyticsSummary } from '../services/csvParser';
import { DEMO_CSV_STRING } from '../data/demoData';
import {
  BarChart3,
  UploadCloud,
  FileSpreadsheet,
  TrendingUp,
  Users,
  Target,
  PoundSterling,
  AlertCircle,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Calendar,
  RotateCcw,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  initialRows: AnalyticsRow[];
  isDemo: boolean;
}

export function AnalyticsView({ profile, initialRows, isDemo }: Props) {
  const [rows, setRows] = useState<AnalyticsRow[]>(initialRows);
  const [csvInput, setCsvInput] = useState('');
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | '7days' | '14days'>('all');

  // Filter rows based on date selection
  const filteredRows = useMemo(() => {
    if (selectedDateRange === 'all') return rows;
    const count = selectedDateRange === '7days' ? 7 : 14;
    return rows.slice(-count);
  }, [rows, selectedDateRange]);

  const summary = useMemo(() => {
    return computeAnalyticsSummary(filteredRows);
  }, [filteredRows]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      const parsed = parseCSV(text);
      if (parsed.length > 0) {
        setRows(parsed);
      }
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = () => {
    if (!csvInput.trim()) return;
    const parsed = parseCSV(csvInput);
    if (parsed.length > 0) {
      setRows(parsed);
      setShowPasteModal(false);
      setCsvInput('');
    }
  };

  const handleLoadDemoCSV = () => {
    const parsed = parseCSV(DEMO_CSV_STRING);
    setRows(parsed);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-indigo-100 text-indigo-800 rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Analytics Intelligence & Conversion Dashboard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Upload website, Google Analytics, or booking CSV data. Evaluates user sessions, traffic channels, drop-offs, and revenue without assuming causation.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <label className="px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors">
            <UploadCloud className="w-4 h-4" />
            <span>Upload CSV</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowPasteModal(true)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Paste CSV</span>
          </button>

          <button
            onClick={handleLoadDemoCSV}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Load GreenCare Pharmacy Birmingham synthetic dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Demo Data</span>
          </button>
        </div>
      </div>

      {/* Demo Notice */}
      {isDemo && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>
              <strong>SYNTHETIC DATASET ACTIVE:</strong> Displaying simulated analytics for GreenCare Pharmacy (August 2026).
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold bg-amber-200 px-2 py-0.5 rounded">
            DEMO DATA - NOT REAL BUSINESS DATA
          </span>
        </div>
      )}

      {/* Date Range Selector */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Date Range Filter:</span>
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              onClick={() => setSelectedDateRange('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedDateRange === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Recorded ({rows.length} rows)
            </button>
            <button
              onClick={() => setSelectedDateRange('14days')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedDateRange === '14days' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 14 Days
            </button>
            <button
              onClick={() => setSelectedDateRange('7days')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedDateRange === '7days' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 7 Days
            </button>
          </div>
        </div>
        <span className="text-slate-400 font-mono">
          Showing {filteredRows.length} data points
        </span>
      </div>

      {/* Section 9: Visual KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Sessions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Sessions</span>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {summary.totalSessions.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {summary.totalNewUsers.toLocaleString()} new visitors
          </span>
        </div>

        {/* Unique Users */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Unique Users</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {summary.totalUsers.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Local searchers & patients
          </span>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Conversion Rate</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            {summary.avgConversionRate.toFixed(1)}%
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block font-medium">
            {summary.totalConversions} appointments booked
          </span>
        </div>

        {/* Inquiries / Leads */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Direct Inquiries</span>
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {summary.totalLeads.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Calls & clinic contact forms
          </span>
        </div>

        {/* Tracked Revenue */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Private Revenue</span>
            <PoundSterling className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            £{summary.totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Travel clinic & private fees
          </span>
        </div>
      </div>

      {/* Traffic Sources & Top Pages Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources Breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Traffic Source Acquisition</h3>
              <p className="text-xs text-slate-500">Breakdown of channels sending patients to your pharmacy site.</p>
            </div>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {Object.entries(summary.trafficSourceBreakdown).map(([source, data]) => {
              const pct = summary.totalSessions > 0 ? (data.sessions / summary.totalSessions) * 100 : 0;
              const convRate = data.sessions > 0 ? (data.conversions / data.sessions) * 100 : 0;
              return (
                <div key={source} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{source}</span>
                    <span className="text-slate-500 font-mono">
                      {data.sessions} sessions ({pct.toFixed(0)}%) • <strong className="text-emerald-700">{convRate.toFixed(1)}% conv</strong>
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Landing Pages Performance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900">Top Service Landing Pages</h3>
            <p className="text-xs text-slate-500">Volume and appointment conversion efficiency by page.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                  <th className="pb-2">Page URL</th>
                  <th className="pb-2 text-right">Sessions</th>
                  <th className="pb-2 text-right">Bookings</th>
                  <th className="pb-2 text-right">Conv. Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.topLandingPages.map((page, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-slate-800 font-medium truncate max-w-[160px]">
                      {page.page}
                    </td>
                    <td className="py-2.5 text-right text-slate-600 font-mono">{page.sessions}</td>
                    <td className="py-2.5 text-right text-slate-900 font-bold font-mono">{page.conversions}</td>
                    <td className="py-2.5 text-right font-mono font-bold text-emerald-700">
                      {page.conversionRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 8: Automated Plain English Analytics Insights */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Analytics Intelligence: Plain English Findings
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Rigorous observations without claiming false causation. Formatted as Observation, Possible Explanation, and Recommended Test.
            </p>
          </div>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-semibold">
            {summary.insights.length} Insights Identified
          </span>
        </div>

        <div className="space-y-4">
          {summary.insights.map((insight, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-indigo-300 transition-all space-y-2.5 text-xs"
            >
              <div>
                <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block mb-0.5">
                  1. OBSERVATION
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">{insight.observation}</p>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-0.5">
                  2. POSSIBLE EXPLANATION (Not guaranteed causation)
                </span>
                <p className="text-slate-600 leading-relaxed">{insight.possibleExplanation}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
                <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px] block mb-0.5">
                  3. RECOMMENDED TEST / ACTION
                </span>
                <p className="leading-relaxed font-medium">{insight.recommendedTest}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 9: AI Executive Summary */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-sm border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Executive Analytics Summary</h3>
            <span className="text-xs text-slate-400">
              For Pharmacy Owner & Superintendent Pharmacist Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* What happened? */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              What Happened?
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {summary.executiveSummary.whatHappened.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why might it matter? */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Why Might It Matter?
            </span>
            <p className="text-slate-300 leading-relaxed">
              {summary.executiveSummary.whyItMatters}
            </p>
          </div>

          {/* What to investigate? */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              What Should We Investigate?
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {summary.executiveSummary.whatToInvestigate.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What should we do next? */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              What Should We Do Next?
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {summary.executiveSummary.whatToDoNext.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Paste CSV Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Paste Raw CSV Data</h3>
            <p className="text-xs text-slate-500">
              Paste standard Google Analytics or spreadsheet exports with headers: Date, Sessions, Users, Traffic Source, Landing Page, Conversions, Leads, Revenue.
            </p>
            <textarea
              rows={8}
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Date,Sessions,Users,Traffic Source,Landing Page,Conversions,Leads,Revenue&#10;2026-08-01,84,76,Organic Search,/travel-health,4,3,240..."
              className="w-full p-3 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handlePasteSubmit}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
              >
                Parse & Load Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
