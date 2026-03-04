import { ColorCard } from "@/components/ColorCard";
import { PaletteColor } from "@/lib/colors";

interface PaletteProps {
  title: string;
  colors: PaletteColor[];
}

export const Palette = ({ title, colors }: PaletteProps) => {
  if (colors.length === 0) return null;

  const gradientCSS = `linear-gradient(90deg, ${colors.map((c) => c.hex).join(", ")})`;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold capitalize tracking-tight">{title}</h2>
        <div className="flex-1 h-[1px] bg-border" />
      </div>
      <div
        className="h-3 rounded-full mb-4"
        style={{ background: gradientCSS }}
      />
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 sm:gap-3">
        {colors.map((color, index) => (
          <div
            key={`${title}-${color.name}`}
            style={{ animationDelay: `${index * 30}ms` }}
            className="animate-scale-in"
          >
            <ColorCard name={color.name} hex={color.hex} />
          </div>
        ))}
      </div>
    </div>
  );
};
