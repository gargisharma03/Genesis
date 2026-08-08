import ParagraphBlock from "./blocks/ParagraphBlock";
import HeadingBlock from "./blocks/HeadingBlock";
import CodeBlock from "./blocks/CodeBlock";
import MathBlock from "./blocks/MathBlock";
import ImageBlock from "./blocks/ImageBlock";
import PdfReferenceBlock from "./blocks/PdfReferenceBlock";
import DividerBlock from "./blocks/DividerBlock";
import DiagramBlock from "./blocks/DiagramBlock";
import TodoBlock from "./blocks/TodoBlock";

export default function BlockRenderer({ block, onBlockChange, setViewerState }) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock block={block} onBlockChange={onBlockChange} />;

    case "heading":
      return <HeadingBlock block={block} onBlockChange={onBlockChange} />;

    case "code":
      return <CodeBlock block={block} onBlockChange={onBlockChange} />;

    case "equation":
    case "math":
      return <MathBlock block={block} onBlockChange={onBlockChange} />;

    case "todo":
      return <TodoBlock block={block} onBlockChange={onBlockChange} />;

    case "citation":
    case "pdf_reference":
      return (
        <PdfReferenceBlock
          block={block}
          onBlockChange={onBlockChange}
          setViewerState={setViewerState}
        />
      );

    case "image":
      return <ImageBlock block={block} onBlockChange={onBlockChange} />;

    case "divider":
      return <DividerBlock />;

    case "diagram":
      return <DiagramBlock block={block} onBlockChange={onBlockChange} />;

    default:
      return <ParagraphBlock block={block} onBlockChange={onBlockChange} />;
  }
}