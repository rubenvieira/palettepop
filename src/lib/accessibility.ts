import chroma from "chroma-js";
import { PaletteColor } from "@/lib/colors";

export interface ContrastResult {
  foreground: string;
  fgLabel: string;
  background: string;
  bgLabel: string;
  ratio: number;
  aaNormalText: boolean;
  aaLargeText: boolean;
  aaaNormalText: boolean;
  aaaLargeText: boolean;
}

export function checkContrast(
  fg: string,
  fgLabel: string,
  bg: string,
  bgLabel: string
): ContrastResult {
  const ratio = Math.round(chroma.contrast(fg, bg) * 100) / 100;
  return {
    foreground: fg,
    fgLabel,
    background: bg,
    bgLabel,
    ratio,
    aaNormalText: ratio >= 4.5,
    aaLargeText: ratio >= 3,
    aaaNormalText: ratio >= 7,
    aaaLargeText: ratio >= 4.5,
  };
}

export function generateContrastPairs(
  palette: PaletteColor[],
  paletteName: string
): ContrastResult[] {
  const results: ContrastResult[] = [];
  const lightShades = palette.filter((c) => [50, 100, 200].includes(c.name));
  const darkShades = palette.filter((c) => [700, 800, 900, 950].includes(c.name));

  for (const bg of lightShades) {
    for (const fg of darkShades) {
      results.push(
        checkContrast(fg.hex, `${paletteName}-${fg.name}`, bg.hex, `${paletteName}-${bg.name}`)
      );
    }
  }

  const mid = palette.find((c) => c.name === 500);
  if (mid) {
    results.push(checkContrast("#FFFFFF", "white", mid.hex, `${paletteName}-500`));
    results.push(checkContrast("#000000", "black", mid.hex, `${paletteName}-500`));
  }

  return results;
}
