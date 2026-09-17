import { useState } from 'react';
import { PharmacyProfile, ContentDraft } from '../types/pharmacy';
import { aiService } from '../services/aiService';
import {
  PenTool,
  Sparkles,
  Copy,
  Check,
  ShieldAlert,
  Loader2,
  Image as ImageIcon,
  Hash,
  Send,
  RefreshCw,
  FileCheck
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
}

export function ContentStudioView({ profile }: Props) {
  const [platform, setPlatform] = useState('Instagram');
  const [contentType, setContentType] = useState('Educational');
  const [topic, setTopic] = useState(profile.services[0] || 'NHS Pharmacy First');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState<ContentDraft | null>(null);

  const platforms = [
    'Instagram',
    'Facebook',
    'LinkedIn',
    'Blog',
    'Website',
    'Email',
    'Google Business Profile',
  ];

  const contentTypes = [
    'Educational',
    'Promotional',
    'FAQ',
    'Local community',
    'Service awareness',
    'Seasonal',
    'Behind the scenes',
    'Staff introduction',
    'General health awareness',
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await aiService.generateContentDraft(profile, platform, contentType, topic);
      setDraft(result);
    } catch (err) {
      console.error('Failed to generate content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!draft) return;
    const fullText = `${draft.headline}\n\n${draft.hook}\n\n${draft.mainCopy}\n\n${draft.cta}\n\nVisual Idea: ${draft.suggestedVisual}\n\n${draft.hashtags.join(' ')}\n\n[${draft.safetyDisclaimer}]`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-rose-100 text-rose-800 rounded-lg">
                <PenTool className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Pharmacy Content Studio
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Draft compliant marketing and educational copy tailored for UK community pharmacy audiences.
            </p>
          </div>
          <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
            Mandatory Clinical Disclaimer Pre-configured
          </span>
        </div>

        {/* Studio Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Platform */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Platform:
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium"
            >
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Content Archetype:
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium"
            >
              {contentTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>

          {/* Topic or Service */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Service or Topic Focus:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Travel Vaccinations, Pharmacy First, Flu Jab"
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            Generating for: <strong className="text-slate-800">{profile.name}</strong> ({profile.location.split(',')[0]})
          </span>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Draft...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Create Marketing Content</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Draft Result View */}
      {draft && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-md">
                {draft.platform}
              </span>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
                {draft.contentType}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete Post</span>
                </>
              )}
            </button>
          </div>

          {/* Headline & Hook */}
          <div className="space-y-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                HEADLINE
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {draft.headline}
              </h3>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                OPENING HOOK (To stop the scroll)
              </span>
              "{draft.hook}"
            </div>
          </div>

          {/* Main Body Copy */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              MAIN POST COPY
            </span>
            <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {draft.mainCopy}
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
              CALL TO ACTION (CTA)
            </span>
            <strong className="text-emerald-900 font-semibold">{draft.cta}</strong>
          </div>

          {/* Suggested Visual & Hashtags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                Suggested Visual Asset:
              </span>
              <p className="text-slate-600 leading-relaxed">{draft.suggestedVisual}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-slate-500" />
                Recommended Hashtags:
              </span>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {draft.hashtags.map((tag, i) => (
                  <span key={i} className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-mono text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mandatory GPhC Safety Label per Section 6 */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-xs text-amber-900 flex items-start gap-2 rounded-r-xl">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Mandatory Compliance Review Required:</strong>
              <span>
                "{draft.safetyDisclaimer || 'AI-generated draft. Review for accuracy, regulatory requirements and pharmacy-specific policies before publishing.'}"
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
