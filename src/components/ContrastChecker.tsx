import { PaletteColor } from "@/lib/colors";
import { generateContrastPairs, ContrastResult } from "@/lib/accessibility";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ContrastCheckerProps {
  palettes: PaletteColor[][];
  paletteNames: string[];
}

export function ContrastChecker({ palettes, paletteNames }: ContrastCheckerProps) {
  if (palettes.length === 0) return null;

  const allResults: ContrastResult[] = palettes.flatMap((palette, i) =>
    generateContrastPairs(palette, paletteNames[i] || `color${i + 1}`)
  );

  const topResults = allResults.slice(0, 12);

  return (
    <div className="mt-16 animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
        Accessibility
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        WCAG contrast compliance for your palette
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topResults.map((result, i) => (
          <Card key={i} className="overflow-hidden">
            <div
              className="h-16 flex items-center justify-center px-4"
              style={{
                backgroundColor: result.background,
                color: result.foreground,
              }}
            >
              <span className="font-semibold text-sm">Sample Text</span>
            </div>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold">
                  {result.ratio}:1
                </span>
                <div className="flex gap-1">
                  <Badge
                    variant={result.aaNormalText ? "default" : "destructive"}
                    className="text-[10px] px-1.5 py-0"
                  >
                    AA
                  </Badge>
                  <Badge
                    variant={result.aaaNormalText ? "default" : "destructive"}
                    className="text-[10px] px-1.5 py-0"
                  >
                    AAA
                  </Badge>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                {result.fgLabel} on {result.bgLabel}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
