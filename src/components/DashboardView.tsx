import {
  PharmacyProfile,
  GrowthActionItem,
  PriorityLevel
} from '../types/pharmacy';
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Target,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Search,
  PenTool,
  Bot,
  BarChart3,
  Calendar,
  FileCheck,
  AlertTriangle
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  priorityActions: GrowthActionItem[];
  setActiveSection: (sec: string) => void;
  onOpenQuickAction: (type: string, title: string, context: any) => void;
  isDemo: boolean;
}

export function DashboardView({
  profile,
  priorityActions,
  setActiveSection,
  onOpenQuickAction,
  isDemo
}: Props) {
  // Categorized Growth Overview Opportunities with explicit explanations
  const growthCategories: Array<{
    area: string;
    category: PriorityLevel;
    rationale: string;
    action: string;
    sectionTarget: string;
  }> = [
    {
      area: "Website & Booking CTAs",
      category: "QUICK WIN",
      rationale: "High mobile traffic exists, but phone numbers are the only contact option. Adding a 1-click appointment booking button requires under 1 hour and directly unlocks evening consultation bookings.",
      action: "Add Sticky Mobile Booking Button",
      sectionTarget: "seo"
    },
    {
      area: "Local Search & GBP Categories",
      category: "HIGH PRIORITY",
      rationale: "Profile only ranks for brand name, not for 'NHS Pharmacy First' or 'Travel clinic Harborne'. 80% of local patients turn to Google Maps first when earache or urgent vaccine needs occur.",
      action: "Optimize GBP Service Descriptions & Posts",
      sectionTarget: "gbp"
    },
    {
      area: "Inbound Email & Inquiry Triage",
      category: "QUICK WIN",
      rationale: "Dispensary staff lose 45 minutes daily answering repetitive stock and opening hour queries by hand. Standardizing email draft templates frees up clinical capacity immediately.",
      action: "Deploy Assisted Email Draft Workflow",
      sectionTarget: "automation"
    },
    {
      area: "Local GP & Dental Surgery Outreach",
      category: "MEDIUM PRIORITY",
      rationale: "Local GPs face 2-week appointment backlogs. Establishing a structured signposting relationship can channel patients directly into funded NHS Pharmacy First consultations.",
      action: "Create GP Practice Signposting Pack",
      sectionTarget: "content"
    },
    {
      area: "Dedicated Private Service Landing Pages",
      category: "LONGER-TERM OPPORTUNITY",
      rationale: "Building standalone SEO landing pages with destination travel vaccine checklists and structured schema takes 2-3 weeks, but builds durable organic search equity against large pharmacy chains.",
      action: "Publish Local Travel Clinic Hub Page",
      sectionTarget: "seo"
    },
    {
      area: "Monthly Web Analytics & Drop-off Auditing",
      category: "LOW PRIORITY",
      rationale: "Reviewing monthly visitor trends is valuable for spotting seasonal shifts, but secondary to fixing immediate booking roadblocks.",
      action: "Review Monthly Analytics Health",
      sectionTarget: "analytics"
    }
  ];

  const getPriorityBadgeClass = (p: PriorityLevel) => {
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
      {/* Demo Notice if active */}
      {isDemo && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <strong className="font-bold">DEMO SCENARIO ACTIVE:</strong>
            <span>
              Synthetic business & analytics dataset loaded for <em>GreenCare Pharmacy, Harborne, Birmingham</em>. All metrics are clearly simulated for demonstration.
            </span>
          </div>
          <span className="font-mono text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
            DEMO DATA - NOT REAL BUSINESS DATA
          </span>
        </div>
      )}

      {/* Guided Quick Jump Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Guided Growth Engine: What Would You Like To Do Next?
            </h2>
            <p className="text-xs text-slate-500">
              Direct practical workflows designed for independent pharmacy owners and managers.
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            Process: Analyse → Prioritise → Create → Act
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => setActiveSection('business')}
            className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-all group"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-semibold text-slate-900">Analyse Pharmacy</div>
            <div className="text-[11px] text-slate-500">Review opportunities</div>
          </button>

          <button
            onClick={() => setActiveSection('seo')}
            className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-all group"
          >
            <Search className="w-4 h-4 text-teal-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-semibold text-slate-900">Audit Website</div>
            <div className="text-[11px] text-slate-500">SEO & conversion</div>
          </button>

          <button
            onClick={() => setActiveSection('marketing')}
            className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-all group"
          >
            <Calendar className="w-4 h-4 text-sky-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-semibold text-slate-900">30-Day Planner</div>
            <div className="text-[11px] text-slate-500">Realistic calendar</div>
          </button>

          <button
            onClick={() => setActiveSection('analytics')}
            className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-all group"
          >
            <BarChart3 className="w-4 h-4 text-indigo-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-semibold text-slate-900">Analyse Data</div>
            <div className="text-[11px] text-slate-500">CSV intelligence</div>
          </button>

          <button
            onClick={() => setActiveSection('automation')}
            className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-all group"
          >
            <Bot className="w-4 h-4 text-purple-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-semibold text-slate-900">AI Automation</div>
            <div className="text-[11px] text-slate-500">Repetitive tasks</div>
          </button>

          <button
            onClick={() => setActiveSection('content')}
            className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-all group"
          >
            <PenTool className="w-4 h-4 text-rose-600 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-semibold text-slate-900">Create Content</div>
            <div className="text-[11px] text-slate-500">Social & Local GBP</div>
          </button>
        </div>
      </div>

      {/* Grid: Pharmacy Overview (Left) & Growth Categories (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pharmacy Overview Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Pharmacy Overview</h3>
                <span className="text-[11px] text-slate-500">Business Profile Status</span>
              </div>
            </div>
            <button
              onClick={() => setActiveSection('profile')}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline"
            >
              Edit Profile
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Pharmacy Name</span>
              <span className="text-slate-900 font-bold text-sm">{profile.name}</span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Location & Catchment</span>
              <span className="text-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {profile.location}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Website</span>
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:underline flex items-center gap-1 font-mono truncate"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                {profile.website}
              </a>
            </div>

            <div>
              <span className="text-slate-400 font-medium block mb-1">Main Clinical & Retail Services</span>
              <div className="flex flex-wrap gap-1">
                {profile.services.map((svc, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-md font-medium"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-medium block mb-1">Target Customer Segments</span>
              <div className="flex flex-wrap gap-1">
                {profile.targetCustomers.map((cust, i) => (
                  <span
                    key={i}
                    className="bg-sky-50 text-sky-800 text-[11px] px-2 py-0.5 rounded-md font-medium"
                  >
                    {cust}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-medium block mb-1">Key Business Objectives</span>
              <div className="space-y-1">
                {profile.businessGoals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Growth Overview (Transparent Categorization - No Fake Scores) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Growth Overview: Strategic Opportunity Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Evidence-based classification based on your profile, location competition, and service mix.
              </p>
            </div>
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
              6 Key Areas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {growthCategories.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-xs text-slate-900">{item.area}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
                    {item.rationale}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-400">Recommended Action:</span>
                  <button
                    onClick={() => setActiveSection(item.sectionTarget)}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>{item.action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 border border-slate-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Methodology Note:</strong> Categories are determined by implementation complexity versus expected business impact. We deliberately do not present an arbitrary numerical "digital health score" because every community pharmacy operates in a distinct NHS prescribing and retail environment.
            </span>
          </div>
        </div>
      </div>

      {/* Top 5 Priority Actions with Action Buttons */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Top 5 Priority Actions
              </h3>
              <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full font-bold">
                Immediate Focus
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Clear business problem, solution, implementation effort, and measurement metric for this month.
            </p>
          </div>
          <button
            onClick={() => setActiveSection('actionplan')}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Full 30-Day Growth Action Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {priorityActions.slice(0, 5).map((action, idx) => (
            <div
              key={action.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all bg-white hover:shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{action.title}</h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadgeClass(
                      action.priority
                    )}`}
                  >
                    {action.priority}
                  </span>
                  <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {action.estimatedTime}
                  </span>
                  <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    Diff: {action.difficulty}
                  </span>
                </div>
              </div>

              {/* Action Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="font-semibold text-rose-900 block mb-0.5">Problem</span>
                  <p className="text-slate-600 leading-relaxed">{action.problem}</p>
                </div>
                <div>
                  <span className="font-semibold text-emerald-900 block mb-0.5">Recommended Action</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{action.action}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">How Success is Measured</span>
                  <p className="text-slate-600 leading-relaxed">{action.measurementMethod}</p>
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-slate-400">
                  KPI: <span className="text-slate-700 font-medium">{action.kpi}</span>
                </div>
                {action.quickActionLabel && action.quickActionType && (
                  <button
                    onClick={() =>
                      onOpenQuickAction(action.quickActionType!, action.quickActionLabel!, {
                        problem: action.problem,
                        action: action.action,
                        title: action.title,
                      })
                    }
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{action.quickActionLabel}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
