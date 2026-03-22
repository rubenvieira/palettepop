import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExportDialog } from "@/components/ExportDialog";
import { SavedPalettesDrawer } from "@/components/SavedPalettesDrawer";
import { CommandPalette } from "@/components/CommandPalette";
import { ColorDetailPanel } from "@/components/ColorDetailPanel";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
import { ColorScaleEditor } from "@/components/generator/ColorScaleEditor";
import { ComponentsPreview } from "@/components/preview/ComponentsPreview";
import { ToolsPanel } from "@/components/tools/ToolsPanel";
import { TailwindColorsPage } from "@/components/tailwind/TailwindColorsPage";
import { useColorScales } from "@/hooks/use-color-scales";
import { useSavedPalettes } from "@/hooks/use-saved-palettes";
import { encodePaletteToURL } from "@/lib/url-state";
import { showSuccess } from "@/utils/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paintbrush, Layout, Wrench, Palette } from "lucide-react";

const Index = () => {
  const {
    scales,
    selectedScaleId,
    setSelectedScaleId,
    selectedScale,
    addScale,
    removeScale,
    updateScaleBaseColor,
    toggleShadeLock,
    overrideShade,
    renameScale,
    handleRandomColor,
    undo,
    redo,
    canUndo,
    canRedo,
    palettes,
    paletteNames,
  } = useColorScales();

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

  // Spacebar for random color
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
    const baseColor = scales[0]?.baseColor || "#3b82f6";
    const url = encodePaletteToURL(baseColor, "single", paletteNames);
    navigator.clipboard.writeText(url);
    showSuccess("Share link copied to clipboard!");
    window.history.replaceState(null, "", url);
  }, [scales, paletteNames]);

  const handleLoadPalette = useCallback(
    (color: string) => {
      if (selectedScale) {
        updateScaleBaseColor(selectedScale.id, color);
      }
    },
    [selectedScale, updateScaleBaseColor]
  );

  const openExport = useCallback(() => setIsExportOpen(true), []);
  const openSaved = useCallback(() => setIsSavedOpen(true), []);
  const openShortcuts = useCallback(() => setIsShortcutsOpen(true), []);

  const handleColorSelectFromTool = useCallback(
    (hex: string) => {
      if (selectedScale) {
        updateScaleBaseColor(selectedScale.id, hex);
      }
    },
    [selectedScale, updateScaleBaseColor]
  );

  const accentColor = scales[0]?.shades.find((s) => s.name === 500)?.hex;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="bg-background min-h-screen transition-colors">
        <Header
          accentColor={accentColor}
          onExport={openExport}
          onShare={handleShare}
          onSavedPalettes={openSaved}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />

        <div className="container mx-auto p-4 sm:p-8">
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="generator" className="gap-1.5">
                <Paintbrush className="h-3.5 w-3.5 hidden sm:block" />
                Generator
              </TabsTrigger>
              <TabsTrigger value="components" className="gap-1.5">
                <Layout className="h-3.5 w-3.5 hidden sm:block" />
                Components
              </TabsTrigger>
              <TabsTrigger value="tools" className="gap-1.5">
                <Wrench className="h-3.5 w-3.5 hidden sm:block" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="tailwind" className="gap-1.5">
                <Palette className="h-3.5 w-3.5 hidden sm:block" />
                Tailwind
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generator">
              <ColorScaleEditor
                scales={scales}
                selectedScaleId={selectedScaleId}
                selectedScale={selectedScale}
                onSelectScale={setSelectedScaleId}
                onAddScale={addScale}
                onRemoveScale={removeScale}
                onUpdateBaseColor={updateScaleBaseColor}
                onToggleLock={toggleShadeLock}
                onOverrideShade={overrideShade}
                onRenameScale={renameScale}
                onRandomColor={handleRandomColor}
              />
            </TabsContent>

            <TabsContent value="components">
              <ComponentsPreview scales={scales} palettes={palettes} />
            </TabsContent>

            <TabsContent value="tools">
              <ToolsPanel
                scales={scales}
                palettes={palettes}
                paletteNames={paletteNames}
                onColorSelect={handleColorSelectFromTool}
                onAddScale={addScale}
              />
            </TabsContent>

            <TabsContent value="tailwind">
              <TailwindColorsPage onUseColor={handleColorSelectFromTool} />
            </TabsContent>
          </Tabs>

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
          onLoad={(color, _harmony) => handleLoadPalette(color)}
          onToggleFavorite={toggleFavorite}
          onExportAll={exportAll}
          onImport={importPalettes}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentBaseColor={scales[0]?.baseColor || "#3b82f6"}
          currentHarmony="single"
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
