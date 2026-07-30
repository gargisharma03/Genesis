import {
  ArrowRight,
  Clock3,
  Users,
} from "lucide-react";

export default function Currentcard() {
  return (
    <section className="mb-12 items-center">

      <h3 className="uppercase tracking-[0.2em] text-sm font-semibold text-zinc-400 mb-6">
        Continue Working
      </h3>

      <div className="w-full bg-white border border-zinc-200 rounded-[32px] p-8 flex justify-between items-center">

        {/* Left */}

        <div className="flex gap-8 items-center">

          {/* Thumbnail */}

          <div className="w-56 h-36 rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center">

            <div className="space-y-3">

              <div className="w-28 h-2 rounded bg-zinc-200" />

              <div className="w-36 h-2 rounded bg-zinc-200" />

              <div className="w-24 h-2 rounded bg-zinc-200" />

              <div className="flex gap-3 mt-5">

                <div className="w-16 h-8 rounded bg-zinc-200" />

                <div className="w-16 h-8 rounded bg-zinc-200" />

              </div>

            </div>

          </div>

          {/* Content */}

          <div className="max-w-2xl">

            <div className="flex items-center gap-3 mb-4">

              <span className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-semibold">

                ACTIVE PROJECT

              </span>

              <div className="flex items-center gap-2 text-zinc-400 text-sm">

                <Clock3 size={14} />

                Edited 14 minutes ago

              </div>

            </div>

            <h2 className="text-2xl font-semibold text-zinc-900">

              Neural Architectures in LLMs

            </h2>

            <p className="mt-4 text-zinc-500 leading-8 text-sm">

              Comparative analysis of transformer-based models
              and their efficiency in low-resource computational
              environments.

            </p>

            <div className="flex items-center gap-5 mt-8">

              <button className="px-6 py-4 rounded-2xl bg-black text-white font-medium hover:bg-zinc-800 transition">

                Open Workspace

              </button>

              <div className="flex -space-x-2">

                <div className="w-10 h-10 rounded-full bg-blue-100 border flex items-center justify-center text-xs font-semibold">
                  JD
                </div>

                <div className="w-10 h-10 rounded-full bg-green-100 border flex items-center justify-center text-xs font-semibold">
                  SK
                </div>

                <div className="w-10 h-10 rounded-full bg-zinc-100 border flex items-center justify-center text-xs font-semibold">
                  +2
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <ArrowRight
          size={26}
          className="text-zinc-300"
        />

      </div>

    </section>
  );
}