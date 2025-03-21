/**
 * Mock Data for Storybook
 * 
 * This module provides mock data objects for use in Storybook stories,
 * particularly for context providers that need realistic data.
 */

// Mock data for PortfolioContext
export const mockPortfolioData = {
  greetings: {
    name: "Derek Mackley",
    title: "Hi There, I'm Derek",
    description: "A passionate Full Stack Web Developer and Security Expert with extensive experience building secure web applications and APIs.",
    resumeLink: "https://example.com/resume.pdf"
  },
  openSource: {
    githubUserName: "DapperDivers",
  },
  contact: {},
  socialLinks: {
    github: "https://github.com/DapperDivers",
    linkedin: "https://www.linkedin.com/in/dmackley/",
  },
  skillsSection: {
    title: "What I do",
    subTitle: "FULL STACK DEVELOPER THAT TINKERS WITH ANYTHING I CAN GET MY HANDS ON",
    skills: [
      "Develop extensible, scalable, and secure web-based applications with a strong focus on security best practices",
      "Implement robust security measures and conduct security audits to ensure application integrity",
      "Update and migrate legacy apps to modern frameworks using cutting-edge technology",
    ],
    softwareSkills: [
      {
        skillName: "JavaScript",
        iconName: "logos:javascript"
      },
      {
        skillName: "React",
        iconName: "logos:react"
      },
      {
        skillName: "Node.js",
        iconName: "logos:nodejs-icon"
      },
      {
        skillName: "TypeScript", 
        iconName: "logos:typescript-icon"
      },
      {
        skillName: "Git",
        iconName: "logos:git-icon"
      },
      {
        skillName: "Python",
        iconName: "logos:python"
      }
    ]
  },
  skillBars: [
    {
      Stack: "Software Architecture",
      progressPercentage: "75",
    },
    {
      Stack: "API layer and below",
      progressPercentage: "90",
    },
    {
      Stack: "Frontend/Design",
      progressPercentage: "50",
    },
  ],
  educationInfo: [
    {
      schoolName: "Georgia State University",
      subHeader: "Bachelor of Business Administration in Computer Information Systems",
      duration: "January 2015",
      desc: "Minor in Information Security",
      descBullets: []
    }
  ],
  experience: [
    {
      role: "Software Engineering Manager",
      company: "Traction Tools",
      companylogo: "https://via.placeholder.com/150",
      date: "February 2021 – Present",
      desc: "Working as the Software Engineering Manager for a direct-to-consumer site that provides tooling for businesses running EOS."
    },
    {
      role: "Senior Software Engineer",
      company: "Ubicquia",
      companylogo: "https://via.placeholder.com/150",
      date: "May 2018 – June 2020",
      desc: "Created an enterprise solution to manage cellular connected units on light poles with Laravel API and Angular frontend."
    }
  ],
  projects: [
    {
      name: "Homelab & Security Testing Environment",
      desc: "This site is hosted from my home lab, serving as both a hosting environment and a security testing playground."
    },
    {
      name: "Tinkering with RFID",
      desc: "Playing with RFID tags and am in the process of \"removing keys\" from my life."
    },
    {
      name: "3D Printing",
      desc: "Operating 4 printers and finding great joy in customizing them for optimal performance."
    }
  ],
  feedbacks: [
    {
      name: "Scott Latsa",
      feedback: "Derek Mackley was an invaluable asset to the team. He was a dependable developer that always accomplished the task assigned even in the midst of changing business requirements.",
    }
  ]
};

// Mock GitHub Profile data
export const mockGithubProfile = {
  login: "dmackley",
  avatar_url: "https://via.placeholder.com/150",
  html_url: "https://github.com/username",
  name: "Derek Mackley",
  bio: "Full Stack Developer and Security Expert",
  location: "Chicago, IL",
  company: "Traction Tools"
};

// Mock Structured Data for Head component
export const mockStructuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Derek Mackley",
    "jobTitle": "Full Stack Developer",
    "url": "https://example.com",
    "knowsAbout": ["JavaScript", "React", "Node.js"]
  },
  article: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Build a Portfolio",
    "author": {
      "@type": "Person",
      "name": "Derek Mackley"
    },
    "datePublished": "2025-03-04"
  },
  product: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Developer Portfolio",
    "operatingSystem": "Web Browser",
    "applicationCategory": "WebApplication"
  }
};

// Mock data for ThemeContext (if needed)
export const mockThemeData = {
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {}
}; 