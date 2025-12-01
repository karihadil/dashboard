"use client";
import TransactionsTable from "./components/TransactionsTable";
import CreditPanel from "./components/CreditPanel";
import ListsPanel from "./components/ListsPanel";
import FaceSearchPanel from "./components/FaceSearchPanel";
import StatCard from "./components/StatCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Page() {
  const stats = [
    { title: "Total Verifications", value: "2,543", accent: "blue" },
    { title: "Pending Review", value: 45, accent: "yellow" },
    { title: "High Risk Alerts", value: 12, accent: "red" },
    { title: "Auto-Approval Rate", value: "89.4%", accent: "green" },
  ];

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Verifications",
        data: [65, 60, 80, 82, 55, 58, 40],
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(47,139,255,0.12)",
        borderColor: "#2f8bff",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#2f8bff",
      },
    ],
  };

  const donutData = {
    labels: ["Low Risk", "Medium", "High Risk"],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ["#2f8bff", "#ffcc00", "#ff6b6b"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} accent={s.accent as any} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Verification Volume (7 Days)</h3>
            
          </div>
          <Line data={lineData} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Risk Distribution</h3>
          <Doughnut data={donutData} />
          <div className="mt-4 text-sm">
            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#2f8bff]"/> Low Risk</div><div>75%</div></div>
            <div className="flex items-center justify-between mt-2"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#ffcc00]"/> Medium</div><div>15%</div></div>
            <div className="flex items-center justify-between mt-2"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#ff6b6b]"/> High Risk</div><div>10%</div></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2">
          <TransactionsTable />
        </div>

        <div className="space-y-4">
          {/* Quick side panels (reuse your simple components or inline) */}
          <div className="bg-white rounded p-4 shadow">
            <h4 className="font-semibold">Credit Decisions</h4>
            <div className="mt-2 text-sm">Pending: <span className="font-semibold">5</span></div>
            <div className="text-sm">Approved today: <span className="font-semibold">2</span></div>
          </div>

          <div className="bg-white rounded p-4 shadow">
            <h4 className="font-semibold">Interpol Photo Search</h4>
            <div className="mt-2 text-sm">Server status: <span className="font-semibold">Not connected</span></div>
            <div className="text-sm">Last matches: <span className="font-semibold">3</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
