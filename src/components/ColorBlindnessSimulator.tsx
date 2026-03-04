import { useState, useMemo } from "react";
import { PaletteColor } from "@/lib/colors";
import { cvdTypes, simulatePalette } from "@/lib/color-blindness";
import { Eye, EyeOff, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import chroma from "chroma-js";

interface ColorBlindnessSimulatorProps {
  palettes: PaletteColor[][];
  paletteNames?: string[];
}

export function ColorBlindnessSimulator({
  palettes,
  paletteNames = [],
}: ColorBlindnessSimulatorProps) {
  const [compareMode, setCompareMode] = useState(false);
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);

  const activePalette = palettes[activePaletteIndex] ?? palettes[0] ?? [];

  const scores = useMemo(() => {
    if (activePalette.length === 0) return [];
    return cvdTypes.map(({ type }) => {
      const simulated = simulatePalette(activePalette, type);
      const keyShades = [50, 200, 500, 700, 950];
      const keyColors = simulated.filter((c) => keyShades.includes(c.name as number));
      let minDist = Infinity;
      for (let i = 0; i < keyColors.length; i++) {
        for (let j = i + 1; j < keyColors.length; j++) {
          const dist = chroma.deltaE(keyColors[i].hex, keyColors[j].hex);
          if (dist < minDist) minDist = dist;
        }
      }
      return { type, score: Math.round(minDist) };
    });
  }, [activePalette]);

  if (palettes.length === 0) return null;

  return (
    <div className="mt-16 animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
        Color Vision
      </h2>
      <p className="text-center text-muted-foreground mb-4">
        How your palette appears under different color vision deficiencies
      </p>

      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {palettes.length > 1 &&
          palettes.map((_, i) => (
            <Button
              key={i}
              variant={activePaletteIndex === i ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePaletteIndex(i)}
              className="text-xs capitalize"
            >
              {paletteNames[i] || `Palette ${i + 1}`}
            </Button>
          ))}
        <Button
          variant={compareMode ? "default" : "outline"}
          size="sm"
          onClick={() => setCompareMode(!compareMode)}
          className="text-xs"
        >
          <ArrowLeftRight className="h-3.5 w-3.5 mr-1" />
          {compareMode ? "Side-by-side on" : "Compare"}
        </Button>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-36 flex items-center gap-2 text-sm font-medium shrink-0">
            <Eye className="h-4 w-4" />
            Normal
          </div>
          <div className="flex flex-1 h-10 rounded-lg overflow-hidden">
            {activePalette.map((c) => (
              <div
                key={c.name}
                className="flex-1 transition-colors duration-300"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {cvdTypes.map(({ type, name, description }) => {
          const simulated = simulatePalette(activePalette, type);
          const scoreData = scores.find((s) => s.type === type);
          const score = scoreData?.score ?? 0;
          const scoreLabel = score > 20 ? "Good" : score > 10 ? "Fair" : "Poor";
          const scoreColor =
            score > 20
              ? "text-green-600 dark:text-green-400"
              : score > 10
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400";

          return (
            <div key={type}>
              <div className="flex items-center gap-3">
                <div className="w-36 shrink-0">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm font-medium">{name}</div>
                  </div>
                  <div className="ml-6">
                    <span className="text-[10px] text-muted-foreground">
                      {description}
                    </span>
                  </div>
                  <div className={`text-[10px] font-medium ml-6 ${scoreColor}`}>
                    Distinguishability: {scoreLabel}
                  </div>
                </div>
                <div className="flex flex-1 h-10 rounded-lg overflow-hidden">
                  {compareMode ? (
                    activePalette.map((c, i) => (
                      <div key={c.name} className="flex-1 flex flex-col">
                        <div className="flex-1" style={{ backgroundColor: c.hex }} />
                        <div className="flex-1" style={{ backgroundColor: simulated[i].hex }} />
                      </div>
                    ))
                  ) : (
                    simulated.map((c) => (
                      <div
                        key={c.name}
                        className="flex-1 transition-colors duration-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
