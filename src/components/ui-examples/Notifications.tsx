import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle, AlertTriangle } from "lucide-react";

interface NotificationsProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export const Notifications = ({ primaryColor, secondaryColor, accentColor }: NotificationsProps) => {
  return (
    <div className="space-y-4">
      <Alert>
        <Terminal className="h-4 w-4" style={{ color: primaryColor }} />
        <AlertTitle style={{ color: primaryColor }}>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle className="h-4 w-4" style={{ color: secondaryColor }} />
        <AlertTitle style={{ color: secondaryColor }}>Success!</AlertTitle>
        <AlertDescription>
          Your profile has been updated successfully.
        </AlertDescription>
      </Alert>
      <Alert>
        <AlertTriangle className="h-4 w-4" style={{ color: accentColor }} />
        <AlertTitle style={{ color: accentColor }}>Warning!</AlertTitle>
        <AlertDescription>
          Your session is about to expire. Please save your work.
        </AlertDescription>
      </Alert>
    </div>
  );
};