import Link from "next/link";

export default function SideNav({ open = true }: { open?: boolean }) {
    return (
        <aside
            className={`bg-gray-800 text-white w-64 transition-transform ${open ? "translate-x-0" : "-translate-x-64"
                }`}
        >
            <div className="p-6 font-bold text-lg">AML Dashboard</div>
            <nav className="flex flex-col p-2 space-y-1">
                <Link href="/" className="block p-2 rounded hover:bg-gray-700">Overview</Link>
                <Link href="/transactions" className="block p-2 rounded hover:bg-gray-700">Transactions</Link>
                <Link href="/credit" className="block p-2 rounded hover:bg-gray-700">Credit Decisions</Link>
                <Link href="/lists" className="block p-2 rounded hover:bg-gray-700">International Lists</Link>
                <Link href="/photos" className="block p-2 rounded hover:bg-gray-700">Interpol Photos</Link>
            </nav>
        </aside>
    );
}
