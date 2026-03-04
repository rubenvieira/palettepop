import { useState, useCallback, memo } from "react";
import { showSuccess } from "@/utils/toast";
import chroma from "chroma-js";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Check, Info } from "lucide-react";

interface ColorCardProps {
  name: string | number;
  hex: string;
  onInspect?: (hex: string) => void;
}

export const ColorCard = memo(({ name, hex, onInspect }: ColorCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (value: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      navigator.clipboard.writeText(value).then(
        () => {
          showSuccess(`Copied ${value}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        },
        () => {
          // Fallback for older browsers
          const el = document.createElement("textarea");
          el.value = value;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          showSuccess(`Copied ${value}`);
        }
      );
    },
    []
  );

  const textColor = chroma.contrast(hex, "white") > 4.5 ? "white" : "black";
  const rgb = chroma(hex).css();
  const hsl = chroma(hex).css("hsl");
  const luminance = chroma(hex).luminance();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="group relative h-28 flex flex-col justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{ backgroundColor: hex, color: textColor }}
          onClick={() => handleCopy(hex)}
          tabIndex={0}
          role="button"
          aria-label={`${name}: ${hex}. Click to copy.`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCopy(hex);
            }
          }}
        >
          <div className="font-bold text-sm">{name}</div>
          <div className="space-y-1">
            <div className="font-mono uppercase text-xs">
              {hex.substring(1)}
            </div>
            <div className="w-full h-1 rounded-full bg-black/10">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${luminance * 100}%`,
                  backgroundColor: textColor,
                  opacity: 0.3,
                }}
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-black/5">
            {copied ? (
              <Check className="h-5 w-5" style={{ color: textColor }} />
            ) : (
              <Copy className="h-4 w-4" style={{ color: textColor }} />
            )}
          </div>
          {onInspect && (
            <button
              className="absolute top-1.5 right-1.5 p-1 rounded opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity"
              style={{ color: textColor }}
              onClick={(e) => {
                e.stopPropagation();
                onInspect(hex);
              }}
              title="Inspect color"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="space-y-1 font-mono text-xs">
        <p
          className="cursor-pointer hover:underline"
          onClick={(e) => handleCopy(hex, e as unknown as React.MouseEvent)}
        >
          HEX: {hex}
        </p>
        <p
          className="cursor-pointer hover:underline"
          onClick={(e) => handleCopy(rgb, e as unknown as React.MouseEvent)}
        >
          RGB: {rgb}
        </p>
        <p
          className="cursor-pointer hover:underline"
          onClick={(e) => handleCopy(hsl, e as unknown as React.MouseEvent)}
        >
          HSL: {hsl}
        </p>
      </TooltipContent>
    </Tooltip>
  );
});
