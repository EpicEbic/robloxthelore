import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SecretLPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-fade-in text-center">
        <h1 className="text-9xl font-bold mb-8">L</h1>
        <Button 
          onClick={() => navigate("/")}
          variant="destructive"
          className="mt-6"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default SecretLPage;

