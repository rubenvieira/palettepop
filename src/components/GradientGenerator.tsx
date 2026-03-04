import { useState, useEffect, useMemo } from "react";
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
import { Copy, Plus, X, ArrowRightLeft, Sparkles } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface GradientStop {
  color: string;
  position: number;
}

interface GradientGeneratorProps {
  palettes: PaletteColor[][];
  paletteNames: string[];
}

interface GradientPreset {
  name: string;
  getStops: (palettes: PaletteColor[][]) => GradientStop[];
}

export function GradientGenerator({
  palettes,
  paletteNames,
}: GradientGeneratorProps) {
  const [stops, setStops] = useState<GradientStop[]>([]);
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [easing, setEasing] = useState<"linear" | "ease" | "smooth">("linear");

  const presets = useMemo<GradientPreset[]>(() => [
    {
      name: "Light to Dark",
      getStops: (p) => [
        { color: p[0]?.[1]?.hex || "#fff", position: 0 },
        { color: p[0]?.[9]?.hex || "#000", position: 100 },
      ],
    },
    {
      name: "Sunset",
      getStops: (p) => [
        { color: p[0]?.[3]?.hex || "#f97", position: 0 },
        { color: p[0]?.[6]?.hex || "#c44", position: 50 },
        { color: (p[1] || p[0])?.[8]?.hex || "#622", position: 100 },
      ],
    },
    {
      name: "Harmony Blend",
      getStops: (p) => {
        const result: GradientStop[] = [];
        p.forEach((palette, i) => {
          const mid = palette[5]?.hex || "#888";
          result.push({ color: mid, position: (i / Math.max(p.length - 1, 1)) * 100 });
        });
        return result.length >= 2 ? result : [
          { color: "#000", position: 0 },
          { color: "#fff", position: 100 },
        ];
      },
    },
    {
      name: "Pastel",
      getStops: (p) => [
        { color: p[0]?.[2]?.hex || "#fce", position: 0 },
        { color: (p[1] || p[0])?.[2]?.hex || "#cef", position: 50 },
        { color: (p[2] || p[0])?.[2]?.hex || "#efc", position: 100 },
      ],
    },
  ], []);

  useEffect(() => {
    if (palettes.length > 0 && palettes[0].length > 0) {
      setStops([
        { color: palettes[0][2]?.hex || "#000", position: 0 },
        { color: palettes[0][8]?.hex || "#fff", position: 100 },
      ]);
    }
  }, [palettes]);

  if (palettes.length === 0) return null;

  const interpolateStops = (inputStops: GradientStop[]) => {
    if (easing === "linear") return inputStops;
    const result: GradientStop[] = [];
    for (let i = 0; i < inputStops.length - 1; i++) {
      const start = inputStops[i];
      const end = inputStops[i + 1];
      const steps = 5;
      for (let s = 0; s <= steps; s++) {
        let t = s / steps;
        if (easing === "ease") {
          t = t * t * (3 - 2 * t);
        } else if (easing === "smooth") {
          t = t * t * t * (t * (t * 6 - 15) + 10);
        }
        const pos = start.position + (end.position - start.position) * (s / steps);
        const r1 = parseInt(start.color.slice(1, 3), 16);
        const g1 = parseInt(start.color.slice(3, 5), 16);
        const b1 = parseInt(start.color.slice(5, 7), 16);
        const r2 = parseInt(end.color.slice(1, 3), 16);
        const g2 = parseInt(end.color.slice(3, 5), 16);
        const b2 = parseInt(end.color.slice(5, 7), 16);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        result.push({
          color: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
          position: pos,
        });
      }
    }
    return result;
  };

  const displayStops = interpolateStops(stops);

  const gradientCSS =
    gradientType === "linear"
      ? `linear-gradient(${angle}deg, ${displayStops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
      : `radial-gradient(circle, ${displayStops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  const simpleCSSStops = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
  const simpleCSS = gradientType === "linear"
    ? `linear-gradient(${angle}deg, ${simpleCSSStops})`
    : `radial-gradient(circle, ${simpleCSSStops})`;

  const updateStop = (index: number, color: string) => {
    setStops((prev) => prev.map((s, i) => (i === index ? { ...s, color } : s)));
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const addStop = () => {
    if (stops.length >= 8) return;
    const midPalette = palettes[0];
    const midColor = midPalette[5]?.hex || "#888";
    setStops((prev) =>
      [...prev, { color: midColor, position: 50 }].sort((a, b) => a.position - b.position)
    );
  };

  const reverseStops = () => {
    setStops((prev) =>
      prev.map((s) => ({ ...s, position: 100 - s.position })).reverse()
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
          className="h-32 rounded-xl shadow-inner transition-all"
          style={{ background: gradientCSS }}
        />

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground flex items-center mr-1">
            <Sparkles className="h-3 w-3 mr-1" /> Presets:
          </span>
          {presets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setStops(preset.getStops(palettes))}
            >
              {preset.name}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Select
            value={gradientType}
            onValueChange={(v) => setGradientType(v as "linear" | "radial")}
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
              <span className="text-sm text-muted-foreground whitespace-nowrap">Angle</span>
              <Slider
                value={[angle]}
                onValueChange={([v]) => setAngle(v)}
                min={0}
                max={360}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-mono w-12 text-right">{angle}&deg;</span>
            </div>
          )}
          <Select value={easing} onValueChange={(v) => setEasing(v as typeof easing)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="ease">Ease</SelectItem>
              <SelectItem value="smooth">Smooth</SelectItem>
            </SelectContent>
          </Select>
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
          {stops.length < 8 && (
            <Button variant="outline" size="sm" onClick={addStop}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={reverseStops}>
            <ArrowRightLeft className="h-4 w-4 mr-1" /> Reverse
          </Button>
        </div>

        <div className="rounded-md bg-slate-950 p-4 flex items-center justify-between gap-4">
          <code className="text-white text-sm font-mono break-all">
            background: {simpleCSS};
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-white/10 shrink-0"
            onClick={() => {
              navigator.clipboard.writeText(`background: ${simpleCSS};`);
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
