export interface SkillDetail {
  id: string;
  title: string;
  category: 'Operations' | 'Digital & Web' | 'AI & Modern Tools';
  summary: string;
  practicalApplications: string[];
  readinessLevel: string;
}

export interface StrengthDetail {
  id: string;
  title: string;
  description: string;
  workplaceImpact: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  reading: string;
  writing: string;
  speaking: string;
  context: string;
}

export interface EducationItem {
  id: string;
  level: string;
  status: string;
  institutionNote: string;
  focusAreas: string;
}

export interface CVDocumentData {
  fullName: string;
  roleKicker: string;
  address: string;
  phone: string;
  email: string;
  careerObjective: string;
  education: EducationItem[];
  technicalSkills: SkillDetail[];
  workExperienceTitle: string;
  workExperienceStatement: string;
  languages: LanguageItem[];
  personalStrengths: StrengthDetail[];
  declarationText: string;
  declarationPlace: string;
  signatureName: string;
  declarationDate: string;
}

export const INITIAL_CV_DATA: CVDocumentData = {
  fullName: 'Pankaj Prashad Bhatt',
  roleKicker: 'Computer Operations & Digital Workflow Candidate',
  address: 'Nepal',
  phone: '9876543210',
  email: 'vibersaimon57@gmail.com',
  careerObjective:
    'A motivated and enthusiastic fresher seeking an opportunity in the computer field. Interested in applying computer knowledge, internet skills, and AI tools to support organizational work while developing professional skills and gaining practical experience.',
  education: [
    {
      id: 'edu-plus-two',
      level: 'Higher Secondary Education (+2)',
      status: 'Passed',
      institutionNote: 'National Examination Board (NEB), Nepal',
      focusAreas: 'Foundational Academics · Computer Literacy · Written & Verbal Communication',
    },
  ],
  technicalSkills: [
    {
      id: 'skill-basic-comp',
      title: 'Basic Computer Knowledge',
      category: 'Operations',
      summary:
        'Solid grounding in desktop operating environments, file hierarchy management, peripheral setup, and routine system maintenance.',
      practicalApplications: [
        'Organizing structured departmental folders and archival records',
        'Document formatting, printing workflows, and local backup hygiene',
        'Hardware peripheral operation (scanners, printers, external drives)',
      ],
      readinessLevel: 'Day-One Operational',
    },
    {
      id: 'skill-internet',
      title: 'Internet and Web Browsing',
      category: 'Digital & Web',
      summary:
        'Proficient in information retrieval, cloud web portals, online form submission, and secure email correspondence.',
      practicalApplications: [
        'Online research, fact verification, and vendor/client data lookup',
        'Managing official email communication, attachments, and scheduling',
        'Navigating government, banking, and enterprise web portals accurately',
      ],
      readinessLevel: 'Day-One Operational',
    },
    {
      id: 'skill-ai-tools',
      title: 'AI Tools and Applications',
      category: 'AI & Modern Tools',
      summary:
        'Practical familiarity with modern AI assistants for drafting correspondence, summarizing documents, translating text, and accelerating routine administrative tasks.',
      practicalApplications: [
        'Drafting clear business emails, memos, and structured reports',
        'Summarizing lengthy documents and extracting key action items',
        'Multilingual proofreading across English, Nepali, and Hindi workflows',
      ],
      readinessLevel: 'High-Efficiency Workflow',
    },
    {
      id: 'skill-digital',
      title: 'Basic Digital Skills',
      category: 'Digital & Web',
      summary:
        'Competent in digital document handling, PDF conversion, cloud storage sharing, and collaborative online workspace tools.',
      practicalApplications: [
        'Digitizing physical records into searchable, well-indexed files',
        'Spreadsheet data entry, basic tabulation, and checklist tracking',
        'Maintaining data accuracy across digital forms and registries',
      ],
      readinessLevel: 'Day-One Operational',
    },
    {
      id: 'skill-comp-ops',
      title: 'Computer Operations',
      category: 'Operations',
      summary:
        'Focused execution of daily front-office and back-office computer operations with high attention to speed, accuracy, and reliability.',
      practicalApplications: [
        'Daily data entry, record updating, and administrative support',
        'Assisting team members with routine software and document tasks',
        'Following standard operating procedures with zero-error discipline',
      ],
      readinessLevel: 'Day-One Operational',
    },
  ],
  workExperienceTitle: 'Fresher',
  workExperienceStatement:
    'I am eager to learn, gain practical experience, and contribute positively to an organization.',
  languages: [
    {
      language: 'Nepali',
      proficiency: 'Native / First Language',
      reading: 'Full Professional',
      writing: 'Full Professional',
      speaking: 'Native Fluency',
      context: 'Official correspondence, local client relations, and documentation',
    },
    {
      language: 'English',
      proficiency: 'Professional Working',
      reading: 'Proficient',
      writing: 'Proficient',
      speaking: 'Conversational & Workplace',
      context: 'Computer operations, technical interfaces, email drafting, and reporting',
    },
    {
      language: 'Hindi',
      proficiency: 'Fluent Working',
      reading: 'Proficient',
      writing: 'Working Knowledge',
      speaking: 'Fluent Spoken',
      context: 'Cross-regional communication and customer/vendor coordination',
    },
  ],
  personalStrengths: [
    {
      id: 'str-quick-learner',
      title: 'Quick Learner',
      description:
        'Rapidly absorbs new software workflows, organizational procedures, and domain instructions with minimal supervision.',
      workplaceImpact: 'Reduces onboarding time and adapts smoothly to custom office tools.',
    },
    {
      id: 'str-hardworking',
      title: 'Hardworking and Dedicated',
      description:
        'Committed to seeing assigned tasks through to completion with consistent focus and diligence.',
      workplaceImpact: 'Delivers dependable daily output on high-volume operational tasks.',
    },
    {
      id: 'str-positive',
      title: 'Positive Attitude',
      description:
        'Maintains a constructive, respectful, and cooperative demeanor in team environments and under deadlines.',
      workplaceImpact: 'Supports a welcoming front-desk or back-office team culture.',
    },
    {
      id: 'str-willingness',
      title: 'Willingness to Learn',
      description:
        'Proactively seeks feedback and training opportunities to expand technical and administrative capabilities.',
      workplaceImpact: 'Continuously grows alongside organizational technology needs.',
    },
    {
      id: 'str-punctual',
      title: 'Responsible and Punctual',
      description:
        'Values time discipline, attendance reliability, and accountability for assigned organizational assets.',
      workplaceImpact: 'Ensures punctual shift coverage and timely task handovers.',
    },
  ],
  declarationText:
    'I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.',
  declarationPlace: 'Nepal',
  signatureName: 'Pankaj Prashad Bhatt',
  declarationDate: 'November 2026',
};

export interface RoleCoverLetterPreset {
  id: string;
  roleTitle: string;
  department: string;
  subjectLine: string;
  bodyParagraphs: string[];
}

export const ROLE_COVER_LETTER_PRESETS: RoleCoverLetterPreset[] = [
  {
    id: 'computer-operator',
    roleTitle: 'Computer Operator / Data Entry Assistant',
    department: 'Administration & Operations',
    subjectLine: 'Application for Computer Operator Position — Pankaj Prashad Bhatt',
    bodyParagraphs: [
      'I am writing to express my strong interest in the Computer Operator position at your organization. Having completed my Higher Secondary Education (+2) and developed a strong foundation in Basic Computer Knowledge, Computer Operations, and Basic Digital Skills, I am eager to contribute to your daily administrative and data management workflows.',
      'In addition to traditional computer operations and internet research, I actively utilize modern AI Tools and Applications to draft clear documentation, verify information accuracy, and accelerate routine office tasks. As a trilingual communicator in Nepali, English, and Hindi, I can comfortably support diverse internal teams and client interactions.',
      'As a motivated fresher who is responsible, punctual, and a quick learner, I welcome the opportunity to bring dedication and fresh energy to your team. Thank you for reviewing my Curriculum Vitae.',
    ],
  },
  {
    id: 'office-assistant',
    roleTitle: 'IT & Front-Office Support Trainee',
    department: 'IT Support & General Administration',
    subjectLine: 'Application for IT & Front-Office Support Trainee — Pankaj Prashad Bhatt',
    bodyParagraphs: [
      'Please accept my Curriculum Vitae for the IT & Front-Office Support Trainee opening. As an enthusiastic fresher seeking an opportunity in the computer field, I bring hands-on readiness in computer operations, internet and web browsing, and digital record organization.',
      'My ability to quickly learn new software environments—combined with practical knowledge of AI productivity tools—allows me to assist staff with document preparation, online portal submissions, and structured digital filing with high attention to detail.',
      'I pride myself on maintaining a positive attitude, strong work ethic, and strict punctuality. I would be honored to attend an interview at your convenience.',
    ],
  },
  {
    id: 'digital-associate',
    roleTitle: 'Digital Operations & AI Workflow Assistant',
    department: 'Digital Operations',
    subjectLine: 'Application for Digital Operations Assistant — Pankaj Prashad Bhatt',
    bodyParagraphs: [
      'I am submitting my application for the Digital Operations Assistant role. My career objective centers on applying computer knowledge, internet skills, and AI tools to support organizational productivity while growing professionally.',
      'By combining foundational computer operations with modern AI applications and web research skills, I can assist your team in content formatting, data verification, online coordination, and multilingual communication in Nepali, English, and Hindi.',
      'I am eager to learn from experienced professionals and contribute positively from day one. My full Curriculum Vitae is enclosed for your review.',
    ],
  },
];
