import React from 'react';
import { PaletteColor } from '@/lib/colors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaletteButtonsProps {
  palette: PaletteColor[];
}

export const PaletteButtons: React.FC<PaletteButtonsProps> = ({ palette }) => {
  const primary = palette.find(p => p.name === 500) || palette[5];
  const secondary = palette.find(p => p.name === 600) || palette[6];
  const accent = palette.find(p => p.name === 400) || palette[4];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Button Variants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button style={{ backgroundColor: primary.hex }}>Primary</Button>
          <Button style={{ backgroundColor: secondary.hex }}>Secondary</Button>
          <Button style={{ backgroundColor: accent.hex }}>Accent</Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" style={{ borderColor: primary.hex, color: primary.hex }}>
            Outline
          </Button>
          <Button variant="ghost" style={{ color: primary.hex }}>
            Ghost
          </Button>
          <Button variant="secondary" style={{ backgroundColor: palette.find(p => p.name === 200)?.hex }}>
            Light
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button size="sm" style={{ backgroundColor: primary.hex }}>Small</Button>
          <Button size="default" style={{ backgroundColor: primary.hex }}>Default</Button>
          <Button size="lg" style={{ backgroundColor: primary.hex }}>Large</Button>
        </div>
      </CardContent>
    </Card>
  );
};