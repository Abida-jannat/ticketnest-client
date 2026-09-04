import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
          Welcome back
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
          User Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Manage your profile, booked tickets, and transactions.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Link
          href="/dashboard/profile"
          className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:border-blue-600 hover:bg-gray-900"
        >
          <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
            User Profile
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            View and manage your account information.
          </p>
        </Link>

        <Link
          href="/dashboard/tickets"
          className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:border-blue-600 hover:bg-gray-900"
        >
          <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
            My Booked Tickets
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            View all your booked travel tickets.
          </p>
        </Link>

        <Link
          href="/dashboard/transactions"
          className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:border-blue-600 hover:bg-gray-900"
        >
          <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
            Transaction History
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            View your previous payment transactions.
          </p>
        </Link>
      </div>
    </div>
  );
}