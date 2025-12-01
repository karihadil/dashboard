export default function StatCard({
    title,
    value,
    accent,
}: {
    title: string;
    value: number | string;
    accent?: "blue" | "yellow" | "red" | "green";
}) {
    const border =
        accent === "yellow"
            ? "border-yellow-400"
            : accent === "red"
                ? "border-red-400"
                : accent === "green"
                    ? "border-green-400"
                    : "border-blue-400";

    return (
        <div className={`bg-white rounded-xl p-4 border ${border} shadow-sm`}>
            <div className="text-xs text-black uppercase">{title}</div>
            <div className="text-2xl text-black font-semibold mt-2">{value}</div>
        </div>
    );
}
