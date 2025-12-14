// import { supabase } from "../supabase";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export default function Login() {
//   const navigate = useNavigate();

//   const googleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });

//     if (error) alert(error.message);
//   };

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     navigate("/dashboard");
//   };


//   useEffect(() => {
//   supabase.auth.getUser().then(({ data: { user } }) => {
//     if (user) navigate("/dashboard");
//   });

//   // ALSO listen for OAuth redirects
//   const { data: listener } = supabase.auth.onAuthStateChange(
//     (event, session) => {
//       if (session) navigate("/dashboard");
//     }
//   );

//   return () => listener.subscription.unsubscribe();
// }, [navigate]);




//   return (
//     <div className="w-full h-screen flex justify-center items-center bg-gray-900">
//       <div className="bg-gray-800 p-10 rounded-2xl w-96 shadow-xl">
//         <h1 className="text-white text-3xl font-bold text-center mb-6">
//           AI Image Generator
//         </h1>

//         <button
//           className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold mb-4"
//           onClick={googleLogin}
//         >
//           Sign in with Google
//         </button>

//         <form onSubmit={handleEmailLogin}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
//           />

//           <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold">
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-400 text-sm mt-3">
//           Don’t have an account? Use Google or create one with email.
//         </p>
//       </div>
//     </div>
//   );
// }





import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert(error.message);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) navigate("/dashboard");
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        if (session) navigate("/dashboard");
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  return (
  <div className="min-h-screen bg-[#0F0F14] flex items-center justify-center px-4 sm:px-6">
    <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">

{/* LEFT IMAGE — DESKTOP ONLY */}
<div className="hidden md:flex items-center justify-center h-[85vh]">
  <div className="w-full h-full max-h-[720px] rounded-[32px] bg-[#EDEBF8] overflow-hidden">
    <img
      src="/login-art.jpg"
      alt="3D Illustration"
      className="w-full h-full object-cover"
    />
  </div>
</div>


      {/* RIGHT PANEL — ALWAYS VISIBLE */}
      <div className="flex items-center justify-center w-full">
        <div className="
          w-full
          max-w-[440px]
          bg-[#15151C]
          rounded-[28px]
          px-8 sm:px-10
          py-10 sm:py-12
          border border-[#2A2A35]
        ">

        {/* LOGO */}
<div className="flex items-center gap-3 mb-10">
    <img
    src={logo}
    alt="Pixora Logo"
    className="w-14 h-14 object-contain"
  />
  
  <span className="text-white text-lg font-medium">Pixora</span>
</div>



          {/* TITLE */}
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-white mb-3">
            Welcome back 👋
          </h1>

          <p className="text-sm text-[#A1A1AA] mb-10">
            Kindly fill in your details below to continue
          </p>

          {/* PRIMARY BUTTON */}
          <button
            onClick={googleLogin}
            className="
              w-full
              h-[52px]
              rounded-xl
              bg-[#7B61FF]
              hover:bg-[#6A52F5]
              transition
              text-white
              font-medium
              text-base
            "
          >
            Continue with Google
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#2A2A35]" />
            <span className="text-xs text-[#7C7C8A]">Or</span>
            <div className="flex-1 h-px bg-[#2A2A35]" />
          </div>

          {/* SECONDARY BUTTON */}
          <button
            onClick={googleLogin}
            className="
              w-full
              h-[52px]
              rounded-xl
              bg-[#0B0B10]
              border border-[#2A2A35]
              hover:bg-black
              transition
              text-white
            "
          >
            <span className="flex items-center justify-center gap-3">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
              />
              Register with Google
            </span>
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs text-[#7C7C8A] mt-10">
            Secure authentication powered by Supabase
          </p>
        </div>
      </div>

    </div>
  </div>
);

}
