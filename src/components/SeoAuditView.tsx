import { useState } from 'react';
import {
  PharmacyProfile,
  SEOAuditResult,
  SEOIssue,
  PriorityLevel
} from '../types/pharmacy';
import { aiService } from '../services/aiService';
import {
  Search,
  Globe,
  FileText,
  UploadCloud,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Code,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  seoAudit: SEOAuditResult;
  onUpdateSeoAudit: (audit: SEOAuditResult) => void;
  onOpenQuickAction: (type: string, title: string, context: any) => void;
}

export function SeoAuditView({
  profile,
  seoAudit,
  onUpdateSeoAudit,
  onOpenQuickAction,
}: Props) {
  const [sourceType, setSourceType] = useState<'url' | 'text' | 'file'>('url');
  const [urlInput, setUrlInput] = useState(profile.website || '');
  const [textInput, setTextInput] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'local' | 'conversion'>('all');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent((event.target?.result as string) || '');
    };
    reader.readAsText(file);
  };

  const handleRunAudit = async () => {
    setLoading(true);
    let contentToAnalyze = '';
    if (sourceType === 'url') contentToAnalyze = urlInput;
    else if (sourceType === 'text') contentToAnalyze = textInput;
    else contentToAnalyze = fileContent;

    try {
      const result = await aiService.generateSeoAudit(sourceType, contentToAnalyze, profile);
      onUpdateSeoAudit(result);
    } catch (err) {
      console.error('Failed to run SEO audit:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (p: PriorityLevel) => {
    switch (p) {
      case 'QUICK WIN':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'HIGH PRIORITY':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'MEDIUM PRIORITY':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'LOW PRIORITY':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'LONGER-TERM OPPORTUNITY':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const renderIssueCard = (issue: SEOIssue) => (
    <div
      key={issue.id}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition-all space-y-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          {issue.issue}
        </h4>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
              issue.priority
            )}`}
          >
            {issue.priority}
          </span>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
            Effort: {issue.effort}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
        <div>
          <span className="font-semibold text-rose-900 block mb-0.5">WHY IT MATTERS</span>
          <p className="text-slate-600 leading-relaxed">{issue.whyItMatters}</p>
        </div>
        <div>
          <span className="font-semibold text-emerald-900 block mb-0.5">RECOMMENDATION</span>
          <p className="text-slate-700 leading-relaxed font-medium">{issue.recommendation}</p>
        </div>
      </div>

      {/* Example Fix Box */}
      {issue.exampleFix && (
        <div className="bg-slate-900 text-slate-100 rounded-xl p-3 text-xs font-mono border border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-sans mb-1 font-bold">
            <span className="flex items-center gap-1">
              <Code className="w-3 h-3 text-emerald-400" />
              EXAMPLE FIX
            </span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200 text-[11px]">
            {issue.exampleFix}
          </pre>
        </div>
      )}

      {/* Turn into Action Button */}
      {issue.quickActionLabel && (
        <div className="flex items-center justify-end pt-1">
          <button
            onClick={() =>
              onOpenQuickAction(
                issue.quickActionType || 'cta',
                issue.quickActionLabel || 'Generate Fix',
                {
                  issue: issue.issue,
                  recommendation: issue.recommendation,
                  exampleFix: issue.exampleFix,
                }
              )
            }
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>{issue.quickActionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header & Source Selection */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
                <Search className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Website, Local SEO & Conversion Audit
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Audit on-page SEO, local pharmacy map rankings, and online appointment booking conversion paths.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            GPhC & UK NHS Compliant
          </span>
        </div>

        {/* Honest Input Methods (Never pretend to crawl if not provided) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Provide Website Information to Inspect:
          </label>
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setSourceType('url')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                sourceType === 'url'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Enter Website URL</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceType('text')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                sourceType === 'text'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Website Text / HTML</span>
            </button>
            <button
              type="button"
              onClick={() => setSourceType('file')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                sourceType === 'file'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Content File</span>
            </button>
          </div>

          {sourceType === 'url' && (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.yourpharmacy.co.uk"
                className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-mono"
              />
              <button
                onClick={handleRunAudit}
                disabled={loading || !urlInput}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-emerald-200" />}
                <span>Audit Website</span>
              </button>
            </div>
          )}

          {sourceType === 'text' && (
            <div className="space-y-2">
              <textarea
                rows={4}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste the text from your homepage, service page, or HTML meta tags here..."
                className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <button
                onClick={handleRunAudit}
                disabled={loading || !textInput}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-emerald-200" />}
                <span>Audit Pasted Copy</span>
              </button>
            </div>
          )}

          {sourceType === 'file' && (
            <div className="space-y-2">
              <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-emerald-50/40">
                <UploadCloud className="w-8 h-8 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-700">
                  {fileName ? `Loaded: ${fileName}` : 'Click to select .txt, .html, or .json website export'}
                </span>
                <input
                  type="file"
                  accept=".txt,.html,.json,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {fileContent && (
                <button
                  onClick={handleRunAudit}
                  disabled={loading}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-emerald-200" />}
                  <span>Audit Uploaded Content</span>
                </button>
              )}
            </div>
          )}

          <p className="text-[11px] text-slate-500 mt-2">
            <strong>Transparency Notice:</strong> We do not fabricate crawler logs. If raw HTML is unavailable, our engine analyzes known page structure principles for {profile.name}'s service portfolio.
          </p>
        </div>
      </div>

      {/* Audit Summary Card */}
      {seoAudit.auditSummary && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-sm border border-slate-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-emerald-400 block mb-1 uppercase tracking-wider text-[11px]">
              Audit Executive Summary ({seoAudit.sourceIdentifier})
            </span>
            <p className="text-slate-200">{seoAudit.auditSummary}</p>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Issues ({seoAudit.technicalIssues.length + seoAudit.localSeoIssues.length + seoAudit.conversionIssues.length})
        </button>
        <button
          onClick={() => setActiveCategory('technical')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === 'technical'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Technical & On-Page ({seoAudit.technicalIssues.length})
        </button>
        <button
          onClick={() => setActiveCategory('local')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === 'local'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Local SEO & Google Maps ({seoAudit.localSeoIssues.length})
        </button>
        <button
          onClick={() => setActiveCategory('conversion')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === 'conversion'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Conversion & Booking Journey ({seoAudit.conversionIssues.length})
        </button>
      </div>

      {/* Issues Display */}
      <div className="space-y-4">
        {(activeCategory === 'all' || activeCategory === 'technical') && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Technical / On-Page SEO Findings
            </h3>
            {seoAudit.technicalIssues.map(renderIssueCard)}
          </div>
        )}

        {(activeCategory === 'all' || activeCategory === 'local') && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Local SEO & UK Catchment Rankings
            </h3>
            {seoAudit.localSeoIssues.map(renderIssueCard)}
          </div>
        )}

        {(activeCategory === 'all' || activeCategory === 'conversion') && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Conversion & Appointment Booking Journey
            </h3>
            {seoAudit.conversionIssues.map(renderIssueCard)}
          </div>
        )}
      </div>
    </div>
  );
}
