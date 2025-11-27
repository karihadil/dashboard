// app/lists/page.tsx
import ListsPanel from "../components/ListsPanel";

export default function ListsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">International Lists</h1>
            <ListsPanel />
        </div>
    );
}
