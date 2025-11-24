import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function SidebarTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] flex" style={{ width: "210mm" }}>
      {/* Sidebar */}
      <div className="bg-gray-100 w-32 p-6 py-12">
        <div className="space-y-8">
          {skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-700 mb-3">{t.skills}</h3>
              <div className="space-y-2">
                {skills.filter(s => s).map((skill, i) => (
                  <div key={i} className="text-xs text-gray-600">{skill}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <div className="text-xs text-gray-600 space-y-1">
            <p>{personalInfo.email || "email@example.com"}</p>
            <p>{personalInfo.phone || "+1 234 567 890"}</p>
            <p>{personalInfo.location || "Location"}</p>
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-900">{t.experience}</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold">{exp.position || "Position"}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{exp.company || "Company"}</p>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-900">{t.education}</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
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
      </div>
    </div>
  );
}
