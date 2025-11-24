import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function ExecutiveTemplate({ personalInfo, experience, education, skills }: CVTemplateProps) {
  const formatDate = (date: string, current: boolean) => {
    if (current) return "Present";
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header - Professional Dark */}
      <div className="border-b-2 border-amber-500 pb-6 mb-6">
        <div className="flex gap-6 items-start">
          {personalInfo.profilePhoto && (
            <img 
              src={personalInfo.profilePhoto} 
              alt="Profile" 
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span>{personalInfo.email || "email@example.com"}</span>
              <span>•</span>
              <span>{personalInfo.phone || "+1 234 567 890"}</span>
              <span>•</span>
              <span>{personalInfo.location || "Location"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-500 mb-3 uppercase tracking-wider">Executive Summary</h2>
          <p className="text-gray-200 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-500 mb-3 uppercase tracking-wider">Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position || "Position"}</h3>
                    <p className="text-amber-400">{exp.company || "Company"}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-amber-500 mb-3 uppercase tracking-wider">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree || "Degree"}</h3>
                    <p className="text-amber-400">{edu.school || "School"}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-300 text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && skills.some(s => s.trim()) && (
        <div>
          <h2 className="text-xl font-bold text-amber-500 mb-3 uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s.trim()).map((skill, index) => (
              <span key={index} className="bg-amber-900 text-amber-200 px-3 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
