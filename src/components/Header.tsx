import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { harmonySchemes, HarmonyType } from "@/lib/colors";
import { Share2, Bookmark, Download, Shuffle } from "lucide-react";
import chroma from "chroma-js";

interface HeaderProps {
  harmonyColors: string[];
  harmony: HarmonyType;
  onHarmonyChange: (value: HarmonyType) => void;
  onColorChange: (color: string, index: number) => void;
  onRandomize: () => void;
  onExport: () => void;
  onShare: () => void;
  onSavedPalettes: () => void;
}

export function Header({
  harmonyColors,
  harmony,
  onHarmonyChange,
  onColorChange,
  onRandomize,
  onExport,
  onShare,
  onSavedPalettes,
}: HeaderProps) {
  const gradientCSS =
    harmonyColors.length > 1
      ? `linear-gradient(90deg, ${harmonyColors.filter((c) => chroma.valid(c)).join(", ")})`
      : harmonyColors[0] || "#19CE41";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b">
      <div className="h-1" style={{ background: gradientCSS }} />

      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Palette
              <span
                style={{
                  color:
                    harmonyColors[0] && chroma.valid(harmonyColors[0])
                      ? harmonyColors[0]
                      : "#19CE41",
                  transition: "color 0.3s ease",
                }}
              >
                Pop
              </span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Design systems start with great color
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={onSavedPalettes}>
            <Bookmark className="h-4 w-4 mr-1" /> Saved
          </Button>
          <Button size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-3">
        <div className="flex flex-wrap items-center gap-3">
          {harmonyColors.map((color, index) => (
            <div className="relative" key={index}>
              <Input
                type="text"
                value={color}
                onChange={(e) => onColorChange(e.target.value, index)}
                className="pl-12 text-base h-10 w-40"
                aria-label={`Harmony Color ${index + 1}`}
              />
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md border transition-colors duration-200"
                style={{
                  backgroundColor: chroma.valid(color) ? color : "transparent",
                }}
              />
              <Input
                type="color"
                value={chroma.valid(color) ? color : "#000000"}
                onInput={(e) => onColorChange(e.currentTarget.value, index)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 cursor-pointer"
                aria-label={`Pick Color for Harmony Color ${index + 1}`}
              />
            </div>
          ))}
          <Button onClick={onRandomize} variant="outline" size="sm">
            <Shuffle className="h-4 w-4 mr-1" />
            Random
          </Button>
          <Select
            value={harmony}
            onValueChange={(value) => onHarmonyChange(value as HarmonyType)}
          >
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Select harmony" />
            </SelectTrigger>
            <SelectContent>
              {harmonySchemes.map((scheme) => (
                <SelectItem key={scheme.value} value={scheme.value}>
                  {scheme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
