// src/components/TopBar.tsx
import { Menu, Bell, Search, AlertTriangle, CircleCheck } from "lucide-react";

export default function TopBar({ toggleSidebar }: { toggleSidebar?: () => void }) {
    return (
        <header className="flex items-center justify-between bg-white p-1 shadow-sm">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-700 p-2 rounded hover:bg-gray-100"
                >
                    <Menu size={22} />
                </button>

            
                <div className="text-sm font-semibold ml-2 text-black">Dashboard Overview</div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                
            

                <div className="relative flex items-center">
                    <Search size={16} className="absolute left-3 text-gray-400" />
                    <input
                        className="border rounded pl-9 pr-3 py-1 text-sm"
                        placeholder="Global Search..."
                    />
                </div>

                <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer">
                    <Bell size={18} className="text-gray-700" />
                </div>
            </div>
        </header>
    );
}
