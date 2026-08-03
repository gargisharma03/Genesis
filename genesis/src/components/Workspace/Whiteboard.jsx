import {
    Plus
} from "lucide-react";

export default function Whiteboard() {
    return (

        <div className="rounded-3xl border bg-white h-full p-6">

            <h2 className="text-xl font-semibold">
                Whiteboard
            </h2>

            <p className="text-sm text-zinc-500 mt-2">
                Brainstorm ideas while reading.
            </p>

            <div className="mt-8 space-y-4">

                <div className="rounded-xl bg-yellow-100 p-4">
                    Compare GPT-4 and Claude results
                </div>

                <div className="rounded-xl bg-blue-100 p-4">
                    Explain Figure 6
                </div>

                <div className="rounded-xl bg-green-100 p-4">
                    Check related work
                </div>

            </div>

            <button className="mt-8 w-full py-3 rounded-xl border flex justify-center items-center gap-2 hover:bg-zinc-50">

                <Plus size={18} />

                New Note

            </button>

        </div>

    );
}