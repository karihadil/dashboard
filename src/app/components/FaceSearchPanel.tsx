// components/FaceSearchPanel.tsx
export default function FaceSearchPanel() {
    return (
        <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold">Interpol Photo Search</h4>
            <div className="mt-2 text-sm">Server status: <span className="font-bold">Not connected</span></div>
            <div className="text-sm">Last matches: <span className="font-bold">3</span></div>
        </div>
    );
}
