import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", total: 1800 },
  { name: "Feb", total: 2200 },
  { name: "Mar", total: 1600 },
  { name: "Apr", total: 2800 },
  { name: "May", total: 2100 },
  { name: "Jun", total: 2500 },
];

interface ExpensesChartProps {
  primary: string;
  secondary: string;
}

export function ExpensesChart({ primary, secondary }: ExpensesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill={primary} radius={[4, 4, 0, 0]} stroke={secondary} strokeWidth={0} />
      </BarChart>
    </ResponsiveContainer>
  );
}
