import type {
  PersonalInfo,
  ExperienceEntry,
  EducationEntry,
} from "@shared/schema";

interface CVTemplateProps {
  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function CorporateTemplate({
  personalInfo,
  experience,
  education,
  skills,
  translations,
}: CVTemplateProps) {
  const t = translations || {
    present: "Present",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    summary: "Summary",
  };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div
      className="bg-white text-gray-900 p-12 min-h-[297mm]"
      style={{ width: "210mm" }}
    >
      {/* Header Bar */}
      <div className="bg-blue-900 text-white p-6 mb-8 -mx-12 px-12">
        <h1 className="text-4xl font-bold mb-4">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          <span>{personalInfo.email || "email@example.com"}</span>
          <span>|</span>
          <span>{personalInfo.phone || "+228 93 49 52 90"}</span>
          <span>|</span>
          <span>{personalInfo.location || "Location"}</span>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
            Professional Overview
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide border-b-2 border-blue-900 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">
                    {exp.position || "Position"}
                  </h3>
                  <span className="text-xs text-gray-600">
                    {formatDate(exp.startDate, false)} –{" "}
                    {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-sm text-blue-700 font-semibold mb-1">
                  {exp.company || "Company"}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900">
            {t.education}
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree || "Degree"}
                  </h3>
                  <span className="text-xs text-gray-600">
                    {formatDate(edu.startDate, false)} –{" "}
                    {formatDate(edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {edu.school || "School"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide border-b-2 border-blue-900 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {skills
              .filter((s) => s)
              .map((skill, i) => (
                <div key={i} className="text-xs text-gray-700">
                  • {skill}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
