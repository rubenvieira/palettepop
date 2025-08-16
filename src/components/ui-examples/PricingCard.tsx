import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import chroma from "chroma-js";

interface PricingCardProps {
  primaryColor: string;
  accentColor: string;
}

export const PricingCard = ({ primaryColor, accentColor }: PricingCardProps) => {
  const headerTextColor = chroma.contrast(accentColor, 'white') > 4.5 ? 'white' : 'black';

  return (
    <Card className="flex flex-col">
      <CardHeader style={{ backgroundColor: accentColor, color: headerTextColor }} className="rounded-t-lg">
        <CardTitle>Pro Plan</CardTitle>
        <CardDescription style={{ color: chroma(headerTextColor).alpha(0.8).hex() }}>For power users and teams</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <div className="text-4xl font-bold mb-4">$49<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
        <ul className="space-y-2">
          <li className="flex items-center"><Check className="h-4 w-4 mr-2" style={{ color: primaryColor }} /> Unlimited Projects</li>
          <li className="flex items-center"><Check className="h-4 w-4 mr-2" style={{ color: primaryColor }} /> Team Collaboration</li>
          <li className="flex items-center"><Check className="h-4 w-4 mr-2" style={{ color: primaryColor }} /> Priority Support</li>
          <li className="flex items-center"><Check className="h-4 w-4 mr-2" style={{ color: primaryColor }} /> Advanced Analytics</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};