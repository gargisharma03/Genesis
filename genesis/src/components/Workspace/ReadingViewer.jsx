import Whiteboard from "./Whiteboard";
import PDFviewer from "./PDF/PDFviewer";

export default function ReadingView({ selectedPaper }) {
    return (
        <div className="grid grid-cols-12 gap-6 h-full overflow-hidden">

            <div className="col-span-8 h-full min-h-0">
                <PDFviewer selectedPaper={selectedPaper} />
            </div>

            <div className="col-span-4 h-full min-h-0">
                <Whiteboard />
            </div>

        </div>
    );
}