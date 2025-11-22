import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { CVForm } from "@/components/cv-form";
import { CVPreview } from "@/components/cv-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Save, Eye, Edit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { exportToPDF } from "@/lib/pdf-export";
import type { PersonalInfo, ExperienceEntry, EducationEntry, CV } from "@shared/schema";
import { cvDataSchema } from "@shared/schema";
import { z } from "zod";

export default function BuilderPage() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Parse template from URL
  const urlParams = new URLSearchParams(window.location.search);
  const templateIdFromUrl = urlParams.get("template") || "modern";

  const [cvData, setCvData] = useState<z.infer<typeof cvDataSchema>>({
    templateId: templateIdFromUrl,
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  });

  // Mutation to save CV
  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof cvDataSchema>) => {
      if (currentCVId) {
        return await apiRequest("PATCH", `/api/cvs/${currentCVId}`, data);
      } else {
        return await apiRequest("POST", "/api/cvs", data);
      }
    },
    onSuccess: (data: CV) => {
      setCurrentCVId(data.id);
      queryClient.invalidateQueries({ queryKey: ["/api/cvs"] });
      toast({
        title: "CV Saved",
        description: "Your CV has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save CV. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(cvData);
  };

  const handleExport = () => {
    setShowExportDialog(true);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsExporting(true);
      
      // Find the CV preview element
      const previewElement = document.querySelector('[data-testid="cv-preview"]') as HTMLElement;
      
      if (!previewElement) {
        throw new Error("Preview element not found");
      }

      // Generate filename from user's name or default
      const filename = cvData.personalInfo.fullName 
        ? `${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_CV.pdf`
        : "CV.pdf";

      await exportToPDF(previewElement, filename);

      toast({
        title: "PDF Downloaded",
        description: "Your CV has been downloaded successfully.",
      });
      
      setShowExportDialog(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Mobile Tabs */}
      <div className="md:hidden border-b">
        <Tabs value={mobileTab} onValueChange={(v) => setMobileTab(v as "edit" | "preview")}>
          <TabsList className="w-full grid grid-cols-2 rounded-none h-12">
            <TabsTrigger value="edit" className="gap-2" data-testid="tab-mobile-edit">
              <Edit className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2" data-testid="tab-mobile-preview">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Section - Desktop: 40%, Mobile: Full width */}
        <div 
          className={`
            w-full md:w-2/5 overflow-auto
            ${mobileTab === "preview" ? "hidden md:block" : "block"}
          `}
        >
          <div className="p-4 md:p-6 max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Build Your CV</h1>
              <p className="text-muted-foreground">
                Fill in your details and watch your CV come to life
              </p>
            </div>

            <CVForm
              initialData={cvData}
              onUpdate={setCvData}
            />

            {/* Action Buttons - Desktop Only (Mobile has bottom bar) */}
            <div className="hidden md:flex gap-3 mt-6 sticky bottom-0 bg-background py-4 border-t">
              <Button 
                onClick={handleSave} 
                variant="outline" 
                className="flex-1 gap-2"
                disabled={saveMutation.isPending}
                data-testid="button-save-desktop"
              >
                {saveMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button 
                onClick={handleExport} 
                className="flex-1 gap-2"
                data-testid="button-export-desktop"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Section - Desktop: 60%, Mobile: Full width */}
        <div 
          className={`
            w-full md:w-3/5 border-l
            ${mobileTab === "edit" ? "hidden md:block" : "block"}
          `}
        >
          <div className="sticky top-0 bg-background/95 backdrop-blur border-b p-4 flex items-center justify-between z-10">
            <h2 className="font-semibold">Live Preview</h2>
            <Button 
              onClick={handleExport} 
              size="sm" 
              className="gap-2"
              data-testid="button-export-preview"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <div ref={previewRef}>
            <CVPreview
              templateId={cvData.templateId}
              personalInfo={cvData.personalInfo}
              experience={cvData.experience}
              education={cvData.education}
              skills={cvData.skills}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur p-4 flex gap-3 pb-safe">
        <Button 
          onClick={handleSave} 
          variant="outline" 
          className="flex-1 gap-2"
          disabled={saveMutation.isPending}
          data-testid="button-save-mobile"
        >
          {saveMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saveMutation.isPending ? "Saving..." : "Save"}
        </Button>
        <Button 
          onClick={handleExport} 
          className="flex-1 gap-2"
          data-testid="button-export-mobile"
        >
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent data-testid="dialog-export">
          <DialogHeader>
            <DialogTitle>Export to PDF</DialogTitle>
            <DialogDescription>
              Download your CV as a high-quality PDF file ready for job applications.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="aspect-[8.5/11] bg-muted rounded-md border flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Download className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Your CV is ready to download</p>
                <p className="text-xs mt-1">A4 format, high quality PDF</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowExportDialog(false)}
              disabled={isExporting}
              data-testid="button-cancel-export"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDownloadPDF}
              disabled={isExporting}
              data-testid="button-confirm-export"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
