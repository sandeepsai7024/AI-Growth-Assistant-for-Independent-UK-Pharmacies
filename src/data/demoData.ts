import {
  PharmacyProfile,
  BusinessAnalysisResult,
  SEOAuditResult,
  MarketingPlan,
  GBPData,
  AnalyticsRow,
  AutomationWorkflow,
  GrowthActionItem
} from '../types/pharmacy';

export const DEMO_PHARMACY_PROFILE: PharmacyProfile = {
  name: "GreenCare Pharmacy",
  location: "Harborne, Birmingham, B17 9NT, UK",
  website: "https://www.greencarepharmacy-birmingham.co.uk",
  branches: 1,
  staffSize: "6-10 staff (2 Full-time Pharmacists, 3 Dispensers, 2 Counter Staff)",
  services: [
    "NHS Pharmacy First",
    "NHS Flu & COVID-19 Vaccinations",
    "NHS Blood Pressure Checks",
    "NHS Pharmacy Contraception Service",
    "Prescription services (EPS & Delivery)",
    "Private Travel Health Clinic",
    "Weight management clinic",
    "Minor ailment support",
    "Health checks"
  ],
  targetCustomers: [
    "Local families",
    "Older adults & retirees",
    "Working professionals",
    "Private healthcare customers"
  ],
  businessGoals: [
    "Increase private-service bookings",
    "Improve local SEO",
    "Increase appointments",
    "Increase local awareness",
    "Reduce repetitive administrative work",
    "Improve website conversion"
  ],
  notes: "Long-established community pharmacy on a busy high street in South-West Birmingham. High prescription volume, but private clinic capacity is currently only 35% booked.",
  isDemo: true
};

export const ALL_AVAILABLE_SERVICES = [
  "NHS Pharmacy First",
  "NHS Flu & COVID-19 Vaccinations",
  "NHS Blood Pressure Checks",
  "NHS Pharmacy Contraception Service",
  "Prescription services (EPS & Delivery)",
  "Private Travel Health Clinic",
  "Private Consultations",
  "Weight management clinic",
  "Smoking cessation",
  "Minor ailment support",
  "Health checks",
  "Beauty & skincare / wellness",
  "Ear wax microsuction",
  "Online order / delivery services",
  "Supervised consumption / needle exchange",
  "Other specialized private services"
];

export const ALL_CUSTOMER_GROUPS = [
  "Local families with children",
  "Older adults & retirees (65+)",
  "Working professionals & commuters",
  "Students & young adults",
  "Local residents & general public",
  "Private healthcare & corporate clients"
];

export const ALL_BUSINESS_GOALS = [
  "Increase local awareness",
  "Increase enquiries",
  "Increase appointments",
  "Increase private-service bookings",
  "Improve website conversion",
  "Improve local SEO",
  "Increase repeat customers",
  "Improve social media",
  "Reduce repetitive administrative work",
  "Introduce AI",
  "Improve reporting"
];

export const DEMO_ACTIONS: GrowthActionItem[] = [
  {
    id: "act-1",
    category: "QUICK_WIN",
    priority: "HIGH PRIORITY",
    title: "Add One-Click Booking CTAs on Travel Clinic Page",
    problem: "Travel health page receives 320 monthly visits but features only a general contact phone number and no direct booking button.",
    action: "Add a prominent 'Book Your Travel Vaccine Consultation' button linking directly to the online calendar above the fold.",
    reason: "Reduces friction for busy travelers looking for urgent appointment slots in South-West Birmingham.",
    difficulty: "Low",
    estimatedTime: "1 hour",
    toolsRequired: ["Website CMS (WordPress/Shopify)", "Calendar Booking Tool (Calendly/PharmaSys)"],
    toolOrProcess: "Website CMS & Calendar Booking Widget",
    weekNumber: 1,
    kpi: "Travel consultation booking conversion rate (target: from 1.2% to 4.5%)",
    measurementMethod: "Track button clicks in web analytics and completed appointment logs in dispensary calendar.",
    status: "not_started",
    quickActionLabel: "Generate Improved CTA",
    quickActionType: "cta"
  },
  {
    id: "act-2",
    category: "QUICK_WIN",
    priority: "HIGH PRIORITY",
    title: "Optimize Google Business Profile for 'Pharmacy First Harborne'",
    problem: "Google Business Profile primary category is set to generic 'Pharmacy', missing key high-intent service tags and local keywords.",
    action: "Add 'Travel clinic', 'Medical clinic' secondary categories, update weekly opening hours, and publish a GBP post detailing the 7 NHS Pharmacy First conditions.",
    reason: "Local map pack rankings trigger heavily for search terms like 'sore throat treatment near me' or 'walk in pharmacy birmingham'.",
    difficulty: "Low",
    estimatedTime: "45 minutes",
    toolsRequired: ["Google Business Profile Dashboard"],
    toolOrProcess: "Google Business Profile Manager",
    weekNumber: 1,
    kpi: "GBP discovery impressions & 'Direction Requests' (target: +30% in 30 days)",
    measurementMethod: "GBP performance insights dashboard monthly report.",
    status: "in_progress",
    quickActionLabel: "Generate GBP Post",
    quickActionType: "gbp_post"
  },
  {
    id: "act-3",
    category: "QUICK_WIN",
    priority: "MEDIUM PRIORITY",
    title: "Add WhatsApp Business Fast Enquiry Widget to Mobile Site",
    problem: "Mobile traffic represents 68% of visits, but phone line is frequently engaged during peak prescription dispensary hours (11am-2pm).",
    action: "Deploy a compliant WhatsApp Business chat widget for appointment inquiries and stock checks.",
    reason: "Allows patients to ask quick service availability questions without waiting in a telephone queue.",
    difficulty: "Low",
    estimatedTime: "2 hours",
    toolsRequired: ["WhatsApp Business App / Widget script"],
    toolOrProcess: "WhatsApp Business App",
    weekNumber: 2,
    kpi: "Inbound digital private service inquiries handled without phone congestion.",
    measurementMethod: "Weekly inbound chat log volume and booking attribution.",
    status: "not_started",
    quickActionLabel: "Generate Messaging Script",
    quickActionType: "workflow"
  },
  {
    id: "act-4",
    category: "GROWTH_PROJECT",
    priority: "HIGH PRIORITY",
    title: "Launch Dedicated Local Landing Page: 'Travel Clinic Birmingham Harborne'",
    problem: "Travel clinic is currently tucked into a single paragraph on the generic 'Private Services' page, ranking on page 4 of Google.",
    action: "Create an indexable standalone landing page with local schema, destination vaccine guides (Hepatitis, Typhoid, Yellow Fever, Rabies), pricing transparency, and FAQs.",
    reason: "Independent pharmacies in Birmingham charge £40-£90 per vaccine dose with high margin, but require organic search discovery.",
    difficulty: "Medium",
    estimatedTime: "1-2 weeks",
    toolsRequired: ["CMS Page Builder", "Local SEO Schema markup"],
    toolOrProcess: "CMS Landing Page Builder & Schema",
    weekNumber: 2,
    kpi: "Top 3 Google Search ranking for 'Travel Clinic Harborne / Birmingham B17'",
    measurementMethod: "Google Search Console organic position and landing page bookings.",
    status: "not_started",
    quickActionLabel: "Generate Service Page Outline",
    quickActionType: "page_outline"
  },
  {
    id: "act-5",
    category: "AI_OPPORTUNITY",
    priority: "HIGH PRIORITY",
    title: "Implement AI Triage Draft Assistant for Inbound Email Queries",
    problem: "Counter staff and pharmacists spend 45 minutes every morning replying manually to repetitive queries (opening times, flu jab stock, appointment reschedules).",
    action: "Deploy an AI email classification & draft generator that auto-tags queries and prepares draft replies for counter manager approval before sending.",
    reason: "Cuts response time from 24 hours to 10 minutes while preserving human safety checkpoints and avoiding any clinical prescribing advice.",
    difficulty: "Medium",
    estimatedTime: "3-5 days",
    toolsRequired: ["Email integration / Make / Zapier", "Pre-approved clinic policy templates"],
    toolOrProcess: "Email Draft Assistant with Human Checkpoint",
    weekNumber: 3,
    kpi: "Staff admin time saved (target: 3.5 hours saved per week per branch)",
    measurementMethod: "Weekly staff time tracking and email turnaround time.",
    status: "not_started",
    quickActionLabel: "Generate AI Workflow Diagram",
    quickActionType: "workflow"
  },
  {
    id: "act-6",
    category: "GROWTH_PROJECT",
    priority: "MEDIUM PRIORITY",
    title: "Local GP Surgery & Dental Practice Cross-Referral Campaign",
    problem: "Nearby dental practices and surgeries face 2-week appointment backlogs but unaware of GreenCare's private emergency clinics & Pharmacy First.",
    action: "Draft and deliver an informational B2B pack explaining walk-in Pharmacy First criteria and private urgent treatment pathways.",
    reason: "Direct clinical referral creates steady weekly appointment volume without continuous ad spend.",
    difficulty: "Medium",
    estimatedTime: "2 weeks",
    toolsRequired: ["Printed Information Letter", "Local Surgery directory"],
    toolOrProcess: "GP Practice Signposting Pack",
    weekNumber: 4,
    kpi: "Referred patients mentioning their surgery or dentist at counter.",
    measurementMethod: "Counter intake survey ('How did you hear about our clinic?').",
    status: "not_started",
    quickActionLabel: "Generate GP Outreach Letter",
    quickActionType: "content"
  }
];

export const DEMO_BUSINESS_ANALYSIS: BusinessAnalysisResult = {
  customerOpportunities: [
    {
      segment: "Overseas Leisure & Business Travellers",
      likelyNeeds: "Rapid Yellow Fever certification, anti-malaria tablets, last-minute travel immunisations before departures from Birmingham Airport.",
      suggestedApproach: "Promote express Saturday walk-in slots and destination-specific vaccine packages on website and local search.",
      priority: "HIGH PRIORITY"
    },
    {
      segment: "Parents of School-Age Children",
      likelyNeeds: "Fast same-day assessment for acute earache, sore throat, infected insect bites without waiting days for a GP appointment under NHS Pharmacy First.",
      suggestedApproach: "Educational community posts clarifying that pharmacists can provide prescription-only medicines directly when clinically suitable under the NHS scheme.",
      priority: "HIGH PRIORITY"
    },
    {
      segment: "Older Adults & Multi-Medication Patients",
      likelyNeeds: "Free NHS Blood Pressure checks, blister pack prescription management, free home delivery, and annual flu vaccinations.",
      suggestedApproach: "Clear window displays and high-contrast printed counter leaflets; outreach to local community centres and retirement housing.",
      priority: "MEDIUM PRIORITY"
    },
    {
      segment: "Working Professionals Seeking Weight Management",
      likelyNeeds: "Private lifestyle and clinical weight loss consultations (including regulated GLP-1 therapy options where clinically indicated).",
      suggestedApproach: "Discreet consultation room emphasis, evening appointment booking, and structured lifestyle support programs.",
      priority: "MEDIUM PRIORITY"
    }
  ],
  serviceOpportunities: [
    {
      serviceName: "Private Travel Health Clinic",
      rationale: "High customer lifetime value (£120-£250 average spend per family). GreenCare has certified staff but zero dedicated digital search visibility.",
      visibilityAction: "Create a dedicated landing page, publish pricing transparently, and register on UK travel health directories.",
      priority: "HIGH PRIORITY"
    },
    {
      serviceName: "NHS Pharmacy First Service",
      rationale: "Government-funded scheme pays £15 per consultation plus medicine fees. Community awareness remains under 40% across West Midlands.",
      visibilityAction: "Run a 30-day educational awareness campaign across local social channels and in-store dispensary bags detailing the 7 conditions.",
      priority: "HIGH PRIORITY"
    },
    {
      serviceName: "NHS Hypertension / Blood Pressure Checks",
      rationale: "Quick 10-minute intervention with NHS funding and potential GP referral; builds long-term patient loyalty.",
      visibilityAction: "Add an attention-grabbing 'Free NHS Blood Pressure Check in 10 Mins' badge on homepage and Google Business Profile.",
      priority: "QUICK WIN"
    }
  ],
  marketingOpportunities: [
    {
      channel: "Local SEO & Google Business Profile",
      problem: "Profile lacks secondary categories and localized service keywords.",
      currentSituation: "Ranking #8 on Google Maps for local queries beyond direct brand name.",
      recommendation: "Update GBP attributes, post 2x weekly service updates, and systematically invite satisfied clinic patients for honest Google reviews.",
      potentialBenefit: "Estimated +40% increase in calls and map direction requests within 60 days.",
      difficulty: "Low",
      priority: "QUICK WIN"
    },
    {
      channel: "Website Conversion Journey",
      problem: "No online booking integration. Users must call during busy opening hours.",
      currentSituation: "Website bounce rate is 64% on mobile devices.",
      recommendation: "Embed an accessible online appointment scheduler directly into top navigation and service pages.",
      potentialBenefit: "Captures evening and weekend appointment bookings when dispensary phone is closed.",
      difficulty: "Medium",
      priority: "HIGH PRIORITY"
    },
    {
      channel: "Community Social Media (Instagram / Facebook)",
      problem: "Irregular posting of stock photos without local staff presence or educational value.",
      currentSituation: "180 followers, zero engagement, sporadic updates.",
      recommendation: "Switch to 3 core post formats: 'Meet Your Pharmacist', 'Condition of the Week (Pharmacy First)', and 'Travel Health Checklist'.",
      potentialBenefit: "Builds high neighborhood trust and positions the pharmacy as the primary local health hub.",
      difficulty: "Low",
      priority: "MEDIUM PRIORITY"
    }
  ],
  aiOpportunities: [
    {
      area: "Inbound Patient Email & Website Query Triage",
      problem: "High volume of repetitive non-clinical inquiries draining dispensary technician time.",
      currentSituation: "Emails sit unanswered in a shared inbox for up to 36 hours.",
      aiOpportunity: "AI classifies incoming emails by category (Stock, Booking, Opening Hours, General Enquiry) and prepares draft replies.",
      potentialSolution: "Automated triage workflow in Make/Zapier connected to a safe pre-approved template knowledge base.",
      humanInvolvementRequired: "Designated pharmacy counter lead reviews, approves, or edits every draft before dispatch. Zero clinical decisions automated.",
      potentialBenefit: "Cuts response time from 36 hours to under 30 minutes; saves 4+ staff hours weekly.",
      implementationDifficulty: "Medium",
      priority: "HIGH PRIORITY"
    },
    {
      area: "Monthly Local Health Content & Social Media Generation",
      problem: "Staff struggle with writer's block and lack time to craft engaging UK pharmacy content.",
      currentSituation: "Social media and Google Business Profile go weeks without updates.",
      aiOpportunity: "Generate ready-to-review 30-day educational content calendars aligned with NHS national health awareness days.",
      potentialSolution: "Use the built-in Content Studio to batch 12 posts per month in 30 minutes.",
      humanInvolvementRequired: "Responsible pharmacist reviews copy for GPhC advertising compliance and accuracy before scheduling.",
      potentialBenefit: "Consistent online visibility with minimal managerial overhead.",
      implementationDifficulty: "Low",
      priority: "QUICK WIN"
    }
  ],
  summaryNote: "GreenCare Pharmacy possesses strong clinical foundation and a prime catchment area. The primary growth bottleneck is digital discovery: high searchers in Harborne are currently unaware of private travel and NHS Pharmacy First capabilities."
};

export const DEMO_SEO_AUDIT: SEOAuditResult = {
  sourceType: "url",
  sourceIdentifier: "https://www.greencarepharmacy-birmingham.co.uk",
  technicalIssues: [
    {
      id: "seo-tech-1",
      category: "Technical/On-page SEO",
      issue: "Homepage Title Tag is Generic ('Home - GreenCare Pharmacy')",
      whyItMatters: "Search engines and searchers cannot identify your geographic location or core medical services from the search result snippet.",
      recommendation: "Change title tag to: 'GreenCare Pharmacy | Travel Health & NHS Pharmacy First | Harborne, Birmingham'",
      priority: "QUICK WIN",
      effort: "Low",
      exampleFix: "<title>GreenCare Pharmacy | Travel Clinic & NHS Services in Harborne, Birmingham</title>",
      quickActionLabel: "Generate SEO Title",
      quickActionType: "seo_title"
    },
    {
      id: "seo-tech-2",
      category: "Technical/On-page SEO",
      issue: "Missing Meta Descriptions on Service Pages",
      whyItMatters: "Google will display random truncated body text on search engine result pages (SERPs), lowering click-through rates.",
      recommendation: "Add customized, benefit-driven 150-character meta descriptions for Travel Health, Pharmacy First, and Weight Management pages.",
      priority: "HIGH PRIORITY",
      effort: "Low",
      exampleFix: `<meta name="description" content="Walk-in NHS Pharmacy First and private travel vaccine clinic in Harborne, Birmingham. Same-day appointments available. Book online or visit GreenCare Pharmacy today." />`,
      quickActionLabel: "Generate Meta Description",
      quickActionType: "meta_desc"
    },
    {
      id: "seo-tech-3",
      category: "Technical/On-page SEO",
      issue: "Lack of Structured Schema Markup (Pharmacy / MedicalBusiness Schema)",
      whyItMatters: "Google cannot verify opening hours, accepted insurance/NHS status, or exact geo-coordinates for rich map snippets.",
      recommendation: "Implement JSON-LD Schema for Pharmacy / MedicalOrganization on all core pages.",
      priority: "MEDIUM PRIORITY",
      effort: "Medium",
      exampleFix: `{\n  "@context": "https://schema.org",\n  "@type": "Pharmacy",\n  "name": "GreenCare Pharmacy",\n  "telephone": "+441214000000",\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "High Street",\n    "addressLocality": "Harborne, Birmingham",\n    "postalCode": "B17 9NT",\n    "addressCountry": "UK"\n  }\n}`,
      quickActionLabel: "Generate Schema Markup",
      quickActionType: "schema"
    }
  ],
  localSeoIssues: [
    {
      id: "seo-local-1",
      category: "Local SEO",
      issue: "No Service + Location Dedicated Landing Pages",
      whyItMatters: "High-intent searches like 'Travel vaccines Harborne' or 'Ear microsuction South Birmingham' need specific landing pages to rank.",
      recommendation: "Build distinct landing pages for: 1) /travel-clinic-harborne, 2) /pharmacy-first-birmingham, 3) /blood-pressure-checks.",
      priority: "HIGH PRIORITY",
      effort: "Medium",
      exampleFix: "URL structure: /services/travel-clinic-harborne-birmingham with H1: 'Private Travel Health Clinic in Harborne, Birmingham'",
      quickActionLabel: "Generate Landing Page Outline",
      quickActionType: "page_outline"
    },
    {
      id: "seo-local-2",
      category: "Local SEO",
      issue: "Google Business Profile Lacks Clear Service Catalog Entries",
      whyItMatters: "Mobile users browsing Google Maps do not see prices, consultation duration, or booking links within the GBP interface.",
      recommendation: "Populate the GBP 'Services' tab with all 9 NHS and private services, complete with 300-character descriptions.",
      priority: "QUICK WIN",
      effort: "Low",
      exampleFix: "Add 'Travel Immunisations' under Services with description: 'Certified private travel clinic in Harborne. Comprehensive destination advice and vaccinations.'",
      quickActionLabel: "Generate GBP Descriptions",
      quickActionType: "gbp_descriptions"
    }
  ],
  conversionIssues: [
    {
      id: "seo-conv-1",
      category: "Conversion",
      issue: "Contact Form is Hidden at Bottom of Long Static Page",
      whyItMatters: "Mobile users drop off before scrolling past paragraphs of text; no sticky call or booking button.",
      recommendation: "Add a floating or sticky mobile header with two clear tap actions: [Call Pharmacy] and [Book Clinic Appointment].",
      priority: "QUICK WIN",
      effort: "Low",
      exampleFix: "Persistent bottom bar on mobile: 'Need urgent advice? [Call Pharmacist: 0121...] [Book Travel Clinic]'",
      quickActionLabel: "Generate Improved CTA",
      quickActionType: "cta"
    },
    {
      id: "seo-conv-2",
      category: "Conversion",
      issue: "Zero Visible Trust Signals (GPhC Badge, NHS Contract Logo, Real Patient Feedback)",
      whyItMatters: "Private healthcare customers hesitate to book without reassurance of clinical governance and verified pharmacy registration.",
      recommendation: "Display official General Pharmaceutical Council (GPhC) registration badge, NHS contracted provider logo, and an authentic Google Review badge.",
      priority: "MEDIUM PRIORITY",
      effort: "Low",
      exampleFix: "Trust strip banner: 'Registered with the General Pharmaceutical Council | NHS Contracted Community Pharmacy | 4.8★ on Google'",
      quickActionLabel: "Generate Trust Badge Strip",
      quickActionType: "trust_strip"
    }
  ],
  auditSummary: "GreenCare Pharmacy has a responsive base site, but suffers from low visibility for high-margin search terms due to generic title tags and lack of dedicated service landing pages. Simple quick wins on on-page SEO and sticky booking CTAs can dramatically improve consultation capture."
};

export const DEMO_MARKETING_PLAN: MarketingPlan = {
  goal: "Increase private travel clinic bookings and local NHS Pharmacy First awareness",
  targetCustomer: "Local families and busy professionals in Harborne & South Birmingham",
  servicesToPromote: ["Private Travel Health Clinic", "NHS Pharmacy First", "NHS Blood Pressure Checks"],
  channels: ["Google Business Profile", "Instagram/Facebook", "Website SEO", "In-store POS & Bag Inserts"],
  hoursPerWeek: 3,
  budget: "£150 - £250 / month (primarily organic + local print leaflets)",
  weeks: [
    {
      weekNumber: 1,
      weekTitle: "WEEK 1: Foundation & Digital Housekeeping",
      focusTheme: "Fixing profiles, updating directory listings, and establishing trust signals.",
      tasks: [
        {
          id: "w1-1",
          dayOrTiming: "Day 1 (Monday)",
          task: "Update Google Business Profile categories and add private travel clinic services with full descriptions.",
          channel: "Google Business Profile",
          purpose: "Ensure local map searches accurately reflect GreenCare's clinical capabilities.",
          estimatedTime: "45 mins",
          difficulty: "Low",
          kpi: "GBP profile completion score at 100%",
          exampleOutput: "Updated GBP with 8 detailed service cards and active clinic opening hours."
        },
        {
          id: "w1-2",
          dayOrTiming: "Day 3 (Wednesday)",
          task: "Update homepage title tag and meta description with targeted local keywords ('Harborne, Birmingham').",
          channel: "Website CMS",
          purpose: "Improve organic click-through rate from local Google Search.",
          estimatedTime: "30 mins",
          difficulty: "Low",
          kpi: "Updated SEO snippet preview visible in CMS",
          exampleOutput: "New title tag: 'GreenCare Pharmacy | Travel Health & NHS Services | Harborne, Birmingham'"
        },
        {
          id: "w1-3",
          dayOrTiming: "Day 5 (Friday)",
          task: "Print 500 A6 prescription bag inserts explaining NHS Pharmacy First (7 conditions you don't need a GP appointment for).",
          channel: "In-Store & Dispensary Bags",
          purpose: "Educate existing repeat prescription customers who currently wait days for a GP appointment.",
          estimatedTime: "1 hour",
          difficulty: "Low",
          kpi: "500 flyers distributed with regular dispensed medicines",
          exampleOutput: "'Did you know? Get same-day NHS prescription care for 7 common conditions right here at GreenCare Pharmacy.'"
        }
      ]
    },
    {
      weekNumber: 2,
      weekTitle: "WEEK 2: Content & Local Visibility",
      focusTheme: "Publishing educational, compliant content about travel season and seasonal ailments.",
      tasks: [
        {
          id: "w2-1",
          dayOrTiming: "Day 8 (Monday)",
          task: "Publish GBP post: 'Planning summer travels? Which vaccines do you need for Thailand, Kenya, or Costa Rica?'",
          channel: "Google Business Profile",
          purpose: "Capture early vacation planners searching on Google Maps.",
          estimatedTime: "20 mins",
          difficulty: "Low",
          kpi: "GBP post views and button clicks",
          exampleOutput: "Educational post with destination checklist and link to book travel consultation."
        },
        {
          id: "w2-2",
          dayOrTiming: "Day 10 (Wednesday)",
          task: "Post Instagram carousel: 'Pharmacist Guide: 7 Conditions Covered by NHS Pharmacy First'.",
          channel: "Instagram / Facebook",
          purpose: "Visual breakdown explaining how earache, impetigo, and sore throat are handled in pharmacy.",
          estimatedTime: "45 mins",
          difficulty: "Low",
          kpi: "Post saves and local shares",
          exampleOutput: "Clean, professional graphic breakdown of the 7 conditions with consultation room photo."
        },
        {
          id: "w2-3",
          dayOrTiming: "Day 12 (Friday)",
          task: "Send brief WhatsApp/SMS broadcast to opted-in patients: 'Reminder: Free NHS Blood Pressure check available without booking.'",
          channel: "SMS / WhatsApp Business",
          purpose: "Direct community touchpoint for health checks.",
          estimatedTime: "20 mins",
          difficulty: "Low",
          kpi: "Walk-in blood pressure check count in subsequent 48 hours",
          exampleOutput: "'Hi [Name], Pop into GreenCare Pharmacy this week for a free 5-minute NHS Blood Pressure check. No appointment needed!'"
        }
      ]
    },
    {
      weekNumber: 3,
      weekTitle: "WEEK 3: Engagement & Conversion",
      focusTheme: "Removing friction from appointment booking and activating partner referrals.",
      tasks: [
        {
          id: "w3-1",
          dayOrTiming: "Day 15 (Monday)",
          task: "Implement prominent sticky 'Book Consultation' button on website mobile header.",
          channel: "Website",
          purpose: "Convert mobile visitors into scheduled clinic bookings directly.",
          estimatedTime: "1 hour",
          difficulty: "Medium",
          kpi: "Mobile booking button click-through rate",
          exampleOutput: "Persistent button linking to Calendly/booking system."
        },
        {
          id: "w3-2",
          dayOrTiming: "Day 17 (Wednesday)",
          task: "Deliver briefing flyer to two adjacent GP surgeries and local dental practices introducing GreenCare's private travel and walk-in clinical capacity.",
          channel: "Local B2B Partnerships",
          purpose: "Enable GP receptionists to signpost overflow patients to community pharmacy.",
          estimatedTime: "1.5 hours",
          difficulty: "Medium",
          kpi: "GP signposted referrals recorded in dispensary",
          exampleOutput: "Formal clinical letter and patient signposting leaflets delivered to surgery practice managers."
        },
        {
          id: "w3-3",
          dayOrTiming: "Day 19 (Friday)",
          task: "Run review generation cycle: Counter staff hand small cards with QR code to satisfied private clinic patients.",
          channel: "In-Store & Google Reviews",
          purpose: "Earn genuine, verified Google reviews specifically mentioning clinic professionalism.",
          estimatedTime: "Ongoing (10 mins/day)",
          difficulty: "Low",
          kpi: "5 new 5-star Google reviews in 14 days",
          exampleOutput: "Discreet review card: 'Help our community! Share your experience with our pharmacist on Google.'"
        }
      ]
    },
    {
      weekNumber: 4,
      weekTitle: "WEEK 4: Measurement & Optimisation",
      focusTheme: "Reviewing metrics, adjusting high-performing channels, and locking in routine habits.",
      tasks: [
        {
          id: "w4-1",
          dayOrTiming: "Day 22 (Monday)",
          task: "Review Google Analytics & GBP insights: assess which services generated the most calls and clicks.",
          channel: "Analytics Dashboard",
          purpose: "Identify which services drove tangible inquiries.",
          estimatedTime: "40 mins",
          difficulty: "Low",
          kpi: "Completed monthly analytics audit",
          exampleOutput: "Comparison showing travel health page traffic up 45% and phone inquiries up 28%."
        },
        {
          id: "w4-2",
          dayOrTiming: "Day 25 (Thursday)",
          task: "Refine landing page content based on patient search questions received at the counter.",
          channel: "Website Blog / FAQ",
          purpose: "Answer real local customer questions to capture featured Google snippets.",
          estimatedTime: "45 mins",
          difficulty: "Medium",
          kpi: "3 new FAQ items published on Travel Health page",
          exampleOutput: "Published FAQs: 'How far in advance should I get yellow fever vaccines?' and 'Can children receive travel jabs here?'"
        },
        {
          id: "w4-3",
          dayOrTiming: "Day 28 (Sunday)",
          task: "Draft next month's 30-day theme focusing on autumn flu jab booking and winter ailments.",
          channel: "Planning",
          purpose: "Maintain momentum without last-minute panic.",
          estimatedTime: "30 mins",
          difficulty: "Low",
          kpi: "Next 30-day calendar populated",
          exampleOutput: "Pre-scheduled flu vaccination campaign ready for rollout."
        }
      ]
    }
  ]
};

export const DEMO_GBP_DATA: GBPData = {
  businessDescription: "GreenCare Pharmacy is an independent, community-focused NHS pharmacy and private clinical health centre in Harborne, Birmingham. We provide NHS Pharmacy First walk-in consultations, free blood pressure checks, electronic repeat prescription dispensing, and certified private travel health services (including yellow fever and anti-malaria). Our experienced registered pharmacists provide accessible healthcare and friendly advice for you and your family.",
  serviceDescriptions: [
    {
      service: "NHS Pharmacy First Service",
      description: "Get prompt NHS consultation and prescription-only treatments when clinically appropriate for 7 common conditions (sore throat, earache, sinusitis, impetigo, shingles, infected insect bites, uncomplicated UTIs in women) without waiting for a GP appointment."
    },
    {
      service: "Private Travel Health & Vaccination Clinic",
      description: "Certified travel health consultations and vaccinations for worldwide destinations. Yellow fever, Hepatitis A & B, Typhoid, Rabies, Meningitis ACWY, and anti-malaria medication. Same-day appointments available."
    },
    {
      service: "NHS Hypertension & Blood Pressure Checks",
      description: "Free NHS-funded blood pressure check for adults aged 40+ with no prior diagnosis. Fast 10-minute check in our private consultation room with immediate pharmacist advice."
    },
    {
      service: "Private Weight Management Consultations",
      description: "Comprehensive lifestyle, nutrition, and clinical weight management support overseen by qualified healthcare professionals."
    }
  ],
  postIdeas: [
    {
      title: "Traveling abroad this month? Check your vaccinations early!",
      body: "Did you know some travel vaccines require 2 to 4 weeks to generate full immunity before your flight? GreenCare Pharmacy in Harborne offers full travel consultations and vaccinations for destinations worldwide. Pop in or book your slot online today!",
      callToAction: "Book Appointment",
      photoTip: "Photo of your clean consultation room with travel health guide leaflets or pharmacist consulting a vaccine chart."
    },
    {
      title: "Skip the 8am GP phone queue for these 7 conditions",
      body: "Under the NHS Pharmacy First service, our pharmacists can assess and provide NHS treatments for: earache, sore throat, sinusitis, infected insect bites, shingles, impetigo, and uncomplicated UTIs. Walk in today for fast, professional care in Harborne.",
      callToAction: "Learn More",
      photoTip: "Photo of your pharmacy counter and welcoming dispensary staff smiling."
    },
    {
      title: "Free 10-Minute NHS Blood Pressure Check",
      body: "High blood pressure rarely has noticeable symptoms, but finding it early protects your heart and brain. If you are 40 or over and haven't had a check in 6 months, visit GreenCare Pharmacy for your free NHS check today.",
      callToAction: "Call Now",
      photoTip: "Photo of the blood pressure monitor in the consultation room."
    }
  ],
  faqIdeas: [
    {
      question: "Do I need a GP referral to use NHS Pharmacy First at GreenCare Pharmacy?",
      answer: "No referral is needed! You can walk in directly during opening hours or be signposted by NHS 111 or your local GP surgery. If you meet the clinical criteria, our pharmacist can supply medication directly."
    },
    {
      question: "How far in advance should I book my travel vaccines?",
      answer: "Ideally 4 to 8 weeks before your trip, as some vaccines require multiple doses over several weeks. However, we also offer express same-day appointments for last-minute travelers."
    },
    {
      question: "Can GreenCare Pharmacy manage my electronic repeat prescriptions?",
      answer: "Yes. Simply nominate GreenCare Pharmacy on your NHS App or inform our team, and your GP will send your electronic prescriptions (EPS) straight to us for collection or local delivery."
    }
  ],
  reviewResponseTemplates: [
    {
      scenario: "Positive Review for Travel Clinic Service",
      template: "Thank you so much for your kind words, [Name]! We are delighted to hear you had a thorough and reassuring travel consultation with our pharmacy team. Wishing you a safe and wonderful trip, and we look forward to welcoming you back!",
      rule: "Never disclose medical or vaccination details in public review responses to protect patient privacy."
    },
    {
      scenario: "Positive Review for NHS Pharmacy First / Quick Walk-in",
      template: "Thank you for taking the time to leave us a review, [Name]. We are glad we could assist you quickly under the NHS Pharmacy First service and save you a wait. Our team is always here whenever you need friendly healthcare advice!",
      rule: "Keep it warm and community-focused; reinforce local accessibility."
    },
    {
      scenario: "Neutral / Constructive Feedback Regarding Wait Times",
      template: "Thank you for your feedback, [Name]. We always aim to provide fast and attentive care, and we apologize if there was a brief delay during our peak prescription dispensing hours. We would welcome the chance to discuss your experience directly—please reach out to our pharmacy manager on [Phone/Email].",
      rule: "Acknowledge courteously, take discussion offline, and never argue or mention patient prescription details publicly."
    }
  ],
  localContentIdeas: [
    "Spotlight on Harborne High Street: How local independent pharmacies keep the community healthy",
    "Seasonal Hay Fever forecast & what antihistamines work best: Advice from your Birmingham Pharmacist",
    "Family Health Checklist for Back to School in South Birmingham",
    "Preparing for Umrah & Hajj: Essential meningitis vaccine guidance for local pilgrims"
  ]
};

export const DEMO_CSV_DATA: AnalyticsRow[] = [
  { date: "2026-08-01", sessions: 84, users: 76, newUsers: 62, trafficSource: "Organic Search", landingPage: "/travel-health", conversions: 4, leads: 3, revenue: 240, campaign: "seo-general" },
  { date: "2026-08-02", sessions: 62, users: 55, newUsers: 45, trafficSource: "Google Maps / GBP", landingPage: "/", conversions: 3, leads: 2, revenue: 90, campaign: "gbp-local" },
  { date: "2026-08-03", sessions: 110, users: 95, newUsers: 80, trafficSource: "Organic Search", landingPage: "/pharmacy-first", conversions: 6, leads: 5, revenue: 0, campaign: "seo-nhs" },
  { date: "2026-08-04", sessions: 45, users: 40, newUsers: 28, trafficSource: "Direct", landingPage: "/", conversions: 2, leads: 2, revenue: 60, campaign: "none" },
  { date: "2026-08-05", sessions: 38, users: 34, newUsers: 22, trafficSource: "Social (Instagram)", landingPage: "/pharmacy-first", conversions: 1, leads: 1, revenue: 0, campaign: "social-organic" },
  { date: "2026-08-06", sessions: 92, users: 81, newUsers: 68, trafficSource: "Organic Search", landingPage: "/travel-health", conversions: 5, leads: 4, revenue: 310, campaign: "seo-general" },
  { date: "2026-08-07", sessions: 78, users: 70, newUsers: 59, trafficSource: "Google Maps / GBP", landingPage: "/contact", conversions: 4, leads: 4, revenue: 120, campaign: "gbp-local" },
  { date: "2026-08-08", sessions: 125, users: 110, newUsers: 94, trafficSource: "Organic Search", landingPage: "/travel-health", conversions: 7, leads: 6, revenue: 420, campaign: "seo-general" },
  { date: "2026-08-09", sessions: 52, users: 46, newUsers: 33, trafficSource: "Direct", landingPage: "/prescriptions", conversions: 3, leads: 3, revenue: 0, campaign: "none" },
  { date: "2026-08-10", sessions: 105, users: 92, newUsers: 77, trafficSource: "Organic Search", landingPage: "/blood-pressure", conversions: 5, leads: 5, revenue: 0, campaign: "seo-nhs" },
  { date: "2026-08-11", sessions: 95, users: 84, newUsers: 70, trafficSource: "Google Maps / GBP", landingPage: "/", conversions: 6, leads: 5, revenue: 180, campaign: "gbp-local" },
  { date: "2026-08-12", sessions: 48, users: 42, newUsers: 30, trafficSource: "Social (Facebook)", landingPage: "/pharmacy-first", conversions: 2, leads: 2, revenue: 0, campaign: "social-organic" },
  { date: "2026-08-13", sessions: 135, users: 118, newUsers: 99, trafficSource: "Organic Search", landingPage: "/travel-health", conversions: 8, leads: 7, revenue: 510, campaign: "seo-general" },
  { date: "2026-08-14", sessions: 88, users: 79, newUsers: 65, trafficSource: "Organic Search", landingPage: "/weight-management", conversions: 3, leads: 3, revenue: 290, campaign: "seo-private" },
  { date: "2026-08-15", sessions: 112, users: 98, newUsers: 82, trafficSource: "Google Maps / GBP", landingPage: "/travel-health", conversions: 7, leads: 6, revenue: 380, campaign: "gbp-local" }
];

export const DEMO_CSV_STRING = `Date,Sessions,Users,New Users,Traffic Source,Landing Page,Conversions,Leads,Revenue,Campaign
2026-08-01,84,76,62,Organic Search,/travel-health,4,3,240,seo-general
2026-08-02,62,55,45,Google Maps / GBP,/,3,2,90,gbp-local
2026-08-03,110,95,80,Organic Search,/pharmacy-first,6,5,0,seo-nhs
2026-08-04,45,40,28,Direct,/,2,2,60,none
2026-08-05,38,34,22,Social (Instagram),/pharmacy-first,1,1,0,social-organic
2026-08-06,92,81,68,Organic Search,/travel-health,5,4,310,seo-general
2026-08-07,78,70,59,Google Maps / GBP,/contact,4,4,120,gbp-local
2026-08-08,125,110,94,Organic Search,/travel-health,7,6,420,seo-general
2026-08-09,52,46,33,Direct,/prescriptions,3,3,0,none
2026-08-10,105,92,77,Organic Search,/blood-pressure,5,5,0,seo-nhs
2026-08-11,95,84,70,Google Maps / GBP,/,6,5,180,gbp-local
2026-08-12,48,42,30,Social (Facebook),/pharmacy-first,2,2,0,social-organic
2026-08-13,135,118,99,Organic Search,/travel-health,8,7,510,seo-general
2026-08-14,88,79,65,Organic Search,/weight-management,3,3,290,seo-private
2026-08-15,112,98,82,Google Maps / GBP,/travel-health,7,6,380,gbp-local`;

export const DEMO_AUTOMATION_WORKFLOW: AutomationWorkflow = {
  id: "auto-demo-1",
  processName: "Inbound Email & Website Clinic Enquiry Management",
  currentProcess: "Counter staff check shared pharmacy Gmail account randomly between counter transactions. Inquiries are left unread for 24-48 hours. Staff manually type responses from scratch or phone patients while dispensary queue waits.",
  repetitiveTasks: [
    "Checking whether the enquiry is about prescription status, opening hours, or private clinic bookings",
    "Extracting patient contact telephone number, destination country, and travel departure date",
    "Looking up clinic calendar availability and copying clinic pricing details into draft emails",
    "Sending follow-up reminders to patients who inquired but haven't confirmed appointment"
  ],
  workflowSteps: [
    {
      stepNumber: 1,
      title: "NEW ENQUIRY ARRIVES",
      description: "Patient submits website contact form or sends an email to info@greencarepharmacy.co.uk.",
      isHumanCheckpoint: false
    },
    {
      stepNumber: 2,
      title: "AI CLASSIFIES ENQUIRY",
      description: "AI categorizes the message: [Travel Clinic / Pharmacy First / Opening Hours / Stock Inquiry / Prescription / Clinical Alert].",
      isHumanCheckpoint: false
    },
    {
      stepNumber: 3,
      title: "INFORMATION EXTRACTION",
      description: "AI extracts non-clinical metadata: preferred date, destination region, urgency level, contact phone number.",
      isHumanCheckpoint: false
    },
    {
      stepNumber: 4,
      title: "SAFE RESPONSE DRAFT GENERATED",
      description: "AI generates a courteous, compliant draft response utilizing GreenCare's verified clinic timetable and pre-approved service guidelines.",
      isHumanCheckpoint: false
    },
    {
      stepNumber: 5,
      title: "MANDATORY HUMAN CLINICAL/STAFF REVIEW",
      description: "Counter manager or dispenser reviews the draft in 20 seconds, verifies appointment slot availability, and clicks 'Approve & Send'.",
      isHumanCheckpoint: true,
      checkpointRequirement: "Registered staff MUST verify no clinical prescribing advice or medical promises are made without a face-to-face consultation."
    },
    {
      stepNumber: 6,
      title: "CONFIRMATION DISPATCHED",
      description: "Email is sent to patient with direct calendar link and clinic location details.",
      isHumanCheckpoint: false
    },
    {
      stepNumber: 7,
      title: "AUTOMATED SMS REMINDER (24h Before)",
      description: "System sends automated appointment attendance reminder via SMS.",
      isHumanCheckpoint: false
    }
  ],
  humanApprovalPoints: [
    "All drafted messages must be reviewed and approved by a member of the pharmacy team prior to sending.",
    "If an enquiry contains medical symptoms requiring clinical triage, the AI flags it with an urgent red banner: 'CLINICAL PHARMACIST TELEPHONE REVIEW REQUIRED'."
  ],
  toolsRequired: [
    "Pharmacy Email (Google Workspace or NHSmail)",
    "Automation Bridge (Make.com, Zapier, or n8n)",
    "Calendar Booking Tool (Calendly, PharmaSys, or Acuity)"
  ],
  risksAndPrivacyControls: [
    "Patient Data Minimisation: Strip out sensitive medical details before sending to external AI prompts.",
    "Zero Automated Clinical Advice: The system is explicitly configured with negative prompts preventing medication or dosage advice.",
    "Audit Logging: All outgoing communications logged in dispensary secure record."
  ],
  implementationDifficulty: "Medium",
  potentialBusinessBenefit: "Saves approximately 4.5 hours of staff time each week. Reduces booking response time from 36 hours to under 15 minutes, doubling private clinic booking conversion."
};

export const DEMO_ANALYTICS_ROWS: AnalyticsRow[] = DEMO_CSV_DATA;
