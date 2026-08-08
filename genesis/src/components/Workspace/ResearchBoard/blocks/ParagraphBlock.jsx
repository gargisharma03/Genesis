import TextareaAutosize from "react-textarea-autosize";

export default function ParagraphBlock({ block, onBlockChange }) {
  return (
    <TextareaAutosize
      value={block.content?.text || ""}
      onChange={(e) =>
        onBlockChange(block._id, {
          ...block.content,
          text: e.target.value,
        })
      }
      placeholder="Start writing..."
      minRows={1}
      className="
        w-full
        block
        resize-none
        bg-transparent
        outline-none
        border-none
        p-0
        m-0
        text-sm
        leading-relaxed
        text-zinc-800
        placeholder:text-zinc-400/60
        focus:ring-0
      "
    />
  );
}