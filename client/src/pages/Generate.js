

import { useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabase";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("");
  const [limitMessage, setLimitMessage] = useState("");

  // STYLE PRESETS
  const styles = {
    cinematic: "cinematic lighting, dramatic shadows, film still",
    anime: "anime style, vibrant colors, detailed illustration",
    photorealistic: "photorealistic, realistic lighting, high detail",
    cyberpunk: "cyberpunk, neon lights, futuristic city",
    pixar: "pixar style, 3d render, soft lighting",
  };

  // BUILD FINAL PROMPT
  const buildPrompt = (basePrompt) => {
    if (!style) return basePrompt;
    return `${basePrompt}, ${style}`;
  };

  // MAIN GENERATE FUNCTION
  const generateImage = async (customPrompt = null) => {
    const finalPrompt = customPrompt
      ? customPrompt
      : buildPrompt(prompt);

    if (!finalPrompt) {
      alert("Enter a prompt!");
      return;
    }

    setLoading(true);
    setImage(null);
    setLimitMessage("");

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();

      // 🔴 HANDLE FREE-TIER / API LIMIT
      if (!res.ok) {
        if (data?.error) {
          setLimitMessage(data.error);
        } else {
          setLimitMessage(
            "Free image generation limit reached. Please try again later."
          );
        }
        setLoading(false);
        return;
      }

      // 🔴 SAFETY CHECK
      if (!data.image) {
        setLimitMessage("Image generation failed. Please try again.");
        setLoading(false);
        return;
      }

      // 🟢 SUCCESS
      setImage(data.image);
      setLimitMessage("");

      // SAVE TO SUPABASE
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase.from("user_images").insert({
          user_id: userData.user.id,
          prompt: finalPrompt,
          image_url: data.image,
        });
      }
    } catch (err) {
      console.error(err);
      setLimitMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // DOWNLOAD IMAGE
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated_image.png";
    link.click();
  };

  return (
    <Layout>
      <div className="p-10 flex flex-col items-center w-full">

        <h1 className="text-4xl font-bold text-white mb-8">
          Create Stunning AI Art
        </h1>

        {/* STYLE BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.keys(styles).map((key) => (
            <button
              key={key}
              onClick={() => setStyle(styles[key])}
              className={`px-4 py-2 rounded-full text-sm transition
                ${
                  style === styles[key]
                    ? "bg-pink-600 text-white"
                    : "bg-purple-500 text-white hover:scale-105"
                }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* PROMPT INPUT */}
        <div className="w-full max-w-3xl bg-white/5 border border-purple-500/30 rounded-2xl p-6 mb-6 backdrop-blur-xl">
          <input
            type="text"
            placeholder="Describe your image..."
            className="w-full bg-transparent text-white text-lg outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={() => generateImage()}
            disabled={loading}
            className="mt-5 w-full py-3 bg-gradient-to-r from-[#7B61FF] to-[#9F8CFF] text-white font-bold text-lg rounded-xl disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Image 🚀"}
          </button>
        </div>

        {/* LIMIT / ERROR MESSAGE */}
        {limitMessage && (
          <div className="mt-6 px-6 py-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-center max-w-xl">
            {limitMessage}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="text-gray-300 text-xl animate-pulse mt-6">
            Creating your masterpiece...
          </div>
        )}

        {/* IMAGE RESULT */}
        {image && (
          <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-blue-500/30 flex flex-col items-center">
            <img
              src={image}
              alt="Generated"
              className="rounded-xl max-w-2xl"
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={downloadImage}
                className="px-5 py-2 bg-gradient-to-r from-[#7B61FF] to-[#9F8CFF] text-white font-semibold text-lg rounded-lg"
              >
                Download
              </button>

              <button
                onClick={() =>
                  generateImage(
                    `${buildPrompt(prompt)}, variation, improved details`
                  )
                }
                className="px-5 py-2 bg-gradient-to-r from-[#7B61FF] to-[#9F8CFF] text-white font-semibold text-lg rounded-lg"
              >
                Generate Variation
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
