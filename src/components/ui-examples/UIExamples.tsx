import { PaletteColor } from "@/lib/colors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ExpensesChart } from "./ExpensesChart";
import { StatsChart } from "./StatsChart";
import chroma from "chroma-js";
import { Terminal } from "lucide-react";

interface UIExamplesProps {
  palettes: PaletteColor[][];
}

const getTextColor = (bgHex: string) => {
  try {
    return chroma.contrast(bgHex, 'white') >= 4.5 ? 'white' : 'black';
  } catch (e) {
    return 'black';
  }
};

export const UIExamples = ({ palettes }: UIExamplesProps) => {
  if (!palettes || palettes.length === 0 || palettes[0].length < 11) {
    return null;
  }

  const cssVars: React.CSSProperties = {};
  const paletteNames = ["primary", "secondary", "accent"];
  const finalPalettes: PaletteColor[][] = [
    palettes[0],
    palettes[1] || palettes[0],
    palettes[2] || palettes[1] || palettes[0]
  ];

  finalPalettes.forEach((palette, index) => {
    const name = paletteNames[index];
    palette.forEach(color => {
      cssVars[`--${name}-${color.name}`] = color.hex;
    });
    const baseColor = palette.find(c => c.name === 500)?.hex;
    if (baseColor) {
      cssVars[`--${name}-fg`] = getTextColor(baseColor);
    }
    const lightColor = palette.find(c => c.name === 100)?.hex;
    if (lightColor) {
      cssVars[`--${name}-light-fg`] = getTextColor(lightColor);
    }
  });

  return (
    <div className="mt-16" style={cssVars}>
      <h2 className="text-3xl font-bold mb-8 text-center">UI Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Buttons</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button className="bg-[var(--primary-500)] text-[var(--primary-fg)] hover:bg-[var(--primary-600)]">Primary</Button>
              <Button className="bg-[var(--secondary-500)] text-[var(--secondary-fg)] hover:bg-[var(--secondary-600)]">Secondary</Button>
              <Button variant="outline" className="border-[var(--primary-500)] text-[var(--primary-500)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-600)]">Outline</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Badges</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Badge className="bg-[var(--primary-100)] text-[var(--primary-light-fg)]">Primary</Badge>
              <Badge className="bg-[var(--secondary-100)] text-[var(--secondary-light-fg)]">Secondary</Badge>
              <Badge className="bg-[var(--accent-100)] text-[var(--accent-light-fg)]">Accent</Badge>
            </CardContent>
          </Card>
          <Alert className="bg-[var(--primary-50)] border-[var(--primary-200)] text-[var(--primary-800)]">
            <Terminal className="h-4 w-4" stroke="var(--primary-800)" />
            <AlertTitle>Primary Alert</AlertTitle>
            <AlertDescription>
              This is an alert component styled with the primary color.
            </AlertDescription>
          </Alert>
        </div>

        {/* Column 2 */}
        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Form Elements</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Toggle Switch</span>
                <Switch className="data-[state=checked]:bg-[var(--primary-500)]" />
              </div>
              <div className="space-y-2">
                <span>Progress Bar</span>
                <Progress value={66} className="[&>div]:bg-[var(--primary-500)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Expenses</CardTitle></CardHeader>
            <CardContent>
              <ExpensesChart
                primary={finalPalettes[0][5].hex}
                secondary={finalPalettes[1][5].hex}
              />
            </CardContent>
          </Card>
        </div>

        {/* Column 3 */}
        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Statistics</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[var(--primary-700)]">2,350</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--secondary-700)]">$58.2k</div>
                <div className="text-sm text-muted-foreground">Revenue</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Monthly Stats</CardTitle></CardHeader>
            <CardContent>
              <StatsChart
                primary={finalPalettes[0][5].hex}
                accent={finalPalettes[2][5].hex}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};