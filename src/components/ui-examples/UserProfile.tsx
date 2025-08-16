import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import chroma from "chroma-js";

interface UserProfileProps {
  primaryColor: string;
  accentColor: string;
}

export const UserProfile = ({ primaryColor, accentColor }: UserProfileProps) => {
  const headerTextColor = chroma.contrast(primaryColor, 'white') > 4.5 ? 'white' : 'black';
  const badgeTextColor = chroma.contrast(accentColor, 'white') > 4.5 ? 'white' : 'black';

  return (
    <Card>
      <CardHeader className="items-center text-center" style={{ backgroundColor: primaryColor, color: headerTextColor }}>
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold">Shadcn</h3>
        <p className="text-sm" style={{ color: chroma(headerTextColor).alpha(0.8).hex() }}>@shadcn</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-around text-center">
          <div>
            <p className="font-bold text-lg">1.2k</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="font-bold text-lg">345</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
          <div>
            <p className="font-bold text-lg">87</p>
            <p className="text-sm text-muted-foreground">Repositories</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge style={{ backgroundColor: accentColor, color: badgeTextColor }}>TypeScript</Badge>
          <Badge style={{ backgroundColor: accentColor, color: badgeTextColor }}>React</Badge>
          <Badge style={{ backgroundColor: accentColor, color: badgeTextColor }}>Tailwind CSS</Badge>
          <Badge style={{ backgroundColor: accentColor, color: badgeTextColor }}>UI/UX</Badge>
        </div>
      </CardContent>
    </Card>
  );
};