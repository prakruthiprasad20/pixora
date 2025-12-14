import { Link } from "react-router-dom";
import { Home, ImageIcon, History, LogOut, Heart } from "lucide-react";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-white relative overflow-hidden">

      {/* FLOATING PARTICLES (unchanged) */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: Math.random() * 100 + "vw",
            animationDelay: i * 0.8 + "s",
          }}
        />
      ))}

      {/* SIDEBAR */}
<div className="w-20 bg-black/30 backdrop-blur-2xl border-r border-white/10 flex flex-col items-center py-6 gap-8 z-10">

       {/* PROFILE ICON */}
{user && (
  <Link
    to="/profile"
    title={user.email}
    className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-md hover:scale-105 transition"
  >
    {user.user_metadata?.avatar_url ? (
      <img
        src={user.user_metadata.avatar_url}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-[#7B61FF] to-[#9F8CFF] flex items-center justify-center text-white font-semibold">
        {user.email?.[0]?.toUpperCase()}
      </div>
    )}
  </Link>
)}


        {/* NAV ICONS */}
        <Link to="/dashboard">
          <Home className="text-gray-300 hover:text-white w-7 h-7 transition-all duration-200 hover:scale-110" />
        </Link>

        <Link to="/generate">
          <ImageIcon className="text-gray-300 hover:text-white w-7 h-7 transition-all duration-200 hover:scale-110" />
        </Link>

        <Link to="/history">
          <History className="text-gray-300 hover:text-white w-7 h-7 transition-all duration-200 hover:scale-110" />
        </Link>

        <Link to="/favorites">
          <Heart className="text-gray-300 hover:text-pink-400 w-7 h-7 transition-all duration-200 hover:scale-110" />
        </Link>

        {/* LOGOUT */}
        <button onClick={logout} className="mt-auto mb-4">
          <LogOut className="text-red-400 hover:text-red-600 w-7 h-7 transition-all duration-200 hover:scale-110" />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto relative z-0">
        {children}
      </div>
    </div>
  );
}
