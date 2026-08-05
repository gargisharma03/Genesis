import { Share2, Search, Settings } from "lucide-react";

export default function WorkspaceHeader({ workspace, paperCount = 0 }) {
  const count = paperCount ?? workspace?.papers?.length ?? 0;

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="px-10 py-8">
        {/* Top Row */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {workspace?.name || "Untitled Workspace"}
            </h1>

            {(workspace?.description || count > 0) && (
              <p className="mt-2 text-sm text-zinc-500">
                {workspace?.description}
                {workspace?.description && count > 0 ? " • " : ""}
                {count > 0 && `${count} ${count === 1 ? "Paper" : "Papers"}`}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              className="h-11 w-11 rounded-xl hover:bg-zinc-100 transition flex items-center justify-center text-zinc-600"
              aria-label="Search workspace"
            >
              <Search size={18} />
            </button>

            <button 
              type="button"
              className="h-11 w-11 rounded-xl hover:bg-zinc-100 transition flex items-center justify-center text-zinc-600"
              aria-label="Workspace settings"
            >
              <Settings size={18} />
            </button>

            <button 
              type="button"
              className="flex items-center gap-2 px-5 h-11 rounded-xl bg-black text-white hover:bg-zinc-800 transition text-sm font-medium"
            >
              <Share2 size={17} />
              Share
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}