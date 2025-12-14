---

````md
# 🎨 Pixora — AI Image Generator

Pixora is a modern full-stack AI image generation web application that allows users to generate, save, and favorite AI-generated artwork using natural language prompts.

---

## ✨ Features

- AI image generation from text prompts  
- Style presets (Cinematic, Anime, Cyberpunk, Pixar, Photorealistic)  
- Google OAuth authentication (Supabase)  
- Image history and favorites system  
- User profile with usage statistics  
- Secure backend API handling (API keys never exposed)  
- Dark, modern UI with glassmorphism effects  

---

## 🛠 Tech Stack

**Frontend**
- React
- Tailwind CSS
- React Router

**Backend**
- Node.js
- Express

**Database & Auth**
- Supabase (Authentication + PostgreSQL)

**AI Services**
- HuggingFace (image generation)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/prakruthiprasad20/pixora.git
cd pixora
````

---

### 2️⃣ Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

---

### 3️⃣ Environment Variables

Create `.env` files using the provided `.env.example` templates.

#### Client (`client/.env`)

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_public_anon_key
```

#### Server (`server/.env`)

```env
PORT=your_port_number
HF_API_KEY=your_ai_api_key
```

---

### 4️⃣ Run the application locally

```bash
# Start backend
cd server
node server.js

# Start frontend
cd ../client
npm start
```

The app will be available at:

```
http://localhost:3000
```

---


