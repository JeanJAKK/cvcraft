import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function BlueTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header */}
      <div className="mb-8 pb-6 border-b-4 border-blue-500">
        <h1 className="text-5xl font-bold text-blue-600 mb-2">{personalInfo.fullName || "Your Name"}</h1>
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
        <div className="mb-8 bg-blue-50 p-4 rounded">
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.experience}</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-300 pl-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position || "Position"}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-1">{exp.company || "Company"}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.education}</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-blue-300 pl-4">
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
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s).map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
