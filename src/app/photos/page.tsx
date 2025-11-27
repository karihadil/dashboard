// app/photos/page.tsx
import FaceSearchPanel from "../components/FaceSearchPanel";

export default function PhotosPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Interpol Photo Search</h1>
            <FaceSearchPanel />
        </div>
    );
}
