import { useState, useEffect, useCallback, useRef } from "react";
import {
  generatePalette,
  generateHarmonies,
  PaletteColor,
  HarmonyType,
} from "@/lib/colors";
import chroma from "chroma-js";
import { decodePaletteFromURL } from "@/lib/url-state";

interface PaletteSnapshot {
  baseColor: string;
  harmony: HarmonyType;
  paletteNames: string[];
}

const MAX_HISTORY = 30;

export function usePalette() {
  const urlState = decodePaletteFromURL();

  const [baseColor, setBaseColor] = useState(urlState?.color || "#19CE41");
  const [harmony, setHarmony] = useState<HarmonyType>(urlState?.harmony || "single");
  const [harmonyColors, setHarmonyColors] = useState<string[]>([]);
  const [palettes, setPalettes] = useState<PaletteColor[][]>([]);
  const [paletteNames, setPaletteNames] = useState<string[]>(
    urlState?.names || ["primary", "secondary", "accent", "highlight"]
  );

  // Undo/redo history
  const [history, setHistory] = useState<PaletteSnapshot[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);

  // Push snapshot to history on meaningful changes
  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }
    if (!chroma.valid(baseColor)) return;

    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1);
      const snapshot: PaletteSnapshot = { baseColor, harmony, paletteNames };
      const last = truncated[truncated.length - 1];
      if (last && last.baseColor === baseColor && last.harmony === harmony) return prev;
      const next = [...truncated, snapshot].slice(-MAX_HISTORY);
      return next;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [baseColor, harmony]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (!canUndo) return;
    isUndoRedoRef.current = true;
    const prev = history[historyIndex - 1];
    setHistoryIndex((i) => i - 1);
    setBaseColor(prev.baseColor);
    setHarmony(prev.harmony);
    setPaletteNames(prev.paletteNames);
  }, [canUndo, history, historyIndex]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    isUndoRedoRef.current = true;
    const next = history[historyIndex + 1];
    setHistoryIndex((i) => i + 1);
    setBaseColor(next.baseColor);
    setHarmony(next.harmony);
    setPaletteNames(next.paletteNames);
  }, [canRedo, history, historyIndex]);

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
    setHarmonyColors((prev) => {
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

  const renamePalette = useCallback((index: number, newName: string) => {
    setPaletteNames((prev) => {
      const updated = [...prev];
      updated[index] = newName;
      return updated;
    });
  }, []);

  return {
    baseColor,
    setBaseColor,
    harmony,
    setHarmony,
    harmonyColors,
    setHarmonyColors,
    palettes,
    paletteNames,
    renamePalette,
    handleHarmonyColorChange,
    handleRandomColor,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
