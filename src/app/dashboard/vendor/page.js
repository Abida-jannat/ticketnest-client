"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaTicketAlt,
  FaPlusCircle,
  FaClipboardList,
  FaUser,
  FaChartBar,
} from "react-icons/fa";

export default function VendorDashboard() {
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

        if (storedUser) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
        setVendor(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load vendor information:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vendor Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome back
            {vendor?.name ? `, ${vendor.name}` : ""}! Manage your
            tickets and bookings from here.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-4 text-blue-600">
                <FaTicketAlt size={24} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  My Tickets
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-4 text-green-600">
                <FaClipboardList size={24} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Bookings
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-purple-100 p-4 text-purple-600">
                <FaChartBar size={24} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Vendor Account
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Active
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Add Ticket */}
          <Link
            href="/dashboard/vendor/add-ticket"
            className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-4 text-blue-600">
              <FaPlusCircle size={26} />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Add New Ticket
            </h2>

            <p className="mt-2 text-gray-500">
              Add a new ticket and submit it for admin verification.
            </p>
          </Link>

          {/* My Tickets */}
          <Link
            href="/dashboard/vendor/my-tickets"
            className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-lg bg-green-100 p-4 text-green-600">
              <FaTicketAlt size={26} />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              My Added Tickets
            </h2>

            <p className="mt-2 text-gray-500">
              View, edit, delete, and check verification status of
              your tickets.
            </p>
          </Link>

          {/* Bookings */}
          <Link
            href="/dashboard/vendor/bookings"
            className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-lg bg-orange-100 p-4 text-orange-600">
              <FaClipboardList size={26} />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Booking Requests
            </h2>

            <p className="mt-2 text-gray-500">
              View customer booking requests and accept or reject
              bookings.
            </p>
          </Link>

          {/* Profile */}
          <Link
            href="/dashboard/vendor/profile"
            className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-4 text-purple-600">
              <FaUser size={26} />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Vendor Profile
            </h2>

            <p className="mt-2 text-gray-500">
              View and manage your vendor account information.
            </p>
          </Link>

          {/* Manage Tickets */}
          <Link
            href="/dashboard/vendor/manage-tickets"
            className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-lg bg-indigo-100 p-4 text-indigo-600">
              <FaChartBar size={26} />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Manage Tickets
            </h2>

            <p className="mt-2 text-gray-500">
              Manage your existing tickets and their advertisement
              status.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}