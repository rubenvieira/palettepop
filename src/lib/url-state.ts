import { HarmonyType } from "@/lib/colors";

export function encodePaletteToURL(baseColor: string, harmony: HarmonyType): string {
  const params = new URLSearchParams();
  params.set("color", baseColor.replace("#", ""));
  if (harmony !== "single") params.set("harmony", harmony);
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function decodePaletteFromURL(): { color?: string; harmony?: HarmonyType } | null {
  const params = new URLSearchParams(window.location.search);
  const color = params.get("color");
  const harmony = params.get("harmony") as HarmonyType | null;
  if (!color) return null;
  return {
    color: `#${color}`,
    harmony: harmony || "single",
  };
}
