import UploadPaperButton from "./UploadPaperButton";
import PaperItem from "./PaperItem";

export default function SidebarPapers({
    collapsed,
    papers,
    selectedPaper,
    setSelectedPaper,
    refreshPapers,
}) {
    return (
        <section className="mt-8">

            {/* Header */}

            {!collapsed && (
                <div className="flex items-center justify-between mb-4">

                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-400">
                        Papers
                    </p>

                    <UploadPaperButton
                        collapsed={collapsed}
                        refreshPapers={refreshPapers}
                        setSelectedPaper={setSelectedPaper}
                    />

                </div>
            )}

            {/* Collapsed */}

            {collapsed && (
                <div className="flex justify-center mb-4">

                    <UploadPaperButton
                        collapsed={collapsed}
                        refreshPapers={refreshPapers}
                        setSelectedPaper={setSelectedPaper}
                    />

                </div>
            )}

            {/* List */}

            <div className="space-y-2">

                {papers.length === 0 ? (

                    !collapsed && (
                        <div className="rounded-xl border border-dashed border-zinc-200 p-5 text-center">
                            <p className="text-sm text-zinc-400">
                                No papers uploaded yet
                            </p>
                        </div>
                    )

                ) : (

                    papers.map((paper) => (

                        <PaperItem
                            key={paper._id}
                            paper={paper}
                            selectedPaper={selectedPaper}
                            setSelectedPaper={setSelectedPaper}
                            collapsed={collapsed}
                        />

                    ))

                )}

            </div>

        </section>
    );
}