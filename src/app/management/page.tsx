// app/transactions/page.tsx
import TransactionsTable from "../components/TransactionsTable";

export default function TransactionsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <TransactionsTable />
        </div>
    );
}
