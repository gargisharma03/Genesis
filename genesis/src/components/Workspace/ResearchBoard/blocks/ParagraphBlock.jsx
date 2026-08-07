export default function ParagraphBlock({
    block,
    onBlockChange,
}) {

    return (

        <textarea

            value={block.content?.text || ""}

            onChange={(e) =>
                onBlockChange(
                    block._id,
                    {
                        ...block.content,
                        text: e.target.value,
                    }
                )
            }

            placeholder="Start writing..."

            className="
                w-full
                resize-none
                bg-transparent
                outline-none
                text-[15px]
                leading-7
                py-1
            "

            rows={2}

        />

    );

}