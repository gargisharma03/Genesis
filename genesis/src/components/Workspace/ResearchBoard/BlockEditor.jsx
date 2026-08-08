import { Trash2 } from "lucide-react";
import BlockRenderer from "./BlockRenderer";
import AddBlockDropdown from "./AddBlockMenu";

export default function BlockEditor({
  blocks,
  onBlockChange,
  createBlock,
  onDeleteBlock,
}) {
  return (
    <div className="relative flex-1 min-h-full px-6 py-8 bg-slate-50/60 text-zinc-900 selection:bg-fuchsia-100 selection:text-fuchsia-900">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]" 
        style={{
          backgroundImage: `radial-gradient(#d946ef 0.8px, transparent 0.8px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Main Canvas Container */}
      <div className="relative max-w-3xl mx-auto space-y-3 pb-32">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[320px] border border-dashed border-fuchsia-200 bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-sm">
            <div className="p-3 rounded-full bg-fuchsia-50 border border-fuchsia-200/60 text-fuchsia-600 mb-3 animate-pulse">
              ✨
            </div>
            <h4 className="text-sm font-semibold text-zinc-800">Research Board Ready</h4>
            <p className="text-xs text-zinc-500 max-w-sm mt-1 mb-5">
              Draft synthesis notes, organize code blocks, or embed equations while reading your paper.
            </p>
            {/* Empty state adds block at position 0 */}
            <AddBlockDropdown onSelectType={(type) => createBlock(type)} />
          </div>
        ) : (
          blocks.map((block) => (
            <div
              key={block._id}
              className="group relative w-full rounded-xl border border-transparent hover:border-fuchsia-200 hover:bg-white/90 hover:shadow-sm p-3 transition-all duration-200 flex flex-col items-stretch"
            >
              {/* Delete Button */}
              {onDeleteBlock && (
                <button
                  onClick={() => onDeleteBlock(block._id)}
                  className="absolute right-2 top-2 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                  title="Delete Block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Block Content Render */}
              <div className="w-full pr-8">
                <BlockRenderer
                  block={block}
                  onBlockChange={onBlockChange}
                />
              </div>

              {/* Inline Add Menu: Passes current block._id so new block inserts right after this block */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <AddBlockDropdown onSelectType={(type) => createBlock(type, block._id)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}