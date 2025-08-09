import { PaletteColor } from "@/lib/colors";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", total: 3200 },
  { name: "Feb", total: 2800 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 4200 },
  { name: "May", total: 5000 },
  { name: "Jun", total: 3100 },
];

interface ExpensesChartProps {
  palette: PaletteColor[];
}

export const ExpensesChart = ({ palette }: ExpensesChartProps) => {
  if (palette.length < 11) return null;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill={palette[5].hex} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};