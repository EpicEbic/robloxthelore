
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">This page doesn't exist in The Lore.</p>
      <Button asChild>
        <Link to="/">Return to the Archives</Link>
      </Button>
    </div>
  );
};

export default NotFound;
