// import Layout from "../components/Layout";

// export default function Dashboard() {
//   return (
//     <Layout>
//       <div className="flex flex-col justify-center items-center h-full text-white">
//         <h1 className="text-5xl font-bold mb-4">Welcome Back 👋</h1>
//         <p className="text-gray-400 text-xl">Ready to create something magical?</p>
//       </div>
//     </Layout>
//   );
// }


import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="relative h-full w-full overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2400')",
          }}
        />

        {/* BLUR + DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* GRADIENT GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/20 via-transparent to-[#9F8CFF]/10" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome back to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#9F8CFF]">
              Pixora
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10">
            Turn imagination into stunning visuals. Generate, refine, and
            curate AI-powered artwork — all in one place.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="/generate"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#7B61FF] to-[#9F8CFF] text-white font-semibold text-lg hover:scale-105 transition"
            >
              Start Creating ✨
            </a>

            <a
              href="/history"
              className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium text-lg backdrop-blur-md hover:bg-white/10 transition"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
