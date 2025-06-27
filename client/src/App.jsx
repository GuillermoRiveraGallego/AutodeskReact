import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Viewer } from "./components/Viewer";

function App() {
  const [user, setUser] = useState(null);
  const [selectedUrn, setSelectedUrn] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const resp = await fetch("/api/auth/profile");
        if (resp.ok) {
          const data = await resp.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Could not fetch user profile:", err);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = () => {
    const iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    iframe.src = "https://accounts.autodesk.com/Authentication/LogOut";
    document.body.appendChild(iframe);
    iframe.onload = () => {
      window.location.replace("/api/auth/logout");
      document.body.removeChild(iframe);
    };
  };

  const handleLogin = () => {
    window.location.replace("/api/auth/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-100 p-2 text-right shadow">
        {user ? (
          <button onClick={handleLogout} className="text-blue-600 underline">
            Logout ({user.name})
          </button>
        ) : (
          <button onClick={handleLogin} className="text-blue-600 underline">
            Login
          </button>
        )}
      </header>

      {user ? (
        <div className="flex flex-1">
          <div className="w-1/3 border-r">
            <Sidebar
              onVersionSelected={(urn) =>
                setSelectedUrn(btoa(urn).replace(/=/g, ""))
              }
            />
          </div>
          <div className="flex-1">
            <Viewer urn={selectedUrn} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Por favor inicia sesión para acceder al visor.
        </div>
      )}
    </div>
  );
}

export default App;
