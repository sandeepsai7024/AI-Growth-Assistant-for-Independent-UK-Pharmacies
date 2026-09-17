import { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  Search,
  Calendar,
  PenTool,
  MapPin,
  BarChart3,
  Bot,
  ListTodo,
  FileCheck,
  Sparkles,
  Layers,
  HelpCircle,
  Menu,
  X,
  Briefcase
} from 'lucide-react';
import { PharmacyProfile, ConsultantProject } from '../types/pharmacy';

interface Props {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  profile: PharmacyProfile;
  isDemo: boolean;
  onToggleDemo: () => void;
  consultantProject: ConsultantProject;
  onOpenConsultantModal: () => void;
  onOpenIntegrationsModal: () => void;
}

export function Header({
  activeSection,
  setActiveSection,
  profile,
  isDemo,
  onToggleDemo,
  consultantProject,
  onOpenConsultantModal,
  onOpenIntegrationsModal,
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Pharmacy Profile', icon: Building2 },
    { id: 'business', label: 'Business Analysis', icon: TrendingUp },
    { id: 'seo', label: 'Website & SEO', icon: Search },
    { id: 'marketing', label: '30-Day Planner', icon: Calendar },
    { id: 'content', label: 'Content Studio', icon: PenTool },
    { id: 'gbp', label: 'GBP Local SEO', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'automation', label: 'AI Automation', icon: Bot },
    { id: 'actionplan', label: 'Growth Plan', icon: ListTodo, badge: 'Core' },
    { id: 'reports', label: 'Reports', icon: FileCheck },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner with Pharmacy Identity & Quick Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            <span>+</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                AI Growth Assistant
              </h1>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                UK Independent Pharmacies
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <span>Active Pharmacy:</span>
              <strong className="text-slate-800 font-semibold">{profile.name}</strong>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 truncate max-w-xs">{profile.location.split(',')[0]}</span>
            </p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Demo Mode Toggle */}
          <button
            onClick={onToggleDemo}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 border ${
              isDemo
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }`}
            title="Toggle between GreenCare Pharmacy Birmingham demo and custom profile"
          >
            <span className={`w-2 h-2 rounded-full ${isDemo ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{isDemo ? 'Demo Mode: GreenCare' : 'Switch to Demo'}</span>
          </button>

          {/* Consultant Mode */}
          <button
            onClick={onOpenConsultantModal}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 border ${
              consultantProject.enabled
                ? 'bg-purple-50 text-purple-700 border-purple-200 font-semibold'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{consultantProject.enabled ? `Client: ${consultantProject.clientName || 'Active'}` : 'Consultant Mode'}</span>
          </button>

          {/* Integrations Placeholder */}
          <button
            onClick={onOpenIntegrationsModal}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg flex items-center gap-1.5"
            title="Future Integrations (GSC, GBP, GA4, NHSmail, Zapier)"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Integrations</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop nav tabs */}
        <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors relative ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-bold tracking-wider ${
                      isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile menu list */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 space-y-1 border-t border-slate-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
