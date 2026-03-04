import { useState, useEffect } from "react";
import { HarmonyType } from "@/lib/colors";
import { showSuccess, showError } from "@/utils/toast";

const STORAGE_KEY = "palettepop-saved";
const MAX_SAVED = 20;

export interface SavedPalette {
  id: string;
  name: string;
  baseColor: string;
  harmony: HarmonyType;
  createdAt: number;
}

export function useSavedPalettes() {
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const savePalette = (name: string, baseColor: string, harmony: HarmonyType) => {
    if (savedPalettes.length >= MAX_SAVED) {
      showError("Maximum 20 saved palettes. Delete one first.");
      return;
    }
    const newPalette: SavedPalette = {
      id: crypto.randomUUID(),
      name,
      baseColor,
      harmony,
      createdAt: Date.now(),
    };
    setSavedPalettes((prev) => [newPalette, ...prev]);
    showSuccess(`"${name}" saved!`);
  };

  const deletePalette = (id: string) => {
    setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
  };

  return { savedPalettes, savePalette, deletePalette };
}
