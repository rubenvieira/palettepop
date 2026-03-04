import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { PaletteColor } from "@/lib/colors";
import { exportFormats, ExportFormat } from "@/lib/export-formats";
import { showSuccess } from "@/utils/toast";

interface ExportDialogProps {
  palettes: PaletteColor[][];
  paletteNames: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportDialog({
  palettes,
  paletteNames,
  open,
  onOpenChange,
}: ExportDialogProps) {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>("tailwind");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Export Palette</DialogTitle>
          <DialogDescription>
            Choose your preferred format and copy the code.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          value={activeFormat}
          onValueChange={(v) => setActiveFormat(v as ExportFormat)}
        >
          <TabsList className="grid grid-cols-6 w-full">
            {exportFormats.map((fmt) => (
              <TabsTrigger key={fmt.id} value={fmt.id} className="text-xs">
                {fmt.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {exportFormats.map((fmt) => (
            <TabsContent key={fmt.id} value={fmt.id}>
              <div className="relative rounded-md bg-slate-950 p-4 overflow-auto max-h-[400px]">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-white hover:text-white hover:bg-white/10"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      fmt.generate(palettes, paletteNames)
                    );
                    showSuccess(`${fmt.name} copied!`);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-white text-sm font-mono whitespace-pre-wrap">
                  {fmt.generate(palettes, paletteNames)}
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
