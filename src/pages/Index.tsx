import { useEffect, useState } from "react";
import { Palette } from "@/components/Palette";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExportDialog } from "@/components/ExportDialog";
import { SavedPalettesDrawer } from "@/components/SavedPalettesDrawer";
import { ContrastChecker } from "@/components/ContrastChecker";
import { ColorBlindnessSimulator } from "@/components/ColorBlindnessSimulator";
import { GradientGenerator } from "@/components/GradientGenerator";
import { BrandMockups } from "@/components/brand-mockups/BrandMockups";
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
    handleHarmonyColorChange,
    handleRandomColor,
  } = usePalette();

  const { savedPalettes, savePalette, deletePalette } = useSavedPalettes();

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);

  useEffect(() => {
    const handleSpacebar = (e: KeyboardEvent) => {
      if (e.code === "Space" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        handleRandomColor();
      }
    };
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [handleRandomColor]);

  const handleShare = () => {
    const url = encodePaletteToURL(baseColor, harmony);
    navigator.clipboard.writeText(url);
    showSuccess("Share link copied to clipboard!");
    window.history.replaceState(null, "", url);
  };

  const handleLoadPalette = (color: string, h: typeof harmony) => {
    setBaseColor(color);
    setHarmony(h);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Header
          harmonyColors={harmonyColors}
          harmony={harmony}
          onHarmonyChange={setHarmony}
          onColorChange={handleHarmonyColorChange}
          onRandomize={handleRandomColor}
          onExport={() => setIsExportOpen(true)}
          onShare={handleShare}
          onSavedPalettes={() => setIsSavedOpen(true)}
        />

        <div className="container mx-auto p-4 sm:p-8">
          <main>
            {palettes.length > 0 ? (
              <div className="space-y-12">
                {palettes.map((palette, index) => (
                  <Palette
                    key={index}
                    title={paletteNames[index]}
                    colors={palette}
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

            <ColorBlindnessSimulator palettes={palettes} />

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
          currentBaseColor={baseColor}
          currentHarmony={harmony}
        />
      </div>
    </TooltipProvider>
  );
};

export default Index;
