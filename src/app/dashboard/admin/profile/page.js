"use client";

import { useSession } from "@/lib/auth-client";

export default function AdminProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p className="text-gray-400">Loading...</p>;
  }

  const user = session?.user;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Admin Profile
      </h1>

      <p className="text-gray-400 mb-8">
        Manage your administrator profile.
      </p>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg">
            {user?.name || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg">
            {user?.email || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="text-blue-400 font-medium">
            {user?.role || "admin"}
          </p>
        </div>
      </div>
    </div>
  );
}