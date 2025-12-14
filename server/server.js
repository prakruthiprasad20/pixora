import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;


console.log(
  "HF KEY LOADED:",
  process.env.HF_API_KEY ? "YES" : "NO"
);

/* ------------------ GENERATE IMAGE (HF) ------------------ */
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          Accept: "image/png",
        },
        responseType: "arraybuffer",
        timeout: 60000,
      }
    );

    // Convert image bytes → base64
    const base64Image = Buffer.from(response.data).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (err) {
    const errorText =
      err?.response?.data instanceof Buffer
        ? err.response.data.toString()
        : err?.response?.data || err.message;

    console.error("HF ERROR:", errorText);

    // Handle free-tier quota
    if (err.response?.status === 402) {
      return res.status(402).json({
        error: "Free AI quota exhausted. Please try again later.",
      });
    }

    res.status(500).json({
      error: "Image generation failed",
    });
  }
});

/* ------------------ SERVER ------------------ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
