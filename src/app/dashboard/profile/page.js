import { Avatar } from "@heroui/react";

export default function ProfilePage() {
  const user = {
    name: "Abida Jannat",
    email: "user@example.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl shadow-black/40">
        {/* Cover Banner */}
        <div className="relative h-32 bg-gradient-to-r from-blue-950 via-indigo-950 to-gray-900 border-b border-gray-800" />

        {/* Profile Card Body */}
        <div className="px-6 pb-6">
          {/* Avatar and Role Badge */}
          <div className="relative -mt-14 mb-4 flex items-end justify-between">
            <div className="rounded-2xl border-4 border-gray-950 bg-gray-900 shadow-lg">
              <Avatar
                src={user.avatar}
                name={user.name}
                className="h-20 w-20 rounded-xl"
              />
            </div>
            <span className="inline-flex items-center rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/20">
              {user.role}
            </span>
          </div>

          {/* User Meta */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {user.name}
            </h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          {/* Details Section */}
          <div className="space-y-4 border-t border-gray-800 pt-5 text-gray-300">
            <div className="flex items-center justify-between rounded-xl bg-gray-900/50 p-3.5 border border-gray-800/60">
              <span className="text-sm font-medium text-gray-400">Full Name</span>
              <span className="text-sm font-semibold text-white">{user.name}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-900/50 p-3.5 border border-gray-800/60">
              <span className="text-sm font-medium text-gray-400">Email Address</span>
              <span className="text-sm font-semibold text-white">{user.email}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-900/50 p-3.5 border border-gray-800/60">
              <span className="text-sm font-medium text-gray-400">System Role</span>
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}