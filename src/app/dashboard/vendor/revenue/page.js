"use client";

import { useEffect, useState } from "react";
import {
  ChartColumnStacked,
  FileDollar,
  Ticket,
} from "@gravity-ui/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSession } from "@/lib/auth-client";

export default function RevenueOverviewPage() {
  const { data: session, isPending: sessionLoading } = useSession();

  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const vendorEmail = session?.user?.email;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  

  useEffect(() => {
    if (sessionLoading) return;

    if (!vendorEmail) {
       // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern//
      setLoading(false);
      return;
    }

    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch vendor tickets
        const ticketsResponse = await fetch(
          `${apiUrl}/api/tickets/vendor?vendorEmail=${encodeURIComponent(
            vendorEmail
          )}`
        );

        if (!ticketsResponse.ok) {
          throw new Error("Failed to fetch vendor tickets.");
        }

        const ticketsData = await ticketsResponse.json();

        // Fetch vendor bookings
        const bookingsResponse = await fetch(
          `${apiUrl}/api/bookings/vendor?vendorEmail=${encodeURIComponent(
            vendorEmail
          )}`
        );

        if (!bookingsResponse.ok) {
          throw new Error("Failed to fetch vendor bookings.");
        }

        const bookingsData = await bookingsResponse.json();

        setTickets(ticketsData.tickets || []);
        setBookings(bookingsData.bookings || []);
      } catch (err) {
        console.error("Revenue data error:", err);

        setError(
          err.message || "Failed to load revenue data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [vendorEmail, sessionLoading, apiUrl]);


  const totalTicketsAdded = tickets.length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  );

  // Total tickets sold
  const totalTicketsSold = acceptedBookings.reduce(
    (total, booking) =>
      total + Number(booking.quantity || 0),
    0
  );

  // Total revenue
  const totalRevenue = acceptedBookings.reduce(
    (total, booking) =>
      total + Number(booking.totalPrice || 0),
    0
  );

 
  const chartData = [
    {
      name: "Tickets Added",
      value: totalTicketsAdded,
    },
    {
      name: "Tickets Sold",
      value: totalTicketsSold,
    },
    {
      name: "Revenue",
      value: totalRevenue,
    },
  ];

  

  const stats = [
    {
      title: "Total Tickets Added",
      value: totalTicketsAdded,
      change: "Tickets added by you",
      icon: Ticket,
    },
    {
      title: "Tickets Sold",
      value: totalTicketsSold,
      change: "From accepted bookings",
      icon: ChartColumnStacked,
    },
    {
      title: "Total Revenue",
      value: `BDT ${totalRevenue.toLocaleString()}`,
      change: "From accepted bookings",
      icon: FileDollar,
    },
  ];

  // ==========================================
  // LOADING
  // ==========================================

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <p className="mt-3 text-sm text-gray-400">
            Loading revenue overview...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NO SESSION
  // ==========================================

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

  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ========================================
          HEADER
      ======================================== */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Revenue Overview
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Monitor your earnings, ticket sales, and revenue.
        </p>
      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* ========================================
          STATS GRID
      ======================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-xl shadow-black/20"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  {stat.title}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <Icon width={20} height={20} />
                </div>
              </div>

              <div className="text-2xl font-bold text-white">
                {stat.value}
              </div>

              <div className="mt-2 flex items-center text-xs text-emerald-400">
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================
          REVENUE CHART
      ======================================== */}

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-xl shadow-black/20">

        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">
            Revenue Summary
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Overview of your tickets added, tickets sold,
            and total revenue.
          </p>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2937"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#374151",
                }}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(255,255,255,0.03)",
                }}
                contentStyle={{
                  backgroundColor: "#030712",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                labelStyle={{
                  color: "#fff",
                  fontWeight: "600",
                }}
                itemStyle={{
                  color: "#60a5fa",
                }}
                formatter={(value) => [
                  Number(value).toLocaleString(),
                  "Value",
                ]}
              />

              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  color: "#9ca3af",
                }}
              />

              <Bar
                dataKey="value"
                name="Metric"
                radius={[8, 8, 0, 0]}
                fill="#3b82f6"
                barSize={70}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ========================================
          RECENT PAYOUT TRANSACTIONS
      ======================================== */}

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-xl shadow-black/20">

        <h2 className="mb-4 text-lg font-bold text-white">
          Recent Payout Transactions
        </h2>

        {acceptedBookings.length > 0 ? (
          <div className="overflow-x-auto">

            <table className="w-full border-collapse text-left">

              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Transaction ID
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Ticket Title
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Seats
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Amount Earned
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Date
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800 text-gray-300">

                {acceptedBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="transition hover:bg-gray-900/40"
                  >

                    <td className="p-4 text-sm font-mono text-blue-400">
                      {booking._id}
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
                        booking.totalPrice || 0
                      ).toLocaleString()}
                    </td>

                    <td className="p-4 text-sm text-gray-400">
                      {booking.createdAt
                        ? new Date(
                            booking.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4 text-sm">

                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        Paid

                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No revenue records found yet.
          </p>
        )}

      </div>

    </div>
  );
}