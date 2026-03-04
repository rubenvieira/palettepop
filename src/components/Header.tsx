import { useState } from "react";
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
import {
  Share2,
  Bookmark,
  Download,
  Shuffle,
  Undo2,
  Redo2,
  Sun,
  Moon,
  Command,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
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
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
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
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [invalidInputs, setInvalidInputs] = useState<Record<number, boolean>>({});

  const gradientCSS =
    harmonyColors.length > 1
      ? `linear-gradient(90deg, ${harmonyColors.filter((c) => chroma.valid(c)).join(", ")})`
      : harmonyColors[0] || "#19CE41";

  const handleColorInput = (value: string, index: number) => {
    onColorChange(value, index);
    setInvalidInputs((prev) => ({
      ...prev,
      [index]: value.length > 0 && !chroma.valid(value),
    }));
  };

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
            <p className="text-xs text-muted-foreground hidden sm:block">
              Design systems start with great color
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
          <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
          <Button variant="ghost" size="sm" onClick={onShare} title="Share (Ctrl+L)">
            <Share2 className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={onSavedPalettes} title="Saved (Ctrl+S)">
            <Bookmark className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Saved</span>
          </Button>
          <Button variant="default" size="sm" onClick={onExport} title="Export (Ctrl+E)">
            <Download className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleTheme}
            title="Toggle theme (Ctrl+D)"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
              );
            }}
            title="Command palette (Ctrl+K)"
          >
            <Command className="h-4 w-4" />
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
                onChange={(e) => handleColorInput(e.target.value, index)}
                className={`pl-12 text-base h-10 w-40 ${
                  invalidInputs[index]
                    ? "border-destructive ring-1 ring-destructive/30"
                    : ""
                }`}
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
                onInput={(e) => handleColorInput(e.currentTarget.value, index)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 cursor-pointer"
                aria-label={`Pick Color for Harmony Color ${index + 1}`}
              />
              {invalidInputs[index] && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
              )}
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
