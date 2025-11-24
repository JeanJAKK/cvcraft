import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function CardsTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-gray-50 text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{personalInfo.email || "email@example.com"}</span>
          <span>•</span>
          <span>{personalInfo.phone || "+1 234 567 890"}</span>
          <span>•</span>
          <span>{personalInfo.location || "Location"}</span>
        </div>
      </div>

      {/* Summary Card */}
      {personalInfo.summary && (
        <div className="bg-white p-4 rounded-lg mb-6 shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience Cards */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.experience}</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position || "Position"}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.company || "Company"}</p>
                {exp.description && (
                  <p className="text-xs text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Cards */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.education}</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
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
              <span key={i} className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
