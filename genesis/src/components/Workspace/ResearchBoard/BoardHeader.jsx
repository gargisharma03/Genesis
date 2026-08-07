import { BookOpen } from "lucide-react";

export default function BoardHeader() {
    return (
        <div className="flex items-center justify-between border-b px-6 py-4">

            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                    <BookOpen size={20} />
                </div>

                <div>

                    <h2 className="font-semibold text-lg">
                        Research Board
                    </h2>

                    <p className="text-sm text-zinc-500">
                        Organize ideas while reading
                    </p>

                </div>

            </div>

        </div>
    );
}