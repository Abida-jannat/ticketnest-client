"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

export default function AdvertiseTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const fetchApprovedTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/tickets`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch tickets."
        );
      }

      // Only approved tickets
      const approvedTickets = Array.isArray(data.tickets)
        ? data.tickets.filter(
            (ticket) =>
              ticket.verificationStatus === "approved"
          )
        : [];

      setTickets(approvedTickets);
    } catch (error) {
      console.error("Failed to load tickets:", error);

      setError(
        error.message ||
          "Failed to load tickets. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
    fetchApprovedTickets();
  }, []);

  const toggleAdvertise = async (ticket) => {
    const newStatus = !ticket.isAdvertised;

    // Frontend safety check
    if (newStatus) {
      const advertisedCount = tickets.filter(
        (item) => item.isAdvertised
      ).length;

      if (advertisedCount >= 6) {
        alert(
          "You can advertise a maximum of 6 tickets at a time."
        );
        return;
      }
    }

    try {
      setUpdatingId(ticket._id);

      const response = await fetch(
        `${API_URL}/api/tickets/${ticket._id}/advertise`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isAdvertised: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update advertisement status."
        );
      }

      setTickets((currentTickets) =>
        currentTickets.map((item) =>
          item._id === ticket._id
            ? {
                ...item,
                isAdvertised: newStatus,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to update advertisement:",
        error
      );

      alert(
        error.message ||
          "Failed to update advertisement status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>

          <p className="text-gray-400">
            Loading approved tickets...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white">
          Advertise Tickets
        </h1>

        <div className="mt-6 rounded-xl border border-red-800 bg-red-950/40 p-6">
          <p className="text-red-400">{error}</p>

          <button
            onClick={fetchApprovedTickets}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const advertisedCount = tickets.filter(
    (ticket) => ticket.isAdvertised
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Advertise Tickets
            </h1>

            <p className="mt-2 text-gray-400">
              Select approved tickets to display on
              the homepage.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 px-5 py-3">
            <p className="text-sm text-gray-400">
              Advertised Tickets
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {advertisedCount}{" "}
              <span className="text-base text-gray-500">
                / 6
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800 bg-gray-950">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold text-white">
                Ticket
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Route
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-white">
                Transport
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

          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  No approved tickets found.
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
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-5 py-4 text-gray-300">
                    {ticket.from || "N/A"}

                    <span className="mx-2 text-blue-400">
                      →
                    </span>

                    {ticket.to || "N/A"}
                  </td>

                  {/* Transport */}
                  <td className="px-5 py-4 capitalize text-gray-300">
                    {ticket.transportType || "N/A"}
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
                    {ticket.quantity || 0}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                      Approved
                    </span>
                  </td>

                  {/* Advertise */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() =>
                        toggleAdvertise(ticket)
                      }
                      disabled={
                        updatingId === ticket._id
                      }
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                        ticket.isAdvertised
                          ? "bg-blue-600"
                          : "bg-gray-700"
                      } ${
                        updatingId === ticket._id
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                          ticket.isAdvertised
                            ? "translate-x-8"
                            : "translate-x-1"
                        }`}
                      />
                    </button>

                    <span className="ml-3 text-sm text-gray-400">
                      {updatingId === ticket._id
                        ? "Updating..."
                        : ticket.isAdvertised
                        ? "Advertised"
                        : "Unadvertised"}
                    </span>
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