import { useState, useEffect, useCallback } from "react";
import {
  generatePalette,
  generateHarmonies,
  PaletteColor,
  HarmonyType,
} from "@/lib/colors";
import chroma from "chroma-js";
import { decodePaletteFromURL } from "@/lib/url-state";

export function usePalette() {
  const urlState = decodePaletteFromURL();

  const [baseColor, setBaseColor] = useState(urlState?.color || "#19CE41");
  const [harmony, setHarmony] = useState<HarmonyType>(urlState?.harmony || "single");
  const [harmonyColors, setHarmonyColors] = useState<string[]>([]);
  const [palettes, setPalettes] = useState<PaletteColor[][]>([]);

  useEffect(() => {
    if (chroma.valid(baseColor)) {
      const newHarmonyColors = generateHarmonies(baseColor, harmony);
      setHarmonyColors(newHarmonyColors);
    }
  }, [baseColor, harmony]);

  useEffect(() => {
    const newPalettes = harmonyColors
      .filter((color) => chroma.valid(color))
      .map((color) => generatePalette(color));
    setPalettes(newPalettes);
  }, [harmonyColors]);

  const handleHarmonyColorChange = useCallback((newColor: string, index: number) => {
    setHarmonyColors(prev => {
      const updatedColors = [...prev];
      updatedColors[index] = newColor;
      return updatedColors;
    });
    if (chroma.valid(newColor)) {
      setBaseColor(newColor);
    }
  }, []);

  const handleRandomColor = useCallback(() => {
    const randomColor = chroma.random().hex();
    setBaseColor(randomColor);
  }, []);

  const paletteNames = ["primary", "secondary", "accent"];

  return {
    baseColor,
    setBaseColor,
    harmony,
    setHarmony,
    harmonyColors,
    setHarmonyColors,
    palettes,
    paletteNames,
    handleHarmonyColorChange,
    handleRandomColor,
  };
}
