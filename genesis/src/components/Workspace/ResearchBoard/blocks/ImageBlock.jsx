import React, { useState } from "react";
import { Image as ImageIcon, Link as LinkIcon, Trash2, RefreshCw } from "lucide-react";

export default function ImageBlock({ block, onBlockChange }) {
  const url = block.content?.url || "";
  const caption = block.content?.caption || "";
  const [tempUrl, setTempUrl] = useState(url);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!tempUrl.trim()) return;
    onBlockChange(block._id, {
      ...block.content,
      url: tempUrl.trim(),
    });
  };

  const handleClearImage = () => {
    setTempUrl("");
    onBlockChange(block._id, {
      ...block.content,
      url: "",
      caption: "",
    });
  };

  return (
    <div className="w-full rounded-xl border border-zinc-200/80 bg-white p-3 shadow-xs transition-all">
      {url ? (
        <div className="group/img relative space-y-2">
          {/* Action Overlay Controls */}
          <div className="absolute right-2 top-2 z-10 flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity bg-zinc-900/80 backdrop-blur-md p-1 rounded-lg">
            <button
              onClick={handleClearImage}
              className="p-1 text-zinc-300 hover:text-red-400 transition-colors"
              title="Replace image"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Image Display */}
          <div className="relative overflow-hidden rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">
            <img
              src={url}
              alt={caption || "Embedded image reference"}
              className="max-h-96 w-full object-contain rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/18181b/f4f4f5?text=Invalid+Image+URL";
              }}
            />
          </div>

          {/* Caption Input */}
          <input
            type="text"
            value={caption}
            onChange={(e) =>
              onBlockChange(block._id, {
                ...block.content,
                caption: e.target.value,
              })
            }
            placeholder="Add an optional caption..."
            className="w-full text-center text-xs text-zinc-500 bg-transparent outline-none italic border-b border-transparent focus:border-fuchsia-300 py-1 transition-colors"
          />
        </div>
      ) : (
        /* Empty State URL Input Form */
        <form onSubmit={handleUrlSubmit} className="space-y-3 p-4 border border-dashed border-zinc-300 hover:border-fuchsia-400/60 rounded-xl bg-zinc-50/50 transition-colors">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <ImageIcon className="w-4 h-4 text-fuchsia-500" />
            <span>Embed Image Reference</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="url"
                placeholder="Paste direct image URL (https://...)"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs text-zinc-800 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!tempUrl.trim()}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-all shadow-xs"
            >
              Embed
            </button>
          </div>
        </form>
      )}
    </div>
  );
}