import { PaletteColor } from "@/lib/colors";
import chroma from "chroma-js";

export type ExportFormat = "tailwind" | "css" | "scss" | "json" | "swift" | "android";

export interface ExportFormatConfig {
  id: ExportFormat;
  name: string;
  generate: (palettes: PaletteColor[][], names: string[]) => string;
}

export const exportFormats: ExportFormatConfig[] = [
  {
    id: "tailwind",
    name: "Tailwind",
    generate: (palettes, names) => {
      const colorsBlock = palettes
        .map(
          (palette, index) =>
            `        ${names[index] || `color${index + 1}`}: {\n${palette
              .map((c) => `          '${c.name}': '${c.hex}'`)
              .join(",\n")}\n        }`
        )
        .join(",\n");
      return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${colorsBlock}\n      }\n    }\n  }\n};`;
    },
  },
  {
    id: "css",
    name: "CSS",
    generate: (palettes, names) => {
      const vars = palettes
        .map((palette, index) => {
          const name = names[index] || `color${index + 1}`;
          return palette.map((c) => `  --${name}-${c.name}: ${c.hex};`).join("\n");
        })
        .join("\n\n");
      return `:root {\n${vars}\n}`;
    },
  },
  {
    id: "scss",
    name: "SCSS",
    generate: (palettes, names) => {
      return palettes
        .map((palette, index) => {
          const name = names[index] || `color${index + 1}`;
          return palette.map((c) => `$${name}-${c.name}: ${c.hex};`).join("\n");
        })
        .join("\n\n");
    },
  },
  {
    id: "json",
    name: "JSON",
    generate: (palettes, names) => {
      const obj: Record<string, Record<string, string>> = {};
      palettes.forEach((palette, index) => {
        const name = names[index] || `color${index + 1}`;
        obj[name] = {};
        palette.forEach((c) => {
          obj[name][c.name] = c.hex;
        });
      });
      return JSON.stringify(obj, null, 2);
    },
  },
  {
    id: "swift",
    name: "Swift",
    generate: (palettes, names) => {
      const extensions = palettes
        .map((palette, index) => {
          const name = names[index] || `color${index + 1}`;
          const colors = palette
            .map((c) => {
              const [r, g, b] = chroma(c.hex).gl();
              return `    static let ${name}${c.name} = UIColor(red: ${r.toFixed(3)}, green: ${g.toFixed(3)}, blue: ${b.toFixed(3)}, alpha: 1.0)`;
            })
            .join("\n");
          return colors;
        })
        .join("\n\n");
      return `import UIKit\n\nextension UIColor {\n${extensions}\n}`;
    },
  },
  {
    id: "android",
    name: "Android",
    generate: (palettes, names) => {
      const colors = palettes
        .map((palette, index) => {
          const name = names[index] || `color${index + 1}`;
          return palette
            .map((c) => `    <color name="${name}_${c.name}">${c.hex.toUpperCase()}</color>`)
            .join("\n");
        })
        .join("\n\n");
      return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${colors}\n</resources>`;
    },
  },
];
