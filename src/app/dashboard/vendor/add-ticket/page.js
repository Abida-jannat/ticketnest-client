"use client";

import { useState } from "react";
import { PlusCircle, Ticket, MapPin, Calendar, DollarSign } from "@gravity-ui/icons";

export default function AddTicketPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your ticket creation logic/API call here
    setTimeout(() => {
      setLoading(false);
      alert("Ticket added successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add New Ticket
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Publish a new intercity bus or transport ticket for users to book.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 md:p-8 shadow-xl shadow-black/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ticket Title / Route Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dhaka to Sylhet Express"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Transport/Bus Company */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Transport / Operator Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Green Line / Hanif Enterprise"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Departure Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                From (Departure)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dhaka"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Arrival Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To (Destination)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sylhet"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price (BDT)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 1200"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Available Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Seats Available
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 40"
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Departure Date */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Departure Date & Time
              </label>
              <input
                type="datetime-local"
                required
                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 disabled:opacity-50"
            >
              <PlusCircle width={18} height={18} />
              <span>{loading ? "Publishing Ticket..." : "Publish Ticket"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}