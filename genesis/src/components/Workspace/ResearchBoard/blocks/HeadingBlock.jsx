export default function HeadingBlock({
    block,
    onBlockChange,
}) {

    return (

        <input

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

            placeholder="Heading"

            className="
                w-full
                bg-transparent
                outline-none
                text-3xl
                font-bold
                py-2
            "

        />

    );

}