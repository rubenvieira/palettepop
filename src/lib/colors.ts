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