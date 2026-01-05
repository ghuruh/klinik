export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar or Topbar can be added here */}
            <main>{children}</main>
        </div>
    );
}
