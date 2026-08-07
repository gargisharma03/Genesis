import React from "react";
import AddBlockDropdown from "./AddBlockMenu";
import { Type, Code, Binary, Sparkles } from "lucide-react";

export default function ResearchBoardToolbar({ onCreateBlock }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 text-neutral-200">
      {/* Left section: Block Creation */}
      <div className="flex items-center gap-2">
        {/* Main Dropdown */}
        <AddBlockDropdown onSelectType={(type) => onCreateBlock(type)} />

        <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

        {/* Quick Add Shortcuts */}
        <button
          onClick={() => onCreateBlock("paragraph")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded-md text-xs transition-colors"
          title="Add Text Block"
        >
          <Type className="w-3.5 h-3.5" />
          <span>Text</span>
        </button>

        <button
          onClick={() => onCreateBlock("code")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded-md text-xs transition-colors"
          title="Add Code Block"
        >
          <Code className="w-3.5 h-3.5 text-blue-400" />
          <span>Code</span>
        </button>

        <button
          onClick={() => onCreateBlock("equation")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded-md text-xs transition-colors"
          title="Add LaTeX Equation"
        >
          <Binary className="w-3.5 h-3.5 text-purple-400" />
          <span>Equation</span>
        </button>

        <button
          onClick={() => onCreateBlock("ai-summary")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded-md text-xs transition-colors"
          title="Add AI Summary"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Card</span>
        </button>
      </div>

      {/* Right section: Board Actions / Views */}
      <div className="text-xs text-neutral-500 font-mono">
        Multiplayer Canvas Active
      </div>
    </div>
  );
}