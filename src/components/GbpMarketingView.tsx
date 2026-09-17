import { useState } from 'react';
import { PharmacyProfile, GBPData } from '../types/pharmacy';
import { aiService } from '../services/aiService';
import {
  MapPin,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  Loader2,
  FileText,
  MessageSquare,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  gbpData: GBPData;
  onUpdateGbpData: (data: GBPData) => void;
}

export function GbpMarketingView({ profile, gbpData, onUpdateGbpData }: Props) {
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await aiService.generateGbpContent(profile);
      onUpdateGbpData(data);
    } catch (err) {
      console.error('Failed to generate GBP data:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Google Business Profile (GBP) Local Marketing Generator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Optimise local map pack rankings for {profile.name} in {profile.location.split(',')[0]}. Generate compliant descriptions, weekly post updates, local FAQs, and ethical review responses.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating GBP Assets...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Refresh GBP Content</span>
            </>
          )}
        </button>
      </div>

      {/* Ethical Guardrail Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-900 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Strict Ethical Guardrails:</strong> This assistant never fabricates customer reviews, never invents customer testimonials, and strictly prohibits review manipulation in compliance with UK CMA (Competition and Markets Authority) rules and GPhC standards.
        </p>
      </div>

      {/* 1. Primary Business Description */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              1. Primary Business Description (Google Maps Overview)
            </h3>
            <span className="text-xs text-slate-500">
              Max 750 characters. Optimized for local search intent.
            </span>
          </div>
          <button
            onClick={() => copyText('desc', gbpData.businessDescription)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copiedId === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'desc' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
          {gbpData.businessDescription}
        </div>
        <div className="text-[11px] text-slate-400 text-right">
          Character count: {gbpData.businessDescription.length} / 750
        </div>
      </div>

      {/* 2. Service Descriptions Catalog */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            2. Google Business Profile 'Services' Catalog Entries
          </h3>
          <p className="text-xs text-slate-500">
            Add these into your Google Business Profile &gt; Edit Services menu to rank for high-intent queries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gbpData.serviceDescriptions.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.service}</h4>
                  <button
                    onClick={() => copyText(`svc-${idx}`, item.description)}
                    className="p-1 text-slate-500 hover:text-slate-800"
                    title="Copy description"
                  >
                    {copiedId === `svc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200/60">
                Length: {item.description.length} / 300 chars
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ready-to-Post GBP Updates */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            3. Google Business Profile Post Ideas & Updates
          </h3>
          <p className="text-xs text-slate-500">
            Posting 1-2 times weekly keeps your profile active in local map algorithms.
          </p>
        </div>

        <div className="space-y-4">
          {gbpData.postIdeas.map((post, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-slate-900">{post.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                    CTA Button: {post.callToAction}
                  </span>
                  <button
                    onClick={() => copyText(`post-${idx}`, `${post.title}\n\n${post.body}`)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1"
                  >
                    {copiedId === `post-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === `post-${idx}` ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{post.body}</p>

              <div className="text-xs bg-emerald-50/70 text-emerald-950 p-2.5 rounded-lg border border-emerald-100">
                <strong>Photo Tip:</strong> {post.photoTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Review Response Templates */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            4. Ethical Review Response Templates
          </h3>
          <p className="text-xs text-slate-500">
            Compliant, professional replies protecting patient confidentiality while demonstrating high service standards.
          </p>
        </div>

        <div className="space-y-3">
          {gbpData.reviewResponseTemplates.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{item.scenario}</span>
                <button
                  onClick={() => copyText(`rev-${idx}`, item.template)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                >
                  {copiedId === `rev-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === `rev-${idx}` ? 'Copied' : 'Copy Template'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-700 font-mono bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                "{item.template}"
              </p>
              <div className="text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                <strong>GPhC Privacy Rule:</strong> {item.rule}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FAQ Ideas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            5. Local Patient FAQ Suggestions for Google Search
          </h3>
          <p className="text-xs text-slate-500">
            Add these to the Google Business Profile Q&A section to preempt inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gbpData.faqIdeas.map((faq, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 text-xs">Q: {faq.question}</strong>
                <button
                  onClick={() => copyText(`faq-${idx}`, `Q: ${faq.question}\n\nA: ${faq.answer}`)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  {copiedId === `faq-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-slate-600 leading-relaxed">A: {faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
