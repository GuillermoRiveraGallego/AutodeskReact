import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Viewer } from "./components/Viewer";
import { Header } from "./components/Header";
import { PageNotLogin } from "./components/PageNotLogin";

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
    <div className="h-screen w-screen flex flex-col">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

      {user ? (
        <div className="flex flex-1">
          <Sidebar
            onVersionSelected={(urn) =>
              setSelectedUrn(btoa(urn).replace(/=/g, ""))
            }
          />
          <Viewer urn={selectedUrn} />
        </div>
      ) : (
        <PageNotLogin />
      )}
    </div>
  );
}

export default App;
