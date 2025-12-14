import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabase";

export default function Favorites() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("user_images")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("is_favorite", true)   // 🔒 HARD FILTER
      .order("created_at", { ascending: false });

    if (!error) setImages(data || []);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="p-10 text-white">
        <h1 className="text-4xl font-bold mb-6">❤️ Favorites</h1>

        {loading && <div>Loading favorites...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white/5 border border-pink-500/30 rounded-2xl p-4"
            >
              <img
                src={img.image_url}
                className="rounded-xl mb-3"
              />
              <p className="text-sm text-pink-200">
                {img.prompt}
              </p>
            </div>
          ))}
        </div>

        {!loading && images.length === 0 && (
          <div className="text-gray-400 mt-10">
            No favorite images yet ❤️
          </div>
        )}
      </div>
    </Layout>
  );
}
