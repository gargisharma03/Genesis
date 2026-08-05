import { Upload } from "lucide-react";

export default function Emptystate() {
    return (
        <div className="h-full rounded-2xl border border-dashed border-zinc-300 bg-white flex flex-col items-center justify-center">

            <Upload
                size={48}
                className="text-zinc-300"
            />

            <h2 className="mt-6 text-2xl font-semibold">
                No paper selected
            </h2>

            <p className="mt-2 text-zinc-500 text-center max-w-sm">
                Upload a research paper or choose one from the sidebar to begin reading.
            </p>

        </div>
    );
}