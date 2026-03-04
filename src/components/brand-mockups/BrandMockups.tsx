import { PaletteColor } from "@/lib/colors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UIExamples } from "@/components/ui-examples/UIExamples";
import { SocialMediaPost } from "./SocialMediaPost";
import { WebsiteHero } from "./WebsiteHero";
import { MobileAppScreen } from "./MobileAppScreen";

interface BrandMockupsProps {
  palettes: PaletteColor[][];
}

function getShade(palette: PaletteColor[], shade: number, fallback: string): string {
  return palette.find((c) => c.name === shade)?.hex || fallback;
}

export function BrandMockups({ palettes }: BrandMockupsProps) {
  if (palettes.length === 0) return null;

  const primary = palettes[0] || [];
  const secondary = palettes[1] || primary;
  const accent = palettes[2] || secondary;

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

  return (
    <div className="mt-16 animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
        Preview
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        See your palette in real-world contexts
      </p>

      <Tabs defaultValue="brand" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="brand">Brand Mockups</TabsTrigger>
          <TabsTrigger value="components">UI Components</TabsTrigger>
        </TabsList>

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

        <TabsContent value="components">
          <UIExamples palettes={palettes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
