import React from "react";

const rows = [
    { id: 1, account: "ACC123", amount: "$12,000", risk: "High" },
    { id: 2, account: "ACC234", amount: "$2,400", risk: "Medium" },
    { id: 3, account: "ACC345", amount: "$500", risk: "Low" },
];

export default function TransactionsTable() {
    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-3">Transactions (static)</h3>
            <table className="min-w-full text-left text-sm">
                <thead className="text-gray-600">
                    <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Account</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Risk</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={r.id} className="border-t">
                            <td className="py-2">{r.id}</td>
                            <td className="py-2">{r.account}</td>
                            <td className="py-2">{r.amount}</td>
                            <td className="py-2">{r.risk}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
