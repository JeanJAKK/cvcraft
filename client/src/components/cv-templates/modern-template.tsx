import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";
import { Mail, Phone, MapPin } from "lucide-react";

interface CVTemplateProps {
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  translations?: any;
}

export function ModernTemplate({ personalInfo, experience, education, skills, translations }: CVTemplateProps) {
  const t = translations || {

    skills: 'Skills',
    summary: 'Professional Summary'
  };

  const formatDate = (date: string, current: boolean) => {
    if (current) return t.present;
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white text-gray-900 p-12 shadow-lg min-h-[297mm]" style={{ width: "210mm" }}>
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6 mb-6">
        <div className="flex gap-6 items-start">
          {personalInfo.profilePhoto && (
            <img 
              src={personalInfo.profilePhoto} 
              alt="Profile" 
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{personalInfo.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{personalInfo.phone || "+1 234 567 890"}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{personalInfo.location || "Location"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">{t.summary}</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">{t.experience}</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
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
          <h2 className="text-xl font-bold text-blue-600 mb-3">{t.education}</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
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
          <h2 className="text-xl font-bold text-blue-600 mb-3">{t.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(s => s.trim()).map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
