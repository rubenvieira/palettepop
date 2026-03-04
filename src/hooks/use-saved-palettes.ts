import { useState, useEffect, useCallback } from "react";
import { HarmonyType } from "@/lib/colors";
import { showSuccess, showError } from "@/utils/toast";

const STORAGE_KEY = "palettepop-saved";
const MAX_SAVED = 50;

export interface SavedPalette {
  id: string;
  name: string;
  baseColor: string;
  harmony: HarmonyType;
  tags: string[];
  favorite: boolean;
  createdAt: number;
}

export function useSavedPalettes() {
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored) as SavedPalette[];
      // Migrate old format
      return parsed.map((p) => ({
        ...p,
        tags: p.tags || [],
        favorite: p.favorite ?? false,
      }));
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        showError("Storage full. Please delete some palettes.");
      }
    }
  }, [savedPalettes]);

  const savePalette = useCallback(
    (name: string, baseColor: string, harmony: HarmonyType, tags: string[] = []) => {
      if (savedPalettes.length >= MAX_SAVED) {
        showError(`Maximum ${MAX_SAVED} saved palettes. Delete one first.`);
        return;
      }
      const newPalette: SavedPalette = {
        id: crypto.randomUUID(),
        name,
        baseColor,
        harmony,
        tags,
        favorite: false,
        createdAt: Date.now(),
      };
      setSavedPalettes((prev) => [newPalette, ...prev]);
      showSuccess(`"${name}" saved!`);
    },
    [savedPalettes.length]
  );

  const deletePalette = useCallback((id: string) => {
    setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setSavedPalettes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  }, []);

  const exportAll = useCallback(() => {
    const blob = new Blob([JSON.stringify(savedPalettes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palettepop-saved-palettes.json";
    a.click();
    URL.revokeObjectURL(url);
    showSuccess("Palettes exported!");
  }, [savedPalettes]);

  const importPalettes = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as SavedPalette[];
        if (!Array.isArray(data)) throw new Error("Invalid format");
        const migrated = data.map((p) => ({
          ...p,
          id: crypto.randomUUID(),
          tags: p.tags || [],
          favorite: p.favorite ?? false,
        }));
        setSavedPalettes((prev) => [...migrated, ...prev].slice(0, MAX_SAVED));
        showSuccess(`Imported ${migrated.length} palettes!`);
      } catch {
        showError("Invalid palette file.");
      }
    };
    reader.readAsText(file);
  }, []);

  const filteredPalettes = savedPalettes.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.harmony.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return {
    savedPalettes: filteredPalettes,
    allPalettes: savedPalettes,
    savePalette,
    deletePalette,
    toggleFavorite,
    exportAll,
    importPalettes,
    searchQuery,
    setSearchQuery,
  };
}
