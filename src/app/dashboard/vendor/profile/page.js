"use client";

import { Avatar } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export default function VendorProfilePage() {
  const {
    data: session,
    isPending,
  } = useSession();

  // ==========================================
  // LOADING
  // ==========================================

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <p className="text-sm text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // USER
  // ==========================================

  const user = session?.user;

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5 text-center">
          <h2 className="text-lg font-semibold text-red-400">
            Profile not available
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Please log in again.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VENDOR DATA
  // ==========================================

  const vendor = {
    name:
      user.name ||
      "Vendor",

    email:
      user.email ||
      "No email",

    role:
      user.role ||
      "vendor",

    company:
      user.company ||
      "TicketNest Vendor",

    phone:
      user.phone ||
      "Not provided",

    avatar:
      user.image ||
      `https://i.pravatar.cc/150?u=${encodeURIComponent(
        user.email || "vendor"
      )}`,
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl shadow-black/40">

        {/* Cover */}
        <div className="relative h-32 border-b border-gray-800 bg-gradient-to-r from-blue-950 via-indigo-950 to-gray-900" />

        {/* Body */}
        <div className="px-6 pb-6">

          {/* Avatar + Role */}
          <div className="relative -mt-14 mb-4 flex items-end justify-between">

            <div className="rounded-2xl border-4 border-gray-950 bg-gray-900 shadow-lg">
              <Avatar
                src={vendor.avatar}
                name={vendor.name}
                className="h-20 w-20 rounded-xl"
              />
            </div>

            <span className="inline-flex items-center rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
              {vendor.role}
            </span>
          </div>

          {/* Name + Email */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {vendor.name}
            </h1>

            <p className="text-sm text-gray-400">
              {vendor.email}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4 border-t border-gray-800 pt-5 text-gray-300">

            {/* Company */}
            <div className="flex items-center justify-between rounded-xl border border-gray-800/60 bg-gray-900/50 p-3.5">
              <span className="text-sm font-medium text-gray-400">
                Company Name
              </span>

              <span className="text-right text-sm font-semibold text-white">
                {vendor.company}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between rounded-xl border border-gray-800/60 bg-gray-900/50 p-3.5">
              <span className="text-sm font-medium text-gray-400">
                Email Address
              </span>

              <span className="text-right text-sm font-semibold text-white">
                {vendor.email}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between rounded-xl border border-gray-800/60 bg-gray-900/50 p-3.5">
              <span className="text-sm font-medium text-gray-400">
                Phone Number
              </span>

              <span className="text-right text-sm font-semibold text-white">
                {vendor.phone}
              </span>
            </div>

            {/* Role */}
            <div className="flex items-center justify-between rounded-xl border border-gray-800/60 bg-gray-900/50 p-3.5">
              <span className="text-sm font-medium text-gray-400">
                Account Role
              </span>

              <span className="text-right text-sm font-semibold capitalize text-blue-400">
                {vendor.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}