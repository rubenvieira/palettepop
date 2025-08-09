import { showSuccess } from "@/utils/toast";
import chroma from "chroma-js";

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

  return (
    <div
      className="h-28 flex flex-col justify-between p-3 rounded-lg cursor-pointer transition-transform hover:scale-105"
      style={{ backgroundColor: hex, color: textColor }}
      onClick={() => handleCopy(hex)}
    >
      <div className="font-bold">{name}</div>
      <div className="font-mono uppercase text-sm">{hex.substring(1)}</div>
    </div>
  );
};