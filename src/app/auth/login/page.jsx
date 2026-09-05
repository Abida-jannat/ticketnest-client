"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        const errorMsg =
          "Account not found or invalid credentials. Please try again.";

        setError(errorMsg);
        toast.error(errorMsg);
        return;
      }

      toast.success("Successfully logged in!");

      // Get the current user's session
      const sessionResult = await authClient.getSession();

      const user = sessionResult?.data?.user;

      console.log("Logged in user:", user);
      console.log("User role:", user?.role);

      // Redirect according to role
      if (user?.role === "admin") {
        router.push("/dashboard/admin");
      } else if (user?.role === "vendor") {
        router.push("/dashboard/vendor");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err) {
      console.error("Login error:", err);

      const errorMsg =
        "An unexpected error occurred. Please try again.";

      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-xl">

        <h2 className="mb-2 text-2xl font-black text-white">
          Welcome Back
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Enter your credentials to access your account
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-900 bg-red-950/50 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-400">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@ticketnest.com"
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-400">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>

          <span className="relative bg-gray-950 px-2 text-xs uppercase text-gray-500">
            Or continue with
          </span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <span className="text-lg">🌐</span>
          Continue with Google
        </button>

        {/* Register */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}