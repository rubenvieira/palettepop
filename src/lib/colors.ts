import chroma from "chroma-js";

export interface PaletteColor {
  name: number;
  hex: string;
}

export const generatePalette = (baseColor: string): PaletteColor[] => {
  try {
    if (!chroma.valid(baseColor)) return [];

    // We want 11 shades: 50, 100, ..., 500 (base), ..., 900, 950
    // 5 lighter shades, base, 5 darker shades.
    const lightScale = chroma.scale(["white", baseColor]).mode("lch").colors(7);
    const darkScale = chroma.scale([baseColor, "black"]).mode("lch").colors(7);

    const paletteColors = [
      lightScale[1],
      lightScale[2],
      lightScale[3],
      lightScale[4],
      lightScale[5],
      baseColor,
      darkScale[1],
      darkScale[2],
      darkScale[3],
      darkScale[4],
      darkScale[5],
    ].map((c) => chroma(c).hex());

    const shadeKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    return shadeKeys.map((key, index) => ({
      name: key,
      hex: paletteColors[index],
    }));
  } catch (e) {
    console.error("Invalid color", e);
    return [];
  }
};

export type HarmonyType = "analogous" | "triadic" | "complementary" | "split-complementary";

export const harmonySchemes: { name: string; value: HarmonyType }[] = [
  { name: "Analogous", value: "analogous" },
  { name: "Triadic", value: "triadic" },
  { name: "Complementary", value: "complementary" },
  { name: "Split Complementary", value: "split-complementary" },
];

export const generateHarmonies = (baseColor: string, harmony: HarmonyType): string[] => {
  try {
    if (!chroma.valid(baseColor)) return [];
    const base = chroma(baseColor);

    switch (harmony) {
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