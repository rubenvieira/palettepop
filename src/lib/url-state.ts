import { HarmonyType } from "@/lib/colors";
import chroma from "chroma-js";

export function encodePaletteToURL(
  baseColor: string,
  harmony: HarmonyType,
  names?: string[]
): string {
  const params = new URLSearchParams();
  params.set("color", baseColor.replace("#", ""));
  if (harmony !== "single") params.set("harmony", harmony);
  const defaults = ["primary", "secondary", "accent"];
  if (names && names.some((n, i) => n !== defaults[i])) {
    params.set("names", names.join(","));
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function decodePaletteFromURL(): {
  color?: string;
  harmony?: HarmonyType;
  names?: string[];
} | null {
  const params = new URLSearchParams(window.location.search);
  const color = params.get("color");
  const harmony = params.get("harmony") as HarmonyType | null;
  const namesStr = params.get("names");
  if (!color) return null;
  // Validate hex
  const hex = `#${color}`;
  if (!chroma.valid(hex)) return null;
  return {
    color: hex,
    harmony: harmony || "single",
    names: namesStr ? namesStr.split(",") : undefined,
  };
}
