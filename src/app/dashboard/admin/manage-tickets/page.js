"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ManageTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/tickets`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      console.log("Tickets API response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Server returned ${response.status}`
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch tickets."
        );
      }

      const ticketList = Array.isArray(
        data.tickets
      )
        ? data.tickets
        : [];

      setTickets(ticketList);
    } catch (error) {
      console.error(
        "Failed to load tickets:",
        error
      );

      setError(
        error.message ||
          "Failed to load tickets. Make sure the TicketNest backend is running."
      );
    } finally {
      setLoading(false);
    }
  };



    useEffect(() => {
       // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
    fetchTickets();
  }, []);

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/api/tickets/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            verificationStatus:
              status,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "Update ticket response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Server returned ${response.status}`
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to update ticket."
        );
      }

      // Update ticket in UI
      setTickets(
        (currentTickets) =>
          currentTickets.map(
            (ticket) =>
              ticket._id === id
                ? {
                    ...ticket,

                    verificationStatus:
                      status,
                  }
                : ticket
          )
      );
    } catch (error) {
      console.error(
        "Failed to update ticket:",
        error
      );

      alert(
        error.message ||
          "Failed to update ticket."
      );
    }
  };


  if (loading) {
    return (
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">
          Manage Tickets
        </h1>

        <p className="text-gray-400">
          Loading tickets...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">
          Manage Tickets
        </h1>

        <div className="mt-6 rounded-xl border border-red-800 bg-red-950/40 p-5">
          <p className="text-red-400">
            {error}
          </p>

          <button
            onClick={fetchTickets}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Manage Tickets
        </h1>

        <p className="mt-2 text-gray-400">
          Review, approve, or reject
          tickets submitted by vendors.
        </p>
      </div>

      {/* Ticket Count */}
      <div className="mb-5">
        <p className="text-sm text-gray-400">
          Total Tickets:{" "}
          <span className="font-semibold text-white">
            {tickets.length}
          </span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900">
        <table className="w-full text-left">
          {/* Table Header */}
          <thead className="border-b border-gray-800 bg-gray-950">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold text-white">
                Ticket
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Route
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Date
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Price
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Quantity
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Status
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="border-b border-gray-800 last:border-0"
                >
                  {/* Ticket */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-white">
                        {ticket.title ||
                          ticket.ticketTitle ||
                          "Untitled Ticket"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {ticket.vendorName ||
                          "Unknown vendor"}
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        {ticket.vendorEmail ||
                          "No email"}
                      </p>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-5 py-4 text-gray-300">
                    <span>
                      {ticket.from ||
                        "N/A"}
                    </span>

                    <span className="mx-2 text-blue-400">
                      →
                    </span>

                    <span>
                      {ticket.to ||
                        "N/A"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-gray-300">
                    {ticket.departureDateTime
                      ? new Date(
                          ticket.departureDateTime
                        ).toLocaleString()
                      : "N/A"}
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 text-gray-300">
                    ৳
                    {Number(
                      ticket.price || 0
                    ).toLocaleString()}
                  </td>

                  {/* Quantity */}
                  <td className="px-5 py-4 text-gray-300">
                    {ticket.quantity ||
                      0}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        ticket.verificationStatus ===
                        "approved"
                          ? "bg-green-500/10 text-green-400"
                          : ticket.verificationStatus ===
                            "rejected"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {ticket.verificationStatus ||
                        "pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {/* Approve */}
                      <button
                        onClick={() =>
                          updateStatus(
                            ticket._id,
                            "approved"
                          )
                        }
                        disabled={
                          ticket.verificationStatus ===
                          "approved"
                        }
                        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Approve
                      </button>

                      {/* Reject */}
                      <button
                        onClick={() =>
                          updateStatus(
                            ticket._id,
                            "rejected"
                          )
                        }
                        disabled={
                          ticket.verificationStatus ===
                          "rejected"
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}