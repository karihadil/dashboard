export default function TopBar({ toggleSidebar }: { toggleSidebar?: () => void }) {
    return (
        <header className="flex items-center justify-between bg-white p-4 shadow">
            <button onClick={toggleSidebar} className="text-xl">☰</button>
            <div className="font-semibold">AML Dashboard</div>
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">Analyst</div>
            </div>
        </header>
    );
}