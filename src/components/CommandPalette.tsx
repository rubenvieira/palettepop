import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
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
}

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
  disabled?: boolean;
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
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, toggleTheme } = useTheme();

  const commands: Command[] = [
    {
      id: "random",
      label: "Random palette",
      shortcut: "Space",
      icon: <Shuffle className="h-4 w-4" />,
      action: onRandomize,
    },
    {
      id: "undo",
      label: "Undo",
      shortcut: "Ctrl+Z",
      icon: <Undo2 className="h-4 w-4" />,
      action: onUndo,
      disabled: !canUndo,
    },
    {
      id: "redo",
      label: "Redo",
      shortcut: "Ctrl+Y",
      icon: <Redo2 className="h-4 w-4" />,
      action: onRedo,
      disabled: !canRedo,
    },
    {
      id: "export",
      label: "Export palette",
      shortcut: "Ctrl+E",
      icon: <Download className="h-4 w-4" />,
      action: onExport,
    },
    {
      id: "share",
      label: "Share palette",
      shortcut: "Ctrl+L",
      icon: <Share2 className="h-4 w-4" />,
      action: onShare,
    },
    {
      id: "saved",
      label: "Saved palettes",
      shortcut: "Ctrl+S",
      icon: <Bookmark className="h-4 w-4" />,
      action: onSavedPalettes,
    },
    {
      id: "dark-mode",
      label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      shortcut: "Ctrl+D",
      icon: theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
      action: toggleTheme,
    },
    {
      id: "shortcuts",
      label: "Keyboard shortcuts",
      shortcut: "?",
      icon: <Keyboard className="h-4 w-4" />,
      action: () => {},
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA";

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (isInput) return;

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
  }, [onUndo, onRedo, onExport, onShare, onSavedPalettes, theme, toggleTheme]);

  const runCommand = (cmd: Command) => {
    if (cmd.disabled) return;
    setOpen(false);
    setQuery("");
    cmd.action();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setQuery(""); }}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
        <div className="flex items-center border-b px-3">
          <Keyboard className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
          <input
            className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground shrink-0">
            ESC
          </kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-1">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No commands found.
            </p>
          )}
          {filtered.map((cmd) => (
            <button
              key={cmd.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors
                ${cmd.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-muted cursor-pointer"}`}
              onClick={() => runCommand(cmd)}
              disabled={cmd.disabled}
            >
              <span className="text-muted-foreground">{cmd.icon}</span>
              <span className="flex-1 text-left">{cmd.label}</span>
              {cmd.shortcut && (
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground">
                  {cmd.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
