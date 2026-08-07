import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";

export default function BlockRenderer({
    block,
    onBlockChange,
}) {

    switch (block.type) {

        case "heading":

            return (

                <HeadingBlock
                    block={block}
                    onBlockChange={onBlockChange}
                />

            );

        case "paragraph":

            return (

                <ParagraphBlock
                    block={block}
                    onBlockChange={onBlockChange}
                />

            );

        default:

            return (

                <ParagraphBlock
                    block={block}
                    onBlockChange={onBlockChange}
                />

            );

    }

}