import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";

interface CVTemplateProps {

  translations?: any;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function DesignerTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || { present: "Present", experience: "Experience", education: "Education", skills: "Skills", summary: "Summary" };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header - Design Forward */}
      <div className="mb-8 flex gap-8">
        {personalInfo.profilePhoto ? (
          <img 
            src={personalInfo.profilePhoto} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex-shrink-0"></div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <div className="h-1 w-12 bg-indigo-500 mb-3"></div>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span>{personalInfo.email || "email@example.com"}</span>
            <span>•</span>
            <span>{personalInfo.phone || "+1 234 567 890"}</span>
            <span>•</span>
            <span>{personalInfo.location || "Location"}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8 bg-indigo-50 p-4 rounded">
          <h2 className="text-lg font-bold text-indigo-600 mb-2">Profile</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.experience}</h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={exp.id} className="relative pl-6">
                <div className="absolute left-0 top-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position || "Position"}</h3>
                    <p className="text-indigo-600">{exp.company || "Company"}</p>
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
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.education}</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-6">
                <div className="absolute left-0 top-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree || "Degree"}</h3>
                    <p className="text-indigo-600">{edu.school || "School"}</p>
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
          <h2 className="text-lg font-bold mb-4 text-gray-900">{t.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s.trim()).map((skill, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
