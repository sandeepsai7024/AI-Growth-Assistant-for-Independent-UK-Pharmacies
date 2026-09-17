import { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, ArrowRight, FileText, Loader2 } from 'lucide-react';
import { PharmacyProfile } from '../types/pharmacy';
import { aiService } from '../services/aiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  actionType: string;
  actionTitle: string;
  contextData: any;
  profile: PharmacyProfile;
}

export function QuickActionModal({
  isOpen,
  onClose,
  actionType,
  actionTitle,
  contextData,
  profile,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{ title: string; output: string; instructions: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && actionType) {
      handleGenerate();
    } else {
      setResult(null);
      setError(null);
    }
  }, [isOpen, actionType]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiService.executeQuickAction(actionType, contextData, profile);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate solution');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.output) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/15 rounded-lg">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-emerald-200 block">
                Turn Recommendation Into Action
              </span>
              <h3 className="font-semibold text-lg leading-tight">
                {actionTitle || 'AI Action Generator'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <p className="text-sm font-medium">Generating bespoke asset for {profile.name}...</p>
              <p className="text-xs text-slate-400">Tailoring wording to UK pharmacy regulations and local catchment</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
              <p className="font-semibold mb-1">Could not generate action asset</p>
              <p>{error}</p>
              <button
                onClick={handleGenerate}
                className="mt-3 px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-medium hover:bg-rose-700"
              >
                Retry Generation
              </button>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Generated Solution
                </span>
                <h4 className="text-base font-semibold text-slate-900 mt-0.5">
                  {result.title}
                </h4>
              </div>

              <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 text-sm font-mono whitespace-pre-wrap leading-relaxed shadow-inner border border-slate-800 max-h-72 overflow-y-auto">
                {result.output}
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-sans">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-sans">Copy Asset</span>
                    </>
                  )}
                </button>
              </div>

              {result.instructions && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs sm:text-sm text-emerald-900">
                  <div className="font-semibold flex items-center gap-1.5 text-emerald-800 mb-1">
                    <ArrowRight className="w-4 h-4" />
                    How to Implement in Your Pharmacy:
                  </div>
                  <p className="text-emerald-800/90 leading-normal">{result.instructions}</p>
                </div>
              )}

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  Always review marketing and operational content against your pharmacy's specific SOPs and GPhC advertising guidelines prior to live deployment.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium underline"
          >
            Regenerate Alternative Draft
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
            {result && (
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-xs sm:text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied to Clipboard' : 'Copy Solution'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
