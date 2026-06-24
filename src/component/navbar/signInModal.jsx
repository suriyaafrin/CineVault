import { useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
function SignInModal({ onClose, onSignIn, defaultMode = "signin" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(defaultMode); // "signin" | "signup"
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    // No real auth here — just simulate a successful sign in/up.
    onSignIn({
      name: mode === "signup" ? name.trim() : "",
      email: email.trim(),
      mode,
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#111] mb-1">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          {mode === "signin"
            ? "Welcome back to CineVault."
            : "Join CineVault to start watching."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "signup" && (
            <div>
              <label className="text-[13px] font-medium text-gray-600 block mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full h-10 px-3 rounded-md border border-gray-200 outline-none focus:border-[#C8102E] text-[14px] text-gray-800 placeholder-gray-400 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-[13px] font-medium text-gray-600 block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-10 px-3 rounded-md border border-gray-200 outline-none focus:border-[#C8102E] text-[14px] text-gray-800 placeholder-gray-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-gray-600 block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 px-3 rounded-md border border-gray-200 outline-none focus:border-[#C8102E] text-[14px] text-gray-800 placeholder-gray-400 transition-colors"
            />
          </div>

          {error && <p className="text-[13px] text-[#C8102E]">{error}</p>}

          <button
            type="submit"
            className="h-10 mt-1 text-[14px] font-semibold text-white bg-[#C8102E] rounded-md hover:bg-[#a80d25] transition-colors"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-[13px] text-gray-500 text-center mt-4">
          {mode === "signin" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => switchMode("signup")}
                className="text-[#C8102E] font-semibold hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => switchMode("signin")}
                className="text-[#C8102E] font-semibold hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>,
    document.body
  );
}
export default SignInModal