import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaletteColor } from "@/lib/colors"
import { ExpensesChart } from "./ExpensesChart"
import { StatsChart } from "./StatsChart"
import { ButtonsExample } from "./ButtonsExample"
import { AlertsExample } from "./AlertsExample"
import { DataTableExample } from "./DataTableExample"

interface UIExamplesProps {
  palette: PaletteColor[]
}

export const UIExamples = ({ palette }: UIExamplesProps) => {
  const primaryColor = palette.find((c) => c.name === 500)?.hex || "#000000"
  const lightPrimaryColor =
    palette.find((c) => c.name === 100)?.hex || "#000000"

  return (
    <div className="mt-12 grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar />
        </CardContent>
      </Card>
      <StatsChart
        primaryColor={primaryColor}
        lightPrimaryColor={lightPrimaryColor}
      />
      <ExpensesChart
        primaryColor={primaryColor}
        lightPrimaryColor={lightPrimaryColor}
      />
      <ButtonsExample />
      <AlertsExample />
      <DataTableExample />
    </div>
  )
}