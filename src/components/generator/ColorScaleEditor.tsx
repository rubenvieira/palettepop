import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shuffle, AlertCircle, Pencil, Check } from "lucide-react";
import { ColorScale, ColorScaleRole } from "@/lib/colors";
import { ScaleSidebar } from "./ScaleSidebar";
import { ShadeStrip } from "./ShadeStrip";
import { HSLSliders } from "./HSLSliders";
import chroma from "chroma-js";

interface ColorScaleEditorProps {
  scales: ColorScale[];
  selectedScaleId: string;
  selectedScale: ColorScale | null;
  onSelectScale: (id: string) => void;
  onAddScale: (role: ColorScaleRole) => void;
  onRemoveScale: (id: string) => void;
  onUpdateBaseColor: (id: string, hex: string) => void;
  onToggleLock: (scaleId: string, shadeName: number) => void;
  onOverrideShade: (scaleId: string, shadeName: number, hex: string) => void;
  onRenameScale: (id: string, name: string) => void;
  onRandomColor: () => void;
}

export function ColorScaleEditor({
  scales,
  selectedScaleId,
  selectedScale,
  onSelectScale,
  onAddScale,
  onRemoveScale,
  onUpdateBaseColor,
  onToggleLock,
  onOverrideShade,
  onRenameScale,
  onRandomColor,
}: ColorScaleEditorProps) {
  const [isInvalidColor, setIsInvalidColor] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");

  const handleColorInput = useCallback(
    (value: string) => {
      if (!selectedScale) return;
      onUpdateBaseColor(selectedScale.id, value);
      setIsInvalidColor(value.length > 0 && !chroma.valid(value));
    },
    [selectedScale, onUpdateBaseColor]
  );

  const handleHSLChange = useCallback(
    (hex: string) => {
      if (!selectedScale) return;
      onUpdateBaseColor(selectedScale.id, hex);
      setIsInvalidColor(false);
    },
    [selectedScale, onUpdateBaseColor]
  );

  const startRename = useCallback(() => {
    if (!selectedScale) return;
    setNameValue(selectedScale.name);
    setEditingName(true);
  }, [selectedScale]);

  const submitRename = useCallback(() => {
    if (!selectedScale || !nameValue.trim()) return;
    onRenameScale(selectedScale.id, nameValue.trim().toLowerCase().replace(/\s+/g, "-"));
    setEditingName(false);
  }, [selectedScale, nameValue, onRenameScale]);

  if (!selectedScale) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Select or add a color scale to get started.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="lg:w-56 shrink-0">
        <ScaleSidebar
          scales={scales}
          selectedScaleId={selectedScaleId}
          onSelectScale={onSelectScale}
          onAddScale={onAddScale}
          onRemoveScale={onRemoveScale}
        />
      </div>

      {/* Main editor */}
      <div className="flex-1 min-w-0">
        {/* Scale name */}
        <div className="flex items-center gap-2 mb-5">
          {editingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitRename()}
                className="h-8 w-40 text-sm"
                autoFocus
              />
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={submitRename}>
                <Check className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h2 className="text-xl font-bold capitalize tracking-tight">
                {selectedScale.name}
              </h2>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
                onClick={startRename}
                title="Rename scale"
              >
                <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Color input + sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={selectedScale.baseColor}
                  onChange={(e) => handleColorInput(e.target.value)}
                  className={`pl-12 text-base h-10 ${
                    isInvalidColor
                      ? "border-destructive ring-1 ring-destructive/30"
                      : ""
                  }`}
                  placeholder="#3b82f6"
                />
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md border transition-colors duration-200"
                  style={{
                    backgroundColor: chroma.valid(selectedScale.baseColor)
                      ? selectedScale.baseColor
                      : "transparent",
                  }}
                />
                <Input
                  type="color"
                  value={
                    chroma.valid(selectedScale.baseColor)
                      ? selectedScale.baseColor
                      : "#000000"
                  }
                  onInput={(e) => handleColorInput(e.currentTarget.value)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 cursor-pointer"
                />
                {isInvalidColor && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                )}
              </div>
              <Button onClick={onRandomColor} variant="outline" size="icon" className="h-10 w-10" title="Random color (Space)">
                <Shuffle className="h-4 w-4" />
              </Button>
            </div>

            {/* Color preview block */}
            <div
              className="h-20 rounded-lg border transition-colors duration-200"
              style={{
                backgroundColor: chroma.valid(selectedScale.baseColor)
                  ? selectedScale.baseColor
                  : "transparent",
              }}
            />
          </div>

          <HSLSliders
            hex={selectedScale.baseColor}
            onChange={handleHSLChange}
          />
        </div>

        {/* Shade strips */}
        <div className="rounded-lg overflow-hidden border">
          {selectedScale.shades.map((shade) => (
            <ShadeStrip
              key={shade.name}
              shadeName={shade.name}
              hex={shade.hex}
              isLocked={selectedScale.lockedShades.includes(shade.name)}
              onToggleLock={(name) => onToggleLock(selectedScale.id, name)}
              onOverride={(name, hex) => onOverrideShade(selectedScale.id, name, hex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
