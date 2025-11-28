import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function MinimalTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header - Minimal */}
      <div className="mb-8 flex gap-6 items-start">
        {personalInfo.profilePhoto && (
          <img 
            src={personalInfo.profilePhoto} 
            alt="Profile" 
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-light mb-4">{personalInfo.fullName || "Your Name"}</h1>
          <div className="text-sm text-gray-500 font-light">
            {personalInfo.email || "email@example.com"} • {personalInfo.phone || "+228 93 49 52 90"} • {personalInfo.location || "Location"}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-sm font-light">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">{t.experience}</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium">{exp.position || "Position"}</h3>
                    <span className="text-xs text-gray-400 font-light">
                      {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-light">{exp.company || "Company"}</p>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-2 font-light whitespace-pre-wrap leading-relaxed">
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
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">{t.education}</h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="mb-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium">{edu.degree || "Degree"}</h3>
                    <span className="text-xs text-gray-400 font-light">
                      {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.current)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-light">{edu.school || "School"}</p>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-2 font-light leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && skills.some(s => s.trim()) && (
        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">{t.skills}</h2>
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 font-light">
            {skills.filter(s => s.trim()).map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
