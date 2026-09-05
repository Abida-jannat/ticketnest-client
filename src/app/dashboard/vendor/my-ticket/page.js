"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  Ticket,
  Plus,
  TrashBin,
  Pencil,
} from "@gravity-ui/icons";

export default function MyAddedTicketsPage() {
  const { data: session, isPending: sessionLoading } = useSession();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const vendorEmail = session?.user?.email;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (sessionLoading) return;

    if (!vendorEmail) {
       // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
      setLoading(false);
      return;
    }

    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${apiUrl}/api/tickets/vendor?vendorEmail=${encodeURIComponent(
            vendorEmail
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch tickets."
          );
        }

        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Fetch tickets error:", err);
        setError(
          err.message || "Failed to load tickets."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [vendorEmail, sessionLoading, apiUrl]);

  const handleDelete = async (ticketId, status) => {
    if (status === "rejected") {
      return;
    }

    if (!vendorEmail) {
      alert("Vendor information is missing.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(ticketId);

      const response = await fetch(
        `${apiUrl}/api/tickets/${ticketId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendorEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete ticket."
        );
      }

      setTickets((prevTickets) =>
        prevTickets.filter(
          (ticket) => ticket._id !== ticketId
        )
      );

      alert("Ticket deleted successfully.");
    } catch (err) {
      console.error("Delete ticket error:", err);

      alert(
        err.message || "Failed to delete ticket."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <p className="mt-3 text-sm text-gray-400">
            Loading your tickets...
          </p>
        </div>
      </div>
    );
  }

  if (!vendorEmail) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-400">
          Unable to load vendor information
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Please make sure you are logged in.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            My Added Tickets
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage, update, or remove the tickets you have
            published.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/add-ticket"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
        >
          <Plus width={16} height={16} />
          <span>Add New Ticket</span>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Tickets */}
      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => {
            const isRejected =
              ticket.verificationStatus === "rejected";

            const isDeleting =
              deletingId === ticket._id;

            return (
              <div
                key={ticket._id}
                className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-gray-700"
              >
                {/* Ticket Image */}
                <div className="h-44 w-full overflow-hidden bg-gray-900">
                  {ticket.image ? (
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-600">
                      <Ticket width={48} height={48} />
                    </div>
                  )}
                </div>

                {/* Ticket Information */}
                <div className="p-5">
                  {/* Status + Transport */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                        ticket.verificationStatus ===
                        "approved"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : ticket.verificationStatus ===
                            "rejected"
                          ? "border-red-500/20 bg-red-500/10 text-red-400"
                          : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          ticket.verificationStatus ===
                          "approved"
                            ? "bg-emerald-400"
                            : ticket.verificationStatus ===
                              "rejected"
                            ? "bg-red-400"
                            : "bg-amber-400"
                        }`}
                      />

                      {ticket.verificationStatus ||
                        "pending"}
                    </span>

                    <span className="text-xs text-gray-500">
                      {ticket.transportType}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="line-clamp-1 text-lg font-bold text-white">
                    {ticket.title}
                  </h2>

                  {/* Route */}
                  <p className="mt-2 text-sm text-gray-300">
                    {ticket.from}

                    <span className="mx-1 text-blue-400">
                      →
                    </span>

                    {ticket.to}
                  </p>

                  {/* Details */}
                  <div className="mt-4 space-y-2 border-t border-gray-800 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Price
                      </span>

                      <span className="font-semibold text-white">
                        BDT {ticket.price}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Quantity
                      </span>

                      <span className="text-gray-300">
                        {ticket.quantity}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        Departure
                      </span>

                      <span className="text-right text-gray-300">
                        {new Date(
                          ticket.departureDateTime
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Perks */}
                  {ticket.perks?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ticket.perks.map(
                        (perk, index) => (
                          <span
                            key={index}
                            className="rounded-md bg-gray-900 px-2 py-1 text-xs text-gray-400"
                          >
                            {perk}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-5 flex gap-3 border-t border-gray-800 pt-4">
                    {/* Update Button */}
                    <Link
                      href={`/dashboard/vendor/edit-ticket/${ticket._id}`}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        isRejected
                          ? "pointer-events-none cursor-not-allowed border-gray-800 bg-gray-900 text-gray-600"
                          : "border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                      aria-disabled={isRejected}
                    >
                      <Pencil width={16} height={16} />
                      Update
                    </Link>

                    {/* Delete Button */}
                    <button
                      type="button"
                      disabled={
                        isRejected || isDeleting
                      }
                      onClick={() =>
                        handleDelete(
                          ticket._id,
                          ticket.verificationStatus
                        )
                      }
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        isRejected || isDeleting
                          ? "cursor-not-allowed border-gray-800 bg-gray-900 text-gray-600"
                          : "border-red-900/40 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      }`}
                    >
                      <TrashBin
                        width={16}
                        height={16}
                      />

                      {isDeleting
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>

                  {/* Rejected Message */}
                  {isRejected && (
                    <p className="mt-3 text-center text-xs text-red-400">
                      This ticket was rejected and cannot be
                      modified.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-950 p-12 text-center shadow-xl shadow-black/20">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-inner">
            <Ticket width={28} height={28} />
          </div>

          <h2 className="text-lg font-bold text-white">
            No tickets added yet
          </h2>

          <p className="mt-1.5 max-w-sm text-sm text-gray-400">
            You haven&apos;t published any tickets. Start
            adding routes for users to book.
          </p>

          <Link
            href="/dashboard/vendor/add-ticket"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus width={16} height={16} />
            Add Your First Ticket
          </Link>
        </div>
      )}
    </div>
  );
}