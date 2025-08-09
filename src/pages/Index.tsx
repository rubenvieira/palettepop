import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ColorCard } from "@/components/ColorCard";
import { generatePalette, PaletteColor } from "@/lib/colors";
import chroma from "chroma-js";
import { showSuccess } from "@/utils/toast";
import { Copy } from "lucide-react";

const Index = () => {
  const [baseColor, setBaseColor] = useState("#3b82f6");
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
    <div className="container mx-auto p-4 sm:p-8 min-h-screen flex flex-col">
      <header className="text-center my-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          PalettePop
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Instantly create beautiful, accessible color palettes for your projects and export them for Tailwind CSS.
        </p>
      </header>

      <main className="flex-grow">
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8">
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="pl-12 text-lg h-12"
              aria-label="Base Color"
            />
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md border"
              style={{
                backgroundColor: chroma.valid(baseColor)
                  ? baseColor
                  : "transparent",
              }}
            />
          </div>
          <Button onClick={handleRandomColor} size="lg">Random</Button>
          <Button onClick={() => setIsDialogOpen(true)} size="lg" variant="outline">Export</Button>
        </div>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Or just press the{" "}
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
            Spacebar
          </kbd>{" "}
          to generate a new palette.
        </p>

        {palette.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-4">
            {palette.map((color) => (
              <ColorCard key={color.name} name={color.name} hex={color.hex} />
            ))}
          </div>
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
  );
};

export default Index;