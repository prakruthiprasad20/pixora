import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabase";

export default function History() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [showFavorites]);

  // ✅ FETCH IMAGES (ALL or FAVORITES)
const fetchImages = async () => {
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
    .order("created_at", { ascending: false });

  if (!error) setImages(data || []);
  setLoading(false);
};



  // ✅ TOGGLE FAVORITE
  const toggleFavorite = async (id, currentValue) => {
    const { error } = await supabase
      .from("user_images")
      .update({ is_favorite: !currentValue })
      .eq("id", id);

    if (error) {
      console.error("Favorite error:", error);
      alert("Failed to update favorite");
      return;
    }

    fetchImages();
  };

  return (
    <Layout>
      <div className="p-10 text-white">

        <h1 className="text-4xl font-bold mb-6">Your Gallery</h1>

        {/* FILTER BUTTONS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowFavorites(false)}
            className={`px-4 py-2 rounded-lg ${
              !showFavorites ? "bg-purple-600" : "bg-white/10"
            }`}
          >
            All
          </button>

          {/* <button
            onClick={() => setShowFavorites(true)}
            className={`px-4 py-2 rounded-lg ${
              showFavorites ? "bg-pink-600" : "bg-white/10"
            }`}
          >
            ❤️ Favorites
          </button> */}
          
        </div>

        {loading && <div>Loading images...</div>}

        {/* IMAGE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
              <img
                src={img.image_url}
                alt="Generated"
                className="rounded-xl mb-3"
              />

              <p className="text-sm text-purple-200 mb-2">
                {img.prompt}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {new Date(img.created_at).toLocaleString()}
                </span>

                {/* ❤️ HEART BUTTON */}
                <button
                  onClick={() =>
                    toggleFavorite(img.id, img.is_favorite)
                  }
                  className="text-xl"
                >
                  {img.is_favorite ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && images.length === 0 && (
          <div className="text-gray-400 mt-10">
            No images yet. Generate something ✨
          </div>
        )}
      </div>
    </Layout>
  );
}
