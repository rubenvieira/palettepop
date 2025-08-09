import React from 'react';
import { PaletteColor } from '@/lib/colors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PaletteChartsProps {
  palette: PaletteColor[];
}

export const PaletteCharts: React.FC<PaletteChartsProps> = ({ palette }) => {
  const chartColors = palette.filter((_, index) => index % 2 === 0).slice(0, 5);
  
  const barData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 800 },
    { name: 'Fri', value: 500 },
  ];

  const pieData = [
    { name: 'Segment A', value: 400 },
    { name: 'Segment B', value: 300 },
    { name: 'Segment C', value: 300 },
    { name: 'Segment D', value: 200 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Examples</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-sm font-medium mb-2">Bar Chart</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={chartColors[0]?.hex || '#8884d8'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2">Pie Chart</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]?.hex || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};