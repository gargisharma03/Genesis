import {
    FilePlus2
} from "lucide-react";

export default function PdfPlaceholder() {
    return (

        <div className="rounded-3xl border bg-white h-full flex flex-col justify-center items-center">

            <FilePlus2
                size={50}
                className="text-zinc-400"
            />

            <h2 className="mt-6 text-2xl font-semibold">
                PDF Viewer
            </h2>

            <p className="mt-2 text-zinc-500">
                Upload or open a research paper.
            </p>

            <button className="mt-8 px-6 py-3 rounded-xl bg-black text-white">
                Upload Paper
            </button>

        </div>

    );
}