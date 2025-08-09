import React from "react";
import { PaletteColor } from "@/lib/colors";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExpensesChart } from "./ExpensesChart";
import { StatsChart } from "./StatsChart";
import {
  ChevronRight,
  Home,
  ShoppingCart,
  Globe,
  PlusCircle,
  Upload,
  Bell,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import chroma from "chroma-js";

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
                <li className="flex items-center p-2 rounded-lg transition-colors hover:bg-accent cursor-pointer">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: p[1].hex }}
                  >
                    <ShoppingCart style={{ color: p[6].hex }} />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Groceries</p>
                    <p className="text-sm text-muted-foreground">
                      9 transactions
                    </p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground" />
                </li>
                <li className="flex items-center p-2 rounded-lg transition-colors hover:bg-accent cursor-pointer">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: p[1].hex }}
                  >
                    <Home style={{ color: p[6].hex }} />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Household</p>
                    <p className="text-sm text-muted-foreground">
                      12 transactions
                    </p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground" />
                </li>
              </ul>
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
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium">New Feature</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} />
              <div className="flex justify-between mt-4 mb-1">
                <span className="text-base font-medium">API Integration</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} />
            </CardContent>
          </Card>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0 flex justify-center">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="text-muted-foreground">Income</p>
              <p className="text-3xl font-bold">$15,989</p>
            </CardHeader>
            <CardContent className="pl-0 pr-4 pb-4">
              <StatsChart palette={palette} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Bell className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  Your monthly report is ready for review.
                </AlertDescription>
              </Alert>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>
          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4">
                <h4 className="font-semibold">Overview Tab</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  This is the main overview of your account.
                </p>
              </TabsContent>
              <TabsContent value="settings" className="p-4">
                <h4 className="font-semibold">Settings Tab</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Manage your account settings here.
                </p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};