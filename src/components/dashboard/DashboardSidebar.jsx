"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaPlus,
  FaClipboardList,
  FaMoneyBillWave,
  FaHome,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useSession, authClient } from "@/lib/auth-client";

const menuItems = {
  user: [
    {
      name: "User Profile",
      href: "/dashboard/user/profile",
      icon: FaUser,
    },
    {
      name: "My Booked Tickets",
      href: "/dashboard/user/booked-tickets",
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
  const router = useRouter();

  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <aside className="flex w-full flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">
            Ticket<span className="text-blue-500">Nest</span>
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-700 border-t-blue-500" />
          Loading...
        </div>
      </aside>
    );
  }

  const user = session?.user;

  // Default role is user
  const role = user?.role || "user";

  // Get menu according to role
  const menu = menuItems[role] || menuItems.user;

  const dashboardHref =
    role === "vendor"
      ? "/dashboard/vendor"
      : "/dashboard/user";

  const dashboardTitle =
    role === "vendor"
      ? "Vendor Dashboard"
      : "User Dashboard";

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="flex w-full flex-col">

      {/* Logo / Dashboard Title */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-xl font-black tracking-tight text-white"
        >
          Ticket<span className="text-blue-500">Nest</span>
        </Link>

        <h2 className="mt-2 text-sm font-semibold text-gray-400">
          {dashboardTitle}
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">

        {/* Dashboard */}
        <Link
          href={dashboardHref}
          className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            pathname === dashboardHref
              ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
              : "text-gray-400 hover:bg-gray-900 hover:text-white"
          }`}
        >
          <FaTachometerAlt className="text-sm" />
          <span>Dashboard</span>
        </Link>

        {/* Role-Based Menu */}
        {menu.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
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

        {/* Divider */}
        <div className="my-4 border-t border-gray-800" />

        {/* Back to Home */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-gray-900 hover:text-white"
        >
          <FaHome className="text-sm" />
          <span>Back to Home</span>
        </Link>

       
      </nav>
    </aside>
  );
}