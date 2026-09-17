import { useState } from 'react';
import {
  PharmacyProfile,
  GrowthActionItem,
  PriorityLevel,
  TaskStatus
} from '../types/pharmacy';
import { aiService } from '../services/aiService';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2,
  Filter,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  actions: GrowthActionItem[];
  onUpdateActions: (actions: GrowthActionItem[]) => void;
  onOpenQuickAction: (type: string, title: string, context: any) => void;
}

export function GrowthActionPlanView({
  profile,
  actions,
  onUpdateActions,
  onOpenQuickAction,
}: Props) {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(false);

  const isDone = (status: TaskStatus) => status === 'completed' || status === 'Completed';
  const isInProgress = (status: TaskStatus) => status === 'in_progress' || status === 'In Progress';

  const completedCount = actions.filter((a) => isDone(a.status)).length;
  const progressPercent = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0;

  const handleToggleStatus = (id: string) => {
    const updated = actions.map((a) => {
      if (a.id === id) {
        const nextStatus: TaskStatus = isDone(a.status)
          ? 'not_started'
          : isInProgress(a.status)
          ? 'completed'
          : 'in_progress';
        return { ...a, status: nextStatus };
      }
      return a;
    });
    onUpdateActions(updated);
  };

  const handleRegeneratePlan = async () => {
    setLoading(true);
    try {
      const newPlan = await aiService.generateGrowthPlan(profile);
      onUpdateActions(newPlan);
    } catch (err) {
      console.error('Failed to regenerate plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeekNumber = (action: GrowthActionItem, idx: number) => {
    return action.weekNumber || (idx < 2 ? 1 : idx < 4 ? 2 : idx < 6 ? 3 : 4);
  };

  const filteredActions = actions.filter((a, idx) =>
    selectedWeek === 'all' ? true : getWeekNumber(a, idx) === selectedWeek
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

  const getStatusBadge = (s?: string) => {
    switch (s) {
      case 'Completed':
        return 'bg-emerald-600 text-white font-bold';
      case 'In Progress':
        return 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <ListTodo className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Prioritised 30-Day Growth Action Plan
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            The core strategic roadmap for {profile.name}. Structured across 4 weeks: foundation quick wins, local visibility, content promotion, and conversion automation.
          </p>
        </div>

        <button
          onClick={handleRegeneratePlan}
          disabled={loading}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Regenerating Action Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Regenerate 30-Day Plan</span>
            </>
          )}
        </button>
      </div>

      {/* Progress & Implementation Tracker */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              30-Day Sprint Progress:
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {completedCount} of {actions.length} Completed ({progressPercent}%)
            </span>
          </div>
          <div className="w-full sm:w-80 bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Week Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedWeek === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Weeks ({actions.length})
          </button>
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedWeek === w
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Week {w}
            </button>
          ))}
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {filteredActions.map((action, idx) => {
          const done = isDone(action.status);
          const weekNum = getWeekNumber(action, idx);
          const toolText = action.toolOrProcess || action.toolsRequired?.join(', ') || 'Standard Clinical SOP';

          return (
            <div
              key={action.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 bg-white shadow-xs ${
                done
                  ? 'border-emerald-200 bg-emerald-50/20 opacity-90'
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleStatus(action.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                    title="Toggle Task Status"
                  >
                    {done ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                        Week {weekNum}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                          action.priority
                        )}`}
                      >
                        {action.priority}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(action.id)}
                        className={`text-[10px] px-2 py-0.5 rounded-full transition-colors cursor-pointer ${getStatusBadge(
                          action.status
                        )}`}
                      >
                        Status: {action.status || 'Pending'}
                      </button>
                    </div>
                    <h3
                      className={`text-base font-bold text-slate-900 mt-1 ${
                        done ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {action.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {action.estimatedTime}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium">
                    Diff: {action.difficulty}
                  </span>
                </div>
              </div>

              {/* 3-Column Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="font-semibold text-rose-900 block mb-0.5">Problem Addressed:</span>
                  <p className="text-slate-600 leading-relaxed">{action.problem}</p>
                </div>
                <div>
                  <span className="font-semibold text-emerald-900 block mb-0.5">Action Steps:</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{action.action}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">Measurement Method & KPI:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {action.measurementMethod} (KPI: <strong className="text-slate-800">{action.kpi}</strong>)
                  </p>
                </div>
              </div>

              {/* Footer with Tool & Direct Action Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Recommended Process / Tool: <strong className="text-slate-700">{toolText}</strong>
                </span>

                {action.quickActionLabel && action.quickActionType && (
                  <button
                    onClick={() =>
                      onOpenQuickAction(action.quickActionType!, action.quickActionLabel!, {
                        title: action.title,
                        problem: action.problem,
                        action: action.action,
                        tool: toolText,
                      })
                    }
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors self-end sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{action.quickActionLabel}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
