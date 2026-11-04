/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_CV_DATA,
  CVDocumentData,
  ROLE_COVER_LETTER_PRESETS,
  SkillDetail,
} from './data/cvData';
import { PrintableCVSection } from './components/PrintableCVSection';
import {
  Printer,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  X,
  FileText,
  Send,
} from 'lucide-react';

const WORKSPACE_HERO_IMAGE =
  '/src/assets/images/bento_ai_workflow_1793760887932.jpg';
const BENTO_OPERATIONS_IMAGE =
  '/src/assets/images/bento_digital_operations_1793760888093.jpg';

interface LightboxItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  highlights: string[];
}

export default function App() {
  const [cvData, setCvData] = useState<CVDocumentData>(INITIAL_CV_DATA);
  const [skillFilter, setSkillFilter] = useState<
    'ALL' | 'Operations' | 'Digital & Web' | 'AI & Modern Tools'
  >('ALL');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    INITIAL_CV_DATA.technicalSkills[0].id
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    ROLE_COVER_LETTER_PRESETS[0].id
  );
  const [hiringCompany, setHiringCompany] = useState<string>('');
  const [hiringManager, setHiringManager] = useState<string>('Hiring Manager');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  // Quick Interview Request form state
  const [employerName, setEmployerName] = useState('');
  const [employerOrg, setEmployerOrg] = useState('');
  const [interviewRole, setInterviewRole] = useState('Computer Operator');
  const [interviewNote, setInterviewNote] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'ready'>('idle');

  const filteredSkills: SkillDetail[] =
    skillFilter === 'ALL'
      ? cvData.technicalSkills
      : cvData.technicalSkills.filter((s) => s.category === skillFilter);

  const activeSkill: SkillDetail =
    cvData.technicalSkills.find((s) => s.id === selectedSkillId) ||
    cvData.technicalSkills[0];

  const activePreset =
    ROLE_COVER_LETTER_PRESETS.find((p) => p.id === selectedPresetId) ||
    ROLE_COVER_LETTER_PRESETS[0];

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const composeCoverLetterText = () => {
    const companyTarget = hiringCompany.trim()
      ? hiringCompany.trim()
      : 'your organization';
    const salutation = `Dear ${hiringManager.trim() || 'Hiring Manager'},`;
    const body = activePreset.bodyParagraphs
      .map((p) => p.replace('your organization', companyTarget))
      .join('\n\n');

    return `Subject: ${activePreset.subjectLine}${
      hiringCompany.trim() ? ` (${hiringCompany.trim()})` : ''
    }\n\n${salutation}\n\n${body}\n\nSincerely,\n${cvData.fullName}\nAddress: ${
      cvData.address
    }\nPhone: ${cvData.phone}\nEmail: ${cvData.email}`;
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(composeCoverLetterText());
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2200);
  };

  const handlePrepareInterviewEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('ready');
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `Interview Invitation: ${interviewRole} — ${
        employerOrg.trim() || 'Organization Inquiry'
      }`
    );
    const body = encodeURIComponent(
      `Hello ${cvData.fullName},\n\nWe reviewed your Curriculum Vitae and would like to connect regarding the ${interviewRole} role${
        employerOrg.trim() ? ` at ${employerOrg.trim()}` : ''
      }.\n\n${
        interviewNote.trim()
          ? `Additional Details:\n${interviewNote.trim()}\n\n`
          : ''
      }Best regards,\n${employerName.trim() || 'Hiring Team'}`
    );
    return `mailto:${cvData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-zinc-900">
      {/* =====================================================================
          TOP BAR CONTRACT: Strictly 1 row, 3 zones separated by gap-8
      ===================================================================== */}
      <header className="no-print sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-xs border-b border-zinc-200">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            className="font-display text-lg font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0"
          >
            {cvData.fullName}
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a
              href="#overview"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#skills"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Technical Skills
            </a>
            <a
              href="#qualifications"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Qualifications
            </a>
            <a
              href="#cv-document"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              CV Document
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Export CV
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* =====================================================================
            HERO SECTION: Split-Screen Hero + Full-Width Key Profile Row Below
        ===================================================================== */}
        <section id="overview" className="no-print pt-10 pb-16 md:pt-16 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy & Career Objective */}
              <div className="lg:col-span-7 flex flex-col justify-between py-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 mb-4">
                    <span>CURRICULUM VITAE</span>
                    <span aria-hidden="true">·</span>
                    <span>{cvData.address.toUpperCase()}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cvData.workExperienceTitle.toUpperCase()} CANDIDATE</span>
                  </div>

                  <h1
                    className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-zinc-950 leading-[1.08] mb-6"
                    style={{ textWrap: 'balance' }}
                  >
                    {cvData.fullName}
                  </h1>

                  <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-[65ch] mb-8">
                    {cvData.careerObjective}
                  </p>
                </div>

                {/* Direct Contact Bar & Primary Actions */}
                <div className="space-y-6 pt-6 border-t border-zinc-200">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-700">
                    <div className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{cvData.address}</span>
                    </div>
                    <span className="text-zinc-300" aria-hidden="true">
                      /
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cvData.phone, 'phone')}
                      className="inline-flex items-center gap-2 font-mono text-zinc-800 hover:text-blue-600 transition-colors"
                      title="Click to copy phone number"
                    >
                      <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{cvData.phone}</span>
                      {copiedPhone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </button>
                    <span className="text-zinc-300" aria-hidden="true">
                      /
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cvData.email, 'email')}
                      className="inline-flex items-center gap-2 text-zinc-800 hover:text-blue-600 transition-colors"
                      title="Click to copy email address"
                    >
                      <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{cvData.email}</span>
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#cv-document"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
                    >
                      <FileText className="w-4 h-4" />
                      Inspect A4 CV Sheet
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-900 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors whitespace-nowrap shrink-0"
                    >
                      Prepare Cover Letter & Contact
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Single Visual Showcase Container at Matching Height */}
              <div className="lg:col-span-5 flex">
                <div
                  onClick={() =>
                    setLightboxItem({
                      title: 'Digital Operations & AI-Assisted Workstation',
                      subtitle:
                        'Computer Operations · Web Research · AI Tools & Applications',
                      imageUrl: WORKSPACE_HERO_IMAGE,
                      description: cvData.careerObjective,
                      highlights: cvData.technicalSkills.map((s) => s.title),
                    })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLightboxItem({
                        title: 'Digital Operations & AI-Assisted Workstation',
                        subtitle:
                          'Computer Operations · Web Research · AI Tools & Applications',
                        imageUrl: WORKSPACE_HERO_IMAGE,
                        description: cvData.careerObjective,
                        highlights: cvData.technicalSkills.map((s) => s.title),
                      });
                    }
                  }}
                  className="group relative w-full min-h-[340px] lg:h-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 cursor-pointer flex flex-col justify-end"
                >
                  <img
                    src={WORKSPACE_HERO_IMAGE}
                    alt="Modern minimalist computer workstation representing Pankaj Prashad Bhatt's digital operations focus"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className=" inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent absolute" />
                  <div className="relative z-10 p-6 sm:p-8 text-white">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-xs font-mono text-zinc-300">
                        CAREER FOCUS · COMPUTER FIELD
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-white/90 group-hover:underline">
                        Expand View <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="font-display text-lg font-semibold leading-snug text-white">
                      Applying Computer Knowledge, Internet Skills & AI Tools to Organizational Workflows
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Key Profile Metrics Row Below Hero Split */}
            <div className="mt-10 pt-8 border-t border-zinc-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-mono text-zinc-500">ACADEMIC CREDENTIAL</p>
                <p className="font-display text-xl font-bold text-zinc-950 mt-1">
                  +2 Passed
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Higher Secondary Education
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500">CORE COMPETENCIES</p>
                <p className="font-display text-xl font-bold text-zinc-950 mt-1 font-mono tabular-nums">
                  {cvData.technicalSkills.length} Domains
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Computer Ops · Web · AI Tools
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500">LANGUAGE FLUENCY</p>
                <p className="font-display text-xl font-bold text-zinc-950 mt-1 font-mono tabular-nums">
                  {cvData.languages.length} Languages
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {cvData.languages.map((l) => l.language).join(' · ')}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500">EXPERIENCE STATUS</p>
                <p className="font-display text-xl font-bold text-zinc-950 mt-1">
                  {cvData.workExperienceTitle}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Immediate Availability · {cvData.address}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            01. TECHNICAL SKILLS & CAPABILITY BENTO MATRIX
        ===================================================================== */}
        <section
          id="skills"
          className="no-print py-16 md:py-24 border-t border-zinc-200 bg-white"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-2">
                  01. Technical Skills & Operational Readiness
                </p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-zinc-950">
                  Core Technical Competencies
                </h2>
              </div>

              {/* Interactive Filter Controls */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-100 rounded-lg">
                {(
                  [
                    'ALL',
                    'Operations',
                    'Digital & Web',
                    'AI & Modern Tools',
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSkillFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      skillFilter === cat
                        ? 'bg-white text-zinc-950 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Skills' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid + Interactive Skill Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Selectable Skill List */}
              <div className="lg:col-span-7 divide-y divide-zinc-200 border-y border-zinc-200">
                {filteredSkills.map((skill, index) => {
                  const isSelected = activeSkill?.id === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkillId(skill.id)}
                      className={`w-full text-left py-5 px-4 transition-colors flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-zinc-900 text-white rounded-xl my-1'
                          : 'hover:bg-zinc-50 text-zinc-900'
                      }`}
                    >
                      <div className="space-y-1">
                        <div
                          className={`flex items-center gap-2 text-xs font-mono ${
                            isSelected ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          <span>0{index + 1}</span>
                          <span aria-hidden="true">·</span>
                          <span>{skill.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{skill.readinessLevel}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold">
                          {skill.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${
                            isSelected ? 'text-zinc-200' : 'text-zinc-600'
                          }`}
                        >
                          {skill.summary}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-mono shrink-0 mt-1 ${
                          isSelected ? 'text-blue-300' : 'text-zinc-400'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Inspect →'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right 5 Columns: Active Skill Detail + Bento Media Card */}
              <div className="lg:col-span-5 space-y-6">
                {activeSkill && (
                  <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 bg-[#FAF9F6]">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-600 mb-2">
                      <span>WORKPLACE APPLICATION</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeSkill.category.toUpperCase()}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-zinc-950 mb-3">
                      {activeSkill.title}
                    </h3>
                    <p className="text-sm text-zinc-700 leading-relaxed mb-6">
                      {activeSkill.summary}
                    </p>
                    <div className="pt-4 border-t border-zinc-200">
                      <p className="text-xs font-mono text-zinc-500 mb-3">
                        PRACTICAL ORGANIZATIONAL TASKS
                      </p>
                      <ul className="space-y-2.5 text-sm text-zinc-800">
                        {activeSkill.practicalApplications.map((app, i) => (
                          <li key={i} className="flex items-baseline gap-3">
                            <span className="font-mono text-xs text-blue-600 shrink-0">
                              0{i + 1}.
                            </span>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Secondary Bento Visual Tile with Lightbox */}
                <div
                  onClick={() =>
                    setLightboxItem({
                      title: 'Structured Computer Operations & Documentation',
                      subtitle:
                        'Basic Computer Knowledge · Basic Digital Skills · Computer Operations',
                      imageUrl: BENTO_OPERATIONS_IMAGE,
                      description:
                        'Committed to maintaining clean digital records, accurate keyboard data entry, and dependable daily computer operations for organizational teams.',
                      highlights: [
                        'Accurate keyboarding and structured document formatting',
                        'Organized file management and record keeping',
                        'Prompt execution of front-office and back-office digital tasks',
                      ],
                    })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLightboxItem({
                        title: 'Structured Computer Operations & Documentation',
                        subtitle:
                          'Basic Computer Knowledge · Basic Digital Skills · Computer Operations',
                        imageUrl: BENTO_OPERATIONS_IMAGE,
                        description:
                          'Committed to maintaining clean digital records, accurate keyboard data entry, and dependable daily computer operations for organizational teams.',
                        highlights: [
                          'Accurate keyboarding and structured document formatting',
                          'Organized file management and record keeping',
                          'Prompt execution of front-office and back-office digital tasks',
                        ],
                      });
                    }
                  }}
                  className="group relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 aspect-[4/3] cursor-pointer flex flex-col justify-end"
                >
                  <img
                    src={BENTO_OPERATIONS_IMAGE}
                    alt="Clean overhead desk setup with keyboard and structured paper dossier"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative z-10 p-6 text-white">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-1">
                      <span>OPERATIONAL DISCIPLINE</span>
                      <span className="inline-flex items-center gap-1 text-white group-hover:underline">
                        View Detail <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="font-display text-base font-semibold">
                      Precision Keyboarding, Record Keeping & Daily Computer Operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            02. QUALIFICATIONS, WORK EXPERIENCE, LANGUAGES & STRENGTHS
        ===================================================================== */}
        <section
          id="qualifications"
          className="no-print py-16 md:py-24 border-t border-zinc-200"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <p className="text-xs font-mono text-zinc-500 mb-2">
                02. Academic Foundation, Languages & Personal Strengths
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-zinc-950">
                Qualifications & Professional Attributes
              </h2>
            </div>

            {/* Education & Work Experience Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-14 border-b border-zinc-200">
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-zinc-200">
                <p className="text-xs font-mono text-zinc-500 mb-2">
                  EDUCATIONAL QUALIFICATION
                </p>
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="mt-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl font-bold text-zinc-950">
                        {edu.level}
                      </h3>
                      <span className="font-mono text-xs font-semibold text-blue-600">
                        Status: {edu.status}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 mt-1">
                      {edu.institutionNote}
                    </p>
                    <p className="text-xs text-zinc-500 mt-3 pt-3 border-t border-zinc-100">
                      {edu.focusAreas}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-zinc-200 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono text-zinc-500 mb-2">
                    WORK EXPERIENCE
                  </p>
                  <div className="flex items-baseline justify-between gap-4 mt-3">
                    <h3 className="font-display text-xl font-bold text-zinc-950">
                      {cvData.workExperienceTitle}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">
                      Entry-Level / Trainee Ready
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed mt-3">
                    {cvData.workExperienceStatement}
                  </p>
                </div>
                <div className="text-xs text-zinc-500 mt-4 pt-3 border-t border-zinc-100">
                  Target Roles: Computer Operator · Data Entry Assistant · Front-Office IT Support · Digital Assistant
                </div>
              </div>
            </div>

            {/* Personal Strengths (Clean 3-Column Editorial Grid) */}
            <div className="py-14 border-b border-zinc-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-mono text-zinc-500 mb-1">
                    PERSONAL STRENGTHS
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-950">
                    Workplace Character & Reliability
                  </h3>
                </div>
                <p className="text-xs text-zinc-500">
                  5 Verified Personal Strengths from Curriculum Vitae
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cvData.personalStrengths.map((str, idx) => (
                  <div
                    key={str.id}
                    className="p-6 bg-white rounded-2xl border border-zinc-200 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-mono text-zinc-400 mb-2">
                        0{idx + 1} · PERSONAL STRENGTH
                      </p>
                      <h4 className="font-display text-lg font-bold text-zinc-950 mb-2">
                        {str.title}
                      </h4>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {str.description}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-500 mt-4 pt-3 border-t border-zinc-100">
                      {str.workplaceImpact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Proficiency Table */}
            <div className="pt-14">
              <div className="mb-6">
                <p className="text-xs font-mono text-zinc-500 mb-1">
                  COMMUNICATION CAPABILITY
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-950">
                  Language Proficiency
                </h3>
              </div>

              <div className="overflow-x-auto bg-white rounded-2xl border border-zinc-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-xs font-mono text-zinc-500">
                      <th className="py-3.5 px-6">LANGUAGE</th>
                      <th className="py-3.5 px-6">OVERALL LEVEL</th>
                      <th className="py-3.5 px-6">READING & WRITING</th>
                      <th className="py-3.5 px-6">SPEAKING</th>
                      <th className="py-3.5 px-6">WORKPLACE APPLICATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-sm">
                    {cvData.languages.map((lang) => (
                      <tr key={lang.language} className="hover:bg-zinc-50">
                        <td className="py-4 px-6 font-display font-bold text-zinc-950">
                          {lang.language}
                        </td>
                        <td className="py-4 px-6 text-zinc-700">
                          {lang.proficiency}
                        </td>
                        <td className="py-4 px-6 text-zinc-600">
                          {lang.reading} · {lang.writing}
                        </td>
                        <td className="py-4 px-6 text-zinc-600">
                          {lang.speaking}
                        </td>
                        <td className="py-4 px-6 text-zinc-600">
                          {lang.context}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            03. ROLE-TAILORED APPLICATION & INTERVIEW REQUEST STUDIO
        ===================================================================== */}
        <section
          id="contact"
          className="no-print py-16 md:py-24 border-t border-zinc-200 bg-white"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-10">
              <p className="text-xs font-mono text-zinc-500 mb-2">
                03. Application Cover Letter & Direct Hiring Contact
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-zinc-950">
                Application & Interview Studio
              </h2>
              <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
                Generate a role-tailored cover letter matched to {cvData.fullName}’s qualifications, or send a direct interview invitation via email or phone.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 Columns: Role-Tailored Cover Letter Generator */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-zinc-200 bg-[#FAF9F6]">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-zinc-200">
                  <div>
                    <h3 className="font-display text-lg font-bold text-zinc-950">
                      Role-Specific Cover Letter Builder
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Select a target position to tailor {cvData.fullName}’s application letter
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCoverLetter}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-zinc-900 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedLetter ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied Cover Letter
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Cover Letter
                      </>
                    )}
                  </button>
                </div>

                {/* Role Preset Selector Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {ROLE_COVER_LETTER_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        selectedPresetId === preset.id
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                      }`}
                    >
                      {preset.roleTitle}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Target Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Himalayan Bank / Apex Tech Nepal"
                      value={hiringCompany}
                      onChange={(e) => setHiringCompany(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">
                      Recipient Title
                    </label>
                    <input
                      type="text"
                      value={hiringManager}
                      onChange={(e) => setHiringManager(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Rendered Cover Letter Preview */}
                <div className="p-6 bg-white rounded-xl border border-zinc-200 text-sm text-zinc-800 space-y-4 leading-relaxed font-sans">
                  <div className="pb-3 border-b border-zinc-100 text-xs font-mono text-zinc-500">
                    SUBJECT: {activePreset.subjectLine}
                    {hiringCompany.trim() ? ` (${hiringCompany.trim()})` : ''}
                  </div>
                  <p className="font-medium text-zinc-900">
                    Dear {hiringManager.trim() || 'Hiring Manager'},
                  </p>
                  {activePreset.bodyParagraphs.map((paragraph, idx) => (
                    <p key={idx}>
                      {paragraph.replace(
                        'your organization',
                        hiringCompany.trim() || 'your organization'
                      )}
                    </p>
                  ))}
                  <div className="pt-2 text-zinc-900">
                    <p className="text-zinc-600">Sincerely,</p>
                    <p className="font-display font-bold mt-1">
                      {cvData.fullName}
                    </p>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      {cvData.address} · {cvData.phone} · {cvData.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Direct Employer Contact & Interview Dispatcher */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-zinc-200 bg-[#FAF9F6] flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-zinc-950 mb-1">
                    Direct Contact & Interview Request
                  </h3>
                  <p className="text-xs text-zinc-600 mb-6">
                    Reach {cvData.fullName} directly via phone or email for computer operator, digital support, or trainee opportunities.
                  </p>

                  {/* Direct Verified Coordinates */}
                  <div className="space-y-3 mb-8 p-4 bg-white rounded-xl border border-zinc-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Candidate</span>
                      <span className="font-semibold text-zinc-950">
                        {cvData.fullName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-zinc-100">
                      <span className="text-zinc-500">Location</span>
                      <span className="font-medium text-zinc-900">
                        {cvData.address}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-zinc-100">
                      <span className="text-zinc-500">Phone</span>
                      <a
                        href={`tel:${cvData.phone}`}
                        className="font-mono font-semibold text-blue-600 hover:underline"
                      >
                        {cvData.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-zinc-100">
                      <span className="text-zinc-500">Email</span>
                      <a
                        href={`mailto:${cvData.email}`}
                        className="font-medium text-blue-600 hover:underline truncate max-w-[210px]"
                      >
                        {cvData.email}
                      </a>
                    </div>
                  </div>

                  {/* Quick Interview Invitation Composer */}
                  <form onSubmit={handlePrepareInterviewEmail} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Your Name / Recruiter Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={employerName}
                        onChange={(e) => setEmployerName(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1">
                          Organization
                        </label>
                        <input
                          type="text"
                          placeholder="Company name"
                          value={employerOrg}
                          onChange={(e) => setEmployerOrg(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1">
                          Role / Position
                        </label>
                        <input
                          type="text"
                          value={interviewRole}
                          onChange={(e) => setInterviewRole(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">
                        Interview Date / Message Note
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Optional interview time, location, or role details..."
                        value={interviewNote}
                        onChange={(e) => setInterviewNote(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={buildMailtoHref()}
                        onClick={() => setInquiryStatus('ready')}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Email to {cvData.email}
                      </a>
                    </div>
                    {inquiryStatus === 'ready' && (
                      <p className="text-xs text-emerald-700 font-medium">
                        Email draft prepared for {cvData.email} ({cvData.phone}).
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            04. PRINTABLE A4 CURRICULUM VITAE SHEET & LIVE CUSTOMIZER
        ===================================================================== */}
        <PrintableCVSection
          cvData={cvData}
          onUpdateCV={setCvData}
          onResetCV={() => setCvData(INITIAL_CV_DATA)}
        />
      </main>

      {/* =====================================================================
          CLEAN FOOTER (Hidden when printing A4 CV)
      ===================================================================== */}
      <footer className="no-print border-t border-zinc-200 bg-white py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            <span className="font-semibold text-zinc-900">
              {cvData.fullName}
            </span>{' '}
            · Curriculum Vitae · {cvData.address}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono">Phone: {cvData.phone}</span>
            <span aria-hidden="true">·</span>
            <span>Email: {cvData.email}</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-zinc-900 font-medium hover:underline"
            >
              Print A4 CV
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FULLSCREEN LIGHTBOX MODAL FOR BENTO SHOWCASE TILES
      ===================================================================== */}
      {lightboxItem && (
        <div
          className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-zinc-900">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-mono text-zinc-500 mb-1">
                {lightboxItem.subtitle}
              </p>
              <h3 className="font-display text-2xl font-bold text-zinc-950 mb-3">
                {lightboxItem.title}
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed mb-6">
                {lightboxItem.description}
              </p>
              <div className="pt-4 border-t border-zinc-200">
                <p className="text-xs font-mono text-zinc-500 mb-2">
                  KEY CAPABILITY HIGHLIGHTS
                </p>
                <div className="text-sm text-zinc-900">
                  {lightboxItem.highlights.join('  ·  ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

