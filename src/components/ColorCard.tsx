import { showSuccess } from "@/utils/toast";
import chroma from "chroma-js";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorCardProps {
  name: string | number;
  hex: string;
}

export const ColorCard = ({ name, hex }: ColorCardProps) => {
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    showSuccess(`Copied ${value} to clipboard!`);
  };

  const textColor = chroma.contrast(hex, 'white') > 4.5 ? 'white' : 'black';
  const contrastWhite = chroma.contrast(hex, 'white').toFixed(2);
  const contrastBlack = chroma.contrast(hex, 'black').toFixed(2);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="h-48 flex flex-col justify-between p-4 rounded-lg cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundColor: hex, color: textColor }}
          onClick={() => handleCopy(hex)}
        >
          <div className="font-bold text-lg">{name}</div>
          <div className="font-mono uppercase text-sm">{hex}</div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-semibold">Accessibility (WCAG)</p>
        <p>Contrast vs White: {contrastWhite}</p>
        <p>Contrast vs Black: {contrastBlack}</p>
      </TooltipContent>
    </Tooltip>
  );
};