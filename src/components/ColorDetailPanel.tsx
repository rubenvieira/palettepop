import chroma from "chroma-js";
import { Copy } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { showSuccess } from "@/utils/toast";
import { findNearestColorName } from "@/lib/color-names";

interface ColorDetailPanelProps {
  hex: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function copyText(text: string) {
  navigator.clipboard.writeText(text);
  showSuccess(`Copied ${text}`);
}

function FormatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <button
        className="flex items-center gap-1.5 font-mono text-xs hover:text-primary transition-colors"
        onClick={() => copyText(value)}
      >
        {value}
        <Copy className="h-3 w-3 opacity-50" />
      </button>
    </div>
  );
}

export function ColorDetailPanel({ hex, open, onOpenChange }: ColorDetailPanelProps) {
  if (!hex) return null;

  const c = chroma(hex);
  const rgb = c.rgb();
  const hsl = c.hsl();
  const lch = c.lch();
  const nearest = findNearestColorName(hex);
  const contrastWhite = chroma.contrast(hex, "white").toFixed(2);
  const contrastBlack = chroma.contrast(hex, "black").toFixed(2);

  const formats = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` },
    {
      label: "HSL",
      value: `hsl(${Math.round(hsl[0] || 0)}, ${Math.round((hsl[1] || 0) * 100)}%, ${Math.round((hsl[2] || 0) * 100)}%)`,
    },
    {
      label: "LCH",
      value: `lch(${Math.round(lch[0])} ${Math.round(lch[1])} ${Math.round(lch[2] || 0)})`,
    },
    {
      label: "OKLCH",
      value: `oklch(${(lch[0] / 100).toFixed(2)} ${(lch[1] / 150).toFixed(3)} ${Math.round(lch[2] || 0)})`,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[340px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle>Color Detail</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div
            className="h-24 rounded-lg border"
            style={{ backgroundColor: hex }}
          />

          <div className="space-y-0">
            {formats.map((f) => (
              <FormatRow key={f.label} label={f.label} value={f.value} />
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Nearest CSS Color
            </h3>
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded border"
                style={{ backgroundColor: nearest.hex }}
              />
              <div>
                <span className="text-sm font-medium">{nearest.name}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({nearest.hex}) &Delta;E {nearest.distance}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Contrast Ratios
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border p-3 text-center">
                <div
                  className="text-sm font-bold mb-1"
                  style={{ color: hex, backgroundColor: "white" }}
                >
                  Aa
                </div>
                <div className="text-xs text-muted-foreground">
                  vs White: {contrastWhite}:1
                </div>
                <div className="text-[10px] mt-0.5">
                  {Number(contrastWhite) >= 7 ? "AAA" : Number(contrastWhite) >= 4.5 ? "AA" : "Fail"}
                </div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div
                  className="text-sm font-bold mb-1"
                  style={{ color: hex, backgroundColor: "black" }}
                >
                  Aa
                </div>
                <div className="text-xs text-muted-foreground">
                  vs Black: {contrastBlack}:1
                </div>
                <div className="text-[10px] mt-0.5">
                  {Number(contrastBlack) >= 7 ? "AAA" : Number(contrastBlack) >= 4.5 ? "AA" : "Fail"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
