import { useState, useCallback } from "react";
import { tailwindColors, shadeKeys } from "@/lib/tailwind-colors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess } from "@/utils/toast";
import chroma from "chroma-js";
import { ArrowRight, Search } from "lucide-react";

type DisplayFormat = "hex" | "hsl" | "oklch";

interface TailwindColorsPageProps {
  onUseColor: (hex: string) => void;
}

export function TailwindColorsPage({ onUseColor }: TailwindColorsPageProps) {
  const [format, setFormat] = useState<DisplayFormat>("hex");
  const [search, setSearch] = useState("");

  const formatColor = useCallback(
    (hex: string): string => {
      if (!chroma.valid(hex)) return hex;
      switch (format) {
        case "hsl":
          return chroma(hex).css("hsl");
        case "oklch": {
          const c = chroma(hex);
          const l = (c.get("oklch.l") * 100).toFixed(1);
          const ch = c.get("oklch.c").toFixed(3);
          const h = (c.get("oklch.h") || 0).toFixed(1);
          return `oklch(${l}% ${ch} ${h})`;
        }
        default:
          return hex;
      }
    },
    [format]
  );

  const handleCopy = useCallback(
    (hex: string) => {
      const value = formatColor(hex);
      navigator.clipboard.writeText(value).then(() => {
        showSuccess(`Copied ${value}`);
      });
    },
    [formatColor]
  );

  const filteredColors = search
    ? tailwindColors.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : tailwindColors;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search colors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <div className="flex gap-1">
          {(["hex", "hsl", "oklch"] as DisplayFormat[]).map((f) => (
            <Button
              key={f}
              variant={format === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat(f)}
              className="text-xs uppercase"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {filteredColors.map((family) => (
          <div key={family.name}>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-sm font-semibold capitalize">{family.name}</h3>
              <div className="flex-1 h-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => onUseColor(family.shades[500])}
              >
                Use <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden border">
              {shadeKeys.map((shade) => {
                const hex = family.shades[shade];
                if (!hex) return null;
                const textColor = chroma.valid(hex)
                  ? chroma.contrast(hex, "white") > 4.5
                    ? "white"
                    : "#1a1a2e"
                  : "#1a1a2e";

                return (
                  <div
                    key={shade}
                    className="flex items-center h-10 px-4 cursor-pointer transition-all hover:brightness-95"
                    style={{ backgroundColor: hex, color: textColor }}
                    onClick={() => handleCopy(hex)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCopy(hex);
                      }
                    }}
                  >
                    <span className="font-semibold text-xs w-10">{shade}</span>
                    <span className="flex-1 font-mono text-xs text-center">
                      {formatColor(hex)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
