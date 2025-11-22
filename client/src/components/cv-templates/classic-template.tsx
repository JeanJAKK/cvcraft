import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function ClassicTemplate({ personalInfo, experience, education, skills }: CVTemplateProps) {
  const formatDate = (date: string, current: boolean) => {
    if (current) return "Present";
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header - Centered */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-serif font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
        <div className="text-sm text-gray-600 space-x-3">
          <span>{personalInfo.email || "email@example.com"}</span>
          <span>•</span>
          <span>{personalInfo.phone || "+1 234 567 890"}</span>
          <span>•</span>
          <span>{personalInfo.location || "Location"}</span>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{exp.position || "Position"}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="italic text-gray-600 text-sm mb-2">{exp.company || "Company"}</p>
                {exp.description && (
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold">{edu.degree || "Degree"}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="italic text-gray-600 text-sm mb-2">{edu.school || "School"}</p>
                {edu.description && (
                  <p className="text-gray-700 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && skills.some(s => s.trim()) && (
        <div>
          <h2 className="text-lg font-serif font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-gray-700 text-sm">
            {skills.filter(s => s.trim()).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
