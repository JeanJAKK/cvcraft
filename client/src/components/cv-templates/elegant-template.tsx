import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function ElegantTemplate({ personalInfo, experience, education, skills }: CVTemplateProps) {
  const formatDate = (date: string, current: boolean) => {
    if (current) return "Present";
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-light tracking-tight mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <div className="h-0.5 w-20 bg-gray-300 mb-4"></div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{personalInfo.email || "email@example.com"}</span>
          <span>•</span>
          <span>{personalInfo.phone || "+1 234 567 890"}</span>
          <span>•</span>
          <span>{personalInfo.location || "Location"}</span>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light tracking-wide mb-4 text-gray-800">EXPERIENCE</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position || "Position"}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.company || "Company"}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light tracking-wide mb-4 text-gray-800">EDUCATION</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree || "Degree"}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{edu.school || "School"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-light tracking-wide mb-3 text-gray-800">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s).map((skill, i) => (
              <span key={i} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
