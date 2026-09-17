import { useState, useMemo } from 'react';
import {
  PharmacyProfile,
  BusinessAnalysisResult,
  SEOAuditResult,
  MarketingPlan,
  GrowthActionItem,
  AnalyticsRow,
  GBPData,
  ConsultantProject
} from './types/pharmacy';
import {
  DEMO_PHARMACY_PROFILE,
  DEMO_BUSINESS_ANALYSIS,
  DEMO_SEO_AUDIT,
  DEMO_MARKETING_PLAN,
  DEMO_ACTIONS,
  DEMO_ANALYTICS_ROWS,
  DEMO_GBP_DATA
} from './data/demoData';
import { computeAnalyticsSummary } from './services/csvParser';

import { HealthcareDisclaimer } from './components/HealthcareDisclaimer';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ProfileView } from './components/ProfileView';
import { BusinessAnalysisView } from './components/BusinessAnalysisView';
import { SeoAuditView } from './components/SeoAuditView';
import { MarketingPlannerView } from './components/MarketingPlannerView';
import { ContentStudioView } from './components/ContentStudioView';
import { GbpMarketingView } from './components/GbpMarketingView';
import { AnalyticsView } from './components/AnalyticsView';
import { AutomationOpportunitiesView } from './components/AutomationOpportunitiesView';
import { GrowthActionPlanView } from './components/GrowthActionPlanView';
import { ReportsView } from './components/ReportsView';
import { QuickActionModal } from './components/QuickActionModal';
import { ConsultantModal } from './components/ConsultantModal';
import { IntegrationsModal } from './components/IntegrationsModal';

export default function App() {
  // Navigation
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  // Application State
  const [isDemo, setIsDemo] = useState<boolean>(true);
  const [profile, setProfile] = useState<PharmacyProfile>({ ...DEMO_PHARMACY_PROFILE });
  const [analysis, setAnalysis] = useState<BusinessAnalysisResult>({ ...DEMO_BUSINESS_ANALYSIS });
  const [seoAudit, setSeoAudit] = useState<SEOAuditResult>({ ...DEMO_SEO_AUDIT });
  const [marketingPlan, setMarketingPlan] = useState<MarketingPlan>({ ...DEMO_MARKETING_PLAN });
  const [actions, setActions] = useState<GrowthActionItem[]>([...DEMO_ACTIONS]);
  const [analyticsRows, setAnalyticsRows] = useState<AnalyticsRow[]>([...DEMO_ANALYTICS_ROWS]);
  const [gbpData, setGbpData] = useState<GBPData>({ ...DEMO_GBP_DATA });

  // Consultant Mode State
  const [consultantProject, setConsultantProject] = useState<ConsultantProject>({
    enabled: false,
    agencyName: 'UK Pharmacy Growth Advisory',
    clientName: 'GreenCare Pharmacy',
    clientCode: 'GC-BHAM-01',
  });
  const [consultantModalOpen, setConsultantModalOpen] = useState(false);
  const [integrationsModalOpen, setIntegrationsModalOpen] = useState(false);

  // Quick Action Modal (Turn Recommendation into Action)
  const [quickActionModal, setQuickActionModal] = useState<{
    isOpen: boolean;
    actionType: string;
    actionTitle: string;
    contextData: any;
  }>({
    isOpen: false,
    actionType: '',
    actionTitle: '',
    contextData: null,
  });

  const openQuickAction = (type: string, title: string, context: any) => {
    setQuickActionModal({
      isOpen: true,
      actionType: type,
      actionTitle: title,
      contextData: context,
    });
  };

  const closeQuickAction = () => {
    setQuickActionModal((prev) => ({ ...prev, isOpen: false }));
  };

  const toggleDemoMode = () => {
    if (isDemo) {
      // Switch to blank / custom template
      setIsDemo(false);
      setProfile({
        name: 'My Independent Pharmacy',
        location: 'High Street, UK',
        website: 'https://www.mypharmacy.co.uk',
        branches: 1,
        staffSize: '4-5 staff (Small dispensary team)',
        services: ['NHS Prescription Dispensing', 'NHS Pharmacy First', 'Flu Vaccination Service'],
        targetCustomers: ['Local residents', 'Families'],
        businessGoals: ['Increase local awareness', 'Increase private-service bookings', 'Improve local SEO'],
        notes: 'Independent community pharmacy aiming to grow clinical services and footfall.',
        isDemo: false,
      });
    } else {
      // Reload GreenCare demo
      setIsDemo(true);
      setProfile({ ...DEMO_PHARMACY_PROFILE });
      setAnalysis({ ...DEMO_BUSINESS_ANALYSIS });
      setSeoAudit({ ...DEMO_SEO_AUDIT });
      setMarketingPlan({ ...DEMO_MARKETING_PLAN });
      setActions([...DEMO_ACTIONS]);
      setAnalyticsRows([...DEMO_ANALYTICS_ROWS]);
      setGbpData({ ...DEMO_GBP_DATA });
    }
  };

  const analyticsSummary = useMemo(() => {
    return computeAnalyticsSummary(analyticsRows);
  }, [analyticsRows]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header with Navigation */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        profile={profile}
        isDemo={isDemo}
        onToggleDemo={toggleDemoMode}
        consultantProject={consultantProject}
        onOpenConsultantModal={() => setConsultantModalOpen(true)}
        onOpenIntegrationsModal={() => setIntegrationsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeSection === 'dashboard' && (
          <DashboardView
            profile={profile}
            priorityActions={actions}
            setActiveSection={setActiveSection}
            onOpenQuickAction={openQuickAction}
            isDemo={isDemo}
          />
        )}

        {activeSection === 'profile' && (
          <ProfileView
            profile={profile}
            onSaveProfile={(newProf) => {
              setProfile(newProf);
              setIsDemo(false);
            }}
            onLoadDemo={() => {
              setIsDemo(true);
              setProfile({ ...DEMO_PHARMACY_PROFILE });
            }}
          />
        )}

        {activeSection === 'business' && (
          <BusinessAnalysisView
            profile={profile}
            analysis={analysis}
            onUpdateAnalysis={setAnalysis}
            onOpenQuickAction={openQuickAction}
          />
        )}

        {activeSection === 'seo' && (
          <SeoAuditView
            profile={profile}
            seoAudit={seoAudit}
            onUpdateSeoAudit={setSeoAudit}
            onOpenQuickAction={openQuickAction}
          />
        )}

        {activeSection === 'marketing' && (
          <MarketingPlannerView
            profile={profile}
            marketingPlan={marketingPlan}
            onUpdateMarketingPlan={setMarketingPlan}
            onOpenQuickAction={openQuickAction}
          />
        )}

        {activeSection === 'content' && (
          <ContentStudioView profile={profile} />
        )}

        {activeSection === 'gbp' && (
          <GbpMarketingView
            profile={profile}
            gbpData={gbpData}
            onUpdateGbpData={setGbpData}
          />
        )}

        {activeSection === 'analytics' && (
          <AnalyticsView
            profile={profile}
            initialRows={analyticsRows}
            isDemo={isDemo}
          />
        )}

        {activeSection === 'automation' && (
          <AutomationOpportunitiesView
            profile={profile}
            opportunities={analysis.aiOpportunities}
            onOpenQuickAction={openQuickAction}
          />
        )}

        {activeSection === 'actionplan' && (
          <GrowthActionPlanView
            profile={profile}
            actions={actions}
            onUpdateActions={setActions}
            onOpenQuickAction={openQuickAction}
          />
        )}

        {activeSection === 'reports' && (
          <ReportsView
            profile={profile}
            analysis={analysis}
            seoAudit={seoAudit}
            marketingPlan={marketingPlan}
            actions={actions}
            analyticsSummary={analyticsSummary}
          />
        )}
      </main>

      {/* Persistent Legal & Clinical Safety Disclaimer */}
      <HealthcareDisclaimer />

      {/* Quick Action Modal ("Turn Recommendation into Action") */}
      <QuickActionModal
        isOpen={quickActionModal.isOpen}
        onClose={closeQuickAction}
        actionType={quickActionModal.actionType}
        actionTitle={quickActionModal.actionTitle}
        contextData={quickActionModal.contextData}
        profile={profile}
      />

      {/* Consultancy Mode Modal */}
      <ConsultantModal
        isOpen={consultantModalOpen}
        onClose={() => setConsultantModalOpen(false)}
        consultantProject={consultantProject}
        onSaveConsultantSettings={setConsultantProject}
        currentProfile={profile}
        onSwitchClient={(newClientProfile) => {
          setProfile(newClientProfile);
          setIsDemo(false);
        }}
      />

      {/* Integrations Modal */}
      <IntegrationsModal
        isOpen={integrationsModalOpen}
        onClose={() => setIntegrationsModalOpen(false)}
      />
    </div>
  );
}
