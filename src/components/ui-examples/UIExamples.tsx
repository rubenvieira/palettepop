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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import chroma from "chroma-js";

interface UIExamplesProps {
  palette: PaletteColor[];
}

export const UIExamples = ({ palette }: UIExamplesProps) => {
  if (palette.length < 11) {
    return null;
  }

  const p = palette; // shorthand
  const primaryButtonTextColor =
    chroma.contrast(p[5].hex, "white") > 4.5 ? "white" : "black";

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
                <li className="flex items-center p-2 rounded-lg transition-colors hover:bg-accent cursor-pointer">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: p[1].hex }}
                  >
                    <Globe style={{ color: p[6].hex }} />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Travel</p>
                    <p className="text-sm text-muted-foreground">
                      2 transactions
                    </p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground" />
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button
                style={{
                  backgroundColor: p[5].hex,
                  color: primaryButtonTextColor,
                }}
              >
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button
                variant="outline"
                style={{ borderColor: p[5].hex, color: p[5].hex }}
              >
                Outline
              </Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button
                style={{
                  backgroundColor: p[5].hex,
                  color: primaryButtonTextColor,
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Icon
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Alice Banks</p>
                  <p className="text-sm text-muted-foreground">
                    alice.banks@example.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Charlie Davis</p>
                  <p className="text-sm text-muted-foreground">
                    charlie.davis@example.com
                  </p>
                </div>
              </div>
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
          <Card>
            <CardHeader>
              <CardTitle>Create Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Monthly Report" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="A summary of this month's activities."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                style={{
                  backgroundColor: p[5].hex,
                  color: primaryButtonTextColor,
                }}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" /> Create
              </Button>
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
              <Progress value={75} color={p[5].hex} />
              <div className="flex justify-between mt-4 mb-1">
                <span className="text-base font-medium">API Integration</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} color={p[5].hex} />
            </CardContent>
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
              <p className="text-sm text-muted-foreground">
                $18,871 last period
              </p>
            </CardHeader>
            <CardContent className="pl-0 pr-4 pb-4">
              <StatsChart palette={palette} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <p className="text-muted-foreground">Expenses</p>
              <p className="text-3xl font-bold">$12,543</p>
              <p className="text-sm text-muted-foreground">
                $10,221 last period
              </p>
            </CardHeader>
            <CardContent className="pl-0 pr-4 pb-4">
              <StatsChart palette={palette} />
            </CardContent>
          </Card>
          <Card>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4">
                <h4 className="font-semibold">Overview Tab</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  This is the main overview of your account.
                </p>
              </TabsContent>
              <TabsContent value="analytics" className="p-4">
                <h4 className="font-semibold">Analytics Tab</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Here are your detailed analytics.
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
        </div>
      </div>
    </div>
  );
};