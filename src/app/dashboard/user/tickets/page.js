import Link from "next/link";
import { Ticket, ArrowRight } from "@gravity-ui/icons";

export default function BookedTicketsPage() {
  // Sample placeholder ticket data - replace this with your actual fetched tickets array later
  const bookedTickets = [];

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            My Booked Tickets
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            View and manage all your booked travel tickets.
          </p>
        </div>

        <Link
          href="/tickets"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 w-fit"
        >
          <span>Explore Tickets</span>
          <ArrowRight width={16} height={16} />
        </Link>
      </div>

      {bookedTickets.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Map your actual tickets here later */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-950 p-12 text-center shadow-xl shadow-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 shadow-inner">
            <Ticket width={28} height={28} />
          </div>

          <h2 className="text-lg font-bold text-white">No booked tickets found</h2>
          
          <p className="mt-1.5 max-w-sm text-sm text-gray-400">
            You haven&apos;t booked any travel tickets yet. Explore available tickets and start your journey with TicketNest.
          </p>

          <Link
            href="/tickets"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 hover:border-gray-600"
          >
            Browse Available Tickets
          </Link>
        </div>
      )}
    </div>
  );
}