import { useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function MathBlock({ block, onBlockChange }) {
  const latex = block.content?.latex || "";
  const [isEditing, setIsEditing] = useState(!latex);

  return (
    <div className="rounded-lg border border-fuchsia-100 bg-fuchsia-50/30 p-3">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={latex}
            onChange={(e) =>
              onBlockChange(block._id, { ...block.content, latex: e.target.value })
            }
            placeholder="e.g. E = mc^2 or \int_{0}^{\infty} x^2 dx"
            className="w-full rounded border border-zinc-300 px-2 py-1 font-mono text-xs outline-none focus:border-fuchsia-500"
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-pointer overflow-x-auto py-1 text-center hover:bg-fuchsia-100/50 rounded transition-colors"
        >
          {latex ? <BlockMath math={latex} /> : <span className="text-xs text-zinc-400">Click to add LaTeX math equation...</span>}
        </div>
      )}
    </div>
  );
}