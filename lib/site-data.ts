import {
  Activity, BarChart3, Bot, Boxes, BriefcaseBusiness, Building2, CloudCog,
  Code2, Database, GraduationCap, HardHat, HeartPulse, Landmark, LineChart,
  LockKeyhole, Palette, PlugZap, RefreshCcw, Rocket, Settings2, ShieldCheck,
  ShoppingBag, Smartphone, Sparkles, Store, Users, Workflow, Wrench,
} from "lucide-react"

export const services = [
  ["Custom Software Development", "Purpose-built platforms engineered around your operations, users, and growth model.", Code2],
  ["Business Management Systems", "One connected operating system for projects, teams, customers, and financial workflows.", BriefcaseBusiness],
  ["CRM Solutions", "Give revenue teams a complete customer view, intelligent follow-ups, and reliable forecasting.", Users],
  ["ERP Development", "Unify planning, procurement, finance, inventory, and reporting without legacy friction.", Boxes],
  ["AI Automation", "Deploy secure AI assistants and automations that turn repetitive work into scalable systems.", Bot],
  ["Workflow Automation", "Connect tools, remove handoffs, and orchestrate approvals across every department.", Workflow],
  ["Web Development", "Fast, accessible digital experiences that convert interest into measurable business outcomes.", Code2],
  ["Mobile Applications", "Native-quality mobile products with thoughtful UX, secure data, and reliable performance.", Smartphone],
  ["API Development", "Secure, documented APIs that connect your products, partners, and operational data.", PlugZap],
  ["Cloud Infrastructure", "Resilient cloud foundations optimized for speed, governance, observability, and cost.", CloudCog],
  ["Cybersecurity", "Practical security architecture, access controls, testing, and risk reduction built into delivery.", ShieldCheck],
  ["Data Analytics", "Decision-ready dashboards and data products that make performance visible in real time.", BarChart3],
  ["UI/UX Design", "Research-led product design that makes sophisticated workflows feel clear and intuitive.", Palette],
  ["IT Consulting", "A senior technical partner for architecture, modernization, roadmaps, and delivery governance.", Settings2],
  ["Software Maintenance", "Proactive support, upgrades, monitoring, and continuous improvements after launch.", Wrench],
] as const

export const solutions = [
  ["Small Business", "Replace disconnected spreadsheets with a practical digital operating system that grows with you.", Store],
  ["Startups", "Move from concept to trusted product with lean architecture, rapid validation, and a scalable foundation.", Rocket],
  ["Healthcare", "Coordinate care operations with privacy-aware systems, secure workflows, and actionable reporting.", HeartPulse],
  ["Education", "Simplify enrollment, learning operations, communication, and institutional analytics.", GraduationCap],
  ["Finance", "Build auditable, secure workflows for customer operations, reporting, and risk management.", Landmark],
  ["Retail", "Connect customers, inventory, stores, fulfillment, and performance data in one intelligent platform.", ShoppingBag],
  ["Manufacturing", "Improve planning, traceability, quality, and shop-floor visibility across the production lifecycle.", Settings2],
  ["Construction", "Keep field teams, budgets, schedules, documents, and stakeholders aligned from bid to closeout.", HardHat],
  ["Professional Services", "Standardize delivery, utilization, client communication, and revenue operations.", BriefcaseBusiness],
  ["Government", "Modernize constituent and internal services with accessible, secure, and accountable systems.", Building2],
] as const

export const products = [
  { name: "Wolf CRM", label: "Revenue intelligence", description: "Turn every lead and customer interaction into a coordinated growth motion.", features: ["Unified pipeline", "Smart follow-ups", "Revenue forecasting"], icon: Users, metric: "+31%", metricLabel: "pipeline velocity" },
  { name: "Wolf ERP", label: "Connected operations", description: "Run finance, procurement, delivery, and resources from a single source of truth.", features: ["Financial operations", "Resource planning", "Approvals"], icon: Boxes, metric: "42h", metricLabel: "saved each month" },
  { name: "Wolf HR", label: "People operations", description: "Create a better employee experience from onboarding through performance.", features: ["Employee records", "Time and leave", "Performance cycles"], icon: BriefcaseBusiness, metric: "94%", metricLabel: "team adoption" },
  { name: "Wolf Inventory", label: "Inventory control", description: "Know what is available, what is moving, and what needs attention in real time.", features: ["Multi-location stock", "Reorder intelligence", "Supplier insights"], icon: Database, metric: "-23%", metricLabel: "stock variance" },
  { name: "Wolf POS", label: "Modern commerce", description: "Deliver fast checkout experiences connected to inventory and customer history.", features: ["Omnichannel sales", "Customer profiles", "Live reporting"], icon: Store, metric: "1.8s", metricLabel: "checkout time" },
  { name: "Wolf Analytics", label: "Decision intelligence", description: "Translate operational data into clear, trusted answers for every leader.", features: ["Executive dashboards", "Custom metrics", "Scheduled reports"], icon: LineChart, metric: "6x", metricLabel: "faster reporting" },
  { name: "Wolf AI Assistant", label: "Everyday intelligence", description: "Give teams a secure copilot that understands business context and takes action.", features: ["Knowledge search", "Task automation", "Action approvals"], icon: Sparkles, metric: "71%", metricLabel: "tasks automated" },
  { name: "Wolf Workflow", label: "Process orchestration", description: "Design, launch, and improve cross-functional workflows without bottlenecks.", features: ["Visual builder", "Smart routing", "SLA monitoring"], icon: Workflow, metric: "-39%", metricLabel: "cycle time" },
] as const

export const projects = [
  { slug: "atlas-care", title: "Atlas Care Command Center", category: "Healthcare", summary: "A coordinated patient operations platform for a multi-location care network.", tech: ["Next.js", "Postgres", "FHIR"], result: "38% faster intake", quote: "Wolfitpark made complex clinical operations feel simple." },
  { slug: "northstar-finance", title: "Northstar Risk Cloud", category: "Finance", summary: "An auditable risk workflow and analytics platform built for a growing fintech.", tech: ["React", "Python", "AWS"], result: "64% less review time", quote: "We gained control and speed without compromising governance." },
  { slug: "meridian-retail", title: "Meridian Retail OS", category: "Retail", summary: "Unified inventory, store performance, and customer intelligence across 84 locations.", tech: ["Next.js", "Node.js", "Azure"], result: "23% fewer stockouts", quote: "It changed how our entire company makes decisions." },
  { slug: "forge-ops", title: "Forge Enterprise Ops", category: "Enterprise", summary: "A secure operations hub connecting procurement, projects, vendors, and finance.", tech: ["TypeScript", "Postgres", "Kubernetes"], result: "$1.2M annual savings", quote: "A true transformation partner from discovery through launch." },
  { slug: "relay-ai", title: "Relay AI Service Desk", category: "AI", summary: "A governed AI assistant that resolves requests and coordinates human approvals.", tech: ["AI SDK", "Next.js", "Vector Search"], result: "71% auto-resolution", quote: "The assistant feels like an experienced member of our team." },
  { slug: "launchpad", title: "Launchpad SaaS Platform", category: "SaaS", summary: "A multi-tenant business platform designed to scale from first customer to enterprise.", tech: ["Next.js", "Stripe", "Neon"], result: "3.4x activation", quote: "We launched a stronger product in a fraction of the expected time." },
] as const

export const testimonials = [
  { quote: "Wolfitpark connected systems we thought would always remain fragmented. We now operate from one reliable view of the business.", name: "Elena Brooks", role: "COO, Meridian Group", rating: 5 },
  { quote: "They combined product thinking with serious engineering discipline. Every decision was tied to a real operational outcome.", name: "Marcus Chen", role: "Founder, Northstar Labs", rating: 5 },
  { quote: "The team listened deeply, moved quickly, and left us with a platform our people genuinely enjoy using.", name: "Priya Raman", role: "VP Operations, Atlas Health", rating: 5 },
]

export const faqs = [
  ["What types of software does Wolfitpark build?", "We design and engineer business platforms, SaaS products, CRM and ERP systems, AI automations, mobile apps, APIs, analytics products, and cloud infrastructure."],
  ["Do you work with startups and established enterprises?", "Yes. Our delivery model adapts to early-stage product validation, growing mid-market operations, and enterprise modernization programs."],
  ["Can you modernize an existing legacy system?", "Yes. We begin with an architecture and workflow assessment, then define an incremental modernization roadmap that protects business continuity."],
  ["How do software projects begin?", "Every engagement starts with a focused discovery phase covering goals, users, workflows, technical constraints, risks, and measurable success criteria."],
  ["How long does a typical project take?", "Focused product releases can take several weeks, while larger platforms are usually delivered in phased releases over several months."],
  ["Do you offer fixed-price engagements?", "We offer milestone-based, dedicated team, and advisory models. The right structure depends on clarity, risk, and the speed of learning required."],
  ["Can you integrate with our current tools?", "Yes. We regularly integrate accounting, payment, CRM, identity, analytics, communication, and industry-specific systems through secure APIs."],
  ["How do you approach AI safely?", "We use permission boundaries, approved data sources, human review where appropriate, monitoring, and transparent evaluation before expanding automation."],
  ["Who owns the source code?", "Our standard client agreements provide full ownership of custom project deliverables after agreed payments are completed."],
  ["Do you provide post-launch support?", "Yes. Support options include monitoring, incident response, maintenance, roadmap delivery, security updates, and team enablement."],
  ["Can you work with our internal technical team?", "Absolutely. We frequently embed alongside internal product, engineering, IT, operations, and security teams."],
  ["How do you protect confidential information?", "We use least-privilege access, encrypted systems, secure development practices, documented controls, and confidentiality agreements."],
  ["Do you design the user experience too?", "Yes. Product strategy, research, information architecture, prototyping, visual design, and usability are integrated into delivery."],
  ["Can you build mobile applications?", "Yes. We develop responsive web apps and native-quality mobile experiences based on your audience, workflows, and device requirements."],
  ["Do you help with cloud migration?", "Yes. We plan and execute migrations with attention to reliability, observability, security, operating cost, and rollback readiness."],
  ["What industries do you know best?", "Our strongest experience spans healthcare, finance, retail, professional services, construction, education, manufacturing, and SaaS."],
  ["How will we track progress?", "You receive a clear roadmap, regular demonstrations, decision logs, delivery metrics, and direct access to the project team."],
  ["Can you rescue a stalled project?", "Yes. We can assess product, code, architecture, and delivery health, then stabilize the most critical risks before rebuilding momentum."],
  ["Do you provide cybersecurity reviews?", "Yes. We review application architecture, identity, permissions, dependencies, data flows, cloud posture, and development practices."],
  ["How can we get an estimate?", "Share your goals through our consultation form. We will clarify scope, recommend an approach, and provide a transparent next-step proposal."],
] as const

export const posts = [
  { slug: "designing-ai-automation", category: "AI", title: "Designing AI automation that earns operational trust", excerpt: "A practical framework for choosing the right tasks, controls, and measures before scaling intelligent automation.", date: "July 8, 2026", read: "7 min read" },
  { slug: "erp-modernization", category: "Transformation", title: "A low-risk path from legacy ERP to connected operations", excerpt: "How phased architecture and workflow redesign create momentum without disrupting the business.", date: "June 24, 2026", read: "9 min read" },
  { slug: "saas-metrics", category: "Product", title: "The SaaS operating metrics that expose real friction", excerpt: "Move beyond surface-level dashboards to understand activation, workflow depth, retention, and value realization.", date: "June 10, 2026", read: "6 min read" },
  { slug: "cloud-cost-control", category: "Cloud", title: "Cloud cost control starts with architecture, not discounts", excerpt: "The engineering decisions that improve unit economics while strengthening reliability and observability.", date: "May 28, 2026", read: "8 min read" },
  { slug: "business-system-discovery", category: "Strategy", title: "What great business-system discovery actually uncovers", excerpt: "A disciplined discovery process reveals hidden handoffs, exceptions, incentives, and opportunities for automation.", date: "May 12, 2026", read: "5 min read" },
  { slug: "secure-api-design", category: "Engineering", title: "Secure API design for connected enterprise products", excerpt: "Build integrations that are resilient, observable, well-governed, and easier for partners to adopt.", date: "April 30, 2026", read: "10 min read" },
] as const

export const stats = [["120+", "products and systems shipped"], ["98%", "client satisfaction"], ["31%", "average workflow acceleration"], ["24/7", "platform monitoring"]] as const

export const navGroups = [
  { label: "Services", href: "/services", items: [["Software Development", "Product engineering built around your business."], ["AI & Automation", "Intelligence that moves work forward."], ["Cloud & Data", "A resilient foundation for growth."]] },
  { label: "Solutions", href: "/solutions", items: [["For Startups", "Validate and scale with confidence."], ["For Operations", "Connect teams, systems, and decisions."], ["By Industry", "Purpose-built transformation patterns."]] },
  { label: "Products", href: "/products", items: [["Wolf CRM", "A clearer path from lead to revenue."], ["Wolf ERP", "Connected planning and operations."], ["Wolf AI Assistant", "A secure copilot for daily work."]] },
] as const

export const legalContent = {
  privacy: { title: "Privacy Policy", updated: "July 10, 2026", sections: [["Information we collect", "We collect information you submit through our forms, basic technical data needed to operate the website, and communication preferences you choose to provide."], ["How we use information", "We use information to respond to requests, deliver services, improve our website, protect our systems, and meet legal obligations."], ["Data sharing", "We do not sell personal information. We share data only with trusted service providers needed to operate our business or when legally required."], ["Your choices", "You may request access, correction, or deletion of your information by contacting support@wolfitpark.online."]] },
  terms: { title: "Terms of Use", updated: "July 10, 2026", sections: [["Website use", "You may use this website for lawful business and informational purposes. You may not interfere with its operation or attempt unauthorized access."], ["Content", "Website content is provided for general information and does not create a professional services relationship without a signed agreement."], ["Intellectual property", "Wolfitpark branding, website design, and original content are protected by applicable intellectual property laws."], ["Limitations", "The website is provided as available. To the extent permitted by law, Wolfitpark is not liable for indirect losses arising from website use."]] },
  cookies: { title: "Cookie Policy", updated: "July 10, 2026", sections: [["What cookies are", "Cookies are small data files used to remember preferences and support website functionality."], ["How we use cookies", "Wolfitpark uses essential cookies for preferences and may use privacy-conscious analytics to understand aggregate website performance."], ["Managing cookies", "You can accept or dismiss optional website preferences through our cookie notice and adjust browser controls at any time."], ["Questions", "Contact support@wolfitpark.online if you have questions about our use of cookies."]] },
} as const

export const processSteps = [["01", "Discover", "Map goals, users, workflows, constraints, and success measures."], ["02", "Design", "Prototype the clearest experience and validate the technical path."], ["03", "Build", "Deliver in visible increments with quality, security, and feedback built in."], ["04", "Scale", "Launch, observe, optimize, and expand what creates measurable value."]] as const

export const iconMap = { Activity, RefreshCcw, LockKeyhole }
