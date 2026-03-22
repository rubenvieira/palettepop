import { useState, useCallback, memo } from "react";
import { showSuccess } from "@/utils/toast";
import chroma from "chroma-js";
import { Lock, Unlock, Pencil, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ShadeStripProps {
  shadeName: number;
  hex: string;
  isLocked: boolean;
  onToggleLock?: (shadeName: number) => void;
  onOverride?: (shadeName: number, hex: string) => void;
  readOnly?: boolean;
}

export const ShadeStrip = memo(({
  shadeName,
  hex,
  isLocked,
  onToggleLock,
  onOverride,
  readOnly = false,
}: ShadeStripProps) => {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(hex);

  const textColor = chroma.valid(hex)
    ? chroma.contrast(hex, "white") > 4.5
      ? "white"
      : "#1a1a2e"
    : "#1a1a2e";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(hex).then(() => {
      showSuccess(`Copied ${hex}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }, [hex]);

  const handleEditSubmit = useCallback(() => {
    if (chroma.valid(editValue) && onOverride) {
      onOverride(shadeName, chroma(editValue).hex());
    }
    setEditing(false);
  }, [editValue, shadeName, onOverride]);

  const handleEditStart = useCallback(() => {
    setEditValue(hex);
    setEditing(true);
  }, [hex]);

  return (
    <div
      className="group flex items-center h-12 sm:h-14 px-4 cursor-pointer transition-all duration-150 hover:brightness-95 first:rounded-t-lg last:rounded-b-lg"
      style={{ backgroundColor: hex, color: textColor }}
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      aria-label={`Shade ${shadeName}: ${hex}. Click to copy.`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCopy();
        }
      }}
    >
      <span className="font-semibold text-sm w-12 shrink-0">{shadeName}</span>

      <div className="flex-1 flex items-center justify-center">
        {editing ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") handleEditSubmit();
              if (e.key === "Escape") setEditing(false);
            }}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleEditSubmit}
            className="h-7 w-28 text-center text-xs font-mono bg-black/10 border-white/20"
            style={{ color: textColor }}
            autoFocus
          />
        ) : (
          <span className="font-mono text-sm uppercase tracking-wider">
            {hex}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="h-4 w-4" style={{ color: textColor }} />
        ) : (
          <Copy className="h-4 w-4" style={{ color: textColor, opacity: 0.7 }} />
        )}
        {!readOnly && (
          <>
            <button
              className="p-1 rounded hover:bg-black/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleEditStart();
              }}
              title="Edit shade"
              style={{ color: textColor, opacity: 0.7 }}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              className="p-1 rounded hover:bg-black/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLock?.(shadeName);
              }}
              title={isLocked ? "Unlock shade" : "Lock shade"}
              style={{ color: textColor, opacity: isLocked ? 1 : 0.7 }}
            >
              {isLocked ? (
                <Lock className="h-3.5 w-3.5" />
              ) : (
                <Unlock className="h-3.5 w-3.5" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
});
