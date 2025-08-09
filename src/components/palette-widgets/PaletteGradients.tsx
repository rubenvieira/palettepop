import React from 'react';
import { PaletteColor } from '@/lib/colors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaletteGradientsProps {
  palette: PaletteColor[];
}

export const PaletteGradients: React.FC<PaletteGradientsProps> = ({ palette }) => {
  const primary = palette.find(p => p.name === 500) || palette[5];
  const secondary = palette.find(p => p.name === 400) || palette[4];
  const accent = palette.find(p => p.name === 600) || palette[6];

  const gradients = [
    {
      name: 'Primary Gradient',
      gradient: `linear-gradient(135deg, ${primary.hex}, ${secondary.hex})`
    },
    {
      name: 'Accent Gradient',
      gradient: `linear-gradient(135deg, ${accent.hex}, ${primary.hex})`
    },
    {
      name: 'Light Gradient',
      gradient: `linear-gradient(135deg, ${palette.find(p => p.name === 200)?.hex}, ${palette.find(p => p.name === 100)?.hex})`
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Examples</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {gradients.map((gradient, index) => (
          <div key={index} className="space-y-2">
            <div className="text-sm font-medium">{gradient.name}</div>
            <div 
              className="h-20 rounded-lg"
              style={{ background: gradient.gradient }}
            />
          </div>
        ))}
        
        <div className="grid grid-cols-2 gap-3">
          <div 
            className="h-32 rounded-lg"
            style={{ background: `linear-gradient(45deg, ${primary.hex}, ${accent.hex})` }}
          />
          <div 
            className="h-32 rounded-lg"
            style={{ background: `radial-gradient(circle, ${secondary.hex}, ${primary.hex})` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};