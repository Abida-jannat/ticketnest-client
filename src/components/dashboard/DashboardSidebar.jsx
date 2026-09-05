"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaPlus,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useSession } from "@/lib/auth-client";

const menuItems = {
  user: [
  {
    name: "User Profile",
    href: "/dashboard/user/profile",
    icon: FaUser,
  },
  {
    name: "My Booked Tickets",
    href: "/dashboard/user/tickets",
    icon: FaTicketAlt,
  },
  {
    name: "Transaction History",
    href: "/dashboard/user/transactions",
    icon: FaHistory,
  },
],
  vendor: [
    {
      name: "Vendor Profile",
      href: "/dashboard/vendor/profile",
      icon: FaUser,
    },
    {
      name: "Add Ticket",
      href: "/dashboard/vendor/add-ticket",
      icon: FaPlus,
    },
    {
      name: "My Added Tickets",
      href: "/dashboard/vendor/my-ticket",
      icon: FaTicketAlt,
    },
    {
      name: "Requested Bookings",
      href: "/dashboard/vendor/requests",
      icon: FaClipboardList,
    },
    {
      name: "Revenue Overview",
      href: "/dashboard/vendor/revenue",
      icon: FaMoneyBillWave,
    },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <aside className="w-full flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-white">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </aside>
    );
  }

  const user = session?.user;

  // Default role is user
  const role = user?.role || "user";

  // Get menu according to role
  const menu = menuItems[role] || menuItems.user;

  return (
    <aside className="w-full flex flex-col">

      {/* Dashboard Title */}
      <h2 className="text-xl font-bold mb-8 text-white">
        {role === "vendor" ? (
          <>
            Vendor <span className="text-blue-500">Dashboard</span>
          </>
        ) : (
          <>
            User <span className="text-blue-500">Dashboard</span>
          </>
        )}
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 font-medium">

        {/* Overview */}
        <Link
          href="/dashboard"
          className={`rounded-xl px-4 py-2.5 text-sm transition ${
            pathname === "/dashboard"
              ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
              : "text-gray-400 hover:bg-gray-900 hover:text-white"
          }`}
        >
          Overview
        </Link>

        {/* Dynamic Role-Based Menu */}
        {menu.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <Icon className="text-sm" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}