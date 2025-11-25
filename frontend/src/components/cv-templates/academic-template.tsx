import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function AcademicTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header - Academic */}
      <div className="border-b-4 border-blue-900 pb-6 mb-8">
        <div className="flex flex-col items-center gap-4">
          {personalInfo.profilePhoto && (
            <img 
              src={personalInfo.profilePhoto} 
              alt="Profile" 
              className="w-24 h-24 rounded-lg object-cover"
            />
          )}
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">{personalInfo.fullName || "Your Name"}</h1>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{personalInfo.email || "email@example.com"} • {personalInfo.phone || "+1 234 567 890"}</p>
              <p>{personalInfo.location || "Location"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-serif font-bold text-blue-900 mb-3 uppercase">{t.summary}</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-serif font-bold text-blue-900 mb-3 uppercase">Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold">{exp.position || "Position"}</h3>
                    <p className="italic text-gray-600 text-sm">{exp.company || "Company"}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-2 whitespace-pre-wrap text-justify">{exp.description}</p>
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
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold">{edu.degree || "Degree"}</h3>
                    <p className="italic text-gray-600 text-sm">{edu.school || "School"}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.current)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm mt-2 text-justify">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && skills.some(s => s.trim()) && (
        <div>
          <h2 className="text-lg font-serif font-bold text-blue-900 mb-3 uppercase">Core Competencies</h2>
          <p className="text-gray-700 text-sm text-justify">
            {skills.filter(s => s.trim()).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
