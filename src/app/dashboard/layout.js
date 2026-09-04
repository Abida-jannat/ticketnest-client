import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)]">

        {/* Sidebar Section */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800 bg-gray-950 p-6">
          <DashboardSidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-950 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}