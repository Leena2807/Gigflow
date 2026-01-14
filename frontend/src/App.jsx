import { useState } from "react";
import { Briefcase, PlusCircle, User, LayoutGrid } from "lucide-react";

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
const [isRegister, setIsRegister] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  /* ---------- LOGIN ---------- */
 const handleAuth = async () => {
  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  try {
    if (isRegister) {
      await api.post("api/auth/register", { email, password });
    }

    await api.post("api/auth/login", { email, password });

    const me = await api.get("/api/auth/me");
    setUser(me.data);
    setLoggedIn(true);
  } catch (err) {
    const msg =
      err?.response?.data?.message || "Authentication failed";
    alert(msg);
  }
};
// logout
const logout = async () => {
  try {
    await api.post("api/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  }

  setUser(null);
  setLoggedIn(false);
  setView("feed");
  setSelectedGig(null);
};
  /* ---------- LOGIN SCREEN ---------- */
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Briefcase className="text-white w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              GigFlow
            </h1>
            <p className="text-slate-500 text-sm">
              Demo login using HttpOnly authentication
            </p>
          </div>

         <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border border-slate-300 rounded-lg px-4 py-3"
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border border-slate-300 rounded-lg px-4 py-3"
/>

<button
  onClick={handleAuth}
  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"
>
  {isRegister ? "Create Account" : "Sign In"}
</button>

<button
  onClick={() => setIsRegister(!isRegister)}
  className="text-sm text-indigo-600"
>
  {isRegister
    ? "Already have an account? Login"
    : "New user? Register"}
</button>

          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
            Development Mode
          </div>
        </div>
      </div>
    );
  }

  /* ---------- MAIN APP ---------- */
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setView("feed");
                setSelectedGig(null);
              }}
            >
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                GigFlow
              </span>
            </div>

            {/* NAV BUTTONS */}
            <nav className="flex items-center gap-2 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => {
                  setView("feed");
                  setSelectedGig(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                  view === "feed"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Feed
              </button>

              <button
                onClick={() => setView("create")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                  view === "create"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                Create
              </button>

              <button
                onClick={() => {
                  setView("mygigs");
                  setSelectedGig(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                  view === "mygigs"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                <User className="w-4 h-4" />
                My Gigs
              </button>
             
            </nav>

            {/* USER */}
           <div className="flex items-center gap-3">
  {/* Status Dot */}
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
  </span>

  {/* User Info */}
  <div className="text-right leading-tight">
    <div className="text-[10px] font-semibold text-slate-400 uppercase">
      Logged in
    </div>
    <div className="flex items-center gap-3 ">
  <span className="text-sm text-slate-600 font-medium mb-3 block " >
    {user?.email}
  </span>

  <button
    onClick={logout}
    className="px-3 py-1 text-xs rounded bg-slate-100 hover:bg-red-100 hover:text-red-600 transition"
  >
    Logout
  </button>
</div>
  </div>

  {/* Avatar */}
  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 border border-indigo-200">
    {user?.email?.[0]?.toUpperCase()}
  </div>
</div>


          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === "feed" && !selectedGig && (
          <GigFeed onSelectGig={(gig) => setSelectedGig(gig)} />
        )}

        {selectedGig && (
          <GigDetail gig={selectedGig} onBack={() => setSelectedGig(null)} />
        )}

        {view === "create" && (
          <CreateGig onCreated={() => setView("feed")} />
        )}

        {view === "mygigs" && !selectedGig && (
          <MyGigs
            userId={user._id}
            onSelectGig={(gig) => setSelectedGig(gig)}
          />
        )}
      </main>
    </div>
  );
}
