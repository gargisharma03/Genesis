import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function PaperItem({
    paper,
    selectedPaper,
    setSelectedPaper,
    collapsed,
}) {
    const active = selectedPaper?._id === paper._id;

    return (
        <button
            onClick={() => setSelectedPaper(paper)}
            className={`
                w-full
                text-left
                rounded-xl
                p-3
                transition
                border

                ${
                    active
                        ? "bg-zinc-100 border-zinc-300"
                        : "border-transparent hover:bg-zinc-50"
                }
            `}
        >
            <div className="flex items-center gap-3">

                <FileText
                    size={18}
                    className="text-zinc-400 shrink-0"
                />

                {!collapsed && (

                    <div className="min-w-0">

                        <p className="truncate font-medium">
                            {paper.title}
                        </p>

                        <p className="text-xs text-zinc-500">
                            {formatDistanceToNow(
                                new Date(paper.createdAt),
                                { addSuffix: true }
                            )}
                        </p>

                    </div>

                )}

            </div>

        </button>
    );
}