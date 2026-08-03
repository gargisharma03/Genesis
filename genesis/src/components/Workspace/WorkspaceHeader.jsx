import {
    Share2,
    Settings,
    UserPlus
} from "lucide-react";

export default function WorkspaceHeader() {
    return (
        <div className="flex justify-between items-center">

            <div>

                <p className="uppercase tracking-[0.2em] text-xs text-zinc-400">
                    Workspace
                </p>

                <h1 className="text-4xl font-semibold mt-2">
                    LLM Hallucination Research
                </h1>

                <p className="text-zinc-500 mt-2">
                    Updated 3 minutes ago
                </p>

            </div>

            <div className="flex gap-3">

                <button className="border px-5 py-3 rounded-xl flex gap-2 items-center hover:bg-zinc-100">

                    <UserPlus size={18} />

                    Invite

                </button>

                <button className="border px-5 py-3 rounded-xl flex gap-2 items-center hover:bg-zinc-100">

                    <Share2 size={18} />

                    Share

                </button>

                <button className="border p-3 rounded-xl hover:bg-zinc-100">

                    <Settings size={18} />

                </button>

            </div>

        </div>
    );
}