import React, { useState } from 'react';
import { CVDocumentData } from '../data/cvData';
import { Printer, Check, Copy, RotateCcw, Plus, Trash2, Edit3, Eye, FileText } from 'lucide-react';

interface PrintableCVSectionProps {
  cvData: CVDocumentData;
  onUpdateCV: (updated: CVDocumentData) => void;
  onResetCV: () => void;
}

export type CVTemplateStyle = 'editorial' | 'swiss' | 'classic';

export const PrintableCVSection: React.FC<PrintableCVSectionProps> = ({
  cvData,
  onUpdateCV,
  onResetCV,
}) => {
  const [template, setTemplate] = useState<CVTemplateStyle>('classic');
  const [isEditing, setIsEditing] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');
  const [newStrengthText, setNewStrengthText] = useState('');
  const [newEducationLevel, setNewEducationLevel] = useState('');
  const [newEducationStatus, setNewEducationStatus] = useState('Passed');

  const handlePrint = () => {
    window.print();
  };

  const generatePlainTextCV = (): string => {
    const skillsList = cvData.technicalSkills.map((s) => `- ${s.title}`).join('\n');
    const eduList = cvData.education.map((e) => `- ${e.level}: ${e.status}`).join('\n');
    const langList = cvData.languages.map((l) => `- ${l.language}`).join('\n');
    const strengthList = cvData.personalStrengths.map((s) => `- ${s.title}`).join('\n');

    return `# CURRICULUM VITAE

## ${cvData.fullName.toUpperCase()}

Address: ${cvData.address}
Phone: ${cvData.phone}
Email: ${cvData.email}

---

### CAREER OBJECTIVE
${cvData.careerObjective}

### EDUCATIONAL QUALIFICATION
${eduList}

### TECHNICAL SKILLS
${skillsList}

### WORK EXPERIENCE
${cvData.workExperienceTitle}
${cvData.workExperienceStatement}

### LANGUAGE PROFICIENCY
${langList}

### PERSONAL STRENGTHS
${strengthList}

### DECLARATION
${cvData.declarationText}

Place: ${cvData.declarationPlace}
Signature: ${cvData.signatureName}`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generatePlainTextCV());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2200);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillText.trim();
    if (!trimmed) return;
    onUpdateCV({
      ...cvData,
      technicalSkills: [
        ...cvData.technicalSkills,
        {
          id: `skill-${Date.now()}`,
          title: trimmed,
          category: 'Operations',
          summary: 'Added custom technical competency for organizational support.',
          practicalApplications: ['Applied in daily computer and office operations'],
          readinessLevel: 'Day-One Operational',
        },
      ],
    });
    setNewSkillText('');
  };

  const handleRemoveSkill = (id: string) => {
    onUpdateCV({
      ...cvData,
      technicalSkills: cvData.technicalSkills.filter((s) => s.id !== id),
    });
  };

  const handleAddStrength = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newStrengthText.trim();
    if (!trimmed) return;
    onUpdateCV({
      ...cvData,
      personalStrengths: [
        ...cvData.personalStrengths,
        {
          id: `str-${Date.now()}`,
          title: trimmed,
          description: 'Core personal attribute supporting workplace excellence.',
          workplaceImpact: 'Positive team and operational contribution.',
        },
      ],
    });
    setNewStrengthText('');
  };

  const handleRemoveStrength = (id: string) => {
    onUpdateCV({
      ...cvData,
      personalStrengths: cvData.personalStrengths.filter((s) => s.id !== id),
    });
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newEducationLevel.trim();
    if (!trimmed) return;
    onUpdateCV({
      ...cvData,
      education: [
        ...cvData.education,
        {
          id: `edu-${Date.now()}`,
          level: trimmed,
          status: newEducationStatus.trim() || 'Passed',
          institutionNote: 'Academic / Training Credential',
          focusAreas: 'General & Technical Studies',
        },
      ],
    });
    setNewEducationLevel('');
  };

  const handleRemoveEducation = (id: string) => {
    if (cvData.education.length <= 1) return;
    onUpdateCV({
      ...cvData,
      education: cvData.education.filter((e) => e.id !== id),
    });
  };

  return (
    <section id="cv-document" className="py-16 md:py-24 border-t border-zinc-200">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header + Interactive Document Controls (Hidden when printing) */}
        <div className="no-print mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono text-zinc-500 tracking-tight mb-2">
              04. Official A4 Document Studio · Live Print & Customization
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900">
              Curriculum Vitae Sheet
            </h2>
            <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
              Formatted to standard A4 proportions for immediate printing, PDF export, or live field customization before sending to employers.
            </p>
          </div>

          {/* Interactive Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Template Selector Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-zinc-200/70 rounded-lg">
              <button
                type="button"
                onClick={() => setTemplate('classic')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  template === 'classic'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Classic Formal
              </button>
              <button
                type="button"
                onClick={() => setTemplate('swiss')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  template === 'swiss'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Swiss Grid
              </button>
              <button
                type="button"
                onClick={() => setTemplate('editorial')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  template === 'editorial'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Editorial Monograph
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                isEditing
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {isEditing ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  Preview Mode
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  Customize Fields
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied Text
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Markdown
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Live Editor Drawer (When Customize Mode is toggled) */}
        {isEditing && (
          <div className="no-print mb-10 p-6 md:p-8 bg-white border border-zinc-200 rounded-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
              <div>
                <h3 className="text-base font-bold text-zinc-900">
                  Live CV Content Editor
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Any changes made below immediately update both the portfolio and the printable A4 Curriculum Vitae sheet.
                </p>
              </div>
              <button
                type="button"
                onClick={onResetCV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Original CV
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={cvData.fullName}
                  onChange={(e) => onUpdateCV({ ...cvData, fullName: e.target.value, signatureName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Address / Location
                </label>
                <input
                  type="text"
                  value={cvData.address}
                  onChange={(e) => onUpdateCV({ ...cvData, address: e.target.value, declarationPlace: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={cvData.phone}
                    onChange={(e) => onUpdateCV({ ...cvData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm font-mono border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => onUpdateCV({ ...cvData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Career Objective
                </label>
                <textarea
                  rows={3}
                  value={cvData.careerObjective}
                  onChange={(e) => onUpdateCV({ ...cvData, careerObjective: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  Work Experience Summary ({cvData.workExperienceTitle})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={cvData.workExperienceTitle}
                    onChange={(e) => onUpdateCV({ ...cvData, workExperienceTitle: e.target.value })}
                    placeholder="Experience Status (e.g. Fresher)"
                    className="w-1/3 px-3 py-1.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    value={cvData.workExperienceStatement}
                    onChange={(e) => onUpdateCV({ ...cvData, workExperienceStatement: e.target.value })}
                    placeholder="Experience Statement"
                    className="w-2/3 px-3 py-1.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Declaration Statement
                </label>
                <input
                  type="text"
                  value={cvData.declarationText}
                  onChange={(e) => onUpdateCV({ ...cvData, declarationText: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Add / Remove Qualifications, Technical Skills & Personal Strengths */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-zinc-200">
              {/* Education */}
              <div>
                <p className="text-xs font-semibold text-zinc-800 mb-2">
                  Educational Qualifications
                </p>
                <ul className="space-y-1.5 mb-3">
                  {cvData.education.map((edu) => (
                    <li
                      key={edu.id}
                      className="flex items-center justify-between text-xs bg-zinc-50 px-3 py-1.5 rounded border border-zinc-200"
                    >
                      <span className="truncate pr-2">
                        <strong>{edu.level}</strong>: {edu.status}
                      </span>
                      {cvData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(edu.id)}
                          className="text-zinc-400 hover:text-rose-600 shrink-0"
                          title="Remove qualification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddEducation} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. Diploma in Computer..."
                    value={newEducationLevel}
                    onChange={(e) => setNewEducationLevel(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    placeholder="Status"
                    value={newEducationStatus}
                    onChange={(e) => setNewEducationStatus(e.target.value)}
                    className="w-20 px-2 py-1.5 text-xs border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 text-xs font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-800 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Technical Skills */}
              <div>
                <p className="text-xs font-semibold text-zinc-800 mb-2">
                  Technical Skills ({cvData.technicalSkills.length})
                </p>
                <ul className="space-y-1.5 mb-3 max-h-36 overflow-y-auto">
                  {cvData.technicalSkills.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex items-center justify-between text-xs bg-zinc-50 px-3 py-1.5 rounded border border-zinc-200"
                    >
                      <span className="truncate pr-2">{skill.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="text-zinc-400 hover:text-rose-600 shrink-0"
                        title="Remove skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddSkill} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Add technical skill..."
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 text-xs font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-800 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Personal Strengths */}
              <div>
                <p className="text-xs font-semibold text-zinc-800 mb-2">
                  Personal Strengths ({cvData.personalStrengths.length})
                </p>
                <ul className="space-y-1.5 mb-3 max-h-36 overflow-y-auto">
                  {cvData.personalStrengths.map((str) => (
                    <li
                      key={str.id}
                      className="flex items-center justify-between text-xs bg-zinc-50 px-3 py-1.5 rounded border border-zinc-200"
                    >
                      <span className="truncate pr-2">{str.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStrength(str.id)}
                        className="text-zinc-400 hover:text-rose-600 shrink-0"
                        title="Remove strength"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddStrength} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Add personal strength..."
                    value={newStrengthText}
                    onChange={(e) => setNewStrengthText(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 text-xs font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-800 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* THE A4 PRINTABLE CURRICULUM VITAE SHEET */}
        <div className="print-only-sheet max-w-[850px] mx-auto bg-white border border-zinc-200 rounded-xl p-8 sm:p-12 md:p-16 text-zinc-900">
          {template === 'classic' && (
            <div>
              {/* Classic Formal CV Header */}
              <div className="border-b-2 border-zinc-900 pb-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-zinc-500 tracking-widest mb-1">
                      CURRICULUM VITAE
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 uppercase">
                      {cvData.fullName}
                    </h1>
                  </div>
                  <div className="text-sm text-zinc-700 space-y-1 sm:text-right">
                    <p>
                      <span className="font-semibold text-zinc-900">Address:</span> {cvData.address}
                    </p>
                    <p>
                      <span className="font-semibold text-zinc-900">Phone:</span>{' '}
                      <span className="font-mono">{cvData.phone}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-zinc-900">Email:</span>{' '}
                      <a href={`mailto:${cvData.email}`} className="underline hover:text-blue-600">
                        {cvData.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Career Objective */}
              <div className="mb-7">
                <h2 className="text-xs font-bold tracking-wider text-zinc-900 uppercase border-b border-zinc-200 pb-1.5 mb-3">
                  Career Objective
                </h2>
                <p className="text-sm leading-relaxed text-zinc-800">
                  {cvData.careerObjective}
                </p>
              </div>

              {/* Educational Qualification */}
              <div className="mb-7">
                <h2 className="text-xs font-bold tracking-wider text-zinc-900 uppercase border-b border-zinc-200 pb-1.5 mb-3">
                  Educational Qualification
                </h2>
                <ul className="space-y-2 text-sm text-zinc-800">
                  {cvData.education.map((edu) => (
                    <li key={edu.id} className="flex items-baseline justify-between">
                      <div>
                        <span className="font-semibold text-zinc-900">{edu.level}:</span>{' '}
                        <span>{edu.status}</span>
                      </div>
                      <span className="text-xs text-zinc-500">{edu.institutionNote}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Skills */}
              <div className="mb-7">
                <h2 className="text-xs font-bold tracking-wider text-zinc-900 uppercase border-b border-zinc-200 pb-1.5 mb-3">
                  Technical Skills
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-zinc-800 list-disc list-inside">
                  {cvData.technicalSkills.map((skill) => (
                    <li key={skill.id} className="text-zinc-800">
                      <span className="font-medium text-zinc-900">{skill.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Work Experience */}
              <div className="mb-7">
                <h2 className="text-xs font-bold tracking-wider text-zinc-900 uppercase border-b border-zinc-200 pb-1.5 mb-3">
                  Work Experience
                </h2>
                <p className="text-sm font-semibold text-zinc-900 mb-1">
                  {cvData.workExperienceTitle}
                </p>
                <p className="text-sm text-zinc-800 leading-relaxed">
                  {cvData.workExperienceStatement}
                </p>
              </div>

              {/* Two-Column Languages & Personal Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xs font-bold tracking-wider text-zinc-900 uppercase border-b border-zinc-200 pb-1.5 mb-3">
                    Language Proficiency
                  </h2>
                  <ul className="space-y-1.5 text-sm text-zinc-800 list-disc list-inside">
                    {cvData.languages.map((lang) => (
                      <li key={lang.language}>
                        <span className="font-medium text-zinc-900">{lang.language}</span>
                        <span className="text-xs text-zinc-500"> · {lang.proficiency}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xs font-bold tracking-wider text-zinc-900 uppercase border-b border-zinc-200 pb-1.5 mb-3">
                    Personal Strengths
                  </h2>
                  <ul className="space-y-1.5 text-sm text-zinc-800 list-disc list-inside">
                    {cvData.personalStrengths.map((str) => (
                      <li key={str.id}>
                        <span className="font-medium text-zinc-900">{str.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Declaration & Signature Block */}
              <div className="pt-4 border-t border-zinc-200">
                <h2 className="text-xs font-bold tracking-wider text-zinc-900 uppercase mb-2">
                  Declaration
                </h2>
                <p className="text-sm text-zinc-800 leading-relaxed mb-8">
                  {cvData.declarationText}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2">
                  <div className="text-sm text-zinc-800 space-y-1">
                    <p>
                      <span className="font-semibold text-zinc-900">Place:</span>{' '}
                      {cvData.declarationPlace}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-display italic text-lg text-zinc-900 mb-1">
                      {cvData.signatureName}
                    </p>
                    <div className="w-48 sm:ml-auto border-t border-zinc-400 pt-1">
                      <p className="text-xs font-semibold text-zinc-700">
                        Signature · {cvData.signatureName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {template === 'swiss' && (
            <div>
              {/* Swiss Architectural Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 mb-8 border-b border-zinc-900">
                <div className="md:col-span-8">
                  <p className="text-xs font-mono text-blue-600 mb-1">
                    CURRICULUM VITAE · OFFICIAL DOSSIER
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                    {cvData.fullName}
                  </h1>
                  <p className="text-sm text-zinc-600 mt-1">{cvData.roleKicker}</p>
                </div>
                <div className="md:col-span-4 text-xs font-mono text-zinc-700 space-y-1.5 md:border-l md:border-zinc-200 md:pl-5">
                  <div>ADDRESS · {cvData.address}</div>
                  <div>PHONE · {cvData.phone}</div>
                  <div className="truncate">EMAIL · {cvData.email}</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-zinc-200">
                  <div className="md:col-span-4 text-xs font-mono font-semibold text-zinc-500">
                    01 · CAREER OBJECTIVE
                  </div>
                  <div className="md:col-span-8 text-sm leading-relaxed text-zinc-800">
                    {cvData.careerObjective}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-zinc-200">
                  <div className="md:col-span-4 text-xs font-mono font-semibold text-zinc-500">
                    02 · EDUCATION
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    {cvData.education.map((edu) => (
                      <div key={edu.id} className="text-sm">
                        <span className="font-semibold text-zinc-900">{edu.level}</span> —{' '}
                        <span className="text-zinc-700">{edu.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-zinc-200">
                  <div className="md:col-span-4 text-xs font-mono font-semibold text-zinc-500">
                    03 · TECHNICAL SKILLS
                  </div>
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-900">
                    {cvData.technicalSkills.map((s, idx) => (
                      <div key={s.id} className="flex items-baseline gap-2">
                        <span className="text-xs font-mono text-zinc-400">0{idx + 1}</span>
                        <span className="font-medium">{s.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-zinc-200">
                  <div className="md:col-span-4 text-xs font-mono font-semibold text-zinc-500">
                    04 · WORK EXPERIENCE
                  </div>
                  <div className="md:col-span-8 text-sm">
                    <p className="font-semibold text-zinc-900 mb-1">{cvData.workExperienceTitle}</p>
                    <p className="text-zinc-700">{cvData.workExperienceStatement}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-zinc-200">
                  <div className="md:col-span-4 text-xs font-mono font-semibold text-zinc-500">
                    05 · LANGUAGES & STRENGTHS
                  </div>
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 mb-2">Languages</p>
                      <p className="text-zinc-900">
                        {cvData.languages.map((l) => l.language).join(' · ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 mb-2">Personal Strengths</p>
                      <ul className="space-y-1 text-zinc-800">
                        {cvData.personalStrengths.map((str) => (
                          <li key={str.id}>{str.title}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                  <div className="md:col-span-4 text-xs font-mono font-semibold text-zinc-500">
                    06 · DECLARATION
                  </div>
                  <div className="md:col-span-8 text-sm text-zinc-800">
                    <p className="mb-6">{cvData.declarationText}</p>
                    <div className="flex items-end justify-between border-t border-zinc-200 pt-4">
                      <div>
                        <span className="text-xs font-mono text-zinc-500">PLACE: </span>
                        <span className="font-semibold">{cvData.declarationPlace}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-zinc-500 block">SIGNATURE</span>
                        <span className="font-semibold text-zinc-900">{cvData.signatureName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {template === 'editorial' && (
            <div>
              {/* Editorial Monograph Layout */}
              <div className="text-center pb-8 mb-8 border-b border-zinc-200">
                <p className="text-xs font-mono text-zinc-500 mb-2">CURRICULUM VITAE</p>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-3">
                  {cvData.fullName}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-600">
                  <span>Address: {cvData.address}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">Phone: {cvData.phone}</span>
                  <span aria-hidden="true">·</span>
                  <span>Email: {cvData.email}</span>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <h2 className="text-xs font-mono text-zinc-500 mb-2">Career Objective</h2>
                  <p className="text-base leading-relaxed text-zinc-900">
                    {cvData.careerObjective}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-zinc-200">
                  <div>
                    <h2 className="text-xs font-mono text-zinc-500 mb-2">
                      Educational Qualification
                    </h2>
                    {cvData.education.map((edu) => (
                      <div key={edu.id} className="text-sm">
                        <p className="font-semibold text-zinc-900">{edu.level}</p>
                        <p className="text-zinc-600">Status: {edu.status}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2 className="text-xs font-mono text-zinc-500 mb-2">Work Experience</h2>
                    <p className="text-sm font-semibold text-zinc-900">
                      {cvData.workExperienceTitle}
                    </p>
                    <p className="text-sm text-zinc-700 mt-0.5">
                      {cvData.workExperienceStatement}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200">
                  <h2 className="text-xs font-mono text-zinc-500 mb-3">Technical Skills</h2>
                  <div className="text-sm text-zinc-900 leading-relaxed">
                    {cvData.technicalSkills.map((s) => s.title).join('  ·  ')}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-zinc-200">
                  <div>
                    <h2 className="text-xs font-mono text-zinc-500 mb-2">Language Proficiency</h2>
                    <p className="text-sm text-zinc-900">
                      {cvData.languages.map((l) => l.language).join(' · ')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xs font-mono text-zinc-500 mb-2">Personal Strengths</h2>
                    <p className="text-sm text-zinc-900 leading-relaxed">
                      {cvData.personalStrengths.map((s) => s.title).join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200">
                  <h2 className="text-xs font-mono text-zinc-500 mb-2">Declaration</h2>
                  <p className="text-sm text-zinc-800 italic mb-6">{cvData.declarationText}</p>
                  <div className="flex items-end justify-between text-sm">
                    <div>
                      <span className="text-zinc-500">Place:</span>{' '}
                      <span className="font-medium text-zinc-900">{cvData.declarationPlace}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500 block text-xs">Signature</span>
                      <span className="font-semibold text-zinc-900">{cvData.signatureName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
