import { useRef } from "react";
import { Upload } from "lucide-react";
import { useParams } from "react-router-dom";

import { uploadPaper } from "../../api/paperApi";

export default function UploadPaperButton({
    collapsed,
    refreshPapers,
}) {
    const inputRef = useRef();

    const { workspaceId } = useParams();

    async function handleUpload(e) {
        const file = e.target.files[0];

        if (!file) return;

        try {
            await uploadPaper(workspaceId, file);

            await refreshPapers();
        } catch (err) {
            console.error(err);
        }

        e.target.value = "";
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleUpload}
            />

            <button
                onClick={() => inputRef.current.click()}
                className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    transition

                    ${
                        collapsed
                            ? "w-10 h-10 hover:bg-zinc-100"
                            : "px-3 py-2 hover:bg-zinc-100"
                    }
                `}
            >
                <Upload size={17} />

                {!collapsed && (
                    <span className="text-sm">
                        Upload
                    </span>
                )}

            </button>
        </>
    );
}