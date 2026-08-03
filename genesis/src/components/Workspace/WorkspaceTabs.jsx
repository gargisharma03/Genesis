const tabs = [
    {
        id: "reading",
        label: "Reading"
    },
    {
        id: "manuscript",
        label: "Manuscript"
    },
    {
        id: "references",
        label: "References"
    },
    {
        id: "matrix",
        label: "Synthesis Matrix"
    }
];

export default function WorkspaceTabs({
    activeTab,
    setActiveTab
}) {
    return (
        <div className="flex gap-3 mt-10 border-b pb-4">

            {tabs.map((tab) => (

                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        px-6 py-3 rounded-full transition

                        ${
                            activeTab === tab.id
                                ? "bg-black text-white"
                                : "hover:bg-zinc-100"
                        }
                    `}
                >
                    {tab.label}
                </button>

            ))}

        </div>
    );
}