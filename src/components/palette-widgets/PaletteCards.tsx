import React from 'react';
import { PaletteColor } from '@/lib/colors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PaletteCardsProps {
  palette: Palette[];
}

interface Palette {
  name: string | number;
  hex: string;
}

interface PaletteCardsProps {
  palette: Palette[];
}

export const PaletteCards: React.FC<PaletteCardsProps> = ({ palette }) => {
  const primary = palette.find(p => p.name === 500) || palette[5];
  const secondary = palette.find(p => p.name === 300) || palette[3];
  const accent = palette.find(p => p.name === 700) || palette[7];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Examples</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card style={{ borderColor: primary.hex }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg" style={{ color: primary.hex }}>
              Featured Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This card uses the primary color for its border and title.
            </p>
            <Badge className="mt-2" style={{ backgroundColor: accent.hex }}>
              New
            </Badge>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-3">
          <Card style={{ backgroundColor: secondary.hex + '20' }}>
            <CardContent className="p-4">
              <div className="text-sm font-medium">Metric</div>
              <div className="text-2xl font-bold" style={{ color: primary.hex }}>
                1,234
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: accent.hex + '10' }}>
            <CardContent className="p-4">
              <div className="text-sm font-medium">Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ backgroundColor: accent.hex, width: '75%' }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};