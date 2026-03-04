import { Keyboard } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 mb-8 text-center text-sm text-muted-foreground space-y-2">
      <div className="flex items-center justify-center gap-2">
        <Keyboard className="h-3.5 w-3.5" />
        <span>
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Space</kbd> for a random palette
        </span>
      </div>
      <p>Built with chroma-js &middot; PalettePop</p>
    </footer>
  );
}
