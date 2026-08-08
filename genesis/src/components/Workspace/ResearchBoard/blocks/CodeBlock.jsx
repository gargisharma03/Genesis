import { useState } from "react";

export default function CodeBlock({ block, onBlockChange }) {
  const code = block.content?.code || "";
  const language = block.content?.language || "javascript";

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-900 p-3 font-mono text-xs text-zinc-100 shadow-sm">
      <div className="mb-2 flex items-center justify-between border-b border-zinc-800 pb-1.5 text-zinc-400">
        <select
          value={language}
          onChange={(e) =>
            onBlockChange(block._id, { ...block.content, language: e.target.value })
          }
          className="bg-transparent text-xs text-zinc-300 outline-none cursor-pointer"
        >
          <option value="javascript" className="bg-zinc-900">JavaScript</option>
          <option value="python" className="bg-zinc-900">Python</option>
          <option value="cpp" className="bg-zinc-900">C++</option>
          <option value="html" className="bg-zinc-900">HTML/CSS</option>
        </select>
        <span className="text-[10px] uppercase text-zinc-500">Code</span>
      </div>
      <textarea
        value={code}
        onChange={(e) =>
          onBlockChange(block._id, { ...block.content, code: e.target.value })
        }
        placeholder="// Write code here..."
        className="w-full resize-none bg-transparent font-mono text-xs text-emerald-400 outline-none leading-relaxed"
        rows={Math.max(2, code.split("\n").length)}
      />
    </div>
  );
}