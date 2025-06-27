import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react"; // opcional: iconos

export function Header({ user, onLogin, onLogout }) {
  return (
    <header className="bg-black w-full h-14 flex items-center justify-between px-6 shadow">
      <h2 className="text-white text-lg font-medium">AutodeskTree</h2>
      <div>
        {user ? (
          <Button
            variant="secondary"
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout ({user.name})
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={onLogin}
            className="flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
