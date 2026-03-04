import { useState, useEffect } from "react";
import { PaletteColor } from "@/lib/colors";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy, Plus, X } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface GradientStop {
  color: string;
  position: number;
}

interface GradientGeneratorProps {
  palettes: PaletteColor[][];
  paletteNames: string[];
}

export function GradientGenerator({
  palettes,
  paletteNames,
}: GradientGeneratorProps) {
  const [stops, setStops] = useState<GradientStop[]>([]);
  const [gradientType, setGradientType] = useState<"linear" | "radial">(
    "linear"
  );
  const [angle, setAngle] = useState(90);

  useEffect(() => {
    if (palettes.length > 0 && palettes[0].length > 0) {
      setStops([
        { color: palettes[0][2]?.hex || "#000", position: 0 },
        { color: palettes[0][8]?.hex || "#fff", position: 100 },
      ]);
    }
  }, [palettes]);

  if (palettes.length === 0) return null;

  const gradientCSS =
    gradientType === "linear"
      ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
      : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  const updateStop = (index: number, color: string) => {
    setStops((prev) =>
      prev.map((s, i) => (i === index ? { ...s, color } : s))
    );
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    const newPos = 50;
    const midPalette = palettes[0];
    const midColor = midPalette[5]?.hex || "#888";
    setStops((prev) =>
      [...prev, { color: midColor, position: newPos }].sort(
        (a, b) => a.position - b.position
      )
    );
  };

  return (
    <div className="mt-16 animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
        Gradient Generator
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Build gradients from your palette colors
      </p>

      <div className="max-w-3xl mx-auto space-y-6">
        <div
          className="h-32 rounded-xl shadow-inner"
          style={{ background: gradientCSS }}
        />

        <div className="flex flex-wrap items-center gap-4">
          <Select
            value={gradientType}
            onValueChange={(v) =>
              setGradientType(v as "linear" | "radial")
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="radial">Radial</SelectItem>
            </SelectContent>
          </Select>
          {gradientType === "linear" && (
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Angle
              </span>
              <Slider
                value={[angle]}
                onValueChange={([v]) => setAngle(v)}
                min={0}
                max={360}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-mono w-12 text-right">
                {angle}&deg;
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {stops.map((stop, i) => (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <button
                  className="h-10 w-10 rounded-lg border-2 border-border hover:scale-110 transition-transform relative group"
                  style={{ backgroundColor: stop.color }}
                >
                  {stops.length > 2 && (
                    <span
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStop(i);
                      }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <div className="space-y-1">
                  {palettes.map((palette, pi) => (
                    <div key={pi}>
                      <div className="text-[10px] text-muted-foreground mb-0.5 capitalize">
                        {paletteNames[pi]}
                      </div>
                      <div className="flex gap-0.5">
                        {palette.map((c) => (
                          <button
                            key={c.name}
                            className="h-5 w-5 rounded-sm hover:scale-125 transition-transform"
                            style={{ backgroundColor: c.hex }}
                            onClick={() => updateStop(i, c.hex)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ))}
          {stops.length < 5 && (
            <Button variant="outline" size="sm" onClick={addStop}>
              <Plus className="h-4 w-4 mr-1" /> Add Stop
            </Button>
          )}
        </div>

        <div className="rounded-md bg-slate-950 p-4 flex items-center justify-between gap-4">
          <code className="text-white text-sm font-mono break-all">
            background: {gradientCSS};
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-white/10 shrink-0"
            onClick={() => {
              navigator.clipboard.writeText(`background: ${gradientCSS};`);
              showSuccess("Gradient CSS copied!");
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
