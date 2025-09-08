import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen bg-slate-800 text-center px-4">
      <h1 className="text-7xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6 capitalize">
       The page you are looking for does not exist
      </p>
      <Button
        onClick={() => navigate("/")}
        className="px-8 !py-6 bg-blue-600 text-white shadow !text-base hover:bg-blue-700 transition capitalize"
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
