// src/components/SideNav.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Landmark,
    Globe,
    Camera,
    BadgeCheck,
    Trophy,
    User,
    CreditCard
} from "lucide-react";

const navItems = [
    { href: "/", label: "Overview", icon: LayoutDashboard },
    { href: "/case", label: "Case Management", icon: Briefcase },
    { href: "/transactions", label: "Transactions", icon: CreditCard },
    { href: "/credit", label: "Credit Decisions", icon: Landmark },
    { href: "/list", label: "Watchlists (AML)", icon: Globe },
    { href: "/photos", label: "Face Search", icon: Camera },
];

export default function SideNav({ open = true }: { open?: boolean }) {
    const pathname = usePathname();

    return (
        <aside
            className={`${open ? "translate-x-0" : "-translate-x-64"
                } bg-[#0f2b59] text-white w-64 transition-transform duration-200 flex flex-col`}
        >
            {/* Logo */}
            <div className="px-6 py-6 flex items-center gap-3 border-b border-white/10">
                <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center text-white font-bold">
                    FS
                </div>
                <div>
                    <div className="text-sm font-semibold">FINSEC</div>
                    <div className="text-xs text-white/70">SYSTEM</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-3 flex-1">
                <div className="text-xs text-white/60 uppercase px-3 mb-2">
                    Dashboards
                </div>

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer text-sm hover:bg-blue-600 transition ${active ? "bg-blue-600 font-semibold" : ""
                                    }`}
                            >
                                <Icon size={18} className="text-white" />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Monthly goal */}
            <div className="p-4 border-t border-white/10">
                <div className="bg-[#392ecf] p-3 rounded-xl">
                    <div className="text-xs text-white/60">Monthly Goal</div>

                    <div className="mt-2 flex items-center justify-between text-white text-sm">
                        <span>1,240 / 1,500</span>
                        <Trophy size={18} className="text-yellow-400" />
                    </div>

                    <div className="w-full bg-white/10 h-2 rounded mt-2">
                        <div
                            className="bg-[#2f8bff] h-2 rounded"
                            style={{ width: "74%" }}
                        />
                    </div>
                </div>
            </div>

            {/* User */}
            <div className="mt-auto p-4 border-t border-white/10 flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-[#1f4a8a] flex items-center justify-center">
                    <User size={20} />
                </div>

                <div>
                    <div className="text-sm font-medium">Operator_X</div>
                    <div className="text-xs text-white/60">Senior Analyst</div>
                </div>
            </div>
        </aside>
    );
}
