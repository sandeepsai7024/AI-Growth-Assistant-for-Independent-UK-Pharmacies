import { useState } from 'react';
import {
  PharmacyProfile,
  BusinessAnalysisResult,
  PriorityLevel
} from '../types/pharmacy';
import { aiService } from '../services/aiService';
import {
  TrendingUp,
  Users,
  Briefcase,
  Sparkles,
  Bot,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  analysis: BusinessAnalysisResult;
  onUpdateAnalysis: (newAnalysis: BusinessAnalysisResult) => void;
  onOpenQuickAction: (type: string, title: string, context: any) => void;
}

export function BusinessAnalysisView({
  profile,
  analysis,
  onUpdateAnalysis,
  onOpenQuickAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'marketing' | 'ai' | 'customers'>('all');

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const result = await aiService.generateBusinessAnalysis(profile);
      onUpdateAnalysis(result);
    } catch (err) {
      console.error('Failed to run analysis:', err);
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

  return (
    <div className="space-y-6">
      {/* Top Banner & Trigger */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              AI Business Intelligence Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Commercial analysis tailored for {profile.name} ({profile.location.split(',')[0]}). Evaluates customer segments, clinical service visibility, marketing touchpoints, and AI workflow candidates without clinical overreach.
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analysing Pharmacy Data...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Analyse My Pharmacy</span>
            </>
          )}
        </button>
      </div>

      {/* Strategic Summary Note */}
      {analysis.summaryNote && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-sm border border-slate-800 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-emerald-400 block mb-1 uppercase tracking-wider text-[11px]">
              Strategic Takeaway for {profile.name}
            </span>
            <p className="text-slate-200">{analysis.summaryNote}</p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Opportunities
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'services'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Service Opportunities ({analysis.serviceOpportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('marketing')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'marketing'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Marketing Channels ({analysis.marketingOpportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'ai'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          AI Automation ({analysis.aiOpportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'customers'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Customer Segments ({analysis.customerOpportunities.length})
        </button>
      </div>

      {/* 1. Service Opportunities */}
      {(activeTab === 'all' || activeTab === 'services') && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Service Opportunities (Stronger Commercial Visibility)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.serviceOpportunities.map((svc, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-bold text-slate-900 text-sm">{svc.serviceName}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                        svc.priority
                      )}`}
                    >
                      {svc.priority}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-2">
                    <p>
                      <strong className="text-slate-800">Commercial Rationale:</strong> {svc.rationale}
                    </p>
                    <p className="bg-emerald-50/80 text-emerald-950 p-2.5 rounded-lg border border-emerald-100">
                      <strong className="text-emerald-900">Recommended Visibility Action:</strong>{' '}
                      {svc.visibilityAction}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() =>
                      onOpenQuickAction('page_outline', `Service Landing Page Outline: ${svc.serviceName}`, {
                        service: svc.serviceName,
                        rationale: svc.rationale,
                        action: svc.visibilityAction,
                      })
                    }
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Generate Service Page Outline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Marketing Opportunities */}
      {(activeTab === 'all' || activeTab === 'marketing') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Marketing & Acquisition Opportunities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.marketingOpportunities.map((mkt, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-bold text-slate-900 text-sm">{mkt.channel}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                        mkt.priority
                      )}`}
                    >
                      {mkt.priority}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p>
                      <strong className="text-rose-900">Current Problem:</strong> {mkt.problem}
                    </p>
                    <p>
                      <strong className="text-slate-800">What is happening:</strong> {mkt.currentSituation}
                    </p>
                    <p className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-700 font-medium">
                      <strong className="text-slate-900">Recommendation:</strong> {mkt.recommendation}
                    </p>
                    <p className="text-emerald-700">
                      <strong>Expected Benefit:</strong> {mkt.potentialBenefit}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Difficulty: {mkt.difficulty}</span>
                  <button
                    onClick={() =>
                      onOpenQuickAction('content', `Campaign Draft for ${mkt.channel}`, {
                        channel: mkt.channel,
                        problem: mkt.problem,
                        recommendation: mkt.recommendation,
                      })
                    }
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Generate Campaign Draft</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AI Automation Opportunities */}
      {(activeTab === 'all' || activeTab === 'ai') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-purple-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. AI Automation Opportunities (Repetitive Workflows)
            </h3>
          </div>

          <div className="space-y-4">
            {analysis.aiOpportunities.map((ai, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-purple-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    {ai.area}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                        ai.priority
                      )}`}
                    >
                      {ai.priority}
                    </span>
                    <span className="text-[11px] bg-purple-50 text-purple-800 px-2 py-0.5 rounded font-medium border border-purple-200">
                      Diff: {ai.implementationDifficulty}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-purple-50/40 p-3.5 rounded-xl border border-purple-100">
                  <div className="space-y-1.5">
                    <p>
                      <strong className="text-slate-800">Operational Problem:</strong> {ai.problem}
                    </p>
                    <p>
                      <strong className="text-slate-700">Current Manual Process:</strong>{' '}
                      {ai.currentSituation}
                    </p>
                    <p className="text-purple-900 font-semibold">
                      <strong>AI Assistance Opportunity:</strong> {ai.aiOpportunity}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-slate-800">
                      <strong>Potential Solution Tools:</strong> {ai.potentialSolution}
                    </p>
                    <div className="p-2 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 text-[11px]">
                      <strong>MANDATORY HUMAN APPROVAL POINT:</strong> {ai.humanInvolvementRequired}
                    </div>
                    <p className="text-emerald-700 font-medium">
                      <strong>Efficiency Impact:</strong> {ai.potentialBenefit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={() =>
                      onOpenQuickAction('workflow', `Automation Blueprint: ${ai.area}`, {
                        area: ai.area,
                        problem: ai.problem,
                        opportunity: ai.aiOpportunity,
                        humanCheck: ai.humanInvolvementRequired,
                      })
                    }
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                    <span>Generate Workflow Blueprint</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Customer Opportunities */}
      {(activeTab === 'all' || activeTab === 'customers') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              4. Target Customer Segment Needs (Non-Clinical Opportunities)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.customerOpportunities.map((cust, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 hover:border-sky-300 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{cust.segment}</h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                      cust.priority
                    )}`}
                  >
                    {cust.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-800">Likely Community Needs:</strong> {cust.likelyNeeds}
                </p>
                <p className="text-xs text-sky-900 bg-sky-50 p-2 rounded-lg border border-sky-100">
                  <strong>Suggested Marketing Approach:</strong> {cust.suggestedApproach}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
