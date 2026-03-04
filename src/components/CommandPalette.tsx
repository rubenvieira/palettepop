import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Shuffle,
  Download,
  Share2,
  Bookmark,
  Undo2,
  Redo2,
  Sun,
  Moon,
  Keyboard,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface CommandPaletteProps {
  onRandomize: () => void;
  onExport: () => void;
  onShare: () => void;
  onSavedPalettes: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onShowShortcuts: () => void;
}

export function CommandPalette({
  onRandomize,
  onExport,
  onShare,
  onSavedPalettes,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onShowShortcuts,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA";

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (isInput) return;

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        onShowShortcuts();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        onUndo();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "y") {
        e.preventDefault();
        onRedo();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault();
        onExport();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "l") {
        e.preventDefault();
        onShare();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        onSavedPalettes();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUndo, onRedo, onExport, onShare, onSavedPalettes, onShowShortcuts, toggleTheme]);

  const runCommand = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>

        <CommandGroup heading="Palette">
          <CommandItem onSelect={() => runCommand(onRandomize)}>
            <Shuffle className="mr-2 h-4 w-4" />
            Random palette
            <CommandShortcut>Space</CommandShortcut>
          </CommandItem>
          <CommandItem disabled={!canUndo} onSelect={() => runCommand(onUndo)}>
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
            <CommandShortcut>Ctrl+Z</CommandShortcut>
          </CommandItem>
          <CommandItem disabled={!canRedo} onSelect={() => runCommand(onRedo)}>
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
            <CommandShortcut>Ctrl+Y</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(onExport)}>
            <Download className="mr-2 h-4 w-4" />
            Export palette
            <CommandShortcut>Ctrl+E</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onShare)}>
            <Share2 className="mr-2 h-4 w-4" />
            Share palette
            <CommandShortcut>Ctrl+L</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onSavedPalettes)}>
            <Bookmark className="mr-2 h-4 w-4" />
            Saved palettes
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(toggleTheme)}>
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            <CommandShortcut>Ctrl+D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(onShowShortcuts)}>
            <Keyboard className="mr-2 h-4 w-4" />
            Keyboard shortcuts
            <CommandShortcut>?</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
