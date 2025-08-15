import chroma from "chroma-js";

export interface PaletteColor {
  name: number;
  hex: string;
}

export const generatePalette = (baseColor: string): PaletteColor[] => {
  try {
    if (!chroma.valid(baseColor)) return [];

    const hue = chroma(baseColor).get("lch.h") || 0; // Default hue to 0 for grays
    const chromaValue = chroma(baseColor).get("lch.c");

    // A pre-defined map of lightness values for each shade.
    // These are chosen to create a perceptually balanced palette.
    const lightnessMap: { [key: number]: number } = {
      50: 97,
      100: 93,
      200: 85,
      300: 75,
      400: 65,
      500: 55,
      600: 45,
      700: 35,
      800: 25,
      900: 15,
      950: 8,
    };
    const shadeKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    // Generate an "ideal" palette using the hue and chroma of the base color.
    const idealPalette = shadeKeys.map((shade) => ({
      name: shade,
      hex: chroma.lch(lightnessMap[shade], chromaValue, hue).hex(),
    }));

    // Find which shade in our ideal palette is closest to the user's input color.
    let closestShadeName: number = 500;
    let minDistance = Infinity;

    idealPalette.forEach((color) => {
      const distance = chroma.deltaE(baseColor, color.hex);
      if (distance < minDistance) {
        minDistance = distance;
        closestShadeName = color.name;
      }
    });

    // Create the final palette by replacing the closest shade with the user's exact color.
    const finalPalette = idealPalette.map((color) => {
      if (color.name === closestShadeName) {
        return { ...color, hex: baseColor };
      }
      return color;
    });

    return finalPalette;
  } catch (e) {
    console.error("Invalid color", e);
    return [];
  }
};

export type HarmonyType = "single" | "analogous" | "triadic" | "complementary" | "split-complementary";

export const harmonySchemes: { name: string; value: HarmonyType }[] = [
  { name: "Single Color", value: "single" },
  { name: "Analogous", value: "analogous" },
  { name: "Triadic", value: "triadic" },
  { name: "Complementary", value: "complementary" },
  { name: "Split Complementary", value: "split-complementary" },
];

export const generateHarmonies = (baseColor: string, harmony: HarmonyType): string[] => {
  try {
    if (!chroma.valid(baseColor)) return [];
    const base = chroma(baseColor);
    const isAchromatic = base.get("lch.c") < 5;

    if (isAchromatic && harmony !== "single") {
      const generateVibrantColor = () => chroma.hsl(Math.random() * 360, 0.8, 0.6);

      switch (harmony) {
        case "complementary":
          return [base.hex(), generateVibrantColor().hex()];
        case "analogous": {
          const randColor = generateVibrantColor();
          return [base.hex(), randColor.hex(), randColor.set("hsl.h", "+30").hex()];
        }
        case "triadic": {
          const randColor = generateVibrantColor();
          return [base.hex(), randColor.hex(), randColor.set("hsl.h", "+120").hex()];
        }
        case "split-complementary": {
          const randColor = generateVibrantColor();
          return [
            base.hex(),
            randColor.set("hsl.h", "+150").hex(),
            randColor.set("hsl.h", "-150").hex(),
          ];
        }
        default:
          return [base.hex()];
      }
    }

    switch (harmony) {
      case "single":
        return [base.hex()];
      case "analogous":
        return [
          base.hex(),
          base.set("hsl.h", "+30").hex(),
          base.set("hsl.h", "-30").hex(),
        ];
      case "triadic":
        return [
          base.hex(),
          base.set("hsl.h", "+120").hex(),
          base.set("hsl.h", "-120").hex(),
        ];
      case "complementary":
        return [base.hex(), base.set("hsl.h", "+180").hex()];
      case "split-complementary":
        return [
          base.hex(),
          base.set("hsl.h", "+150").hex(),
          base.set("hsl.h", "-150").hex(),
        ];
      default:
        return [base.hex()];
    }
  } catch (e) {
    console.error("Invalid color", e);
    return [];
  }
};