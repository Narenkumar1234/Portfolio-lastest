import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

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
    icon: <FaLinkedin size={18} />,
    ariaLabel: 'Narenkumar RM LinkedIn Profile',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Narenkumar1234/',
    icon: <FaGithub size={18} />,
    ariaLabel: 'Narenkumar RM GitHub Profile',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/NightGamer01/',
    icon: <SiLeetcode size={18} />,
    ariaLabel: 'Narenkumar RM LeetCode Profile',
  },
  {
    name: 'Email',
    url: 'mailto:narenkumar2001@gmail.com',
    icon: <FaEnvelope size={18} />,
    ariaLabel: 'Send Email to Narenkumar RM',
  },
];
