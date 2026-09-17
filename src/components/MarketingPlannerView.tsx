import { useState } from 'react';
import {
  PharmacyProfile,
  MarketingPlan,
  MarketingPlanWeek,
  MarketingPlanTask
} from '../types/pharmacy';
import { aiService } from '../services/aiService';
import {
  Calendar,
  Sparkles,
  Clock,
  Target,
  Layers,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ChevronUp,
  FileText,
  DollarSign
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  marketingPlan: MarketingPlan;
  onUpdateMarketingPlan: (plan: MarketingPlan) => void;
  onOpenQuickAction: (type: string, title: string, context: any) => void;
}

export function MarketingPlannerView({
  profile,
  marketingPlan,
  onUpdateMarketingPlan,
  onOpenQuickAction,
}: Props) {
  const [goal, setGoal] = useState(marketingPlan.goal || profile.businessGoals[0] || 'Increase private travel clinic bookings');
  const [targetCustomer, setTargetCustomer] = useState(marketingPlan.targetCustomer || profile.targetCustomers[0] || 'Local families and holiday travelers');
  const [services, setServices] = useState<string[]>(marketingPlan.servicesToPromote || profile.services.slice(0, 3));
  const [channels, setChannels] = useState<string[]>(marketingPlan.channels || ['Google Business Profile', 'Instagram/Facebook', 'Website', 'In-Store POS']);
  const [hoursPerWeek, setHoursPerWeek] = useState(marketingPlan.hoursPerWeek || 3);
  const [budget, setBudget] = useState(marketingPlan.budget || '£100 - £250/month (Organic + Local Print)');
  const [loading, setLoading] = useState(false);
  const [openWeek, setOpenWeek] = useState<number>(1);

  const availableChannelsList = [
    'Google Business Profile',
    'Instagram/Facebook',
    'Website CMS / Blog',
    'In-Store POS & Bag Inserts',
    'Local GP & Dental Outreach',
    'SMS / WhatsApp Business',
    'Local Community Boards'
  ];

  const toggleService = (svc: string) => {
    setServices((prev) => (prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]));
  };

  const toggleChannel = (ch: string) => {
    setChannels((prev) => (prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]));
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const plan = await aiService.generateMarketingPlan(profile, {
        goal,
        targetCustomer,
        services,
        channels,
        hoursPerWeek,
        budget,
      });
      onUpdateMarketingPlan(plan);
    } catch (err) {
      console.error('Failed to generate marketing plan:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-sky-100 text-sky-800 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                30-Day Pharmacy Marketing Planner
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Designed specifically for independent pharmacies with limited time. Realistic, non-overwhelming weekly tasks.
            </p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
            Practical Workloads Only
          </span>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Primary Business Goal:
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. Increase private travel clinic bookings"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Target Patient / Customer Group:
            </label>
            <input
              type="text"
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. Local families and holiday travelers"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Time Available Per Week:
            </label>
            <select
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value={1}>1-2 hours / week (Solo Pharmacist / Very busy)</option>
              <option value={3}>3-4 hours / week (Recommended for independent team)</option>
              <option value={6}>5-8 hours / week (Dedicated marketing coordinator)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Estimated Monthly Budget:
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. £150/month (Organic + Local Leaflets)"
            />
          </div>
        </div>

        {/* Services to promote chips */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Services to Promote in this 30-Day Sprint:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {profile.services.map((svc) => {
              const selected = services.includes(svc);
              return (
                <button
                  type="button"
                  key={svc}
                  onClick={() => toggleService(svc)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                    selected
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {svc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Channels */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Available Marketing Channels:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableChannelsList.map((ch) => {
              const selected = channels.includes(ch);
              return (
                <button
                  type="button"
                  key={ch}
                  onClick={() => toggleChannel(ch)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                    selected
                      ? 'bg-sky-600 text-white border-sky-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {ch}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating 30-Day Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Create My 30-Day Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4-Week Accordion Display */}
      <div className="space-y-4">
        {marketingPlan.weeks.map((week) => {
          const isOpen = openWeek === week.weekNumber;
          return (
            <div
              key={week.weekNumber}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
            >
              {/* Week Header */}
              <button
                onClick={() => setOpenWeek(isOpen ? 0 : week.weekNumber)}
                className="w-full px-6 py-4 flex items-center justify-between text-left bg-gradient-to-r from-slate-50 to-white hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      W{week.weekNumber}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {week.weekTitle}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 ml-8">{week.focusTheme}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {week.tasks.length} tasks
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {/* Week Tasks */}
              {isOpen && (
                <div className="p-6 space-y-4 bg-white">
                  {week.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all space-y-3 bg-slate-50/40"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mr-2">
                            {task.dayOrTiming}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Channel: {task.channel}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 mt-1">{task.task}</h4>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.estimatedTime}
                          </span>
                          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            Diff: {task.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-100">
                        <div>
                          <strong className="text-slate-800 block mb-0.5">Purpose:</strong>
                          <p className="text-slate-600 leading-relaxed">{task.purpose}</p>
                        </div>
                        <div>
                          <strong className="text-emerald-900 block mb-0.5">Measurable KPI:</strong>
                          <p className="text-slate-700 leading-relaxed font-medium">{task.kpi}</p>
                        </div>
                      </div>

                      {task.exampleOutput && (
                        <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono leading-relaxed border border-slate-800">
                          <span className="text-[10px] text-emerald-400 font-sans font-bold uppercase tracking-wider block mb-1">
                            Example Output / Copy:
                          </span>
                          <p className="text-slate-300 font-sans text-xs">{task.exampleOutput}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-end pt-1">
                        <button
                          onClick={() =>
                            onOpenQuickAction('content', `Asset Draft for: ${task.task}`, {
                              task: task.task,
                              channel: task.channel,
                              purpose: task.purpose,
                              example: task.exampleOutput,
                            })
                          }
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Generate Asset Draft</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
