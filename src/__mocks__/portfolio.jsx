// Mock implementation of portfolio.js for testing
import React from 'react';

// URL validation helper - simplified for testing
const validateImage = (imagePath) => {
  return imagePath || '/mock-image.jpg';
};

const validateUrl = (url) => {
  return url || 'https://example.com';
};

// Helper function to generate image paths for testing
export const getImagePath = (path) => `/mock-assets/${path}`;

// Mock company logos
const TractionToolsLogo = '/mock/logos/tt.svg';
const UbiquiaLogo = '/mock/logos/ubiquia.png';
const StarrLogo = '/mock/logos/starr.png';

// Mock data export
export const greetings = {
  name: "Derek Mackley",
  title: "Full Stack Developer",
  description: "Passionate full stack developer with experience in building high-performance web applications.",
  resumeLink: "https://example.com/resume"
};

export const openSource = {
  githubUserName: "derekmackley",
  showGithubProfile: true
};

export const contact = {
  email: "test@example.com"
};

export const socialLinks = {
  github: "https://github.com/derekmackley",
  linkedin: "https://www.linkedin.com/in/derekmackley",
  twitter: "https://twitter.com/derekmackley",
  instagram: "https://www.instagram.com/derekmackley"
};

export const skillsSection = {
  title: "Skills",
  subTitle: "Professional capabilities and technologies",
  skills: [
    "Building responsive web applications with React",
    "Creating RESTful APIs with Node.js and Express",
    "Working with databases like MongoDB and PostgreSQL"
  ],
  softwareSkills: [
    {
      skillName: "HTML5",
      fontAwesomeClassname: "fab fa-html5",
      iconName: "logos:html-5"
    },
    {
      skillName: "CSS3",
      fontAwesomeClassname: "fab fa-css3-alt",
      iconName: "logos:css-3"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js",
      iconName: "logos:javascript"
    },
    {
      skillName: "React",
      fontAwesomeClassname: "fab fa-react",
      iconName: "logos:react"
    },
    {
      skillName: "Node.js",
      fontAwesomeClassname: "fab fa-node-js",
      iconName: "logos:nodejs"
    }
  ],
  data: [
    {
      title: "Full Stack Development",
      lottieAnimationFile: "/lottie/skills/fullstack.json",
      skills: [
        "Building responsive web applications with React",
        "Creating RESTful APIs with Node.js and Express",
        "Working with databases like MongoDB and PostgreSQL"
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "fab fa-html5",
          iconName: "logos:html-5"
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fab fa-css3-alt",
          iconName: "logos:css-3"
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "fab fa-js",
          iconName: "logos:javascript"
        },
        {
          skillName: "React",
          fontAwesomeClassname: "fab fa-react",
          iconName: "logos:react"
        },
        {
          skillName: "Node.js",
          fontAwesomeClassname: "fab fa-node-js",
          iconName: "logos:nodejs"
        }
      ]
    }
  ]
};

export const SkillBars = [
  {
    Stack: "Frontend/Design",
    progressPercentage: "90"
  },
  {
    Stack: "Backend",
    progressPercentage: "70"
  },
  {
    Stack: "Programming",
    progressPercentage: "60"
  }
];

export const educationInfo = [
  {
    schoolName: "Example University",
    subHeader: "Bachelor of Science in Computer Science",
    duration: "2010 - 2014",
    desc: "Graduated with honors",
    descBullets: [
      "Specialized in software engineering",
      "Participated in coding competitions"
    ]
  }
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Example Company",
    companylogo: TractionToolsLogo,
    date: "2020 – Present",
    desc: "Working on web applications",
    descBullets: [
      "Developed front-end features using React",
      "Built RESTful APIs with Node.js and Express"
    ]
  },
  {
    role: "Junior Developer",
    company: "Another Company",
    companylogo: UbiquiaLogo,
    date: "2018 – 2020",
    desc: "Started as a junior developer",
    descBullets: [
      "Gained experience in web development",
      "Participated in team projects"
    ]
  }
];

export const experienceSection = {
  title: "Work Experience",
  subtitle: "Professional journey and roles",
  experiences: experience
};

export const projects = [
  {
    name: "Project 1",
    desc: "A sample project description",
    link: "https://example.com/project1",
    github: "https://github.com/username/project1"
  },
  {
    name: "Project 2",
    desc: "Another project description",
    link: "https://example.com/project2",
    github: "https://github.com/username/project2"
  }
];

export const projectsSection = {
  title: "Projects",
  subtitle: "Things I've built and created",
  projects
};

export const feedbacks = [
  {
    name: "John Doe",
    feedback: "Great developer to work with!",
    designation: "CTO, Example Company"
  }
];

export const feedbackSection = {
  title: "Testimonials",
  subtitle: "What others say about me",
  feedbacks
};

// Add securityFacts
export const securityFacts = {
  title: "Security Focus",
  subtitle: "Secure coding practices and knowledge",
  facts: [
    {
      title: "OWASP Top 10",
      description: "Knowledge of common web vulnerabilities",
      icon: "mdi:security"
    },
    {
      title: "Secure Authentication",
      description: "Implementation of secure login systems",
      icon: "mdi:lock"
    }
  ]
};

// Export as default with all properties
const portfolio = {
  greetings,
  openSource,
  contact,
  socialLinks,
  skillsSection,
  SkillBars,
  educationInfo,
  experience,
  experienceSection,
  projects,
  projectsSection,
  feedbacks,
  feedbackSection,
  securityFacts,
  getImagePath
};

export default portfolio;