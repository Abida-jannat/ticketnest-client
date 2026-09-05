"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaTicketAlt, FaUsers, FaBullhorn } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Admin Profile",
      href: "/dashboard/admin/profile",
      icon: FaUser,
    },
    {
      name: "Manage Tickets",
      href: "/dashboard/admin/manage-tickets",
      icon: FaTicketAlt,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: FaUsers,
    },
    {
      name: "Advertise Tickets",
      href: "/dashboard/admin/advertise-tickets",
      icon: FaBullhorn,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* Admin Sidebar */}
      <aside className="w-64 shrink-0 bg-gray-950 border-r border-gray-800 p-6">

        <h2 className="text-xl font-bold mb-8">
          Admin <span className="text-blue-500">Dashboard</span>
        </h2>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <Icon />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>

    </div>
  );
}