import chroma from "chroma-js";
import { PaletteColor } from "@/lib/colors";

export type CVDType = "protanopia" | "deuteranopia" | "tritanopia";

export const cvdTypes: { type: CVDType; name: string; description: string }[] = [
  { type: "protanopia", name: "Protanopia", description: "Red-blind (~1% of males)" },
  { type: "deuteranopia", name: "Deuteranopia", description: "Green-blind (~1% of males)" },
  { type: "tritanopia", name: "Tritanopia", description: "Blue-blind (~0.003%)" },
];

const matrices: Record<CVDType, number[][]> = {
  protanopia: [
    [0.56667, 0.43333, 0.0],
    [0.55833, 0.44167, 0.0],
    [0.0, 0.24167, 0.75833],
  ],
  deuteranopia: [
    [0.625, 0.375, 0.0],
    [0.7, 0.3, 0.0],
    [0.0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0.0],
    [0.0, 0.43333, 0.56667],
    [0.0, 0.475, 0.525],
  ],
};

export function simulateCVD(hex: string, type: CVDType): string {
  const [r, g, b] = chroma(hex).gl();
  const m = matrices[type];
  const simR = Math.min(1, Math.max(0, m[0][0] * r + m[0][1] * g + m[0][2] * b));
  const simG = Math.min(1, Math.max(0, m[1][0] * r + m[1][1] * g + m[1][2] * b));
  const simB = Math.min(1, Math.max(0, m[2][0] * r + m[2][1] * g + m[2][2] * b));
  return chroma.gl(simR, simG, simB).hex();
}

export function simulatePalette(palette: PaletteColor[], type: CVDType): PaletteColor[] {
  return palette.map((c) => ({ ...c, hex: simulateCVD(c.hex, type) }));
}
