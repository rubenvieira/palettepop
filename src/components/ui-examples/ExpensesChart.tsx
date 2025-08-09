import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-07-15", running: 45, "new-users": 30 },
  { date: "2024-07-16", running: 52, "new-users": 40 },
  { date: "2024-07-17", running: 65, "new-users": 50 },
  { date: "2024-07-18", running: 73, "new-users": 60 },
  { date: "2024-07-19", running: 81, "new-users": 70 },
  { date: "2024-07-20", running: 75, "new-users": 65 },
  { date: "2024-07-21", running: 90, "new-users": 80 },
]

interface ExpensesChartProps {
  primaryColor: string
  lightPrimaryColor: string
}

export const ExpensesChart = ({
  primaryColor,
  lightPrimaryColor,
}: ExpensesChartProps) => {
  const chartConfig = {
    "new-users": {
      label: "New Users",
      color: primaryColor,
    },
    running: {
      label: "Running",
      color: lightPrimaryColor,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>New users and running costs</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="new-users"
              fill={chartConfig["new-users"].color}
              radius={4}
            />
            <Bar
              dataKey="running"
              fill={chartConfig["running"].color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}