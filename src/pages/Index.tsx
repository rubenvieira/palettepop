import { useEffect, useState, useCallback } from "react";
import { Palette } from "@/components/Palette";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExportDialog } from "@/components/ExportDialog";
import { SavedPalettesDrawer } from "@/components/SavedPalettesDrawer";
import { ContrastChecker } from "@/components/ContrastChecker";
import { ColorBlindnessSimulator } from "@/components/ColorBlindnessSimulator";
import { GradientGenerator } from "@/components/GradientGenerator";
import { BrandMockups } from "@/components/brand-mockups/BrandMockups";
import { CommandPalette } from "@/components/CommandPalette";
import { ColorDetailPanel } from "@/components/ColorDetailPanel";
import { ImageColorExtractor } from "@/components/ImageColorExtractor";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
import { usePalette } from "@/hooks/use-palette";
import { useSavedPalettes } from "@/hooks/use-saved-palettes";
import { encodePaletteToURL } from "@/lib/url-state";
import { showSuccess } from "@/utils/toast";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  const {
    baseColor,
    setBaseColor,
    harmony,
    setHarmony,
    harmonyColors,
    palettes,
    paletteNames,
    renamePalette,
    handleHarmonyColorChange,
    handleRandomColor,
    undo,
    redo,
    canUndo,
    canRedo,
  } = usePalette();

  const {
    savedPalettes,
    savePalette,
    deletePalette,
    toggleFavorite,
    exportAll,
    importPalettes,
    searchQuery,
    setSearchQuery,
  } = useSavedPalettes();

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [inspectHex, setInspectHex] = useState<string | null>(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  useEffect(() => {
    const handleSpacebar = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        handleRandomColor();
      }
    };
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [handleRandomColor]);

  const handleShare = useCallback(() => {
    const url = encodePaletteToURL(baseColor, harmony, paletteNames);
    navigator.clipboard.writeText(url);
    showSuccess("Share link copied to clipboard!");
    window.history.replaceState(null, "", url);
  }, [baseColor, harmony, paletteNames]);

  const handleLoadPalette = useCallback(
    (color: string, h: typeof harmony) => {
      setBaseColor(color);
      setHarmony(h);
    },
    [setBaseColor, setHarmony]
  );

  const openExport = useCallback(() => setIsExportOpen(true), []);
  const openSaved = useCallback(() => setIsSavedOpen(true), []);
  const openShortcuts = useCallback(() => setIsShortcutsOpen(true), []);
  const handleInspectColor = useCallback((hex: string) => setInspectHex(hex), []);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="bg-background min-h-screen transition-colors">
        <Header
          harmonyColors={harmonyColors}
          harmony={harmony}
          onHarmonyChange={setHarmony}
          onColorChange={handleHarmonyColorChange}
          onRandomize={handleRandomColor}
          onExport={openExport}
          onShare={handleShare}
          onSavedPalettes={openSaved}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />

        <div className="container mx-auto p-4 sm:p-8">
          <main>
            <ImageColorExtractor onColorSelect={setBaseColor} />

            {palettes.length > 0 ? (
              <div className="space-y-12 mt-12">
                {palettes.map((palette, index) => (
                  <Palette
                    key={index}
                    title={paletteNames[index]}
                    colors={palette}
                    onRename={(name) => renamePalette(index, name)}
                    onInspectColor={handleInspectColor}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  Enter a valid CSS color to get started.
                </p>
              </div>
            )}

            <BrandMockups palettes={palettes} />

            <ContrastChecker
              palettes={palettes}
              paletteNames={paletteNames}
            />

            <ColorBlindnessSimulator
              palettes={palettes}
              paletteNames={paletteNames}
            />

            <GradientGenerator
              palettes={palettes}
              paletteNames={paletteNames}
            />
          </main>

          <Footer />
        </div>

        <ExportDialog
          palettes={palettes}
          paletteNames={paletteNames}
          open={isExportOpen}
          onOpenChange={setIsExportOpen}
        />

        <SavedPalettesDrawer
          open={isSavedOpen}
          onOpenChange={setIsSavedOpen}
          savedPalettes={savedPalettes}
          onSave={savePalette}
          onDelete={deletePalette}
          onLoad={handleLoadPalette}
          onToggleFavorite={toggleFavorite}
          onExportAll={exportAll}
          onImport={importPalettes}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentBaseColor={baseColor}
          currentHarmony={harmony}
        />

        <ColorDetailPanel
          hex={inspectHex}
          open={inspectHex !== null}
          onOpenChange={(open) => {
            if (!open) setInspectHex(null);
          }}
        />

        <KeyboardShortcutsDialog
          open={isShortcutsOpen}
          onOpenChange={setIsShortcutsOpen}
        />

        <CommandPalette
          onRandomize={handleRandomColor}
          onExport={openExport}
          onShare={handleShare}
          onSavedPalettes={openSaved}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onShowShortcuts={openShortcuts}
        />
      </div>
    </TooltipProvider>
  );
};

export default Index;
