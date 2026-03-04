import { useId } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

interface StatsChartProps {
  primary: string;
  accent: string;
}

export function StatsChart({ primary, accent }: StatsChartProps) {
  const id = useId();
  const desktopGradientId = `${id}-desktop`;
  const mobileGradientId = `${id}-mobile`;

  return (
    <Card>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ left: -20, top: 10 }}>
            <defs>
              <linearGradient id={desktopGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={mobileGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accent} stopOpacity={0.8} />
                <stop offset="95%" stopColor={accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <Area type="monotone" dataKey="desktop" stroke={primary} fillOpacity={1} fill={`url(#${desktopGradientId})`} />
            <Area type="monotone" dataKey="mobile" stroke={accent} fillOpacity={1} fill={`url(#${mobileGradientId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
