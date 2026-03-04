import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SavedPalette } from "@/hooks/use-saved-palettes";
import { HarmonyType, generateHarmonies } from "@/lib/colors";
import { Trash2, Plus } from "lucide-react";
import chroma from "chroma-js";

interface SavedPalettesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedPalettes: SavedPalette[];
  onSave: (name: string, baseColor: string, harmony: HarmonyType) => void;
  onDelete: (id: string) => void;
  onLoad: (baseColor: string, harmony: HarmonyType) => void;
  currentBaseColor: string;
  currentHarmony: HarmonyType;
}

export function SavedPalettesDrawer({
  open,
  onOpenChange,
  savedPalettes,
  onSave,
  onDelete,
  onLoad,
  currentBaseColor,
  currentHarmony,
}: SavedPalettesDrawerProps) {
  const [saveName, setSaveName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleSave = () => {
    if (!saveName.trim()) return;
    onSave(saveName.trim(), currentBaseColor, currentHarmony);
    setSaveName("");
    setShowSaveForm(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[380px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>Saved Palettes</SheetTitle>
          <SheetDescription>
            Save and load your favorite color palettes.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {!showSaveForm ? (
            <Button
              onClick={() => setShowSaveForm(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" /> Save Current Palette
            </Button>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Palette name..."
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />
              <Button onClick={handleSave} size="sm">
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowSaveForm(false);
                  setSaveName("");
                }}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          )}

          <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto">
            {savedPalettes.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No saved palettes yet.
              </p>
            )}
            {savedPalettes.map((palette) => {
              const colors = generateHarmonies(palette.baseColor, palette.harmony);
              return (
                <div
                  key={palette.id}
                  className="border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{palette.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {palette.harmony}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {colors
                      .filter((c) => chroma.valid(c))
                      .map((c, i) => (
                        <div
                          key={i}
                          className="h-6 flex-1 rounded-sm first:rounded-l-md last:rounded-r-md"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-7"
                      onClick={() => {
                        onLoad(palette.baseColor, palette.harmony);
                        onOpenChange(false);
                      }}
                    >
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 text-destructive hover:text-destructive"
                      onClick={() => onDelete(palette.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
