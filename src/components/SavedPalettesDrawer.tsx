import { useState, useRef } from "react";
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
import { Trash2, Plus, Star, Download, Upload, Search } from "lucide-react";
import chroma from "chroma-js";

interface SavedPalettesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedPalettes: SavedPalette[];
  onSave: (name: string, baseColor: string, harmony: HarmonyType, tags?: string[]) => void;
  onDelete: (id: string) => void;
  onLoad: (baseColor: string, harmony: HarmonyType) => void;
  onToggleFavorite: (id: string) => void;
  onExportAll: () => void;
  onImport: (file: File) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
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
  onToggleFavorite,
  onExportAll,
  onImport,
  searchQuery,
  onSearchChange,
  currentBaseColor,
  currentHarmony,
}: SavedPalettesDrawerProps) {
  const [saveName, setSaveName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!saveName.trim()) return;
    onSave(saveName.trim(), currentBaseColor, currentHarmony);
    setSaveName("");
    setShowSaveForm(false);
  };

  // Sort: favorites first, then by date
  const sorted = [...savedPalettes].sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    return b.createdAt - a.createdAt;
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[380px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>Saved Palettes</SheetTitle>
          <SheetDescription>
            Save and load your favorite color palettes.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search palettes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Actions row */}
          <div className="flex gap-2">
            {!showSaveForm ? (
              <Button
                onClick={() => setShowSaveForm(true)}
                className="flex-1"
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" /> Save Current
              </Button>
            ) : (
              <div className="flex gap-2 flex-1">
                <Input
                  placeholder="Name..."
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="h-9"
                  autoFocus
                />
                <Button onClick={handleSave} size="sm">
                  Save
                </Button>
                <Button
                  onClick={() => { setShowSaveForm(false); setSaveName(""); }}
                  size="sm"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            )}
            {!showSaveForm && (
              <>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={onExportAll} title="Export all">
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => fileInputRef.current?.click()}
                  title="Import"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onImport(file);
                    e.target.value = "";
                  }}
                />
              </>
            )}
          </div>

          <div className="space-y-2 max-h-[calc(100vh-260px)] overflow-y-auto">
            {sorted.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                {searchQuery ? "No palettes match your search." : "No saved palettes yet."}
              </p>
            )}
            {sorted.map((palette) => {
              const colors = generateHarmonies(palette.baseColor, palette.harmony);
              const dateStr = new Date(palette.createdAt).toLocaleDateString();
              return (
                <div
                  key={palette.id}
                  className="border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleFavorite(palette.id)}
                        className="p-0.5"
                      >
                        <Star
                          className={`h-3.5 w-3.5 transition-colors ${
                            palette.favorite
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground hover:text-yellow-400"
                          }`}
                        />
                      </button>
                      <span className="font-medium text-sm">{palette.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{palette.harmony}</span>
                      <span>{dateStr}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
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
