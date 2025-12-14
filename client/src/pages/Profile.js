import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabase";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    favorites: 0,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) return;

    setUser(data.user);

    // fetch stats
    const { data: images } = await supabase
      .from("user_images")
      .select("id, is_favorite")
      .eq("user_id", data.user.id);

    if (images) {
      setStats({
        total: images.length,
        favorites: images.filter((i) => i.is_favorite).length,
      });
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="p-10 text-white max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">👤 Profile</h1>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

          {/* USER HEADER */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#9F8CFF] flex items-center justify-center text-2xl font-bold">
              {user.email[0].toUpperCase()}
            </div>

            <div>
              <p className="text-xl font-semibold">{user.email}</p>
              <p className="text-gray-400 text-sm">
                {user.app_metadata?.provider === "google"
                  ? "Google Account"
                  : "Email Account"}
              </p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <ProfileItem label="Account status" value="Free user" />
            <ProfileItem
              label="Joined on"
              value={new Date(user.created_at).toDateString()}
            />
            <ProfileItem label="Images generated" value={stats.total} />
            <ProfileItem label="Favorites saved" value={stats.favorites} />

          </div>
        </div>
      </div>
    </Layout>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
