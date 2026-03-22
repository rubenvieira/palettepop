import { useCallback, useMemo } from "react";
import chroma from "chroma-js";
import { Slider } from "@/components/ui/slider";

interface HSLSlidersProps {
  hex: string;
  onChange: (hex: string) => void;
}

export function HSLSliders({ hex, onChange }: HSLSlidersProps) {
  const hsl = useMemo(() => {
    if (!chroma.valid(hex)) return { h: 0, s: 50, l: 50 };
    const c = chroma(hex);
    return {
      h: Math.round(c.get("hsl.h") || 0),
      s: Math.round(c.get("hsl.s") * 100),
      l: Math.round(c.get("hsl.l") * 100),
    };
  }, [hex]);

  const handleHueChange = useCallback(
    (values: number[]) => {
      const newHex = chroma.hsl(values[0], hsl.s / 100, hsl.l / 100).hex();
      onChange(newHex);
    },
    [hsl.s, hsl.l, onChange]
  );

  const handleSatChange = useCallback(
    (values: number[]) => {
      const newHex = chroma.hsl(hsl.h, values[0] / 100, hsl.l / 100).hex();
      onChange(newHex);
    },
    [hsl.h, hsl.l, onChange]
  );

  const handleLightChange = useCallback(
    (values: number[]) => {
      const newHex = chroma.hsl(hsl.h, hsl.s / 100, values[0] / 100).hex();
      onChange(newHex);
    },
    [hsl.h, hsl.s, onChange]
  );

  // Generate gradient backgrounds for slider tracks
  const hueGradient = useMemo(() => {
    const stops = Array.from({ length: 7 }, (_, i) => {
      const h = (i / 6) * 360;
      return chroma.hsl(h, hsl.s / 100, hsl.l / 100).hex();
    });
    return `linear-gradient(90deg, ${stops.join(", ")})`;
  }, [hsl.s, hsl.l]);

  const satGradient = useMemo(() => {
    const low = chroma.hsl(hsl.h, 0, hsl.l / 100).hex();
    const high = chroma.hsl(hsl.h, 1, hsl.l / 100).hex();
    return `linear-gradient(90deg, ${low}, ${high})`;
  }, [hsl.h, hsl.l]);

  const lightGradient = useMemo(() => {
    const low = chroma.hsl(hsl.h, hsl.s / 100, 0).hex();
    const mid = chroma.hsl(hsl.h, hsl.s / 100, 0.5).hex();
    const high = chroma.hsl(hsl.h, hsl.s / 100, 1).hex();
    return `linear-gradient(90deg, ${low}, ${mid}, ${high})`;
  }, [hsl.h, hsl.s]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Hue</span>
          <span>{hsl.h}°</span>
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full h-2 top-1/2 -translate-y-1/2"
            style={{ background: hueGradient }}
          />
          <Slider
            value={[hsl.h]}
            onValueChange={handleHueChange}
            min={0}
            max={360}
            step={1}
            className="relative [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md [&_.relative]:bg-transparent [&_[data-orientation=horizontal]>span:first-child]:bg-transparent [&_[data-orientation=horizontal]>span:first-child>span]:bg-transparent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Saturation</span>
          <span>{hsl.s}%</span>
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full h-2 top-1/2 -translate-y-1/2"
            style={{ background: satGradient }}
          />
          <Slider
            value={[hsl.s]}
            onValueChange={handleSatChange}
            min={0}
            max={100}
            step={1}
            className="relative [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md [&_.relative]:bg-transparent [&_[data-orientation=horizontal]>span:first-child]:bg-transparent [&_[data-orientation=horizontal]>span:first-child>span]:bg-transparent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Lightness</span>
          <span>{hsl.l}%</span>
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full h-2 top-1/2 -translate-y-1/2"
            style={{ background: lightGradient }}
          />
          <Slider
            value={[hsl.l]}
            onValueChange={handleLightChange}
            min={0}
            max={100}
            step={1}
            className="relative [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md [&_.relative]:bg-transparent [&_[data-orientation=horizontal]>span:first-child]:bg-transparent [&_[data-orientation=horizontal]>span:first-child>span]:bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
