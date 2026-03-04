import { PaletteColor } from "@/lib/colors";
import { cvdTypes, simulatePalette } from "@/lib/color-blindness";
import { Eye } from "lucide-react";

interface ColorBlindnessSimulatorProps {
  palettes: PaletteColor[][];
}

export function ColorBlindnessSimulator({
  palettes,
}: ColorBlindnessSimulatorProps) {
  if (palettes.length === 0) return null;

  const primaryPalette = palettes[0];

  return (
    <div className="mt-16 animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
        Color Vision
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        How your palette appears under different color vision deficiencies
      </p>
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-32 flex items-center gap-2 text-sm font-medium shrink-0">
            <Eye className="h-4 w-4" />
            Normal
          </div>
          <div className="flex flex-1 h-8 rounded-lg overflow-hidden">
            {primaryPalette.map((c) => (
              <div
                key={c.name}
                className="flex-1 transition-colors duration-300"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {cvdTypes.map(({ type, name, description }) => {
          const simulated = simulatePalette(primaryPalette, type);
          return (
            <div key={type} className="flex items-center gap-3">
              <div className="w-32 shrink-0">
                <div className="text-sm font-medium">{name}</div>
                <div className="text-[10px] text-muted-foreground">
                  {description}
                </div>
              </div>
              <div className="flex flex-1 h-8 rounded-lg overflow-hidden">
                {simulated.map((c) => (
                  <div
                    key={c.name}
                    className="flex-1 transition-colors duration-300"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
