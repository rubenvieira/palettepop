import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import chroma from "chroma-js";

interface LoginFormProps {
  primaryColor: string;
}

export const LoginForm = ({ primaryColor }: LoginFormProps) => {
  const textColor = chroma.contrast(primaryColor, 'white') > 4.5 ? 'white' : 'black';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <Button style={{ backgroundColor: primaryColor, color: textColor }}>
          Login
        </Button>
        <Button variant="link" className="text-sm" style={{ color: primaryColor }}>Forgot your password?</Button>
      </CardFooter>
    </Card>
  );
};