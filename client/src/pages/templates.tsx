import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, CheckCircle2, Sparkles } from "lucide-react";
import type { Template } from "@shared/schema";
import { ModernTemplate } from "@/components/cv-templates/modern-template";
import { ClassicTemplate } from "@/components/cv-templates/classic-template";
import { MinimalTemplate } from "@/components/cv-templates/minimal-template";
import { CreativeTemplate } from "@/components/cv-templates/creative-template";
import { ExecutiveTemplate } from "@/components/cv-templates/executive-template";
import { TechTemplate } from "@/components/cv-templates/tech-template";
import { DesignerTemplate } from "@/components/cv-templates/designer-template";
import { AcademicTemplate } from "@/components/cv-templates/academic-template";

function TemplateCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <Skeleton className="aspect-[8.5/11] w-full" />
      </CardContent>
      <CardFooter className="flex flex-col gap-3 p-4">
        <div className="w-full space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

function getTemplateComponent(templateId: string) {
  const defaultProps = {
    personalInfo: {
      fullName: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Creative professional with passion for excellence",
    },
    experience: [
      {
        id: "1",
        position: "Senior Designer",
        company: "Tech Corp",
        startDate: "2021-01-15",
        endDate: "",
        current: true,
        description: "Led design initiatives",
      },
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor's",
        school: "University",
        startDate: "2015-09-01",
        endDate: "2019-05-30",
        current: false,
        description: "Major in Design",
      },
    ],
    skills: ["Design", "Leadership", "Strategy"],
  };

  switch (templateId) {
    case "modern":
      return <ModernTemplate {...defaultProps} />;
    case "classic":
      return <ClassicTemplate {...defaultProps} />;
    case "minimal":
      return <MinimalTemplate {...defaultProps} />;
    case "creative":
      return <CreativeTemplate {...defaultProps} />;
    case "executive":
      return <ExecutiveTemplate {...defaultProps} />;
    case "tech":
      return <TechTemplate {...defaultProps} />;
    case "designer":
      return <DesignerTemplate {...defaultProps} />;
    case "academic":
      return <AcademicTemplate {...defaultProps} />;
    default:
      return <ModernTemplate {...defaultProps} />;
  }
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card 
      className="overflow-hidden hover-elevate transition-all duration-200" 
      data-testid={`card-template-${template.id}`}
    >
      <CardContent className="p-0">
        {/* Template Preview - Actual Design */}
        <div className="aspect-[8.5/11] bg-white border-b overflow-hidden relative scale-50 origin-top-left" style={{ transformOrigin: "top left", width: "200%" }}>
          {getTemplateComponent(template.id)}
          {template.isPremium && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="gap-1 bg-primary/90 backdrop-blur-sm">
                <Star className="h-3 w-3" />
                Premium
              </Badge>
            </div>
          )}
          {template.id === "modern" && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Most Popular
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 p-4">
        <div className="w-full">
          <h3 className="font-semibold text-lg mb-1" data-testid={`text-template-name-${template.id}`}>
            {template.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{template.category}</span>
            {template.isPremium ? (
              <span className="font-semibold text-primary" data-testid={`text-price-${template.id}`}>
                ${(template.price! / 100).toFixed(2)}
              </span>
            ) : (
              <Badge variant="secondary" className="gap-1" data-testid={`badge-free-${template.id}`}>
                <CheckCircle2 className="h-3 w-3" />
                Free
              </Badge>
            )}
          </div>
        </div>
        
        <Link href={`/builder?template=${template.id}`} className="w-full">
          <Button 
            className="w-full" 
            variant={template.isPremium ? "default" : "secondary"}
            data-testid={`button-use-template-${template.id}`}
          >
            {template.isPremium ? "Purchase & Use" : "Use Template"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function TemplatesPage() {
  const [filter, setFilter] = useState<"all" | "free" | "premium">("all");

  // Fetch templates from backend
  const { data: templates, isLoading, error } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const filteredTemplates = templates?.filter(template => {
    if (filter === "all") return true;
    if (filter === "free") return !template.isPremium;
    if (filter === "premium") return template.isPremium;
    return true;
  }) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Professional CV Templates
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from our collection of beautifully designed templates. 
              Start with free options or unlock premium designs for just $9.99.
            </p>
          </div>

          {/* Filter Tabs */}
          <Tabs 
            defaultValue="all" 
            className="mb-8" 
            onValueChange={(v) => setFilter(v as "all" | "free" | "premium")}
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all" data-testid="tab-all">
                All Templates
              </TabsTrigger>
              <TabsTrigger value="free" data-testid="tab-free">
                Free
              </TabsTrigger>
              <TabsTrigger value="premium" data-testid="tab-premium">
                Premium
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Loading State */}
          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[...Array(8)].map((_, i) => (
                <TemplateCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-destructive">Failed to load templates. Please try again.</p>
            </div>
          )}

          {/* Templates Grid */}
          {!isLoading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No templates found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
