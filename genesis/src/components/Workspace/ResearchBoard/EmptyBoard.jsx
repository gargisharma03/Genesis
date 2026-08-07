import { Plus } from "lucide-react";

export default function EmptyResearchBoard({
    createBlock,
}) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
            <h2 className="text-xl font-semibold text-zinc-900">
                Your Research Board is Empty
            </h2>

            <p className="text-zinc-500">
                Capture structured ideas and notes while reading.
            </p>

            <button
                onClick={() => createBlock("text")}
                className="
                    flex
                    items-center
                    gap-2
                    bg-black
                    hover:bg-zinc-800
                    text-white
                    rounded-lg
                    px-4
                    py-2
                    transition-colors
                    cursor-pointer
                "
            >
                <Plus size={18} />
                Add First Block
            </button>
        </div>
    );
}