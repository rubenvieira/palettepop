import React from 'react';
import { PaletteColor } from '@/lib/colors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaletteTypographyProps {
  palette: PaletteColor[];
}

export const PaletteTypography: React.FC<PaletteTypographyProps> = ({ palette }) => {
  const primary = palette.find(p => p.name === 500) || palette[5];
  const secondary = palette.find(p => p.name === 400) || palette[4];
  const muted = palette.find(p => p.name === 300) || palette[3];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Typography Showcase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: primary.hex }}>
            Primary Heading
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Using {primary.name}</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold" style={{ color: secondary.hex }}>
            Secondary Heading
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Using {secondary.name}</p>
        </div>
        
        <div>
          <p className="text-base" style={{ color: muted.hex }}>
            Body text using {muted.name} for subtle content
          </p>
        </div>
        
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: primary.hex, color: 'white' }}>
            Tag
          </span>
          <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: secondary.hex, color: 'white' }}>
            Label
          </span>
        </div>
      </CardContent>
    </Card>
  );
};