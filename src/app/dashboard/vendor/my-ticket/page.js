import Link from "next/link";
import { Ticket, Plus, TrashBin, Pencil } from "@gravity-ui/icons";

export default function MyAddedTicketsPage() {
  // Sample added tickets array - replace with your actual fetched database data later
  const addedTickets = [
    {
      id: "tkt_001",
      title: "Dhaka to Sylhet Express",
      route: "Dhaka → Sylhet",
      price: "BDT 1200",
      seats: "38/40",
      date: "2026-09-10 10:00 AM",
      status: "Active",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            My Added Tickets
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage, update, or remove the tickets you have published.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/add-ticket"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 w-fit"
        >
          <Plus width={16} height={16} />
          <span>Add New Ticket</span>
        </Link>
      </div>

      {addedTickets.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-xl shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Route Title</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Journey Route</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Price</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Seats Left</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Departure</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {addedTickets.map((ticket, index) => (
                  <tr key={index} className="transition hover:bg-gray-900/40">
                    <td className="p-4 text-sm font-semibold text-white">{ticket.title}</td>
                    <td className="p-4 text-sm text-gray-300">{ticket.route}</td>
                    <td className="p-4 text-sm font-medium text-white">{ticket.price}</td>
                    <td className="p-4 text-sm text-gray-400">{ticket.seats}</td>
                    <td className="p-4 text-sm text-gray-400">{ticket.date}</td>
                    <td className="p-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-right space-x-2">
                      <button className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 p-2 text-gray-300 hover:bg-gray-800 hover:text-white transition">
                        <Pencil width={16} height={16} />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-lg border border-red-900/40 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition">
                        <TrashBin width={16} height={16} />
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
            <Ticket width={28} height={28} />
          </div>

          <h2 className="text-lg font-bold text-white">No tickets added yet</h2>
          
          <p className="mt-1.5 max-w-sm text-sm text-gray-400">
            You haven&apos;t published any tickets. Start adding routes for users to book.
          </p>
        </div>
      )}
    </div>
  );
}