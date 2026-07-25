import React from 'react';

// LinkedIn Custom SVG
export const LinkedInIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// GitHub Custom SVG
export const GitHubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

// LeetCode Custom SVG
export const LeetCodeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636c-1.005-1.005-2.395-1.48-3.85-1.48-1.454 0-2.844.475-3.85 1.48l-4.319 4.38c-1.005 1.005-1.503 2.378-1.503 3.832 0 1.455.498 2.828 1.503 3.833l4.333 4.363c1.005 1.005 2.395 1.503 3.85 1.503 1.454 0 2.844-.498 3.85-1.503l2.608-2.636c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9.038z"/>
    <path d="M10.848 10.936l4.981-5.004c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9.038l-4.942 4.966c-.514.514-.496 1.365.039 1.901.535.535 1.386.553 1.9-.038z"/>
  </svg>
);

// Mail Custom SVG
export const MailIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export interface SocialLinkData {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export const SOCIAL_LINKS_DATA: SocialLinkData[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nightgamer01/',
    icon: <LinkedInIcon size={18} />,
    ariaLabel: 'Narenkumar RM LinkedIn Profile',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Narenkumar1234/',
    icon: <GitHubIcon size={18} />,
    ariaLabel: 'Narenkumar RM GitHub Profile',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/NightGamer01/',
    icon: <LeetCodeIcon size={18} />,
    ariaLabel: 'Narenkumar RM LeetCode Profile',
  },
  {
    name: 'Email',
    url: 'mailto:narenkumar2001@gmail.com',
    icon: <MailIcon size={18} />,
    ariaLabel: 'Send Email to Narenkumar RM',
  },
];
