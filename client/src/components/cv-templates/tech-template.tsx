import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function TechTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };
  const formatDate = (date: string, current: boolean) => {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header - Tech Style */}
      <div className="mb-8 flex gap-6 items-start">
        {personalInfo.profilePhoto && (
          <img 
            src={personalInfo.profilePhoto} 
            alt="Profile" 
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-1 font-mono">{personalInfo.fullName || "Your Name"}</h1>
          <div className="h-1 w-16 bg-cyan-500 mb-4"></div>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 font-mono">
            <span>&lt; {personalInfo.email || "email@example.com"} &gt;</span>
            <span>•</span>
            <span>{personalInfo.phone || "+1 234 567 890"}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-cyan-600 mb-3 font-mono">// About</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-cyan-600 mb-3 font-mono">// Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-gray-50 p-3 rounded border-l-2 border-cyan-500">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold font-mono text-cyan-700">{exp.position || "Position"}</h3>
                    <p className="text-gray-600 text-sm">{exp.company || "Company"}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-2 whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-cyan-600 mb-3 font-mono">// Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-gray-50 p-3 rounded border-l-2 border-cyan-500">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold font-mono text-cyan-700">{edu.degree || "Degree"}</h3>
                    <p className="text-gray-600 text-sm">{edu.school || "School"}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && skills.some(s => s.trim()) && (
        <div>
          <h2 className="text-lg font-bold text-cyan-600 mb-3 font-mono">// Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s.trim()).map((skill, index) => (
              <span key={index} className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded text-sm font-mono">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
