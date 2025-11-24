import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function TwoColumnTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 min-h-[297mm] flex gap-8" style={{ width: "210mm" }}>
      {/* Left Column */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">{personalInfo.fullName || "Your Name"}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{personalInfo.email || "email@example.com"}</p>
            <p>{personalInfo.phone || "+1 234 567 890"}</p>
            <p>{personalInfo.location || "Location"}</p>
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2">About</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 text-gray-900">{t.experience}</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-sm font-semibold text-gray-900">{exp.position || "Position"}</h3>
                  <p className="text-xs text-gray-600">{exp.company || "Company"}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-gray-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="flex-1">
        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 text-gray-900">{t.education}</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-sm font-semibold text-gray-900">{edu.degree || "Degree"}</h3>
                  <p className="text-xs text-gray-600">{edu.school || "School"}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.current)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-900">{t.skills}</h2>
            <div className="space-y-2">
              {skills.filter(s => s).map((skill, i) => (
                <div key={i} className="flex items-center text-xs text-gray-700">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
