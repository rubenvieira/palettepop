import { ColorCard } from "@/components/ColorCard";
import { PaletteColor } from "@/lib/colors";

interface PaletteProps {
  title: string;
  colors: PaletteColor[];
}

export const Palette = ({ title, colors }: PaletteProps) => {
  if (colors.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 capitalize">{title}</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 sm:gap-4">
        {colors.map((color) => (
          <ColorCard key={`${title}-${color.name}`} name={color.name} hex={color.hex} />
        ))}
      </div>
    </div>
  );
};