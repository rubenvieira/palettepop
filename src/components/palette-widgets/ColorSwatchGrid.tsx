import React from 'react';
import { PaletteColor } from '@/lib/colors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess } from '@/utils/toast';

interface ColorSwatchGridProps {
  palette: PaletteColor[];
}

export const ColorSwatchGrid: React.FC<ColorSwatchGridProps> = ({ palette }) => {
  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    showSuccess(`Copied ${hex} to clipboard!`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Swatches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {palette.map((color) => (
            <div
              key={color.name}
              className="group cursor-pointer"
              onClick={() => handleCopy(color.hex)}
            >
              <div
                className="h-16 rounded-md border transition-transform group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              <div className="mt-1 text-xs">
                <div className="font-medium">{color.name}</div>
                <div className="text-muted-foreground">{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};