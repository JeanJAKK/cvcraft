import type { PersonalInfo, ExperienceEntry, EducationEntry } from "@shared/schema";
import { useTranslations } from "@/hooks/use-translations";
import { ModernTemplate } from "./cv-templates/modern-template";
import { ClassicTemplate } from "./cv-templates/classic-template";
import { MinimalTemplate } from "./cv-templates/minimal-template";
import { CreativeTemplate } from "./cv-templates/creative-template";
import { ExecutiveTemplate } from "./cv-templates/executive-template";
import { TechTemplate } from "./cv-templates/tech-template";
import { DesignerTemplate } from "./cv-templates/designer-template";
import { AcademicTemplate } from "./cv-templates/academic-template";
import { ElegantTemplate } from "./cv-templates/elegant-template";
import { SidebarTemplate } from "./cv-templates/sidebar-template";
import { CardsTemplate } from "./cv-templates/cards-template";
import { TwoColumnTemplate } from "./cv-templates/twocolumn-template";
import { MinimalistTemplate } from "./cv-templates/minimalist-template";
import { CorporateTemplate } from "./cv-templates/corporate-template";
import { BlueTemplate } from "./cv-templates/blue-template";
import { CleanTemplate } from "./cv-templates/clean-template";

interface CVPreviewProps {
  templateId: string;
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export function CVPreview({ templateId, personalInfo, experience, education, skills }: CVPreviewProps) {
  const t = useTranslations();
  
  const renderTemplate = () => {
    const props = { personalInfo, experience, education, skills, translations: t };

    switch (templateId) {
      case "modern":
        return <ModernTemplate {...props} />;
      case "classic":
        return <ClassicTemplate {...props} />;
      case "minimal":
        return <MinimalTemplate {...props} />;
      case "creative":
        return <CreativeTemplate {...props} />;
      case "executive":
        return <ExecutiveTemplate {...props} />;
      case "tech":
        return <TechTemplate {...props} />;
      case "designer":
        return <DesignerTemplate {...props} />;
      case "academic":
        return <AcademicTemplate {...props} />;
      case "elegant":
        return <ElegantTemplate {...props} />;
      case "sidebar":
        return <SidebarTemplate {...props} />;
      case "cards":
        return <CardsTemplate {...props} />;
      case "twocolumn":
        return <TwoColumnTemplate {...props} />;
      case "minimalist":
        return <MinimalistTemplate {...props} />;
      case "corporate":
        return <CorporateTemplate {...props} />;
      case "blue":
        return <BlueTemplate {...props} />;
      case "clean":
        return <CleanTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-muted/30 p-4 md:p-8">
      <div 
        className="mx-auto origin-top" 
        style={{ 
          transform: "scale(0.6)",
          transformOrigin: "top center"
        }}
        data-testid="cv-preview"
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
