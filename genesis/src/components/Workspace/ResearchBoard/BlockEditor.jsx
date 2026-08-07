import BlockRenderer from "./BlockRenderer";
import AddBlockMenu from "./AddBlockMenu";

export default function BlockEditor({
  blocks,
  onBlockChange,
  createBlock,
}) {
  return (
    <div className="relative flex-1 h-full overflow-y-auto px-6 py-6 bg-slate-50/60 text-zinc-900 selection:bg-fuchsia-100 selection:text-fuchsia-900">
      
      {/* Light Fuchsia Canvas Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]" 
        style={{
          backgroundImage: `radial-gradient(#d946ef 0.8px, transparent 0.8px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Main Canvas Card Area */}
      <div className="relative max-w-3xl mx-auto space-y-3 pb-32">
        {blocks.length === 0 ? (
          /* Empty State Canvas */
          <div className="flex flex-col items-center justify-center min-h-[320px] border border-dashed border-fuchsia-200 bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-sm">
            <div className="p-3 rounded-full bg-fuchsia-50 border border-fuchsia-200/60 text-fuchsia-600 mb-3 animate-pulse">
              ✨
            </div>
            <h4 className="text-sm font-semibold text-zinc-800">Research Board Ready</h4>
            <p className="text-xs text-zinc-500 max-w-sm mt-1 mb-5">
              Draft synthesis notes, organize code blocks, or embed equations while reading your paper.
            </p>
            <AddBlockMenu createBlock={createBlock} />
          </div>
        ) : (
          /* Block List */
          blocks.map((block) => (
            <div
              key={block._id}
              className="group relative rounded-xl border border-transparent hover:border-fuchsia-200 hover:bg-white/90 hover:shadow-sm p-2 transition-all duration-200"
            >
              <BlockRenderer
                block={block}
                onBlockChange={onBlockChange}
              />

              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <AddBlockMenu createBlock={createBlock} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}