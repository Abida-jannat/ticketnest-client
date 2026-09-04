"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { Car, Envelope, Lock, Person, Shield } from "@gravity-ui/icons";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
        role,
      }, {
        onSuccess: () => {
          toast.success("Account registered successfully!");
          router.push("/auth/login");
        },
      });

      if (error) {
        const errorMsg = error.message || "Registration failed";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = "An unexpected error occurred.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    await signUp.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-gray-800 bg-gray-950 p-8 shadow-2xl sm:p-10">
        
        {/* Subtle background glow element */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          
          {/* Header with Icon Badge */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30">
              <Car width={28} height={28} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white">Join TicketNest</h2>
            <p className="mt-1 text-sm text-gray-400">Create your account and travel smarter today</p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-900/50 bg-red-950/40 p-3.5 text-center text-xs font-medium text-red-400 shadow-inner">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            
            {/* Role Selector Cards */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Select Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex flex-col items-start gap-1.5 rounded-2xl border p-4 text-left transition-all ${
                    role === "user"
                      ? "border-blue-500 bg-blue-600/10 text-white shadow-lg shadow-blue-900/20"
                      : "border-gray-800 bg-gray-900/50 text-gray-400 hover:border-gray-700 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <Person width={18} height={18} className={role === "user" ? "text-blue-500" : "text-gray-500"} />
                    <span>User</span>
                  </div>
                  <span className="text-[11px] text-gray-500">Book tickets & travel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("vendor")}
                  className={`flex flex-col items-start gap-1.5 rounded-2xl border p-4 text-left transition-all ${
                    role === "vendor"
                      ? "border-blue-500 bg-blue-600/10 text-white shadow-lg shadow-blue-900/20"
                      : "border-gray-800 bg-gray-900/50 text-gray-400 hover:border-gray-700 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <Shield width={18} height={18} className={role === "vendor" ? "text-blue-500" : "text-gray-500"} />
                    <span>Vendor</span>
                  </div>
                  <span className="text-[11px] text-gray-500">Manage trips & lists</span>
                </button>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-gray-300">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <Person width={16} height={16} />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/80 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:bg-gray-900 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-gray-300">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <Envelope width={16} height={16} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exmple@ticketnest.com"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/80 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:bg-gray-900 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-gray-300">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <Lock width={16} height={16} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/80 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:bg-gray-900 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-600/40 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800/80"></div></div>
            <span className="relative bg-gray-950 px-3 text-[11px] font-medium tracking-wider text-gray-500 uppercase">Or continue with</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-800 bg-gray-900/80 px-4 py-3 text-sm font-semibold text-white transition hover:border-gray-700 hover:bg-gray-900"
          >
            <span className="text-base">🌐</span>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-blue-500 hover:text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}