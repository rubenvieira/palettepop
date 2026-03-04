import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { keys: "Space", description: "Random palette" },
  { keys: "Ctrl+K", description: "Open command palette" },
  { keys: "Ctrl+Z", description: "Undo" },
  { keys: "Ctrl+Y", description: "Redo" },
  { keys: "Ctrl+E", description: "Export palette" },
  { keys: "Ctrl+L", description: "Share link" },
  { keys: "Ctrl+S", description: "Saved palettes" },
  { keys: "Ctrl+D", description: "Toggle dark mode" },
  { keys: "?", description: "Keyboard shortcuts" },
];

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-1 mt-2">
          {shortcuts.map((s) => (
            <div
              key={s.keys}
              className="flex items-center justify-between py-2 px-1"
            >
              <span className="text-sm text-muted-foreground">
                {s.description}
              </span>
              <div className="flex gap-1">
                {s.keys.split("+").map((key) => (
                  <kbd
                    key={key}
                    className="px-2 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground border"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
