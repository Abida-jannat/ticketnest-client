"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { ListCheck, Check, Xmark } from "@gravity-ui/icons";

export default function RequestedBookingsPage() {
  const { data: session, isPending: sessionLoading } =
    useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const vendorEmail = session?.user?.email;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch vendor booking requests
  useEffect(() => {
    if (sessionLoading) return;

    if (!vendorEmail) {
       // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${apiUrl}/api/bookings/vendor?vendorEmail=${encodeURIComponent(
            vendorEmail
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch booking requests."
          );
        }

        setBookings(data.bookings || []);
      } catch (err) {
        console.error(
          "Fetch bookings error:",
          err
        );

        setError(
          err.message ||
            "Failed to load booking requests."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [vendorEmail, sessionLoading, apiUrl]);

  // Accept or reject booking
  const handleStatusChange = async (
    bookingId,
    status
  ) => {
    if (!vendorEmail) {
      alert("Vendor information is missing.");
      return;
    }

    const action =
      status === "accepted"
        ? "accept"
        : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this booking?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingId(bookingId);

      const response = await fetch(
        `${apiUrl}/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendorEmail,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${action} booking.`
        );
      }

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status:
                  data.booking?.status || status,
              }
            : booking
        )
      );

      alert(
        `Booking ${status} successfully.`
      );
    } catch (err) {
      console.error(
        "Update booking status error:",
        err
      );

      alert(
        err.message ||
          `Failed to ${action} booking.`
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Loading state
  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <p className="mt-3 text-sm text-gray-400">
            Loading booking requests...
          </p>
        </div>
      </div>
    );
  }

  // Vendor not logged in
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Requested Bookings
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Review and manage ticket booking requests from users.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {bookings.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-xl shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Booking ID
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    User Email
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Ticket Title
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Seats
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Amount
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800 text-gray-300">
                {bookings.map((booking) => {
                  const isPending =
                    booking.status === "pending";

                  const isUpdating =
                    updatingId === booking._id;

                  return (
                    <tr
                      key={booking._id}
                      className="transition hover:bg-gray-900/40"
                    >
                      <td className="p-4 text-sm font-mono text-blue-400">
                        {booking._id}
                      </td>

                      <td className="p-4 text-sm text-gray-300">
                        {booking.userEmail}
                      </td>

                      <td className="p-4 text-sm font-semibold text-white">
                        {booking.ticketTitle}
                      </td>

                      <td className="p-4 text-sm text-gray-400">
                        {booking.quantity}
                      </td>

                      <td className="p-4 text-sm font-medium text-white">
                        BDT{" "}
                        {Number(
                          booking.totalPrice
                        ).toLocaleString()}
                      </td>

                      <td className="p-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold border ${
                            booking.status ===
                            "accepted"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : booking.status ===
                                "rejected"
                              ? "border-red-500/20 bg-red-500/10 text-red-400"
                              : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              booking.status ===
                              "accepted"
                                ? "bg-emerald-400"
                                : booking.status ===
                                  "rejected"
                                ? "bg-red-400"
                                : "bg-amber-400"
                            }`}
                          />

                          {booking.status}
                        </span>
                      </td>

                      <td className="p-4 text-sm text-right space-x-2">
                        {isPending ? (
                          <>
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleStatusChange(
                                  booking._id,
                                  "accepted"
                                )
                              }
                              className="inline-flex items-center justify-center rounded-lg border border-emerald-900/40 bg-emerald-500/10 p-2 text-emerald-400 hover:bg-emerald-500/20 transition disabled:cursor-not-allowed disabled:opacity-50"
                              title="Accept booking"
                            >
                              <Check
                                width={16}
                                height={16}
                              />
                            </button>

                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleStatusChange(
                                  booking._id,
                                  "rejected"
                                )
                              }
                              className="inline-flex items-center justify-center rounded-lg border border-red-900/40 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition disabled:cursor-not-allowed disabled:opacity-50"
                              title="Reject booking"
                            >
                              <Xmark
                                width={16}
                                height={16}
                              />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-600">
                            No actions
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-950 p-12 text-center shadow-xl shadow-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 shadow-inner">
            <ListCheck
              width={28}
              height={28}
            />
          </div>

          <h2 className="text-lg font-bold text-white">
            No booking requests
          </h2>

          <p className="mt-1.5 max-w-sm text-sm text-gray-400">
            There are no pending booking requests for your tickets at the moment.
          </p>
        </div>
      )}
    </div>
  );
}