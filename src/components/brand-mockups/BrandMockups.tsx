import { PaletteColor } from "@/lib/colors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UIExamples } from "@/components/ui-examples/UIExamples";
import { SocialMediaPost } from "./SocialMediaPost";
import { WebsiteHero } from "./WebsiteHero";
import { MobileAppScreen } from "./MobileAppScreen";

interface BrandMockupsProps {
  palettes: PaletteColor[][];
}

export function BrandMockups({ palettes }: BrandMockupsProps) {
  if (palettes.length === 0) return null;

  const primary = palettes[0] || [];
  const secondary = palettes[1] || primary;
  const accent = palettes[2] || secondary;

  const p500 = primary.find((c) => c.name === 500)?.hex || "#000000";
  const s500 = secondary.find((c) => c.name === 500)?.hex || "#000000";
  const a500 = accent.find((c) => c.name === 500)?.hex || "#000000";

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
              primaryColor={p500}
              secondaryColor={s500}
              accentColor={a500}
            />
            <WebsiteHero
              primaryColor={p500}
              secondaryColor={s500}
              accentColor={a500}
            />
            <MobileAppScreen
              primaryColor={p500}
              secondaryColor={s500}
              accentColor={a500}
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
