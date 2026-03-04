import { PaletteColor } from "@/lib/colors";
import { ExpensesChart } from "./ExpensesChart";
import { StatsChart } from "./StatsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoginForm } from "./LoginForm";
import { PricingCard } from "./PricingCard";
import { UserProfile } from "./UserProfile";
import { Notifications } from "./Notifications";
import chroma from "chroma-js";

interface UIExamplesProps {
  palettes: PaletteColor[][];
}

export const UIExamples = ({ palettes }: UIExamplesProps) => {
  if (palettes.length === 0) return null;

  const primary = palettes[0] || [];
  const secondary = palettes[1] || primary;
  const accent = palettes[2] || secondary;

  const p500 = primary.find((c) => c.name === 500)?.hex || "#000000";
  const s500 = secondary.find((c) => c.name === 500)?.hex || "#000000";
  const a500 = accent.find((c) => c.name === 500)?.hex || "#000000";

  const getTextColor = (color: string) => {
    return chroma.contrast(color, 'white') > 4.5 ? 'white' : 'black';
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Basic Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
            <Input placeholder="Enter your email" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button style={{ backgroundColor: p500, color: getTextColor(p500) }}>
                Primary
              </Button>
              <Button style={{ backgroundColor: s500, color: getTextColor(s500) }}>
                Secondary
              </Button>
              <Button style={{ backgroundColor: a500, color: getTextColor(a500) }}>
                Accent
              </Button>
            </div>
          </CardContent>
        </Card>
        <StatsChart
          primary={p500}
          accent={a500}
        />
        <ExpensesChart primary={p500} secondary={s500} />
        <LoginForm primaryColor={p500} />
        <PricingCard primaryColor={p500} accentColor={a500} />
        <UserProfile primaryColor={p500} accentColor={a500} />
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Notifications primaryColor={p500} secondaryColor={s500} accentColor={a500} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};