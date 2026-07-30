import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative w-full max-w-xl">

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
                type="text"
                placeholder="Search papers, notes, collections..."
                className="w-full pl-12 pr-24 py-3 rounded-xl
                           bg-white
                           border border-zinc-200
                           focus:outline-none
                           focus:ring-2
                           focus:ring-fuchsia-500
                           focus:border-fuchsia-500
                           text-sm"
            />

            <div
                className="absolute right-4 top-1/2
                           -translate-y-1/2
                           text-xs
                           text-zinc-400
                           border
                           border-zinc-200
                           rounded-md
                           px-2
                           py-1"
            >
                Ctrl K
            </div>

        </div>
    );
}