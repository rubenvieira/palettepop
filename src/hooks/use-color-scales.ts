import { useState, useEffect, useCallback, useRef } from "react";
import {
  generatePalette,
  generateScaleWithOverrides,
  PaletteColor,
  ColorScale,
  ColorScaleRole,
  colorScaleRoleDefaults,
} from "@/lib/colors";
import chroma from "chroma-js";
import { decodePaletteFromURL } from "@/lib/url-state";

interface ScaleSnapshot {
  scales: ColorScale[];
}

const MAX_HISTORY = 30;

function createScale(role: ColorScaleRole, baseColor?: string): ColorScale {
  const defaults = colorScaleRoleDefaults[role];
  const color = baseColor || defaults.defaultColor;
  return {
    id: crypto.randomUUID(),
    role,
    name: defaults.name,
    baseColor: color,
    shades: generatePalette(color),
    lockedShades: [],
    overrides: {},
  };
}

export function useColorScales() {
  const urlState = decodePaletteFromURL();

  const [scales, setScales] = useState<ColorScale[]>(() => {
    const initialColor = urlState?.color || "#3b82f6";
    return [createScale("primary", initialColor)];
  });

  const [selectedScaleId, setSelectedScaleId] = useState<string>(() => scales[0]?.id || "");

  // Undo/redo
  const [history, setHistory] = useState<ScaleSnapshot[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);
  const prevScalesRef = useRef<string>("");

  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }
    const key = JSON.stringify(scales.map((s) => ({ baseColor: s.baseColor, role: s.role, name: s.name })));
    if (key === prevScalesRef.current) return;
    prevScalesRef.current = key;

    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1);
      const snapshot: ScaleSnapshot = { scales: scales.map((s) => ({ ...s })) };
      const next = [...truncated, snapshot].slice(-MAX_HISTORY);
      return next;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [scales]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (!canUndo) return;
    isUndoRedoRef.current = true;
    const prev = history[historyIndex - 1];
    setHistoryIndex((i) => i - 1);
    setScales(prev.scales);
    prevScalesRef.current = JSON.stringify(prev.scales.map((s) => ({ baseColor: s.baseColor, role: s.role, name: s.name })));
  }, [canUndo, history, historyIndex]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    isUndoRedoRef.current = true;
    const next = history[historyIndex + 1];
    setHistoryIndex((i) => i + 1);
    setScales(next.scales);
    prevScalesRef.current = JSON.stringify(next.scales.map((s) => ({ baseColor: s.baseColor, role: s.role, name: s.name })));
  }, [canRedo, history, historyIndex]);

  const addScale = useCallback((role: ColorScaleRole, baseColor?: string) => {
    const newScale = createScale(role, baseColor);
    setScales((prev) => [...prev, newScale]);
    setSelectedScaleId(newScale.id);
  }, []);

  const removeScale = useCallback((id: string) => {
    setScales((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (filtered.length === 0) return prev; // Don't remove last scale
      return filtered;
    });
    setSelectedScaleId((prevId) => {
      if (prevId === id) {
        const remaining = scales.filter((s) => s.id !== id);
        return remaining[0]?.id || "";
      }
      return prevId;
    });
  }, [scales]);

  const updateScaleBaseColor = useCallback((id: string, hex: string) => {
    setScales((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const shades = chroma.valid(hex)
          ? generateScaleWithOverrides(hex, s.lockedShades, s.overrides)
          : s.shades;
        return { ...s, baseColor: hex, shades: shades.length > 0 ? shades : s.shades };
      })
    );
  }, []);

  const toggleShadeLock = useCallback((scaleId: string, shadeName: number) => {
    setScales((prev) =>
      prev.map((s) => {
        if (s.id !== scaleId) return s;
        const isLocked = s.lockedShades.includes(shadeName);
        const shade = s.shades.find((sh) => sh.name === shadeName);
        const newLocked = isLocked
          ? s.lockedShades.filter((n) => n !== shadeName)
          : [...s.lockedShades, shadeName];
        const newOverrides = { ...s.overrides };
        if (!isLocked && shade) {
          newOverrides[shadeName] = shade.hex;
        } else {
          delete newOverrides[shadeName];
        }
        return { ...s, lockedShades: newLocked, overrides: newOverrides };
      })
    );
  }, []);

  const overrideShade = useCallback((scaleId: string, shadeName: number, hex: string) => {
    setScales((prev) =>
      prev.map((s) => {
        if (s.id !== scaleId) return s;
        const newOverrides = { ...s.overrides, [shadeName]: hex };
        const newLocked = s.lockedShades.includes(shadeName)
          ? s.lockedShades
          : [...s.lockedShades, shadeName];
        const newShades = s.shades.map((sh) =>
          sh.name === shadeName ? { ...sh, hex } : sh
        );
        return { ...s, overrides: newOverrides, lockedShades: newLocked, shades: newShades };
      })
    );
  }, []);

  const renameScale = useCallback((id: string, name: string) => {
    setScales((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name } : s))
    );
  }, []);

  const handleRandomColor = useCallback(() => {
    const randomColor = chroma.random().hex();
    if (selectedScaleId) {
      updateScaleBaseColor(selectedScaleId, randomColor);
    }
  }, [selectedScaleId, updateScaleBaseColor]);

  // Derived compatibility values for export/saved palettes
  const palettes: PaletteColor[][] = scales.map((s) => s.shades);
  const paletteNames: string[] = scales.map((s) => s.name);

  const selectedScale = scales.find((s) => s.id === selectedScaleId) || scales[0] || null;

  return {
    scales,
    setScales,
    selectedScaleId,
    setSelectedScaleId,
    selectedScale,
    addScale,
    removeScale,
    updateScaleBaseColor,
    toggleShadeLock,
    overrideShade,
    renameScale,
    handleRandomColor,
    undo,
    redo,
    canUndo,
    canRedo,
    // Backward compat
    palettes,
    paletteNames,
  };
}
