import { ColorScale, PaletteColor, HarmonyType, generateHarmonies, harmonySchemes } from "@/lib/colors";
import { ImageColorExtractor } from "@/components/ImageColorExtractor";
import { ContrastChecker } from "@/components/ContrastChecker";
import { ColorBlindnessSimulator } from "@/components/ColorBlindnessSimulator";
import { GradientGenerator } from "@/components/GradientGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback } from "react";
import chroma from "chroma-js";
import { Plus } from "lucide-react";
import { ColorScaleRole } from "@/lib/colors";

interface ToolsPanelProps {
  scales: ColorScale[];
  palettes: PaletteColor[][];
  paletteNames: string[];
  onColorSelect: (hex: string) => void;
  onAddScale: (role: ColorScaleRole, baseColor?: string) => void;
}

export function ToolsPanel({ scales, palettes, paletteNames, onColorSelect, onAddScale }: ToolsPanelProps) {
  const [harmonyBase, setHarmonyBase] = useState(scales[0]?.baseColor || "#3b82f6");
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("analogous");
  const [harmonyResults, setHarmonyResults] = useState<string[]>([]);

  const generateHarmonyColors = useCallback(() => {
    if (!chroma.valid(harmonyBase)) return;
    const results = generateHarmonies(harmonyBase, harmonyType);
    setHarmonyResults(results);
  }, [harmonyBase, harmonyType]);

  return (
    <Tabs defaultValue="image" className="w-full">
      <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
        <TabsTrigger value="image" className="text-xs">Image Extract</TabsTrigger>
        <TabsTrigger value="contrast" className="text-xs">Contrast</TabsTrigger>
        <TabsTrigger value="blindness" className="text-xs">Color Blind</TabsTrigger>
        <TabsTrigger value="gradient" className="text-xs">Gradient</TabsTrigger>
        <TabsTrigger value="harmony" className="text-xs">Harmony</TabsTrigger>
      </TabsList>

      <TabsContent value="image">
        <ImageColorExtractor onColorSelect={onColorSelect} />
      </TabsContent>

      <TabsContent value="contrast">
        <ContrastChecker palettes={palettes} paletteNames={paletteNames} />
      </TabsContent>

      <TabsContent value="blindness">
        <ColorBlindnessSimulator palettes={palettes} paletteNames={paletteNames} />
      </TabsContent>

      <TabsContent value="gradient">
        <GradientGenerator palettes={palettes} paletteNames={paletteNames} />
      </TabsContent>

      <TabsContent value="harmony">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Harmony Generator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate harmonious color combinations from a base color, then add them as new scales.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Input
                type="text"
                value={harmonyBase}
                onChange={(e) => setHarmonyBase(e.target.value)}
                className="pl-12 h-10"
                placeholder="#3b82f6"
              />
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md border"
                style={{
                  backgroundColor: chroma.valid(harmonyBase) ? harmonyBase : "transparent",
                }}
              />
            </div>
            <Select value={harmonyType} onValueChange={(v) => setHarmonyType(v as HarmonyType)}>
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {harmonySchemes.filter((s) => s.value !== "single").map((scheme) => (
                  <SelectItem key={scheme.value} value={scheme.value}>
                    {scheme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={generateHarmonyColors}>Generate</Button>
          </div>

          {harmonyResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Results</h4>
              <div className="flex gap-3 flex-wrap">
                {harmonyResults.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-20 h-20 rounded-lg border shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-mono">{color}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => onAddScale("custom" as ColorScaleRole, color)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Scale
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
