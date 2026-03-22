import { Button } from "@/components/ui/button";
import {
  Share2,
  Bookmark,
  Download,
  Undo2,
  Redo2,
  Sun,
  Moon,
  Command,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import chroma from "chroma-js";

interface HeaderProps {
  accentColor?: string;
  onExport: () => void;
  onShare: () => void;
  onSavedPalettes: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function Header({
  accentColor,
  onExport,
  onShare,
  onSavedPalettes,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const validAccent = accentColor && chroma.valid(accentColor) ? accentColor : "#3b82f6";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b">
      <div className="h-1" style={{ background: validAccent }} />

      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">
            Palette
            <span
              style={{
                color: validAccent,
                transition: "color 0.3s ease",
              }}
            >
              Pop
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-1">
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
    </header>
  );
}
