import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { useTranslations } from "@/hooks/use-translations";
import { 
  FileText, 
  Sparkles, 
  Download, 
  Zap, 
  Eye, 
  Shield,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-br from-primary/30 via-primary/20 to-accent/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t.heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/builder" data-testid="button-get-started">
                <Button 
                  size="lg" 
                  variant="default" 
                  className="gap-2 text-base px-8 bg-primary/90 backdrop-blur-sm border border-primary-border"
                >
                  <Sparkles className="h-5 w-5" />
                  {t.getStartedFree}
                </Button>
              </Link>
              <Link href="/templates" data-testid="button-view-templates">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-base px-8 bg-background/20 backdrop-blur-sm text-white border-white/30 hover:bg-background/30"
                >
                  <Eye className="h-5 w-5" />
                  {t.viewTemplates}
                </Button>
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-white/70 text-sm">
                {t.trustMessage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card data-testid="card-feature-realtime">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t.realtimePreview}</h3>
                <p className="text-muted-foreground">
                  {t.realtimePreviewDesc}
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-templates">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t.professionalTemplates}</h3>
                <p className="text-muted-foreground">
                  {t.professionalTemplatesDesc}
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-pdf">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t.instantPDFExport}</h3>
                <p className="text-muted-foreground">
                  {t.instantPDFExportDesc}
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-responsive">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t.mobileFriendly}</h3>
                <p className="text-muted-foreground">
                  {t.mobileFriendlyDesc}
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-ats">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t.atsOptimized}</h3>
                <p className="text-muted-foreground">
                  {t.atsOptimizedDesc}
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-secure">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t.privacyFirst}</h3>
                <p className="text-muted-foreground">
                  {t.privacyFirstDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">JeanJAKK</span>
              <span className="text-muted-foreground">© {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover-elevate px-2 py-1 rounded-md" data-testid="link-privacy">
                {t.privacyPolicy}
              </button>
              <button className="hover-elevate px-2 py-1 rounded-md" data-testid="link-terms">
                {t.termsOfService}
              </button>
              <button className="hover-elevate px-2 py-1 rounded-md" data-testid="link-contact">
                {t.contactSupport}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
