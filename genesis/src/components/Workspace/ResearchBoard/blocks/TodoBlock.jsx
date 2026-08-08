export default function TodoBlock({ block, onBlockChange }) {
  const completed = block.content?.completed || false;
  const text = block.content?.text || "";

  return (
    <div className="flex items-center gap-2 py-1">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) =>
          onBlockChange(block._id, {
            ...block.content,
            completed: e.target.checked,
          })
        }
        className="h-4 w-4 rounded border-zinc-300 text-fuchsia-600 focus:ring-fuchsia-500 cursor-pointer"
      />
      <input
        type="text"
        value={text}
        onChange={(e) =>
          onBlockChange(block._id, {
            ...block.content,
            text: e.target.value,
          })
        }
        placeholder="To-do item..."
        className={`w-full bg-transparent text-sm outline-none ${
          completed ? "line-through text-zinc-400" : "text-zinc-800"
        }`}
      />
    </div>
  );
}