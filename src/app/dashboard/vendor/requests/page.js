import { ListCheck, Check, Xmark } from "@gravity-ui/icons";

export default function RequestedBookingsPage() {
  // Sample requested bookings array - replace with your actual fetched database data later
  const bookings = [
    {
      id: "req_987654",
      userEmail: "user@example.com",
      ticketTitle: "Dhaka to Sylhet Express",
      seatsBooked: 2,
      totalAmount: "BDT 2400",
      status: "Pending",
      date: "2026-09-05",
    },
  ];

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

      {bookings.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-xl shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Booking ID</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">User Email</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Ticket Title</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Seats</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Amount</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {bookings.map((booking, index) => (
                  <tr key={index} className="transition hover:bg-gray-900/40">
                    <td className="p-4 text-sm font-mono text-blue-400">{booking.id}</td>
                    <td className="p-4 text-sm text-gray-300">{booking.userEmail}</td>
                    <td className="p-4 text-sm font-semibold text-white">{booking.ticketTitle}</td>
                    <td className="p-4 text-sm text-gray-400">{booking.seatsBooked}</td>
                    <td className="p-4 text-sm font-medium text-white">{booking.totalAmount}</td>
                    <td className="p-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-right space-x-2">
                      <button className="inline-flex items-center justify-center rounded-lg border border-emerald-900/40 bg-emerald-500/10 p-2 text-emerald-400 hover:bg-emerald-500/20 transition">
                        <Check width={16} height={16} />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-lg border border-red-900/40 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition">
                        <Xmark width={16} height={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-950 p-12 text-center shadow-xl shadow-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 shadow-inner">
            <ListCheck width={28} height={28} />
          </div>

          <h2 className="text-lg font-bold text-white">No booking requests</h2>
          
          <p className="mt-1.5 max-w-sm text-sm text-gray-400">
            There are no pending booking requests for your tickets at the moment.
          </p>
        </div>
      )}
    </div>
  );
}