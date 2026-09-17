import { useState } from 'react';
import {
  PharmacyProfile
} from '../types/pharmacy';
import {
  ALL_AVAILABLE_SERVICES,
  ALL_CUSTOMER_GROUPS,
  ALL_BUSINESS_GOALS,
  DEMO_PHARMACY_PROFILE
} from '../data/demoData';
import {
  Building2,
  MapPin,
  Globe,
  Users2,
  Target,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle,
  Briefcase
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  onSaveProfile: (newProfile: PharmacyProfile) => void;
  onLoadDemo: () => void;
}

export function ProfileView({ profile, onSaveProfile, onLoadDemo }: Props) {
  const [formData, setFormData] = useState<PharmacyProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleItem = (list: string[], item: string): string[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...formData,
      isDemo: false
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Pharmacy Business Profile & Context
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            This profile acts as the core context for all AI business analysis, local SEO recommendations, and 30-day marketing plans.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormData({ ...DEMO_PHARMACY_PROFILE });
            onLoadDemo();
          }}
          className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Load GreenCare Demo</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Profile saved successfully! Future AI analysis will use these updated details.</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        {/* Core Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Pharmacy Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. St Mary's Community Pharmacy"
                className="w-full pl-3 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Location & Postcode *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Harborne, Birmingham, B17 9NT, UK"
                className="w-full pl-3 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Website URL
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://www.yourpharmacy.co.uk"
              className="w-full pl-3 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Branches
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.branches}
                onChange={(e) => setFormData({ ...formData, branches: parseInt(e.target.value) || 1 })}
                className="w-full pl-3 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Staff Size
              </label>
              <select
                value={formData.staffSize}
                onChange={(e) => setFormData({ ...formData, staffSize: e.target.value })}
                className="w-full pl-3 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="1-3 staff (Solo Pharmacist + Counter)">1-3 staff (Solo Pharmacist)</option>
                <option value="4-5 staff (Small dispensary team)">4-5 staff (Small dispensary team)</option>
                <option value="6-10 staff (2 Full-time Pharmacists, 3 Dispensers, 2 Counter Staff)">6-10 staff (Medium branch)</option>
                <option value="11+ staff (Multi-pharmacist / High volume)">11+ staff (High volume)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Services Selection */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Main Clinical, NHS & Private Services *
              </label>
              <span className="text-xs text-slate-500">
                Select all services your pharmacy currently provides or plans to launch.
              </span>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {formData.services.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ALL_AVAILABLE_SERVICES.map((svc) => {
              const selected = formData.services.includes(svc);
              return (
                <button
                  type="button"
                  key={svc}
                  onClick={() => setFormData({ ...formData, services: toggleItem(formData.services, svc) })}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-1">{svc}</span>
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 ${
                      selected ? 'bg-emerald-600 text-white font-bold' : 'border border-slate-300'
                    }`}
                  >
                    {selected ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Customers */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Target Customer Groups *
              </label>
              <span className="text-xs text-slate-500">
                Who are your primary patients and walk-in shoppers?
              </span>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {formData.targetCustomers.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ALL_CUSTOMER_GROUPS.map((cust) => {
              const selected = formData.targetCustomers.includes(cust);
              return (
                <button
                  type="button"
                  key={cust}
                  onClick={() =>
                    setFormData({ ...formData, targetCustomers: toggleItem(formData.targetCustomers, cust) })
                  }
                  className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-sky-50 border-sky-500 text-sky-950 font-semibold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-1">{cust}</span>
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 ${
                      selected ? 'bg-sky-600 text-white font-bold' : 'border border-slate-300'
                    }`}
                  >
                    {selected ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Business Goals */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Main Business & Growth Goals *
              </label>
              <span className="text-xs text-slate-500">
                Choose the business outcomes you want this AI assistant to prioritize.
              </span>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {formData.businessGoals.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ALL_BUSINESS_GOALS.map((goal) => {
              const selected = formData.businessGoals.includes(goal);
              return (
                <button
                  type="button"
                  key={goal}
                  onClick={() =>
                    setFormData({ ...formData, businessGoals: toggleItem(formData.businessGoals, goal) })
                  }
                  className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-teal-50 border-teal-500 text-teal-950 font-semibold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-1">{goal}</span>
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 ${
                      selected ? 'bg-teal-600 text-white font-bold' : 'border border-slate-300'
                    }`}
                  >
                    {selected ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Operational Context */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Current Situation & Operational Bottlenecks (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="e.g. Busy dispensary with 6,000 monthly items. Travel clinic capacity is only 30% full. Staff overwhelmed with phone inquiries between 11am-2pm."
            className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none leading-relaxed"
          />
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile & Update AI Context</span>
          </button>
        </div>
      </form>
    </div>
  );
}
