import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  FolderOpen,
  Users,
  Plus,
  ArrowRight,
  FileText,
} from "lucide-react";

const covers = [
  "/covers/cover1.jpg",
  "/covers/cover2.jpg",
  "/covers/cover3.jpg",
  "/covers/cover4.jpg",
  
];

const getCover = (name) => {
  const hash = name
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  return covers[hash % covers.length];
};

export default function WorkspaceGrid() {
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    researchDomain: "",
  });

  const gradients = [
    "from-indigo-600 via-violet-600 to-fuchsia-600",
    "from-sky-500 via-cyan-500 to-blue-600",
    "from-emerald-500 via-teal-500 to-cyan-500",
    "from-orange-500 via-amber-500 to-yellow-500",
    "from-zinc-700 via-slate-700 to-neutral-800",
    "from-pink-500 via-rose-500 to-red-500",
  ];

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/workspaces", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setWorkspaces(data.workspaces);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setShowModal(false);

        setFormData({
          name: "",
          description: "",
          researchDomain: "",
        });

        fetchWorkspaces();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="mt-20 text-zinc-500">
        Loading workspaces...
      </div>
    );
  }

  return (
    <>
      <section className="mt-20">

        <div className="flex items-center justify-between mb-8">

          <div>

                <p className="uppercase tracking-[0.22em] text-xs font-semibold text-zinc-400">
                YOUR WORKSPACES
                </p>

                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">
                Continue building your research.
                </h2>

                <p className="mt-2 text-zinc-500">
                Papers, notes, collaborators and AI analysis in one place.
                </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-zinc-900
                px-6
                py-3
                text-white
                font-medium
                shadow-sm
                transition
                hover:bg-zinc-800
                hover:shadow-lg
                active:scale-[0.98]
                "
          >
            <Plus size={18} />
            New Workspace
          </button>

        </div>

        {workspaces.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-gradient-to-b from-zinc-50 to-white px-8 py-24 text-center">

                <svg
                className="mx-auto h-32 w-32 text-zinc-300"
                viewBox="0 0 200 200"
                fill="none"
                >
                <rect x="40" y="70" width="120" height="90" rx="12" stroke="currentColor" strokeWidth="4" />
                <path d="M40 90V60a10 10 0 0 1 10-10h35l15 20h50a10 10 0 0 1 10 10v10" stroke="currentColor" strokeWidth="4" />
                <path d="M75 115h50M75 135h35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>

                <h3 className="mt-8 text-2xl font-semibold text-zinc-900">
                Create your first workspace
                </h3>

                <p className="mt-3 text-zinc-500 max-w-md mx-auto leading-relaxed">
                Research begins with a workspace. Import papers, organize notes,
                and collaborate with your team.
                </p>

                <button
                onClick={() => setShowModal(true)}
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-black text-white hover:bg-zinc-800 transition"
                >
                <Plus size={18} />
                Create Workspace
                </button>

            </div>
            ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {workspaces.map((workspace, index) => (

              <div
                key={workspace._id}
                onClick={() =>
                  navigate(`/workspaces/${workspace._id}`)
                }
                className="cursor-pointer rounded-3xl border border-zinc-200 bg-white overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >

                <img
                src={getCover(workspace.name)}
                alt={workspace.name}
                className="
                h-44
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
                "
                />

                <div className="p-7">

                  <h3 className="text-[22px] font-semibold tracking-tight text-zinc-900">
                    {workspace.name}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-500 line-clamp-2 min-h-[42px]">
                    {workspace.description ||
                      "No description added yet."}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                        {workspace.members.length} Members
                    </span>

                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                        {workspace.researchDomain || "General"}
                    </span>

                </div>

                  <div className="flex items-center justify-between mt-8">

                    <span className="text-xs text-zinc-400">
                      Updated{" "}
                      {formatDistanceToNow(
                        new Date(workspace.lastActivityAt),
                        { addSuffix: true }
                      )}
                    </span>

                    <ArrowRight
                      className="text-zinc-400"
                      size={20}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

            <h2 className="text-2xl font-semibold">
              Create Workspace
            </h2>

            <p className="text-zinc-500 mt-2">
              Organize papers, notes, collaborators and AI analysis.
            </p>

            <div className="space-y-5 mt-8">

              <input
                type="text"
                placeholder="Workspace Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-zinc-300 p-4 outline-none focus:border-black"
              />

              <textarea
                rows={4}
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-zinc-300 p-4 outline-none resize-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Research Domain (Optional)"
                value={formData.researchDomain}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    researchDomain: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-zinc-300 p-4 outline-none focus:border-black"
              />

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-2xl border border-zinc-300"
              >
                Cancel
              </button>

              <button
                onClick={createWorkspace}
                className="px-6 py-3 rounded-2xl bg-black text-white hover:bg-zinc-800"
              >
                Create Workspace
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}