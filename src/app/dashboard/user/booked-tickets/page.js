"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function MyBookedTickets() {
  const { data: session, isPending: sessionLoading } = useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = session?.user?.email;

  const fetchBookings = async () => {
    if (!userEmail) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user?userEmail=${encodeURIComponent(
          userEmail
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load booked tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading && userEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
      fetchBookings();
    }
  }, [sessionLoading, userEmail]);

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Please login first
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Booked Tickets
        </h1>

        <p className="mt-2 text-gray-500">
          View your booked tickets and payment status.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">
            No booked tickets
          </h2>

          <p className="mt-2 text-gray-500">
            You havent booked any tickets yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onPaymentSuccess={fetchBookings}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking, onPaymentSuccess }) {
  const [timeLeft, setTimeLeft] = useState(
    getTimeLeft(booking.departureDateTime)
  );

  const departurePassed =
    new Date(booking.departureDateTime) <= new Date();

  useEffect(() => {
    if (
      booking.status === "rejected" ||
      booking.status === "paid" ||
      departurePassed
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(booking.departureDateTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [
    booking.departureDateTime,
    booking.status,
    departurePassed,
  ]);

  const handlePayNow = async () => {
    if (departurePassed) {
      alert(
        "Payment is not allowed because the departure time has passed."
      );
      return;
    }

    if (booking.status !== "accepted") {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: booking._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create payment session"
        );
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Payment failed");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="h-48 w-full bg-gray-100">
        {booking.image ? (
          <img
            src={booking.image}
            alt={booking.ticketTitle}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">
            {booking.ticketTitle}
          </h2>

          <StatusBadge status={booking.status} />
        </div>

        {/* Route */}
        <div className="mb-4 rounded-lg bg-gray-50 p-3">
          <p className="font-medium text-gray-800">
            {booking.from} → {booking.to}
          </p>
        </div>

        {/* Booking Quantity */}
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">
            Booking Quantity
          </span>

          <span className="font-semibold">
            {booking.quantity}
          </span>
        </div>

        {/* Unit Price */}
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">
            Unit Price
          </span>

          <span className="font-semibold">
            ৳{Number(booking.unitPrice).toLocaleString()}
          </span>
        </div>

        {/* Total Price */}
        <div className="mb-4 flex justify-between border-t pt-3">
          <span className="font-medium text-gray-700">
            Total Price
          </span>

          <span className="text-lg font-bold text-blue-600">
            ৳{Number(booking.totalPrice).toLocaleString()}
          </span>
        </div>

        {/* Departure */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Departure
          </p>

          <p className="font-medium text-gray-800">
            {formatDate(booking.departureDateTime)}
          </p>
        </div>

        {/* Countdown */}
        {booking.status !== "rejected" &&
          booking.status !== "paid" &&
          !departurePassed && (
            <div className="mb-4 rounded-lg bg-blue-50 p-3 text-center">
              <p className="text-xs font-medium text-blue-600">
                Time Remaining
              </p>

              <p className="mt-1 text-lg font-bold text-blue-700">
                {formatCountdown(timeLeft)}
              </p>
            </div>
          )}

        {/* Departure passed */}
        {booking.status === "accepted" &&
          departurePassed && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
              Departure time has passed. Payment is unavailable.
            </div>
          )}

        {/* Pay Now */}
        {booking.status === "accepted" &&
          booking.paymentStatus !== "paid" &&
          !departurePassed && (
            <button
              onClick={handlePayNow}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Pay Now — ৳
              {Number(booking.totalPrice).toLocaleString()}
            </button>
          )}

        {/* Paid */}
        {booking.status === "paid" && (
          <div className="rounded-lg bg-green-50 p-3 text-center font-semibold text-green-700">
            Payment Completed ✓
          </div>
        )}

        {/* Rejected */}
        {booking.status === "rejected" && (
          <div className="rounded-lg bg-red-50 p-3 text-center font-medium text-red-600">
            Booking rejected by vendor
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    paid: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function getTimeLeft(departureDateTime) {
  const difference =
    new Date(departureDateTime).getTime() -
    new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function formatCountdown(time) {
  return `${time.days}d ${String(time.hours).padStart(
    2,
    "0"
  )}h ${String(time.minutes).padStart(
    2,
    "0"
  )}m ${String(time.seconds).padStart(
    2,
    "0"
  )}s`;
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}