"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bus,
  Calendar,
  Car,
  Plane,
  Ship,
  Star,
  Train,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdvertisementSection() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisedTickets = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/tickets/advertised`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch advertised tickets."
          );
        }

        setTickets(
          Array.isArray(data.tickets)
            ? data.tickets
            : []
        );
      } catch (error) {
        console.error(
          "Advertisement error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisedTickets();
  }, []);

  const getTransportIcon = (type) => {
    const transport = type?.toLowerCase();

    if (transport === "bus") {
      return <Bus width={15} height={15} />;
    }

    if (transport === "train") {
      return <Train width={15} height={15} />;
    }

    if (
      transport === "plane" ||
      transport === "flight"
    ) {
      return <Plane width={15} height={15} />;
    }

    if (
      transport === "ship" ||
      transport === "launch"
    ) {
      return <Ship width={15} height={15} />;
    }

    return <Car width={15} height={15} />;
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-800 border-t-blue-500" />
        </div>
      </section>
    );
  }

  if (tickets.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">

  
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500">
            <Star
              width={13}
              height={13}
            />

            Featured
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Advertised Tickets
          </h2>

          <p className="mt-2 max-w-xl text-xs text-gray-400">
            Discover specially featured tickets from
            trusted TicketNest vendors.
          </p>
        </div>

        <Link
          href="/tickets"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 transition hover:text-blue-300"
        >
          View All Tickets

          <ArrowRight
            width={14}
            height={14}
          />
        </Link>
      </div>

      {/* =========================================
          Advertisement Cards
      ========================================== */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.slice(0, 6).map((ticket) => (
          <div
            key={ticket._id}
            className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30"
          >

            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-900">

              {ticket.image ? (
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-900 text-gray-600">
                  {getTransportIcon(
                    ticket.transportType
                  )}
                </div>
              )}

              {/* Featured Badge */}
              <div className="absolute left-3 top-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-gray-950/90 px-2.5 py-1.5 text-[10px] font-bold text-blue-400 backdrop-blur-md">
                  <Star
                    width={11}
                    height={11}
                  />

                  FEATURED
                </span>
              </div>

              {/* Transport Badge */}
              <div className="absolute right-3 top-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-950/90 px-2.5 py-1.5 text-[10px] font-semibold text-gray-200 backdrop-blur-md">
                  {getTransportIcon(
                    ticket.transportType
                  )}

                  <span className="capitalize">
                    {ticket.transportType ||
                      "Transport"}
                  </span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5">

              {/* Title */}
              <div className="flex items-start justify-between gap-3">

                <h3 className="line-clamp-1 text-base font-bold text-white transition group-hover:text-blue-400">
                  {ticket.title}
                </h3>

                <div className="shrink-0 text-right">
                  <p className="text-[9px] uppercase tracking-wide text-gray-500">
                    From
                  </p>

                  <p className="text-lg font-black text-blue-500">
                    ৳
                    {Number(
                      ticket.price || 0
                    ).toLocaleString()}
                  </p>
                </div>

              </div>

              {/* Route */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900/60 px-3 py-3">

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] uppercase tracking-wide text-gray-500">
                    From
                  </p>

                  <p className="truncate text-xs font-semibold text-gray-200">
                    {ticket.from}
                  </p>
                </div>

                <ArrowRight
                  width={15}
                  height={15}
                  className="shrink-0 text-blue-500"
                />

                <div className="min-w-0 flex-1 text-right">
                  <p className="text-[9px] uppercase tracking-wide text-gray-500">
                    To
                  </p>

                  <p className="truncate text-xs font-semibold text-gray-200">
                    {ticket.to}
                  </p>
                </div>

              </div>

              {/* Date */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">

                <Calendar
                  width={14}
                  height={14}
                  className="shrink-0 text-blue-500"
                />

                <span>
                  {ticket.departureDateTime
                    ? new Date(
                        ticket.departureDateTime
                      ).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Date unavailable"}
                </span>

              </div>

              {/* Bottom */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">

                <div>
                  <p className="text-[9px] uppercase tracking-wide text-gray-500">
                    Availability
                  </p>

                  <p className="mt-1 text-xs font-semibold text-gray-300">
                    {ticket.quantity || 0} seats available
                  </p>
                </div>

                <Link
                  href={`/tickets/${ticket._id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
                >
                  View Ticket

                  <ArrowRight
                    width={13}
                    height={13}
                  />
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}