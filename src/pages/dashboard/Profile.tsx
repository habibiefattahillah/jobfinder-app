import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={user?.image_url || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <p className="text-xl font-semibold">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
