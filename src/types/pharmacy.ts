export type PriorityLevel = 
  | 'HIGH PRIORITY' 
  | 'MEDIUM PRIORITY' 
  | 'LOW PRIORITY' 
  | 'QUICK WIN' 
  | 'LONGER-TERM OPPORTUNITY';

export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'Pending' | 'In Progress' | 'Completed';

export interface PharmacyProfile {
  name: string;
  location: string;
  website: string;
  branches: number;
  staffSize: string;
  services: string[];
  targetCustomers: string[];
  businessGoals: string[];
  notes?: string;
  isDemo?: boolean;
}

export interface GrowthActionItem {
  id: string;
  category: 'QUICK_WIN' | 'GROWTH_PROJECT' | 'AI_OPPORTUNITY';
  priority: PriorityLevel;
  title: string;
  problem: string;
  action: string;
  reason: string;
  difficulty: 'Low' | 'Medium' | 'High';
  estimatedTime: string;
  toolsRequired: string[];
  kpi: string;
  measurementMethod: string;
  status: TaskStatus;
  weekNumber?: number;
  toolOrProcess?: string;
  quickActionType?: string;
  quickActionLabel?: string;
  quickActionPayload?: any;
}

export interface CustomerOpportunity {
  segment: string;
  likelyNeeds: string;
  suggestedApproach: string;
  priority: PriorityLevel;
}

export interface ServiceOpportunity {
  serviceName: string;
  rationale: string;
  visibilityAction: string;
  priority: PriorityLevel;
}

export interface MarketingOpportunity {
  channel: string;
  problem: string;
  currentSituation: string;
  recommendation: string;
  potentialBenefit: string;
  difficulty: 'Low' | 'Medium' | 'High';
  priority: PriorityLevel;
}

export interface AIBusinessOpportunity {
  area: string;
  problem: string;
  currentSituation: string;
  aiOpportunity: string;
  potentialSolution: string;
  humanInvolvementRequired: string;
  potentialBenefit: string;
  implementationDifficulty: 'Low' | 'Medium' | 'High';
  priority: PriorityLevel;
}

export type AIOpportunity = AIBusinessOpportunity;

export interface BusinessAnalysisResult {
  customerOpportunities: CustomerOpportunity[];
  serviceOpportunities: ServiceOpportunity[];
  marketingOpportunities: MarketingOpportunity[];
  aiOpportunities: AIBusinessOpportunity[];
  summaryNote: string;
}

export interface SEOIssue {
  id: string;
  category: 'Technical/On-page SEO' | 'Local SEO' | 'Conversion';
  issue: string;
  whyItMatters: string;
  recommendation: string;
  priority: PriorityLevel;
  effort: 'Low' | 'Medium' | 'High';
  exampleFix: string;
  quickActionLabel?: string;
  quickActionType?: string;
}

export interface SEOAuditResult {
  sourceType: 'url' | 'text' | 'file';
  sourceIdentifier: string;
  technicalIssues: SEOIssue[];
  localSeoIssues: SEOIssue[];
  conversionIssues: SEOIssue[];
  auditSummary: string;
}

export interface MarketingPlanTask {
  id: string;
  dayOrTiming: string;
  task: string;
  channel: string;
  purpose: string;
  estimatedTime: string;
  difficulty: 'Low' | 'Medium' | 'High';
  kpi: string;
  exampleOutput: string;
}

export interface MarketingPlanWeek {
  weekNumber: number;
  weekTitle: string;
  focusTheme: string;
  tasks: MarketingPlanTask[];
}

export interface MarketingPlan {
  goal: string;
  targetCustomer: string;
  servicesToPromote: string[];
  channels: string[];
  hoursPerWeek: number;
  budget: string;
  weeks: MarketingPlanWeek[];
}

export interface ContentDraft {
  platform: string;
  contentType: string;
  headline: string;
  hook: string;
  mainCopy: string;
  cta: string;
  suggestedVisual: string;
  hashtags: string[];
  safetyDisclaimer: string;
}

export interface GBPServiceItem {
  service: string;
  description: string;
}

export interface GBPPostIdea {
  title: string;
  body: string;
  callToAction: string;
  photoTip: string;
}

export interface GBPFaqItem {
  question: string;
  answer: string;
}

export interface GBPReviewTemplate {
  scenario: string;
  template: string;
  rule: string;
}

export interface GBPData {
  businessDescription: string;
  serviceDescriptions: GBPServiceItem[];
  postIdeas: GBPPostIdea[];
  faqIdeas: GBPFaqItem[];
  reviewResponseTemplates: GBPReviewTemplate[];
  localContentIdeas: string[];
}

export interface AnalyticsRow {
  date: string;
  sessions: number;
  users: number;
  newUsers: number;
  trafficSource: string;
  landingPage: string;
  conversions: number;
  leads: number;
  revenue?: number;
  campaign?: string;
}

export interface AnalyticsSummary {
  totalSessions: number;
  totalUsers: number;
  totalNewUsers: number;
  totalConversions: number;
  totalLeads: number;
  totalRevenue: number;
  avgConversionRate: number;
  trafficSourceBreakdown: Record<string, { sessions: number; conversions: number; leads: number }>;
  topLandingPages: Array<{ page: string; sessions: number; conversions: number; conversionRate: number }>;
  topCampaigns: Array<{ campaign: string; sessions: number; conversions: number }>;
  insights: Array<{
    observation: string;
    possibleExplanation: string;
    recommendedTest: string;
  }>;
  executiveSummary: {
    whatHappened: string[];
    whyItMatters: string;
    whatToInvestigate: string[];
    whatToDoNext: string[];
  };
}

export interface AutomationWorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  isHumanCheckpoint: boolean;
  checkpointRequirement?: string;
}

export interface AutomationWorkflow {
  id: string;
  processName: string;
  currentProcess: string;
  repetitiveTasks: string[];
  workflowSteps: AutomationWorkflowStep[];
  humanApprovalPoints: string[];
  toolsRequired: string[];
  risksAndPrivacyControls: string[];
  implementationDifficulty: 'Low' | 'Medium' | 'High';
  potentialBusinessBenefit: string;
}

export interface ConsultantProject {
  enabled: boolean;
  clientName: string;
  agencyName?: string;
  clientCode?: string;
  business?: string;
  industry?: string;
  website?: string;
  objectives?: string;
  date?: string;
  notes?: string;
}
