import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive flex-shrink-0" />
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>

          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="pt-4">
            <Link href="/">
              <Button 
                data-testid="button-return-home"
                className="w-full gap-2" 
                variant="default"
              >
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
