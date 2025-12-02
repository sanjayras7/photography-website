export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <p className="text-gray-600">Welcome to your photography portfolio admin panel.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">Portfolio Status</h3>
                    <p className="text-gray-500">System is active and running.</p>
                </div>
            </div>
        </div>
    )
}
