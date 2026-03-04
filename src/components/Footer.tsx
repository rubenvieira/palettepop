import { Keyboard, Command } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 mb-8 text-center text-sm text-muted-foreground space-y-3">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Space</kbd>
          Random
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Ctrl+K</kbd>
          Commands
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Ctrl+Z</kbd>
          Undo
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Ctrl+D</kbd>
          Dark mode
        </span>
      </div>
      <p>Built with chroma-js &middot; PalettePop</p>
    </footer>
  );
}
