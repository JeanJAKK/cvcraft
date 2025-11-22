import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
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
              Create Your Professional CV in Minutes
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Build stunning, ATS-friendly resumes with our intuitive online builder. 
              Choose from professional templates and export to PDF instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/builder" data-testid="button-get-started">
                <Button 
                  size="lg" 
                  variant="default" 
                  className="gap-2 text-base px-8 bg-primary/90 backdrop-blur-sm border border-primary-border"
                >
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/templates" data-testid="button-view-templates">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-base px-8 bg-background/20 backdrop-blur-sm text-white border-white/30 hover:bg-background/30"
                >
                  <Eye className="h-5 w-5" />
                  View Templates
                </Button>
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-white/70 text-sm">
                Join 50,000+ professionals who trust CVCraft
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
              Everything You Need to Stand Out
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect CV
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card data-testid="card-feature-realtime">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Preview</h3>
                <p className="text-muted-foreground">
                  See your CV come to life as you type. Instant visual feedback 
                  with every change you make.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-templates">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Professional Templates</h3>
                <p className="text-muted-foreground">
                  Choose from beautifully designed templates. 3 free options plus 
                  premium designs for every industry.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-pdf">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Instant PDF Export</h3>
                <p className="text-muted-foreground">
                  Download your CV as a high-quality PDF with a single click. 
                  Perfect for job applications.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-responsive">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Mobile Friendly</h3>
                <p className="text-muted-foreground">
                  Build your CV on any device. Seamless experience on desktop, 
                  tablet, and mobile.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-ats">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">ATS Optimized</h3>
                <p className="text-muted-foreground">
                  All templates are designed to pass Applicant Tracking Systems 
                  with ease.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-feature-secure">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your data is secure and private. We never share your 
                  information with third parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Start for free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card data-testid="card-pricing-free">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Free</h3>
                  <p className="text-3xl font-bold">$0</p>
                  <p className="text-muted-foreground mt-2">Perfect to get started</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>3 professional templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Real-time preview</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>PDF export</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Basic support</span>
                  </li>
                </ul>
                <Link href="/builder" data-testid="button-pricing-free">
                  <Button variant="outline" className="w-full">
                    Start Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary" data-testid="card-pricing-premium">
              <CardContent className="p-8 space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Premium</h3>
                  <p className="text-3xl font-bold">$9.99</p>
                  <p className="text-muted-foreground mt-2">One-time payment per template</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>All free features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>10+ premium templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Remove branding</span>
                  </li>
                </ul>
                <Link href="/templates" data-testid="button-pricing-premium">
                  <Button className="w-full">
                    View Premium Templates
                  </Button>
                </Link>
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
              <span className="font-semibold">CVCraft</span>
              <span className="text-muted-foreground">© 2024</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover-elevate px-2 py-1 rounded-md" data-testid="link-privacy">
                Privacy Policy
              </button>
              <button className="hover-elevate px-2 py-1 rounded-md" data-testid="link-terms">
                Terms of Service
              </button>
              <button className="hover-elevate px-2 py-1 rounded-md" data-testid="link-contact">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
