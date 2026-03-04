import { useState, useRef, useCallback } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import chroma from "chroma-js";

interface ImageColorExtractorProps {
  onColorSelect: (hex: string) => void;
}

function medianCut(pixels: number[][], depth: number): number[][] {
  if (depth === 0 || pixels.length === 0) {
    const avg = [0, 0, 0];
    for (const p of pixels) {
      avg[0] += p[0];
      avg[1] += p[1];
      avg[2] += p[2];
    }
    const n = pixels.length || 1;
    return [[Math.round(avg[0] / n), Math.round(avg[1] / n), Math.round(avg[2] / n)]];
  }

  // Find channel with widest range
  let maxRange = 0;
  let maxCh = 0;
  for (let ch = 0; ch < 3; ch++) {
    const vals = pixels.map((p) => p[ch]);
    const range = Math.max(...vals) - Math.min(...vals);
    if (range > maxRange) {
      maxRange = range;
      maxCh = ch;
    }
  }

  pixels.sort((a, b) => a[maxCh] - b[maxCh]);
  const mid = Math.floor(pixels.length / 2);
  return [
    ...medianCut(pixels.slice(0, mid), depth - 1),
    ...medianCut(pixels.slice(mid), depth - 1),
  ];
}

function extractColors(imageData: ImageData, count: number): string[] {
  const pixels: number[][] = [];
  const step = Math.max(1, Math.floor(imageData.data.length / 4 / 10000));

  for (let i = 0; i < imageData.data.length; i += 4 * step) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    if (a < 128) continue;
    // Skip near-white and near-black
    if (r + g + b > 740 || r + g + b < 30) continue;
    pixels.push([r, g, b]);
  }

  if (pixels.length === 0) return [];

  // depth = log2(count) rounded up, gives us `count` buckets
  const depth = Math.ceil(Math.log2(count));
  const buckets = medianCut(pixels, depth);

  // Sort by vibrancy (chroma in LCH)
  const hexColors = buckets
    .map((rgb) => chroma(rgb[0], rgb[1], rgb[2]).hex())
    .sort((a, b) => chroma(b).get("lch.c") - chroma(a).get("lch.c"));

  return hexColors.slice(0, count);
}

export function ImageColorExtractor({ onColorSelect }: ImageColorExtractorProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback((file: File) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    setPreview(url);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Scale down for performance
      const maxDim = 200;
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const extracted = extractColors(imageData, 5);
      setColors(extracted);
    };
    img.src = url;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        processImage(file);
      }
    },
    [processImage]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processImage(file);
      e.target.value = "";
    },
    [processImage]
  );

  const reset = () => {
    setColors([]);
    setPreview(null);
  };

  return (
    <div className="mt-16 animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
        Extract from Image
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Upload an image to extract dominant colors
      </p>

      <div className="max-w-lg mx-auto">
        {!preview ? (
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">
              Drop an image here or click to browse
            </p>
            <p className="text-xs text-muted-foreground/60">
              PNG, JPG, WebP supported
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border">
              <img
                src={preview}
                alt="Uploaded"
                className="w-full max-h-48 object-cover"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={reset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {colors.length > 0 && (
              <div className="flex gap-2 justify-center">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="group relative h-14 w-14 rounded-lg border-2 border-transparent hover:border-primary transition-all hover:scale-110 shadow-sm"
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSelect(color)}
                    title={`Use ${color} as base color`}
                  >
                    <span
                      className="absolute inset-x-0 -bottom-5 text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground">
              <ImageIcon className="inline h-3 w-3 mr-1" />
              Click a swatch to use it as your base color
            </p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
