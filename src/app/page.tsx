import TransactionsTable from "./components/TransactionsTable";
import CreditPanel from "./components/CreditPanel";
import ListsPanel from "./components/ListsPanel";
import FaceSearchPanel from "./components/FaceSearchPanel";

type StatCardProps = {
  title: string;
  value: number;
};
function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </div>
  );
}

export default function Page() {
  const stats = [
    { title: "Suspicious Txns (24h)", value: 18 },
    { title: "Pending Credit Decisions", value: 5 },
    { title: "List Matches", value: 12 },
    { title: "Interpol Photo Matches", value: 3 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AML Central Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TransactionsTable />
        </div>

        <div className="space-y-4">
          <CreditPanel />
          <ListsPanel />
          <FaceSearchPanel />
        </div>
      </div>
    </div>
  );
}
