import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PaletteColor } from "@/lib/colors";

const data = [
  { name: "Jan", total: 3200 },
  { name: "Feb", total: 2800 },
  { name: "Mar", total: 1900 },
  { name: "Apr", total: 4200 },
  { name: "May", total: 4800 },
  { name: "Jun", total: 3100 },
];

interface ExpensesChartProps {
  palette: PaletteColor[];
}

export function ExpensesChart({ palette }: ExpensesChartProps) {
  const primaryColor = palette[5].hex;
  const mutedColor = palette[3].hex;

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mutedColor} />
          <XAxis
            dataKey="name"
            stroke={mutedColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={mutedColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            cursor={{ fill: palette[1].hex }}
            contentStyle={{
              backgroundColor: palette[0].hex,
              borderColor: palette[2].hex,
              color: palette[9].hex,
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="total" fill={primaryColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}