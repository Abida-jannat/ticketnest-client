import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function UserDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full shrink-0 border-b border-gray-800 bg-gray-950 p-4 sm:p-6 md:w-64 md:border-b-0 md:border-r">
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 bg-gray-950 p-4 sm:p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}