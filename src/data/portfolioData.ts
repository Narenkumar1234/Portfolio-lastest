export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  previewType: 'expense-tracker' | 'ui-ux' | 'web-design' | 'landing-page';
  demoUrl?: string;
  githubUrl?: string;
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  period: string;
  role: string;
  description: string;
  isActive?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  link: string;
  githubLink?: string;
  demoLink?: string;
  accentColor: string;
  previewType?: 'expense-tracker' | 'ecommerce' | 'enterprise' | 'telemetry';
}

export interface StatItem {
  number: string;
  label: string;
}

export const NAV_LINKS = [
  { label: 'Home', href: '#home', id: "home" },
  { label: 'Service', href: '#services', id: "services" },
  { label: 'Resume', href: '#experience', id: "experience" },
  { label: 'About', href: '#why-hire-me', id: "why-hire-me" },
  { label: 'Project', href: '#portfolio', id: "portfolio" },
  { label: 'Contact', href: '#contact', id: "contact" },
];

export const HERO_DATA = {
  greetingBadge: 'Hello!',
  name: 'Narenkumar',
  role: 'Frontend Software Engineer',
  quote: "Driven Frontend Software Engineer specializing in React, Next.js, and crafting exceptional, scalable digital experiences.",
  experienceYears: '2.5+ Years',
  experienceSubtitle: 'Experience',
  rating: 5,
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'aura-expense-tracker-service',
    title: 'FinTech & Expense Tracker',
    category: 'Full-Stack Web App',
    description: 'Engineering high-security personal finance apps, 50/30/20 budget allocations, multi-card billing cycle intelligence, and Gemini AI assistant with real-time Firebase sync.',
    iconName: 'Wallet',
    previewType: 'expense-tracker',
    demoUrl: 'https://expense-tracker-zeta-five-17.vercel.app',
    githubUrl: 'https://github.com/Narenkumar1234/Expense-Tracker',
    badge: 'Featured Project',
  },
  {
    id: 'ui-design-system',
    title: 'Enterprise UI Systems',
    category: 'Design Systems & MUI',
    description: 'Crafting pixel-perfect, accessible user interfaces with Material-UI (MUI), Tailwind CSS, and custom design tokens for enterprise scale.',
    iconName: 'Layout',
    previewType: 'ui-ux',
    githubUrl: 'https://github.com/Narenkumar1234/',
    badge: 'Zoho Enterprise',
  },
  {
    id: 'fullstack-node',
    title: 'Next.js & E-Commerce',
    category: 'Full Stack Integration',
    description: 'Developing end-to-end e-commerce solutions, frictionless checkout flows, server-side rendering (SSR), and Node.js backend architectures.',
    iconName: 'Globe',
    previewType: 'landing-page',
    githubUrl: 'https://github.com/Narenkumar1234/',
    badge: 'Production SSR',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Zoho Corporation',
    location: 'India',
    period: 'Oct 2023 - Present',
    role: 'Software Engineer',
    description: 'Expanded expertise in React, gaining proficiency in advanced project structuring and MVC architecture. Designed and revamped enterprise interfaces using Material-UI (MUI) and responsive design principles.',
    isActive: true,
  },
  {
    id: 'exp-2',
    company: 'C1X Inc.',
    location: 'India',
    period: 'Aug 2023 - Sept 2023',
    role: 'Software Engineer Intern',
    description: 'Played a pivotal role in building robust systems using Angular, driving the development of new frontend features and resolving critical production issues.',
    isActive: false,
  },
  {
    id: 'exp-3',
    company: 'Narumugai Herbals',
    location: 'Freelance',
    period: 'May 2023 - July 2023',
    role: 'Freelance Frontend Developer',
    description: 'Developed an end-to-end e-commerce platform using Next.js for SSR and React. Crafted a frictionless, accessible checkout flow enabling seamless guest ordering.',
    isActive: true,
  },
  {
    id: 'exp-4',
    company: 'Viasat Inc.',
    location: 'India',
    period: 'Feb 2023 - Apr 2023',
    role: 'Software Engineer Intern',
    description: 'Led the enhancement of a dashboard UI utilized for monitoring diverse container environments, leveraging JavaScript, HTML (Handlebars), and Python.',
    isActive: false,
  },
];

export const WHY_HIRE_ME_DATA = {
  title: 'Why Hire me?',
  description: 'Driven Frontend Software Engineer with over 2.5 years of experience specializing in React, Next.js, and modern JavaScript. Proven track record across full SDLC, building scalable frontend architectures, and crafting high-performance user interfaces.',
  stats: [
    { number: '2.5+ Years', label: 'Frontend Experience' },
    { number: '15+', label: 'Projects Completed' },
  ],
};

export const PORTFOLIO_TAGS = [
  'React & Next.js',
  'FinTech',
  'Dashboards',
  'E-Commerce',
  'Node & DB',
  'Angular',
];

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'aura-expense-tracker',
    title: 'Aura — Personal Finance & Expense Tracker',
    subtitle: 'Full-Stack Wealth & Budget Engine',
    category: 'React & Next.js',
    tags: ['React & Next.js', 'FinTech', 'Dashboards', 'Node & DB'],
    description: 'An obsidian-emerald personal wealth platform featuring 50/30/20 budgeting, multi-card billing cycle intelligence, telemetry ledger analytics, and Gemini AI financial assistant with real-time Firebase & localStorage sync.',
    link: 'https://expense-tracker-zeta-five-17.vercel.app',
    githubLink: 'https://github.com/Narenkumar1234/Expense-Tracker',
    demoLink: 'https://expense-tracker-zeta-five-17.vercel.app',
    accentColor: '#10B981',
    previewType: 'expense-tracker',
  },
  {
    id: 'narumugai-store',
    title: 'Narumugai E-Commerce Platform',
    subtitle: 'Next.js & React Platform',
    category: 'React & Next.js',
    tags: ['React & Next.js', 'E-Commerce'],
    description: 'Developed an end-to-end e-commerce platform utilizing Next.js for server-side rendering, React modular components, and a frictionless checkout system.',
    link: 'https://github.com/Narenkumar1234/',
    githubLink: 'https://github.com/Narenkumar1234/',
    accentColor: '#13265C',
    previewType: 'ecommerce',
  },
  {
    id: 'zoho-ui-revamp',
    title: 'Enterprise UI System Revamp',
    subtitle: 'Zoho Software Suite',
    category: 'React & Next.js',
    tags: ['React & Next.js', 'Dashboards'],
    description: 'Crafted digital experiences by designing and revamping enterprise user interfaces with Material-UI (MUI), responsive design principles, and React state architecture.',
    link: 'https://github.com/Narenkumar1234/',
    githubLink: 'https://github.com/Narenkumar1234/',
    accentColor: '#4F46E5',
    previewType: 'enterprise',
  },
  {
    id: 'viasat-dashboard',
    title: 'Container Telemetry Dashboard',
    subtitle: 'Viasat UI & Monitoring',
    category: 'Dashboards',
    tags: ['Dashboards', 'Node & DB'],
    description: 'Enhanced live container monitoring dashboards utilizing JavaScript, Handlebars, and Python for real-time system metrics tracking.',
    link: 'https://github.com/Narenkumar1234/',
    githubLink: 'https://github.com/Narenkumar1234/',
    accentColor: '#059669',
    previewType: 'telemetry',
  },
];
