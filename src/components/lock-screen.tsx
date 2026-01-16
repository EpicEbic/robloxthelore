import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Secret combination - can be changed
    const SECRET_COMBINATION = "TEMPORARY";
    
    if (input.trim() === SECRET_COMBINATION) {
      onUnlock();
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl border-2 rounded-2xl shadow-xl">
        <CardContent className="p-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Sorry, no access for you!
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              If you&apos;re seeing this, the website is either down for a large-scale update, or you have personally been denied access to the website by me. Sorry for the inconvenience, please reach out to me if you have any questions!
            </p>
            
            <p className="text-sm text-muted-foreground/80">
              Sincerely, EpicEbic
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Certain people are permitted to access the site during downtime through a special combination. If you know it, type it here and press &apos;Submit&apos; to become authorized.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(false);
                }}
                placeholder="Enter combination..."
                className={`flex-1 ${error ? "border-red-500" : ""}`}
                autoFocus
              />
              <Button type="submit" className="rounded-xl">
                Submit
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">
                Incorrect combination. Please try again.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

