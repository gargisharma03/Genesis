import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { 
  Plus, 
  Type, 
  Code, 
  Binary, 
  Quote, 
  CheckSquare, 
  Image as ImageIcon, 
  Minus, 
  Sparkles,
  ChevronDown 
} from "lucide-react";

const BLOCK_TYPES = [
  { id: "paragraph", label: "Text Paragraph", description: "Standard text area for notes & thoughts", icon: Type },
  { id: "heading", label: "Heading", description: "Section header for key topics", icon: Type },
  { id: "code", label: "Code Snippet", description: "Syntax highlighted code block", icon: Code },
  { id: "equation", label: "LaTeX Equation", description: "Math formula block", icon: Binary },
  { id: "todo", label: "Task / Todo", description: "Interactive task checkbox", icon: CheckSquare },
  { id: "citation", label: "Citation", description: "Reference or paper citation excerpt", icon: Quote },
  { id: "image", label: "Image / Media", description: "Embed visual references", icon: ImageIcon },
  { id: "divider", label: "Divider", description: "Visual section line", icon: Minus },
  { id: "ai-summary", label: "AI Summary", description: "AI-generated synthesis card", icon: Sparkles },
];

export default function AddBlockDropdown({ onSelectType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Use Viewport coordinates for position: fixed
  const updateCoords = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8, // Directly use viewport top + offset
        left: rect.left,      // Directly use viewport left
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) updateCoords();
  }, [isOpen, updateCoords]);

  useEffect(() => {
    function handleOutside(e) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutside);
      // Capture scroll on all nested containers (like overflow-y-auto elements)
      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", updateCoords, true);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isOpen, updateCoords]);

  const handleSelect = (typeId) => {
    onSelectType(typeId);
    setIsOpen(false);
  };

  return (
    <div className="inline-block text-left">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 hover:border-fuchsia-500/50 rounded-xl text-xs font-medium transition-all shadow-md active:scale-95 hover:shadow-fuchsia-500/10"
      >
        <Plus className="w-4 h-4 text-fuchsia-400 group-hover:scale-110 transition-transform" />
        <span className="group-hover:text-fuchsia-200 transition-colors">Add Block</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-fuchsia-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Portal Dropdown */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className="w-68 bg-zinc-950/95 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl shadow-2xl shadow-fuchsia-950/40 z-[9999] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="flex items-center justify-between px-3.5 py-1.5 text-[10px] font-semibold tracking-wider text-fuchsia-400/80 uppercase border-b border-zinc-800/80 mb-1">
              <span>Select Block Type</span>
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
            </div>

            <div className="max-h-64 overflow-y-auto custom-scrollbar px-1.5 space-y-0.5">
              {BLOCK_TYPES.map((block) => {
                const Icon = block.icon;
                return (
                  <button
                    key={block.id}
                    onClick={() => handleSelect(block.id)}
                    className="w-full flex items-start gap-3 px-2.5 py-2 hover:bg-fuchsia-950/30 rounded-xl transition-all text-left group border border-transparent hover:border-fuchsia-500/20"
                  >
                    <div className="p-1.5 bg-zinc-900 group-hover:bg-fuchsia-500/20 rounded-lg text-zinc-400 group-hover:text-fuchsia-300 transition-colors mt-0.5 border border-zinc-800 group-hover:border-fuchsia-500/30">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-200 group-hover:text-fuchsia-100">
                        {block.label}
                      </div>
                      <div className="text-[11px] text-zinc-400 group-hover:text-zinc-300 leading-tight">
                        {block.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}