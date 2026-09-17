import { useState } from 'react';
import {
  PharmacyProfile,
  BusinessAnalysisResult,
  SEOAuditResult,
  MarketingPlan,
  GrowthActionItem,
  AnalyticsSummary
} from '../types/pharmacy';
import {
  FileCheck,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface Props {
  profile: PharmacyProfile;
  analysis: BusinessAnalysisResult;
  seoAudit: SEOAuditResult;
  marketingPlan: MarketingPlan;
  actions: GrowthActionItem[];
  analyticsSummary: AnalyticsSummary;
}

export function ReportsView({
  profile,
  analysis,
  seoAudit,
  marketingPlan,
  actions,
  analyticsSummary,
}: Props) {
  const [reportType, setReportType] = useState<'executive' | 'seo' | 'marketing' | 'automation' | 'full'>('executive');
  const [copied, setCopied] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const generateReportText = () => {
    const divider = '============================================================';
    let text = `AI GROWTH REPORT: ${profile.name.toUpperCase()}\nDate: ${currentDate}\nLocation: ${profile.location}\nWebsite: ${profile.website}\nReport Type: ${reportType.toUpperCase()}\n${divider}\n\n`;

    text += `MANDATORY DISCLAIMER:\nThis report is generated for business, marketing, and operational planning purposes only. It does not provide medical, prescribing, or clinical diagnostic advice. All clinical services must comply with General Pharmaceutical Council (GPhC) standards and NHS service specifications.\n\n${divider}\n\n`;

    if (reportType === 'executive' || reportType === 'full') {
      text += `1. EXECUTIVE BUSINESS SUMMARY\n\n`;
      text += `Strategic Summary: ${analysis.summaryNote}\n\n`;
      text += `Current Services: ${profile.services.join(', ')}\n`;
      text += `Target Patient Groups: ${profile.targetCustomers.join(', ')}\n`;
      text += `Primary Business Goals: ${profile.businessGoals.join(', ')}\n\n`;
      text += `Analytics Snapshot: ${analyticsSummary.totalSessions} sessions recorded, ${analyticsSummary.totalConversions} online appointments booked (${analyticsSummary.avgConversionRate.toFixed(1)}% conversion rate), £${analyticsSummary.totalRevenue} private clinic revenue.\n\n`;
    }

    if (reportType === 'seo' || reportType === 'full') {
      text += `2. WEBSITE & SEO AUDIT FINDINGS\n\n`;
      text += `Executive Summary: ${seoAudit.auditSummary}\n\n`;
      text += `Technical & On-Page Issues:\n`;
      seoAudit.technicalIssues.forEach((issue, i) => {
        text += `  [${issue.priority}] ${issue.issue}\n    Why: ${issue.whyItMatters}\n    Recommendation: ${issue.recommendation}\n`;
      });
      text += `\nLocal SEO & Catchment Visibility:\n`;
      seoAudit.localSeoIssues.forEach((issue, i) => {
        text += `  [${issue.priority}] ${issue.issue}\n    Recommendation: ${issue.recommendation}\n`;
      });
      text += `\nConversion Roadblocks:\n`;
      seoAudit.conversionIssues.forEach((issue, i) => {
        text += `  [${issue.priority}] ${issue.issue}\n    Recommendation: ${issue.recommendation}\n`;
      });
      text += `\n\n`;
    }

    if (reportType === 'marketing' || reportType === 'full') {
      text += `3. 30-DAY PHARMACY MARKETING PLAN\n\n`;
      text += `Primary Campaign Goal: ${marketingPlan.goal}\n`;
      text += `Target Patient Audience: ${marketingPlan.targetCustomer}\n`;
      text += `Budget / Allocation: ${marketingPlan.budget} (${marketingPlan.hoursPerWeek} hrs/week)\n\n`;
      marketingPlan.weeks.forEach((week) => {
        text += `Week ${week.weekNumber}: ${week.weekTitle} (${week.focusTheme})\n`;
        week.tasks.forEach((task) => {
          text += `  - [${task.dayOrTiming} / ${task.channel}] ${task.task} (KPI: ${task.kpi})\n`;
        });
        text += `\n`;
      });
    }

    if (reportType === 'automation' || reportType === 'full') {
      text += `4. AI AUTOMATION & OPERATIONAL EFFICIENCY OPPORTUNITIES\n\n`;
      analysis.aiOpportunities.forEach((opp, i) => {
        text += `  Opportunity ${i + 1}: ${opp.area} [${opp.priority}]\n`;
        text += `    Manual Bottleneck: ${opp.problem}\n`;
        text += `    AI Assistance: ${opp.aiOpportunity}\n`;
        text += `    Required Human Verification: ${opp.humanInvolvementRequired}\n`;
        text += `    Expected Benefit: ${opp.potentialBenefit}\n\n`;
      });
    }

    if (reportType === 'executive' || reportType === 'full') {
      text += `5. PRIORITISED IMMEDIATE ACTIONS (NEXT 30 DAYS)\n\n`;
      actions.forEach((act, idx) => {
        const week = act.weekNumber || (idx < 2 ? 1 : idx < 4 ? 2 : idx < 6 ? 3 : 4);
        text += `${idx + 1}. [${act.priority}] ${act.title} (Week ${week})\n`;
        text += `   Action: ${act.action}\n`;
        text += `   Difficulty: ${act.difficulty} | Time: ${act.estimatedTime} | KPI: ${act.kpi}\n\n`;
      });
    }

    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateReportText();
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${profile.name.replace(/\s+/g, '_')}_Growth_Report.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Commercial Reports & Executive Export
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Generate clean, professional intelligence reports for pharmacy partners, superintendent pharmacists, or marketing coordinators.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Report'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .TXT</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Template Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setReportType('executive')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            reportType === 'executive'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Executive Summary Report
        </button>
        <button
          onClick={() => setReportType('seo')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            reportType === 'seo'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Website & SEO Audit Report
        </button>
        <button
          onClick={() => setReportType('marketing')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            reportType === 'marketing'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          30-Day Marketing Plan
        </button>
        <button
          onClick={() => setReportType('automation')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            reportType === 'automation'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          AI Opportunities Report
        </button>
        <button
          onClick={() => setReportType('full')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            reportType === 'full'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Full Comprehensive Growth Plan
        </button>
      </div>

      {/* Formatted Report Preview Canvas (Print Ready) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs font-serif space-y-6 max-w-4xl mx-auto print:shadow-none print:border-none">
        {/* Printable Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 font-sans">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
              COMMERCIAL INTELLIGENCE & MARKETING AUDIT
            </span>
            <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
            <p className="text-xs text-slate-500">{profile.location} • {profile.website}</p>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono">
            <div>Date: {currentDate}</div>
            <div>Prepared for: Superintendent Pharmacist / Director</div>
          </div>
        </div>

        {/* Mandatory Legal & Clinical Disclaimer */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-600 leading-relaxed">
          <strong className="text-slate-800 block mb-0.5">MANDATORY REGULATORY DISCLAIMER:</strong>
          This report is generated for business, marketing, and operational planning purposes only. It does not provide medical, prescribing, or clinical diagnostic advice. All clinical services must comply with General Pharmaceutical Council (GPhC) standards, NHS service specifications, and local formulary rules.
        </div>

        {/* Report Preview Body in Typography */}
        <div className="text-sm font-sans space-y-6 text-slate-800 leading-relaxed">
          {(reportType === 'executive' || reportType === 'full') && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 font-sans">
                1. Executive Strategic Assessment
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
                {analysis.summaryNote}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="font-bold text-slate-700 block mb-1">Services Assessed:</span>
                  <span className="text-slate-600">{profile.services.join(', ')}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="font-bold text-slate-700 block mb-1">Target Patient Base:</span>
                  <span className="text-slate-600">{profile.targetCustomers.join(', ')}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="font-bold text-slate-700 block mb-1">Commercial Goals:</span>
                  <span className="text-slate-600">{profile.businessGoals.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {(reportType === 'seo' || reportType === 'full') && (
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 font-sans">
                2. Website, Local SEO & Conversion Findings
              </h2>
              <p className="text-xs text-slate-600">{seoAudit.auditSummary}</p>

              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Priority Recommendations:
                </h3>
                {seoAudit.technicalIssues.concat(seoAudit.conversionIssues).slice(0, 4).map((issue, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900">[{issue.priority}] {issue.issue}</span>
                    <p className="text-slate-600 mt-1">{issue.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(reportType === 'marketing' || reportType === 'full') && (
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 font-sans">
                3. 30-Day Campaign Blueprint
              </h2>
              <p className="text-xs text-slate-600">
                Sprint Goal: <strong className="text-slate-900">{marketingPlan.goal}</strong> | Target: <strong className="text-slate-900">{marketingPlan.targetCustomer}</strong>
              </p>

              <div className="space-y-3 text-xs">
                {marketingPlan.weeks.map((w) => (
                  <div key={w.weekNumber} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                    <span className="font-bold text-emerald-800">Week {w.weekNumber}: {w.weekTitle}</span>
                    <div className="mt-1.5 space-y-1">
                      {w.tasks.map((t, i) => (
                        <div key={i} className="text-slate-700">
                          • [{t.channel}] <strong>{t.task}</strong> — {t.purpose}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(reportType === 'automation' || reportType === 'full') && (
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 font-sans">
                4. Safe AI Automation Candidates
              </h2>
              <div className="space-y-2 text-xs">
                {analysis.aiOpportunities.map((ai, idx) => (
                  <div key={idx} className="p-3 bg-purple-50/50 border border-purple-200 rounded-xl">
                    <strong className="text-purple-900 block font-semibold">{ai.area} [{ai.priority}]</strong>
                    <p className="text-slate-700 mt-0.5">{ai.aiOpportunity}</p>
                    <span className="text-amber-800 text-[11px] block mt-1">
                      Required Human Control: {ai.humanInvolvementRequired}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(reportType === 'executive' || reportType === 'full') && (
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 font-sans">
                5. Immediate 30-Day Growth Actions
              </h2>
              <div className="space-y-2 text-xs">
                {actions.map((act, idx) => (
                  <div key={act.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="text-slate-900">{act.title}</strong>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded ml-2 font-mono">
                        {act.priority}
                      </span>
                      <p className="text-slate-600 mt-0.5">{act.action}</p>
                      <span className="text-emerald-700 text-[11px] block mt-0.5">
                        Measurement: {act.measurementMethod} (KPI: {act.kpi})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
