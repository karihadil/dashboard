import React from "react";

export default function StatCard({ title, value }: { title: string; value: number | string }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    );
}
