"use client";

import Link from "next/link";
import {
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaArrowRight,
} from "react-icons/fa";

const dashboardCards = [
  {
    title: "User Profile",
    description:
      "View and manage your personal account information.",
    href: "/dashboard/user/profile",
    icon: FaUser,
  },
  {
    title: "My Booked Tickets",
    description:
      "View all the tickets you have booked through TicketNest.",
    href: "/dashboard/user/booked-tickets",
    icon: FaTicketAlt,
  },
  {
    title: "Transaction History",
    description:
      "Check your booking and payment transaction history.",
    href: "/dashboard/user/transactions",
    icon: FaHistory,
  },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 p-6 sm:p-8">
        
        {/* Background Effect */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-500">
            Welcome Back
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Welcome to your TicketNest Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Manage your profile, view your booked tickets, and
            check your transaction history from one place.
          </p>

          <Link
            href="/tickets"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Explore Tickets
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>

      {/* Quick Access */}
      <section>
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-500">
            Quick Access
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Manage Your Account
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-900 hover:shadow-xl hover:shadow-blue-950/20"
              >
                <div className="flex items-start justify-between">
                  
                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-600/10 text-blue-400">
                    <Icon />
                  </div>

                  {/* Arrow */}
                  <FaArrowRight className="text-sm text-gray-600 transition group-hover:translate-x-1 group-hover:text-blue-400" />
                </div>

                <h3 className="mt-5 text-base font-bold text-white transition group-hover:text-blue-400">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {card.description}
                </p>

                <div className="mt-5 text-xs font-semibold text-blue-400">
                  Open Section →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom Information */}
      <section className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          
          <div>
            <h3 className="text-base font-bold text-white">
              Need a ticket?
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Find available buses, trains, cars, and other
              travel options on TicketNest.
            </p>
          </div>

          <Link
            href="/tickets"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-xs font-bold text-white transition hover:border-blue-500 hover:bg-blue-600"
          >
            Browse Tickets
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>

    </div>
  );
}