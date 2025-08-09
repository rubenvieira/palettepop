import { PaletteColor } from "@/lib/colors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesChart } from "./ExpensesChart";
import { StatsChart } from "./StatsChart";
import { ChevronRight, Home, ShoppingCart, Globe } from "lucide-react";

interface UIExamplesProps {
  palette: PaletteColor[];
}

export const UIExamples = ({ palette }: UIExamplesProps) => {
  if (palette.length < 11) {
    return null;
  }

  const p = palette; // shorthand

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold tracking-tight mb-8">UI Examples</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <Card
            className="overflow-hidden"
            style={{ backgroundColor: p[2].hex }}
          >
            <CardContent className="p-6">
              <div
                className="h-64 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1613243555978-51364c4797a2?q=80&w=800&auto=format&fit=crop')`,
                }}
              ></div>
              <h3
                className="mt-6 text-4xl font-bold"
                style={{ color: p[9].hex }}
              >
                Track your expenses
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="p-3 rounded-full" style={{backgroundColor: p[1].hex}}>
                    <ShoppingCart style={{color: p[6].hex}}/>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Groceries</p>
                    <p className="text-sm text-muted-foreground">9 transactions</p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground" />
                </li>
                <li className="flex items-center">
                  <div className="p-3 rounded-full" style={{backgroundColor: p[1].hex}}>
                    <Home style={{color: p[6].hex}}/>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Household</p>
                    <p className="text-sm text-muted-foreground">12 transactions</p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground" />
                </li>
                <li className="flex items-center">
                  <div className="p-3 rounded-full" style={{backgroundColor: p[1].hex}}>
                    <Globe style={{color: p[6].hex}}/>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Travel</p>
                    <p className="text-sm text-muted-foreground">2 transactions</p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground" />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <p className="text-muted-foreground">Expenses</p>
              <p className="text-3xl font-bold">$12,543</p>
            </CardHeader>
            <CardContent>
              <ExpensesChart palette={palette} />
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
              alt="Team working"
              className="w-full h-full object-cover"
            />
          </Card>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          <Card
            className="overflow-hidden"
            style={{ backgroundColor: p[3].hex }}
          >
            <CardContent className="p-6">
              <div
                className="h-64 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop')`,
                }}
              ></div>
              <h3
                className="mt-6 text-4xl font-bold"
                style={{ color: p[9].hex }}
              >
                Gain control
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="text-muted-foreground">Income</p>
              <p className="text-3xl font-bold">$15,989</p>
              <p className="text-sm text-muted-foreground">$18,871 last period</p>
            </CardHeader>
            <CardContent className="pl-0 pr-4 pb-4">
              <StatsChart palette={palette} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="text-muted-foreground">Expenses</p>
              <p className="text-3xl font-bold">$12,543</p>
              <p className="text-sm text-muted-foreground">$10,221 last period</p>
            </CardHeader>
            <CardContent className="pl-0 pr-4 pb-4">
              <StatsChart palette={palette} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};