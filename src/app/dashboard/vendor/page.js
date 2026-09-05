"use client";

import Link from "next/link";


export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Vendor Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your tickets, bookings, and vendor profile.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">My Tickets</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">0</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Bookings</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">0</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Vendor Account</p>
            <h2 className="text-lg font-semibold text-green-600 mt-2">
              Active
            </h2>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add New Ticket */}
            <Link
              href="/dashboard/vendor/add-ticket"
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Add New Ticket
              </h3>
              <p className="text-gray-600 text-sm">
                Create and submit a new ticket for approval.
              </p>
            </Link>

            {/* My Added Tickets */}
            <Link
              href="/dashboard/vendor/my-tickets"
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                My Added Tickets
              </h3>
              <p className="text-gray-600 text-sm">
                View and manage all tickets you have added.
              </p>
            </Link>

            {/* Booking Requests */}
            <Link
              href="/dashboard/vendor/bookings"
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Booking Requests
              </h3>
              <p className="text-gray-600 text-sm">
                View and manage booking requests from users.
              </p>
            </Link>

            {/* Vendor Profile */}
            <Link
              href="/dashboard/vendor/profile"
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Vendor Profile
              </h3>
              <p className="text-gray-600 text-sm">
                View and manage your vendor account information.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}