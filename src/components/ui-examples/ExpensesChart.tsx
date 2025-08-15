import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 2000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 2000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 2000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 2000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 2000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 2000) + 1000 },
];

interface ExpensesChartProps {
  primary: string;
  secondary: string;
}

export function ExpensesChart({ primary }: ExpensesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
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
        <Bar dataKey="total" fill={primary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}