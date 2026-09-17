import { useState } from 'react';
import {
  PharmacyProfile,
  AIOpportunity,
  PriorityLevel
} from '../types/pharmacy';
import {
  Bot,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Layers,
  FileCheck
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  opportunities: AIOpportunity[];
  onOpenQuickAction: (type: string, title: string, context: any) => void;
}

export function AutomationOpportunitiesView({
  profile,
  opportunities,
  onOpenQuickAction,
}: Props) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'QUICK WIN' | 'HIGH PRIORITY' | 'MEDIUM PRIORITY'>('all');

  const filteredOpps = opportunities.filter((o) =>
    selectedFilter === 'all' ? true : o.priority === selectedFilter
  );

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
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-purple-100 text-purple-800 rounded-lg">
              <Bot className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              AI Automation & Administrative Efficiency Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Identify safe, non-clinical repetitive tasks suitable for AI assistance. Designed to liberate pharmacist time for patient consultations.
          </p>
        </div>

        <button
          onClick={() =>
            onOpenQuickAction('workflow', 'Comprehensive Pharmacy AI SOP Guide', {
              pharmacy: profile.name,
              services: profile.services.join(', '),
              summary: 'Human-in-the-loop operational guidelines for AI drafting',
            })
          }
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto shrink-0"
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>Generate Complete AI SOP Guide</span>
        </button>
      </div>

      {/* Mandatory Safety Guardrails Box per Section 10 */}
      <div className="bg-rose-50 border-l-4 border-rose-500 rounded-r-2xl p-4 text-xs text-rose-950 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>NON-NEGOTIABLE SAFETY BOUNDARIES (GPhC & UK Healthcare Regulations)</span>
        </div>
        <p className="leading-relaxed">
          AI automation in this system is strictly limited to <strong>marketing drafting, customer service templates, and administrative organisation</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-semibold text-[11px]">
          <div className="flex items-center gap-1.5 text-rose-800">
            <span>✖</span> No automating clinical decision-making
          </div>
          <div className="flex items-center gap-1.5 text-rose-800">
            <span>✖</span> No automating prescription checking / dispensing
          </div>
          <div className="flex items-center gap-1.5 text-rose-800">
            <span>✖</span> No automating diagnosis or medical triage
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedFilter === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Opportunities ({opportunities.length})
        </button>
        <button
          onClick={() => setSelectedFilter('QUICK WIN')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedFilter === 'QUICK WIN'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Quick Wins
        </button>
        <button
          onClick={() => setSelectedFilter('HIGH PRIORITY')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedFilter === 'HIGH PRIORITY'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          High Priority
        </button>
        <button
          onClick={() => setSelectedFilter('MEDIUM PRIORITY')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            selectedFilter === 'MEDIUM PRIORITY'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Medium Priority
        </button>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpps.map((opp, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-purple-300 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-base text-slate-900">{opp.area}</h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getPriorityBadge(
                    opp.priority
                  )}`}
                >
                  {opp.priority}
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                  Difficulty: {opp.implementationDifficulty}
                </span>
              </div>
            </div>

            {/* Grid Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="font-semibold text-rose-900 block mb-0.5">Problem & Inefficiency:</span>
                  <p className="text-slate-600 leading-relaxed">{opp.problem}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block mb-0.5">Current Manual Workflow:</span>
                  <p className="text-slate-600 leading-relaxed">{opp.currentSituation}</p>
                </div>
                <div>
                  <span className="font-semibold text-purple-900 block mb-0.5">AI Assistance Opportunity:</span>
                  <p className="text-purple-950 font-medium leading-relaxed">{opp.aiOpportunity}</p>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800 block mb-0.5">Potential Solution:</span>
                  <p className="text-slate-600 leading-relaxed">{opp.potentialSolution}</p>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-950 text-[11px]">
                  <strong className="block mb-0.5">MANDATORY HUMAN APPROVAL POINT:</strong>
                  {opp.humanInvolvementRequired}
                </div>
                <div>
                  <span className="font-semibold text-emerald-900 block mb-0.5">Anticipated Time & Capacity Benefit:</span>
                  <p className="text-emerald-800 font-medium leading-relaxed">{opp.potentialBenefit}</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                No patient data processed • Human verification required
              </span>
              <button
                onClick={() =>
                  onOpenQuickAction('workflow', `Automation Blueprint: ${opp.area}`, {
                    area: opp.area,
                    problem: opp.problem,
                    solution: opp.potentialSolution,
                    humanCheck: opp.humanInvolvementRequired,
                  })
                }
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>Generate Implementation Blueprint</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
