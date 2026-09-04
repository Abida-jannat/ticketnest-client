import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "@gravity-ui/icons";

// Admin-chosen featured tickets with Deshi flavor (Exactly 6 cards)
const featuredTickets = [
  {
    id: "1",
    title: "Dhaka to Sylhet Green Express",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    price: 1200,
    quantity: 12,
    transportType: "Bus",
    perks: ["AC", "Wi-Fi", "Mineral Water"],
  },
  {
    id: "2",
    title: "Dhaka to Cox's Bazar Night Sleeper",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800",
    price: 1800,
    quantity: 5,
    transportType: "Bus",
    perks: ["Sleeper Berth", "Blanket", "Charging Port"],
  },
  {
    id: "3",
    title: "Chittagong to Bandarban Hill Cruiser",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    price: 950,
    quantity: 8,
    transportType: "Car",
    perks: ["4WD Setup", "Expert Driver", "Scenic Stops"],
  },
  {
    id: "4",
    title: "Sylhet to Sreemangal Tea Garden Trip",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    price: 2500,
    quantity: 4,
    transportType: "Car",
    perks: ["Private AC", "Tour Guide", "Photo Stops"],
  },
  {
    id: "5",
    title: "Dhaka to Rajshahi Silk City Express",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    price: 1000,
    quantity: 15,
    transportType: "Bus",
    perks: ["AC", "Recliner Seats", "Snacks"],
  },
  {
    id: "6",
    title: "Dhaka Airport VIP Shuttle",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800",
    price: 3000,
    quantity: 3,
    transportType: "Car",
    perks: ["Meet & Greet", "Flight Tracking", "Luggage Help"],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 px-4 py-8 sm:px-6">
      
      {/* 1. Hero Banner / Slider Section */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 px-6 py-20 sm:px-12 lg:py-28 shadow-2xl">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 mb-6">
            <Sparkles width={14} height={14} />
            <span>Bangladesh Smart Travel Booking Platform</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            Travel Deshi, Travel Smarter with <span className="text-blue-500">TicketNest</span>
          </h1>
          
          <p className="mt-4 text-base text-gray-400 sm:text-lg">
            Book verified intercity buses, comfortable private cars, and scenic holiday routes across Bangladesh instantly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tickets"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Explore All Tickets
              <ArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Admin Advertisement Section (Exactly 6 Featured Tickets) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">Popular Routes</div>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Admin Featured Tickets</h2>
          </div>
          <p className="text-xs text-gray-400 max-w-sm">Hand-selected high-demand routes across popular Bangladeshi destinations verified by administration.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30"
            >
              <div>
                {/* Image & Transport Type Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-lg border border-gray-800 bg-gray-950/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    {ticket.transportType}
                  </span>
                </div>

                {/* Ticket Details Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                    {ticket.title}
                  </h3>

                  <div className="mt-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-white">৳{ticket.price}</span>
                      <span className="text-xs text-gray-500"> / unit</span>
                    </div>
                    <div className="text-xs font-medium text-gray-400">
                      Stock: <span className="text-white font-bold">{ticket.quantity}</span> left
                    </div>
                  </div>

                  {/* Perks List */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {ticket.perks.map((perk, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-2.5 py-1 text-[11px] text-gray-300 border border-gray-800"
                      >
                        <Check width={12} height={12} className="text-blue-500" />
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  href={`/tickets/${ticket.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 py-3 text-xs font-bold text-white transition hover:border-blue-500 hover:bg-blue-600"
                >
                  See details
                  <ArrowRight width={14} height={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
