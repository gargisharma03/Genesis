import { ArrowRight, Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

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

export default function CurrentCard({ workspace }) {
  const navigate = useNavigate();

  if (!workspace) {
    return (
      <section className="mb-12 mt-24">
        <h3 className="uppercase tracking-[0.2em] text-sm font-semibold text-zinc-400 mb-6">
          CONTINUE WORKING
        </h3>

        <div className="w-full h-72 rounded-[32px] border border-zinc-200 bg-zinc-100 animate-pulse" />
      </section>
    );
  }

  return (
    <section className="mb-12 mt-10">
      <h3 className="uppercase tracking-[0.2em] text-sm font-semibold text-zinc-400 mb-6">
        CONTINUE WORKING
      </h3>

      <div className="w-full bg-white border border-zinc-200 rounded-[32px] p-8 flex items-center justify-between hover:shadow-lg hover:border-fuchsia-500 transition duration-300">

        {/* Left */}
        <div className="flex items-center gap-8">

          {/* Workspace Thumbnail */}
          <div className="w-56 h-36 rounded-3xl bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 flex items-center justify-center">

           
              <img
                src={getCover(workspace.name)}
                alt={workspace.name}
                className="w-56 h-36 rounded-3xl object-cover"
              />
           

          </div>

          {/* Workspace Details */}
          <div className="max-w-2xl">

            <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">

              <Clock3 size={15} />

              <span>
                Edited{" "}
                {formatDistanceToNow(
                  new Date(workspace.lastActivityAt),
                  {
                    addSuffix: true,
                  }
                )}
              </span>

            </div>

            <h2 className="text-3xl font-semibold text-zinc-900">
              {workspace.name}
            </h2>

            <p className="mt-4 text-zinc-500 leading-7">
              {workspace.description || "No description available."}
            </p>

            <div className="flex items-center gap-6 mt-8">

              <button
                onClick={() =>
                  navigate(`/workspaces/${workspace._id}`)
                }
                className="px-6 py-3 rounded-2xl bg-black text-white font-medium hover:bg-zinc-800 hover:border-fuchsia-500 transition cursor-pointer "
              >
                Open Workspace
              </button>

              {/* Members */}
              <div className="flex -space-x-2">

                {workspace.members.slice(0, 3).map((member) => (
                  <div
                    key={member.user._id}
                    className="w-10 h-10 rounded-full border flex items-center justify-center text-xs font-semibold"
                    style={{
                      backgroundColor:
                        member.user.avatarColor || "#4F46E5",
                    }}
                  >
                    {member.user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                ))}

                {workspace.members.length > 3 && (
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-xs font-semibold">
                    +{workspace.members.length - 3}
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Right Arrow */}

        <button
          onClick={() =>
            navigate(`/workspaces/${workspace._id}`)
          }
          className="rounded-full p-3 hover:bg-zinc-100 transition"
        >
          <ArrowRight
            size={26}
            className="text-zinc-400"
          />
        </button>

      </div>
    </section>
  );
}