"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    // Not logged in
    if (!session?.user) {
      router.replace("/auth/login");
      return;
    }

    const role = session.user.role;

    // Admin
    if (role === "admin") {
      router.replace("/dashboard/admin");
      return;
    }

    // Vendor
    if (role === "vendor") {
      router.replace("/dashboard/vendor/profile");
      return;
    }

    // Normal user
    router.replace("/dashboard/user/profile");
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <p className="text-gray-400">
        Loading dashboard...
      </p>
    </div>
  );
}