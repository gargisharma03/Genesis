import PdfPlaceholder from "./PDFViewer";
import Whiteboard from "./Whiteboard";

export default function ReadingView() {
    return (
        <div className="grid grid-cols-12 gap-8 mt-8 h-[75vh]">

            <div className="col-span-8">
                <PdfPlaceholder />
            </div>

            <div className="col-span-4">
                <Whiteboard />
            </div>

        </div>
    );
}