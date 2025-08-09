import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ColorCard } from "@/components/ColorCard";
import { ColorPaletteShowcase } from "@/components/palette-widgets/ColorPaletteShowcase";
import { generatePalette, PaletteColor } from "@/lib/colors";
import chroma from "chroma-js";
import { showSuccess } from "@/utils/toast";
import { Copy, Shuffle } from "lucide-react";

const Index = () => {
  const [baseColor, setBaseColor] = useState("#19CE41");
  const [palette, setPalette] = useState<PaletteColor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setPalette(generatePalette(baseColor));
  }, [baseColor]);

  const handleRandomColor = () => {
    const randomColor = chroma.random().hex();
    setBaseColor(randomColor);
  };

  useEffect(() => {
    const handleSpacebar = (e: KeyboardEvent) => {
      if (e.code === "Space" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        handleRandomColor();
      }
    };
    window.addEventListener("keydown", handleSpacebar);
    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
  }, []);

  const tailwindConfigString = `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
${palette.map((c) => `          '${c.name}': '${c.hex}'`).join(",\n")}
        }
      }
    }
  }
};`;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 my-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="pl-12 text-base h-10 w-40"
                aria-label="Base Color"
              />
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md border"
                style={{
                  backgroundColor: chroma.valid(baseColor)
                    ? baseColor
                    : "transparent",
                }}
              />
            </div>
            <Button onClick={handleRandomColor} variant="outline">
              <Shuffle className="h-4 w-4 mr-2" />
              Random
            </Button>
          </div>
          <div>
            <Button onClick={() => setIsDialogOpen(true)} variant="default">Export</Button>
          </div>
        </header>

        <main className="space-y-8">
          {palette.length > 0 ? (
            <>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 sm:gap-4">
                {palette.map((color) => (
                  <ColorCard key={color.name} name={color.name} hex={color.hex} />
                ))}
              </div>
              
              <ColorPaletteShowcase palette={palette} />
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Enter a valid CSS color to get started.
              </p>
            </div>
          )}
        </main>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Export for Tailwind CSS</DialogTitle>
              <DialogDescription>
                Copy and paste this into your tailwind.config.js file.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 rounded-md bg-slate-950 p-4 overflow-x-auto">
              <pre>
                <code className="text-white text-sm">{tailwindConfigString}</code>
              </pre>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(tailwindConfigString);
                  showSuccess("Config copied to clipboard!");
                  setIsDialogOpen(false);
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;