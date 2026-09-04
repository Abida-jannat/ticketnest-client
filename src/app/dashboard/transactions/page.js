import { CreditCard } from "@gravity-ui/icons";

// Example async server component to fetch and display Stripe transactions
export default async function TransactionsPage() {
  // TODO: Replace this fetch call with your actual API endpoint or database query
  // Example: const res = await fetch('http://localhost:3000/api/transactions');
  // const data = await res.json();
  
  const transactions = [
    {
      id: "txn_123456789",
      amount: "BDT 1200",
      title: "Intercity Express",
      date: "2026-09-05",
      status: "Successful",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Transaction History
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          View your previous Stripe payment transactions and receipts.
        </p>
      </div>

      {transactions.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-xl shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Transaction ID</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Amount</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Ticket Title</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Payment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {transactions.map((tx, index) => (
                  <tr key={index} className="transition hover:bg-gray-900/40">
                    <td className="p-4 text-sm font-mono text-blue-400">{tx.id}</td>
                    <td className="p-4 text-sm font-medium text-white">{tx.amount}</td>
                    <td className="p-4 text-sm font-semibold text-white">{tx.title}</td>
                    <td className="p-4 text-sm text-gray-400">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-950 p-12 text-center shadow-xl shadow-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 shadow-inner">
            <CreditCard width={28} height={28} />
          </div>

          <h2 className="text-lg font-bold text-white">No transactions found</h2>
          
          <p className="mt-1.5 max-w-sm text-sm text-gray-400">
            You haven&apos;t made any transactions yet. Your Stripe payment records will show up here once you book tickets.
          </p>
        </div>
      )}
    </div>
  );
}