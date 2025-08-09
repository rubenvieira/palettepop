import { PaletteColor } from "@/lib/colors";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Page A", uv: 4000 },
  { name: "Page B", uv: 3000 },
  { name: "Page C", uv: 2000 },
  { name: "Page D", uv: 2780 },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 3490 },
];

interface StatsChartProps {
  palette: PaletteColor[];
}

export const StatsChart = ({ palette }: StatsChartProps) => {
  if (palette.length < 11) return null;

  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart
        data={data}
        margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={`colorUv-${palette[5].hex}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={palette[4].hex} stopOpacity={0.8} />
            <stop offset="95%" stopColor={palette[4].hex} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="uv"
          stroke={palette[5].hex}
          fillOpacity={1}
          fill={`url(#colorUv-${palette[5].hex})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};