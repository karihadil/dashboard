export default function CreditPanel() {
    return (
        <div className="bg-white rounded shadow p-4 mb-4">
            <h4 className="font-semibold">Credit Decisions</h4>
            <div className="mt-2 text-sm">Pending: <span className="font-bold">5</span></div>
            <div className="text-sm">Approved today: <span className="font-bold">2</span></div>
        </div>
    );
}
