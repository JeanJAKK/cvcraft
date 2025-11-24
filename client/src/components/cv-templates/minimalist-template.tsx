import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function MinimalistTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-8 min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black uppercase letter-spacing-tight">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-xs text-gray-500 mt-2">
          {personalInfo.email || "email@example.com"} • {personalInfo.phone || "+1 234 567 890"} • {personalInfo.location || "Location"}
        </p>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6 text-xs leading-relaxed text-gray-700">
          {personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-black uppercase text-gray-900 mb-3">Experience</p>
          {experience.map((exp, i) => (
            <div key={exp.id} className={i > 0 ? "mt-4" : ""}>
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-bold text-gray-900">{exp.position || "Position"}</p>
                <p className="text-xs text-gray-500">{formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}</p>
              </div>
              <p className="text-xs text-gray-600">{exp.company || "Company"}</p>
              {exp.description && (
                <p className="text-xs text-gray-700 mt-1">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-black uppercase text-gray-900 mb-3">Education</p>
          {education.map((edu, i) => (
            <div key={edu.id} className={i > 0 ? "mt-3" : ""}>
              <p className="text-xs font-bold text-gray-900">{edu.degree || "Degree"}</p>
              <p className="text-xs text-gray-600">{edu.school || "School"} • {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.current)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <p className="text-xs font-black uppercase text-gray-900 mb-2">Skills</p>
          <p className="text-xs text-gray-700">
            {skills.filter(s => s).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
