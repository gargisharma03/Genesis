import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

export default function DiagramBlock({ block, onBlockChange }) {
  const code = block.content?.code || "graph TD;\n  A[PDF Paper] --> B(Extract Notes);\n  B --> C{Synthesize};";
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.render(`mermaid-${block._id}`, code).then(({ svg }) => {
        containerRef.current.innerHTML = svg;
      });
    }
  }, [code, block._id]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm space-y-3">
      <div ref={containerRef} className="flex justify-center overflow-x-auto py-2" />
      <textarea
        value={code}
        onChange={(e) =>
          onBlockChange(block._id, { ...block.content, code: e.target.value })
        }
        className="w-full rounded bg-zinc-50 border border-zinc-200 p-2 font-mono text-xs text-zinc-700 outline-none"
        rows={3}
      />
    </div>
  );
}