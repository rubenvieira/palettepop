import { ColorScale } from "@/lib/colors";
import { UIExamples } from "@/components/ui-examples/UIExamples";
import { SocialMediaPost } from "@/components/brand-mockups/SocialMediaPost";
import { WebsiteHero } from "@/components/brand-mockups/WebsiteHero";
import { MobileAppScreen } from "@/components/brand-mockups/MobileAppScreen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaletteColor } from "@/lib/colors";

interface ComponentsPreviewProps {
  scales: ColorScale[];
  palettes: PaletteColor[][];
}

function getShade(shades: PaletteColor[], shade: number, fallback: string): string {
  return shades.find((c) => c.name === shade)?.hex || fallback;
}

export function ComponentsPreview({ scales, palettes }: ComponentsPreviewProps) {
  if (scales.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Add some color scales to preview components.
      </div>
    );
  }

  const primary = scales[0]?.shades || [];
  const secondary = scales[1]?.shades || primary;
  const accent = scales[2]?.shades || secondary;

  const shades = {
    p50: getShade(primary, 50, "#f8f8f8"),
    p200: getShade(primary, 200, "#e0e0e0"),
    p500: getShade(primary, 500, "#000000"),
    p700: getShade(primary, 700, "#333333"),
    p900: getShade(primary, 900, "#111111"),
    s50: getShade(secondary, 50, "#f8f8f8"),
    s200: getShade(secondary, 200, "#e0e0e0"),
    s500: getShade(secondary, 500, "#000000"),
    a50: getShade(accent, 50, "#f8f8f8"),
    a200: getShade(accent, 200, "#e0e0e0"),
    a500: getShade(accent, 500, "#000000"),
  };

  // Find semantic scales for enhanced preview
  const successScale = scales.find((s) => s.role === "success");
  const warningScale = scales.find((s) => s.role === "warning");
  const errorScale = scales.find((s) => s.role === "error");

  const success500 = successScale ? getShade(successScale.shades, 500, "#22c55e") : "#22c55e";
  const warning500 = warningScale ? getShade(warningScale.shades, 500, "#eab308") : "#eab308";
  const error500 = errorScale ? getShade(errorScale.shades, 500, "#ef4444") : "#ef4444";

  return (
    <div>
      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="components">UI Components</TabsTrigger>
          <TabsTrigger value="brand">Brand Mockups</TabsTrigger>
        </TabsList>

        <TabsContent value="components">
          {/* Semantic alerts preview */}
          <div className="grid gap-4 mb-8">
            <div className="rounded-lg border p-4 flex items-center gap-3" style={{ backgroundColor: success500 + "15", borderColor: success500 + "40" }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: success500 }} />
              <span className="text-sm font-medium" style={{ color: success500 }}>
                Success: Your changes have been saved successfully.
              </span>
            </div>
            <div className="rounded-lg border p-4 flex items-center gap-3" style={{ backgroundColor: warning500 + "15", borderColor: warning500 + "40" }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: warning500 }} />
              <span className="text-sm font-medium" style={{ color: warning500 }}>
                Warning: Your free trial ends in 3 days.
              </span>
            </div>
            <div className="rounded-lg border p-4 flex items-center gap-3" style={{ backgroundColor: error500 + "15", borderColor: error500 + "40" }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: error500 }} />
              <span className="text-sm font-medium" style={{ color: error500 }}>
                Error: Unable to connect to the server.
              </span>
            </div>
          </div>

          <UIExamples palettes={palettes} />
        </TabsContent>

        <TabsContent value="brand">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <SocialMediaPost
              primaryColor={shades.p500}
              secondaryColor={shades.s500}
              accentColor={shades.a500}
              bgColor={shades.p50}
              subtleColor={shades.a200}
            />
            <WebsiteHero
              primaryColor={shades.p500}
              secondaryColor={shades.s500}
              accentColor={shades.a500}
              bgColor={shades.p50}
              textColor={shades.p900}
              subtleColor={shades.p200}
            />
            <MobileAppScreen
              primaryColor={shades.p500}
              secondaryColor={shades.s500}
              accentColor={shades.a500}
              bgColor={shades.p50}
              textColor={shades.p900}
              subtleColor={shades.s200}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
