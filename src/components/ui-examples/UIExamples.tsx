import { PaletteColor } from "@/lib/colors";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExpensesChart } from "./ExpensesChart";
import { Bell, Check, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import chroma from "chroma-js";
import React from "react";

interface UIExamplesProps {
  palette: PaletteColor[];
}

export const UIExamples = ({ palette }: UIExamplesProps) => {
  if (palette.length < 11) {
    return null;
  }

  const p = palette; // shorthand
  const primaryColor = chroma(p[5].hex);
  const [h, s, l] = primaryColor.hsl();

  // Handle NaN for hue in grayscale colors
  const primaryVar = `${isNaN(h) ? 0 : h} ${s * 100}% ${l * 100}%`;

  const primaryFgColor =
    chroma.contrast(primaryColor, "white") > 4.5 ? "white" : "black";
  const [hF, sF, lF] = chroma(primaryFgColor).hsl();
  const primaryFgVar = `${isNaN(hF) ? 0 : hF} ${sF * 100}% ${lF * 100}%`;

  const dynamicStyles = {
    "--primary": primaryVar,
    "--primary-foreground": primaryFgVar,
  } as React.CSSProperties;

  return (
    <div className="mt-12" style={dynamicStyles}>
      <h2 className="text-3xl font-bold tracking-tight mb-8">UI Examples</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div className="space-y-8">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Pro Plan</CardTitle>
              <p className="text-muted-foreground">For growing teams</p>
              <p className="text-4xl font-bold mt-2">
                $49
                <span className="text-lg font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" /> Unlimited
                  Projects
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" /> Team
                  Collaboration
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" /> Priority
                  Support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Controls & Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" placeholder="My Awesome Project" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <div className="space-y-2">
                <Label>Progress</Label>
                <Progress value={66} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges & Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge
                style={{ backgroundColor: p[1].hex, color: p[8].hex }}
              >
                Custom Light
              </Badge>
              <Badge
                style={{ backgroundColor: p[8].hex, color: p[1].hex }}
              >
                Custom Dark
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Column 2 */}
        <div className="space-y-8">
          <Card>
            <CardContent className="p-2 sm:p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Bell className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  This is a default informational alert.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <Bell className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  This is a destructive alert for errors.
                </AlertDescription>
              </Alert>
              <Alert
                style={{
                  backgroundColor: p[1].hex,
                  borderColor: p[3].hex,
                  color: p[9].hex,
                }}
              >
                <PlusCircle className="h-4 w-4" style={{ color: p[9].hex }} />
                <AlertTitle style={{ color: p[8].hex }}>
                  Custom Alert
                </AlertTitle>
                <AlertDescription>
                  This alert uses colors from your palette.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-muted-foreground">Expenses</p>
              <p className="text-3xl font-bold">$12,543</p>
            </CardHeader>
            <CardContent>
              <ExpensesChart palette={palette} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};