import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;