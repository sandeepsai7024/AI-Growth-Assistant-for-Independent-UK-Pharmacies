import {
  PharmacyProfile,
  BusinessAnalysisResult,
  SEOAuditResult,
  MarketingPlan,
  ContentDraft,
  GBPData,
  AutomationWorkflow,
  GrowthActionItem
} from '../types/pharmacy';
import {
  DEMO_BUSINESS_ANALYSIS,
  DEMO_SEO_AUDIT,
  DEMO_MARKETING_PLAN,
  DEMO_GBP_DATA,
  DEMO_AUTOMATION_WORKFLOW,
  DEMO_ACTIONS
} from '../data/demoData';

const BASE_API_URL = '/api/ai/generate';

async function callAIGenerate(prompt: string, systemInstruction?: string, responseJson = false): Promise<string> {
  const response = await fetch(BASE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, systemInstruction, responseJson }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${response.status}`);
  }

  const data = await response.json();
  return data.text || '';
}

export const aiService = {
  async generateBusinessAnalysis(profile: PharmacyProfile): Promise<BusinessAnalysisResult> {
    const prompt = `
Generate an AI Business Analysis for this UK independent community pharmacy.
Pharmacy Profile:
Name: ${profile.name}
Location: ${profile.location}
Website: ${profile.website}
Branches: ${profile.branches}
Staff: ${profile.staffSize}
Services offered: ${profile.services.join(', ')}
Target Customers: ${profile.targetCustomers.join(', ')}
Business Goals: ${profile.businessGoals.join(', ')}
Additional Notes: ${profile.notes || 'None'}

Return a JSON object conforming to this schema:
{
  "customerOpportunities": [
    {
      "segment": "name of target customer group",
      "likelyNeeds": "specific health & convenience needs (no medical diagnosis claims)",
      "suggestedApproach": "actionable marketing or service touchpoint",
      "priority": "HIGH PRIORITY" | "MEDIUM PRIORITY" | "LOW PRIORITY" | "QUICK WIN" | "LONGER-TERM OPPORTUNITY"
    }
  ],
  "serviceOpportunities": [
    {
      "serviceName": "name of NHS or private pharmacy service",
      "rationale": "why this service deserves stronger visibility and commercial potential",
      "visibilityAction": "specific action to market this service",
      "priority": "HIGH PRIORITY" | "QUICK WIN" | "MEDIUM PRIORITY"
    }
  ],
  "marketingOpportunities": [
    {
      "channel": "e.g. Local SEO, Website, Content, Social media, Email, Customer retention, Reviews, Partnerships",
      "problem": "current bottleneck",
      "currentSituation": "what is likely happening",
      "recommendation": "what to do",
      "potentialBenefit": "business upside (no fake guarantees)",
      "difficulty": "Low" | "Medium" | "High",
      "priority": "HIGH PRIORITY" | "QUICK WIN" | "MEDIUM PRIORITY"
    }
  ],
  "aiOpportunities": [
    {
      "area": "name of repetitive process",
      "problem": "what slows down pharmacy team",
      "currentSituation": "current manual workflow",
      "aiOpportunity": "how AI assists",
      "potentialSolution": "tools/workflow",
      "humanInvolvementRequired": "crucial human review checkpoint",
      "potentialBenefit": "operational hours/efficiency gained",
      "implementationDifficulty": "Low" | "Medium" | "High",
      "priority": "HIGH PRIORITY" | "QUICK WIN"
    }
  ],
  "summaryNote": "2-3 concise sentences summarizing key strategic takeaways"
}

Provide realistic UK pharmacy opportunities (NHS Pharmacy First, travel health clinics, electronic repeat dispensing, flu/covid vaccination, health checks).
`;

    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err) {
      console.warn('Using enriched fallback business analysis:', err);
      return {
        ...DEMO_BUSINESS_ANALYSIS,
        summaryNote: `Analysis tailored for ${profile.name} (${profile.location}). Core growth priority is expanding awareness of ${profile.services.slice(0, 3).join(', ')} while streamlining repetitive customer inquiries.`
      };
    }
  },

  async generateSeoAudit(sourceType: 'url' | 'text' | 'file', inputContent: string, profile: PharmacyProfile): Promise<SEOAuditResult> {
    const prompt = `
Perform a detailed Website and SEO Audit for this UK Independent Pharmacy.
Pharmacy: ${profile.name} located in ${profile.location}.
Source Type: ${sourceType}
Input Data Provided: ${inputContent || 'No raw website text provided, analyze typical independent pharmacy site structure based on URL/name'}

Never pretend to have accessed or crawled a live website if raw content was not provided. Instead, evaluate the provided input or provide a rigorous checklist of on-page, local SEO, and conversion issues.

Return a JSON object conforming to this schema:
{
  "sourceType": "${sourceType}",
  "sourceIdentifier": "${inputContent.substring(0, 80) || profile.website}",
  "technicalIssues": [
    {
      "id": "tech-1",
      "category": "Technical/On-page SEO",
      "issue": "specific issue description",
      "whyItMatters": "commercial/SEO impact",
      "recommendation": "step-by-step fix",
      "priority": "HIGH PRIORITY" | "QUICK WIN" | "MEDIUM PRIORITY",
      "effort": "Low" | "Medium" | "High",
      "exampleFix": "code or exact copy example",
      "quickActionLabel": "Generate SEO Title / Meta Desc / Schema",
      "quickActionType": "seo_title"
    }
  ],
  "localSeoIssues": [
    {
      "id": "loc-1",
      "category": "Local SEO",
      "issue": "local search ranking issue",
      "whyItMatters": "local map pack and patient footfall impact",
      "recommendation": "what to improve",
      "priority": "HIGH PRIORITY" | "QUICK WIN" | "MEDIUM PRIORITY",
      "effort": "Low" | "Medium" | "High",
      "exampleFix": "exact landing page URL or GBP category recommendation",
      "quickActionLabel": "Generate Landing Page Outline",
      "quickActionType": "page_outline"
    }
  ],
  "conversionIssues": [
    {
      "id": "conv-1",
      "category": "Conversion",
      "issue": "friction in patient booking or enquiry journey",
      "whyItMatters": "loss of high-value clinic appointments",
      "recommendation": "how to improve CTA or booking",
      "priority": "HIGH PRIORITY" | "QUICK WIN" | "MEDIUM PRIORITY",
      "effort": "Low" | "Medium" | "High",
      "exampleFix": "exact button wording or trust badge placement",
      "quickActionLabel": "Generate Improved CTA",
      "quickActionType": "cta"
    }
  ],
  "auditSummary": "2-3 sentences synthesizing the audit outcome"
}
`;

    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn('Using structured fallback SEO audit:', err);
      return {
        ...DEMO_SEO_AUDIT,
        sourceIdentifier: inputContent || profile.website,
        auditSummary: `Audit completed for ${profile.name}. Top priorities: optimise title tags for local search ('${profile.location}'), establish standalone service pages for high-margin private clinics, and add sticky mobile booking CTAs.`
      };
    }
  },

  async generateMarketingPlan(profile: PharmacyProfile, inputs: { goal: string; targetCustomer: string; services: string[]; channels: string[]; hoursPerWeek: number; budget: string }): Promise<MarketingPlan> {
    const prompt = `
Create a realistic 30-Day Pharmacy Marketing Planner for an independent UK pharmacy.
Pharmacy: ${profile.name} in ${profile.location}
Goal: ${inputs.goal}
Target Customer: ${inputs.targetCustomer}
Services to promote: ${inputs.services.join(', ')}
Channels: ${inputs.channels.join(', ')}
Hours available per week: ${inputs.hoursPerWeek} hours
Budget: ${inputs.budget}

Divide the plan into 4 weeks:
WEEK 1: Foundation
WEEK 2: Content and visibility
WEEK 3: Engagement and conversion
WEEK 4: Measurement and optimisation

Do not recommend unrealistic daily workloads. Maximum 3-4 targeted tasks per week.
Return a JSON object conforming to:
{
  "goal": "${inputs.goal}",
  "targetCustomer": "${inputs.targetCustomer}",
  "servicesToPromote": ${JSON.stringify(inputs.services)},
  "channels": ${JSON.stringify(inputs.channels)},
  "hoursPerWeek": ${inputs.hoursPerWeek},
  "budget": "${inputs.budget}",
  "weeks": [
    {
      "weekNumber": 1,
      "weekTitle": "WEEK 1: Foundation",
      "focusTheme": "Core theme",
      "tasks": [
        {
          "id": "task-1",
          "dayOrTiming": "Day 1 (Monday)",
          "task": "Actionable task description",
          "channel": "Channel name",
          "purpose": "Business objective",
          "estimatedTime": "30 mins",
          "difficulty": "Low" | "Medium" | "High",
          "kpi": "Measurable KPI",
          "exampleOutput": "Concrete sample copy or asset outline"
        }
      ]
    }
  ]
}
`;

    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn('Using structured fallback marketing plan:', err);
      return {
        ...DEMO_MARKETING_PLAN,
        goal: inputs.goal,
        targetCustomer: inputs.targetCustomer,
        servicesToPromote: inputs.services,
        channels: inputs.channels,
        hoursPerWeek: inputs.hoursPerWeek,
        budget: inputs.budget
      };
    }
  },

  async generateContentDraft(
    profile: PharmacyProfile,
    platform: string,
    contentType: string,
    topicOrService?: string
  ): Promise<ContentDraft> {
    const prompt = `
Create an engaging, compliant marketing post for a UK Independent Community Pharmacy.
Pharmacy: ${profile.name}, ${profile.location}
Platform: ${platform}
Content Type: ${contentType}
Topic / Service focus: ${topicOrService || profile.services[0] || 'NHS Pharmacy First & Clinic Services'}

MANDATORY HEALTHCARE SAFETY INSTRUCTIONS:
- Do NOT diagnose users
- Do NOT prescribe medications
- Do NOT provide personalised clinical advice or dosages
- Do NOT make unsupported health claims or guarantee medical outcomes
- Include clear recommendations to speak with a pharmacist or healthcare professional for clinical advice.

Return a JSON object:
{
  "platform": "${platform}",
  "contentType": "${contentType}",
  "headline": "Punchy title/hook",
  "hook": "First 1-2 opening sentences to stop the scroll",
  "mainCopy": "Engaging, conversational, helpful body copy (approx 100-200 words)",
  "cta": "Clear call to action (e.g. visit us in Harborne / book online / call our dispensary)",
  "suggestedVisual": "Concrete suggestion for graphic, photo of consultation room, staff, or infographic",
  "hashtags": ["#UKPharmacy", "#PharmacyFirst", "#HealthTips", "#LocalCommunity"],
  "safetyDisclaimer": "AI-generated draft. Review for accuracy, regulatory requirements (GPhC) and pharmacy-specific policies before publishing."
}
`;

    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      return {
        platform,
        contentType,
        headline: `Need Rapid Health Advice in ${profile.location.split(',')[0]}? Your Community Pharmacist is Here to Help`,
        hook: `Did you know you can receive expert health consultations and NHS prescription treatments for 7 common conditions without waiting for a GP appointment?`,
        mainCopy: `Under the NHS Pharmacy First service at ${profile.name}, our qualified pharmacists can assess and treat earache, sore throat, sinusitis, infected insect bites, shingles, impetigo, and uncomplicated UTIs.\n\nWhether you're heading away on holiday and need travel vaccines or simply want a quick blood pressure check on your lunch break, our private consultation room is open with no long queues. Support your local independent healthcare team!`,
        cta: `Visit ${profile.name} today or call us to learn more about walk-in clinic availability.`,
        suggestedVisual: `Photo of the friendly ${profile.name} pharmacy team in front of the modern consultation room holding an NHS Pharmacy First guide.`,
        hashtags: ['#NHSPharmacyFirst', '#CommunityPharmacy', '#UKHealthcare', '#LocalPharmacy', '#HealthyLiving'],
        safetyDisclaimer: 'AI-generated draft. Review for accuracy, regulatory requirements and pharmacy-specific policies before publishing.'
      };
    }
  },

  async generateGbpContent(profile: PharmacyProfile): Promise<GBPData> {
    const prompt = `
Generate high-ranking, compliant Google Business Profile (GBP) local content for this UK community pharmacy:
Name: ${profile.name}
Location: ${profile.location}
Services: ${profile.services.join(', ')}

RULES:
- Never fabricate reviews or testimonials.
- Never encourage fake reviews or review manipulation.
- Focus on local community discoverability, opening hours reassurance, and walk-in consultation clarity.

Return JSON conforming to:
{
  "businessDescription": "max 750 character professional description",
  "serviceDescriptions": [
    { "service": "service name", "description": "max 300 characters description" }
  ],
  "postIdeas": [
    { "title": "post title", "body": "100 words body", "callToAction": "Book / Call / Learn More", "photoTip": "recommended photo" }
  ],
  "faqIdeas": [
    { "question": "common local patient question", "answer": "clear reassuring answer" }
  ],
  "reviewResponseTemplates": [
    { "scenario": "e.g. Positive travel clinic / NHS service / Wait time feedback", "template": "compliant template", "rule": "privacy guidance" }
  ],
  "localContentIdeas": [
    "4-5 local content topics"
  ]
}
`;

    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      return DEMO_GBP_DATA;
    }
  },

  async generateAutomationWorkflow(profile: PharmacyProfile, processDescription: string): Promise<AutomationWorkflow> {
    const prompt = `
Analyze a repetitive pharmacy business process and produce a realistic AI automation workflow.
Pharmacy: ${profile.name}
Repetitive Process Described by User: "${processDescription}"

CRITICAL HEALTHCARE SAFETY & PRIVACY RULES:
- The system must NOT automatically send sensitive healthcare or clinical diagnosis advice.
- Mandatory human approval points must be explicitly highlighted.
- Emphasize patient data privacy, GDPR, and GPhC regulatory standards.

Return JSON:
{
  "id": "workflow-${Date.now()}",
  "processName": "Clear name of process",
  "currentProcess": "Summary of manual bottleneck",
  "repetitiveTasks": ["task 1", "task 2", "task 3"],
  "workflowSteps": [
    {
      "stepNumber": 1,
      "title": "STEP NAME",
      "description": "what happens",
      "isHumanCheckpoint": boolean,
      "checkpointRequirement": "if human checkpoint, what staff must check"
    }
  ],
  "humanApprovalPoints": ["specific human check rule 1", "rule 2"],
  "toolsRequired": ["e.g. Make.com, Google Workspace, Calendly, Pharmacy Email"],
  "risksAndPrivacyControls": ["privacy risk control 1", "control 2"],
  "implementationDifficulty": "Low" | "Medium" | "High",
  "potentialBusinessBenefit": "hours saved and customer service impact"
}
`;

    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      return {
        ...DEMO_AUTOMATION_WORKFLOW,
        processName: `Automated Workflow for: ${processDescription.substring(0, 50)}...`,
        currentProcess: processDescription
      };
    }
  },

  async executeQuickAction(
    actionType: string,
    context: any,
    profile: PharmacyProfile
  ): Promise<{ title: string; output: string; instructions: string }> {
    const prompt = `
You are the UK Pharmacy AI Growth Assistant. Generate an immediate, practical business asset for:
Action Type: ${actionType}
Pharmacy: ${profile.name}, ${profile.location}
Context: ${JSON.stringify(context)}

Produce:
1. Title
2. Practical Ready-to-Use Output (e.g. actual copy, code snippet, outline, email draft, or checklist)
3. 2-step Instructions on where to paste or apply this in the pharmacy business.

Keep it concise, strictly compliant with UK pharmacy regulations, and practical.
Return JSON:
{
  "title": "Title of generated asset",
  "output": "The full copy, code, or structured text",
  "instructions": "Simple instructions for implementation"
}
`;

    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      // Fallback based on type
      if (actionType === 'seo_title') {
        return {
          title: 'Optimized Local SEO Title Tags',
          output: `Primary Homepage Title:\n${profile.name} | NHS Pharmacy First & Travel Clinic in ${profile.location.split(',')[0]}\n\nTravel Health Page Title:\nPrivate Travel Health Clinic ${profile.location.split(',')[0]} | Same-Day Vaccinations | ${profile.name}`,
          instructions: 'Copy and paste into your website CMS (WordPress / Shopify / Wix) under Page Settings > SEO > Meta Title.'
        };
      }
      if (actionType === 'meta_desc') {
        return {
          title: 'High-Converting Meta Descriptions',
          output: `Walk-in NHS Pharmacy First and private clinic services at ${profile.name} in ${profile.location.split(',')[0]}. Same-day travel vaccines, free blood pressure checks, and prescription dispensing. Book online or visit today.`,
          instructions: 'Paste into your CMS Page Settings > SEO > Meta Description. Keep under 160 characters.'
        };
      }
      if (actionType === 'cta') {
        return {
          title: 'High-Converting Sticky Mobile CTAs',
          output: `Primary Header Button: [📅 Book Clinic Appointment]\nSecondary Floating Sticky Bar (Mobile): [📞 Call Pharmacist: 0121...] [⚡ Book Travel Vaccine]\n\nMicrocopy beneath button:\n"NHS & Private Services • No GP Referral Needed • Walk-ins Welcome"`,
          instructions: 'Ask your web developer or update your site theme to display this sticky bar on mobile devices.'
        };
      }
      if (actionType === 'gbp_post') {
        return {
          title: 'Ready-to-Post Google Business Profile Update',
          output: `Heading: Need travel vaccines in ${profile.location.split(',')[0]}?\n\nBody:\nTraveling abroad this season? Yellow fever, hepatitis, typhoid, and anti-malaria treatments are available right here at ${profile.name}.\n\n✅ Walk-in or same-day appointments\n✅ Official vaccination certificates\n✅ Destination-specific health checks\n\nTap 'Book' below or call into our high street branch today!`,
          instructions: 'Log into google.com/business > Add Update > paste text and select "Book" button with your appointment URL.'
        };
      }
      return {
        title: 'Actionable Implementation Asset',
        output: `Asset generated for ${profile.name}:\n\n1. Target Audience: Local patients in ${profile.location}\n2. Core Message: Accessible healthcare without GP appointment backlogs\n3. Call to Action: Visit ${profile.website} or drop in today.`,
        instructions: 'Deploy in your marketing channels and review results in 14 days.'
      };
    }
  },

  async generateGrowthPlan(profile: PharmacyProfile): Promise<GrowthActionItem[]> {
    const prompt = `
Generate a realistic, prioritised 30-day growth action plan for an independent UK pharmacy:
Name: ${profile.name}
Location: ${profile.location}
Services: ${profile.services.join(', ')}
Goals: ${profile.businessGoals.join(', ')}

Return a JSON array of 6-8 prioritized actions:
[
  {
    "id": "act-1",
    "category": "QUICK_WIN" | "GROWTH_PROJECT" | "AI_OPPORTUNITY",
    "priority": "HIGH PRIORITY" | "MEDIUM PRIORITY" | "LOW PRIORITY" | "QUICK WIN" | "LONGER-TERM OPPORTUNITY",
    "title": "Action title",
    "problem": "What bottleneck or gap this addresses",
    "action": "Concrete operational steps to take",
    "reason": "Commercial justification",
    "difficulty": "Low" | "Medium" | "High",
    "estimatedTime": "1 hour" / "2 days",
    "toolsRequired": ["Tool 1", "Tool 2"],
    "toolOrProcess": "Primary tool or process",
    "weekNumber": 1,
    "kpi": "Specific metric to track",
    "measurementMethod": "How to verify success",
    "status": "not_started"
  }
]
`;
    try {
      const text = await callAIGenerate(prompt, undefined, true);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn('Using structured fallback growth plan:', err);
      return DEMO_ACTIONS;
    }
  }
};

