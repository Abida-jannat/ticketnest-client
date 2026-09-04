import { ChartColumnStacked, FileDollar, Ticket, ArrowUpRight } from "@gravity-ui/icons";

export default function RevenueOverviewPage() {
  const stats = [
    { title: "Total Revenue", value: "BDT 24,000", change: "+12% this month", icon: FileDollar },
    { title: "Tickets Sold", value: "20", change: "+4 new today", icon: Ticket },
    { title: "Average Ticket Price", value: "BDT 1,200", change: "Stable", icon: ChartColumnStacked },
  ];

  const recentRevenue = [
    {
      id: "txn_987654123",
      ticketTitle: "Dhaka to Sylhet Express",
      seats: 2,
      amount: "BDT 2400",
      date: "2026-09-05",
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Revenue Overview
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Monitor your earnings, financial performance, and payouts.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-xl shadow-black/20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-400">{stat.title}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Icon width={20} height={20} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-2 flex items-center text-xs text-emerald-400">
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Earnings Table */}
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-xl shadow-black/20">
        <h2 className="text-lg font-bold text-white mb-4">Recent Payout Transactions</h2>

        {recentRevenue.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Transaction ID</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Ticket Title</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Seats</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Amount Earned</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Date</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {recentRevenue.map((item, index) => (
                  <tr key={index} className="transition hover:bg-gray-900/40">
                    <td className="p-4 text-sm font-mono text-blue-400">{item.id}</td>
                    <td className="p-4 text-sm font-semibold text-white">{item.ticketTitle}</td>
                    <td className="p-4 text-sm text-gray-400">{item.seats}</td>
                    <td className="p-4 text-sm font-medium text-white">{item.amount}</td>
                    <td className="p-4 text-sm text-gray-400">{item.date}</td>
                    <td className="p-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No revenue records found yet.</p>
        )}
      </div>
    </div>
  );
}