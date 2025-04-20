
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/50 animate-in">
      <div className="glass p-8 rounded-lg flex flex-col items-center gap-4 max-w-md mx-auto text-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <h1 className="text-2xl font-semibold">Loading...</h1>
        <p className="text-muted-foreground">Please wait while we fetch your content</p>
      </div>
    </div>
  );
};

export default Loading;
