import React from 'react';
import { PaletteColor } from '@/lib/colors';
import { ColorSwatchGrid } from './ColorSwatchGrid';
import { PaletteTypography } from './PaletteTypography';
import { PaletteButtons } from './PaletteButtons';
import { PaletteCards } from './PaletteCards';
import { PaletteGradients } from './PaletteGradients';
import { PaletteCharts } from './PaletteCharts';

interface ColorPaletteShowcaseProps {
  palette: PaletteColor[];
}

export const ColorPaletteShowcase: React.FC<ColorPaletteShowcaseProps> = ({ palette }) => {
  if (!palette.length) return null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ColorSwatchGrid palette={palette} />
        <PaletteTypography palette={palette} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaletteButtons palette={palette} />
        <PaletteCards palette={palette} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaletteGradients palette={palette} />
        <PaletteCharts palette={palette} />
      </div>
    </div>
  );
};