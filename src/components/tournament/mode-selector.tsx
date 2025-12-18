import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ModeSelectorProps {
  mode: "automatic" | "manual";
  onModeChange: (mode: "automatic" | "manual") => void;
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tournament Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={mode} onValueChange={(value) => onModeChange(value as "automatic" | "manual")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="automatic" id="automatic" />
            <Label htmlFor="automatic" className="cursor-pointer">
              <div>
                <div className="font-medium">Automatic</div>
                <div className="text-sm text-muted-foreground">
                  Battles are simulated automatically based on win probabilities
                </div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual" className="cursor-pointer">
              <div>
                <div className="font-medium">Manual</div>
                <div className="text-sm text-muted-foreground">
                  You decide the outcome of each battle
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}



