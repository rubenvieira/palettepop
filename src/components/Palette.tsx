import { useState, memo } from "react";
import { ColorCard } from "@/components/ColorCard";
import { PaletteColor } from "@/lib/colors";
import { Pencil, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PaletteProps {
  title: string;
  colors: PaletteColor[];
  onRename?: (name: string) => void;
}

export const Palette = memo(({ title, colors, onRename }: PaletteProps) => {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(title);

  if (colors.length === 0) return null;

  const gradientCSS = `linear-gradient(90deg, ${colors.map((c) => c.hex).join(", ")})`;

  const handleSubmit = () => {
    if (editName.trim() && onRename) {
      onRename(editName.trim().toLowerCase().replace(/\s+/g, "-"));
    }
    setEditing(false);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        {editing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="h-8 w-40 text-sm"
              autoFocus
            />
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSubmit}>
              <Check className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 group">
            <h2 className="text-xl font-bold capitalize tracking-tight">{title}</h2>
            {onRename && (
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
                onClick={() => {
                  setEditName(title);
                  setEditing(true);
                }}
                title="Rename palette"
              >
                <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
        )}
        <div className="flex-1 h-[1px] bg-border" />
      </div>
      <div
        className="h-3 rounded-full mb-4"
        style={{ background: gradientCSS }}
      />
      <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 gap-2 sm:gap-3">
        {colors.map((color, index) => (
          <div
            key={`${title}-${color.name}`}
            style={{ animationDelay: `${index * 30}ms` }}
            className="animate-scale-in"
          >
            <ColorCard name={color.name} hex={color.hex} />
          </div>
        ))}
      </div>
    </div>
  );
});
