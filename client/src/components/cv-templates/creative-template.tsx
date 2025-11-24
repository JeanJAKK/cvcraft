import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function CreativeTemplate({ personalInfo, experience, education, skills }: CVTemplateProps) {
  const formatDate = (date: string, current: boolean) => {
    if (current) return "Present";
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header - Colorful */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-3 text-sm">
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
          <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
            <div className="h-1 w-6 bg-purple-600"></div>
            About
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
            <div className="h-1 w-6 bg-purple-600"></div>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={exp.id} className="border-l-4 border-pink-500 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position || "Position"}</h3>
                    <p className="text-gray-600">{exp.company || "Company"}</p>
                  </div>
                  <span className="text-sm text-gray-500">
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
        <div className="mb-6">
          <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
            <div className="h-1 w-6 bg-purple-600"></div>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-pink-500 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree || "Degree"}</h3>
                    <p className="text-gray-600">{edu.school || "School"}</p>
                  </div>
                  <span className="text-sm text-gray-500">
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
          <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
            <div className="h-1 w-6 bg-purple-600"></div>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s.trim()).map((skill, index) => (
              <span key={index} className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
