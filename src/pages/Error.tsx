
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error?: string;
  resetError?: () => void;
}

const Error = ({ error = "Something went wrong", resetError }: ErrorPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/50 animate-in p-4">
      <div className="glass p-8 rounded-lg flex flex-col items-center gap-6 max-w-md mx-auto text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Oops! An Error Occurred</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {resetError && (
            <Button onClick={resetError} variant="default">
              Try Again
            </Button>
          )}
          <Button asChild variant="outline">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
