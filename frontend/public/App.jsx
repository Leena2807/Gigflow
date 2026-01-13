import { useState } from "react";
import api from "./api/api";
import GigFeed from "./pages/GigFeed";
import CreateGig from "./pages/CreateGig";
import GigDetail from "./pages/GigDetail";
import MyGigs from "./pages/MyGigs";

export default function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState("feed"); // feed | create | mygigs
  const [selectedGig, setSelectedGig] = useState(null);

  const login = async () => {
  await api.post("/api/auth/login", {
    email: "leena@test.com",
    password: "123456"
  });

  const me = await api.get("/api/auth/me");
  setUser(me.data);
  setLoggedIn(true);
};

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={login}
          className="px-6 py-3 bg-indigo-600 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

 return (
  <div>
    <div className="flex gap-4 p-4 border-b">
      <button onClick={() => { setView("feed"); setSelectedGig(null); }} className="px-3 py-1 border rounded">
        Feed
      </button>
      <button onClick={() => setView("create")} className="px-3 py-1 border rounded">
        Create Gig
      </button>
      <button
  onClick={() => { setView("mygigs"); setSelectedGig(null); }}
  className="px-3 py-1 border rounded"
>
  My Gigs
</button>
    </div>

    {view === "feed" && !selectedGig && (
      <GigFeed onSelectGig={gig => setSelectedGig(gig)} />
    )}

    {selectedGig && (
      <GigDetail gig={selectedGig} onBack={() => setSelectedGig(null)} />
    )}

    {view === "create" && (
      <CreateGig onCreated={() => setView("feed")} />
    )}
    {view === "mygigs" && !selectedGig && (
  <MyGigs
    userId={user._id} // TEMP (explained below)
    onSelectGig={gig => setSelectedGig(gig)}
  />
)}
  </div>
);
}