export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Ingress & Ingestion",
      tagline: "Initialize Localized Architecture",
      description: "Create an individual or team node workspace. Genesis instantly establishes secure database storage with Row-Level Security (RLS) rules and provisions standalone vector indexes for your group.",
      
      badgeBg: "bg-gradient-to-br from-fuchsia-500 to-purple-600",
      lineBg: "bg-gradient-to-r from-fuchsia-500 to-purple-600"
    },
    {
      id: "02",
      title: "Synthesis Mapping",
      tagline: "Build The Live Knowledge Graph",
      description: "Query papers through our unified discovery window and tag them directly into your Literature Synthesis Matrix. Append team notes, compile upvotes, and watch references automatically link matching nodes across authors.",
      badgeBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      lineBg: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      id: "03",
      title: "Collaborative Drafting",
      tagline: "Context-Aware Workspace Compilation",
      description: "Transition into the modular three-pane editor. As you compose raw text or compile complex LaTeX mathematical equations, an intelligent sidecar companion dynamically maps your workspace history to surface active references.",
      badgeBg: "bg-gradient-to-br from-pink-500 to-fuchsia-400",
      lineBg: "bg-gradient-to-r from-pink-500 to-fuchsia-400"
    }
  ];

  return (
    // FIX: Added 'relative' and 'overflow-hidden' so glowing background layers cannot break page borders
    <section className="w-full relative overflow-hidden bg-[#09090B] border-t border-zinc-900 px-6 py-20 md:px-20 md:py-28 text-white select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-500 bg-fuchsia-500/10 px-3 py-1 rounded-full border border-fuchsia-500/20">
            Workflow Engine
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-archivo-black mt-4 tracking-tight leading-tight">
            THE INGRESS PIPELINE
          </h2>
          <p className="mt-4 text-zinc-400 font-poppins text-base md:text-lg">
            Stop juggling fragmented tools. Genesis streamlines the entire research lifecycle into three deterministic engineering phases.
          </p>
        </div>

        {/* Process Step Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="relative group bg-zinc-900/40 border border-zinc-800/60 p-8 md:p-10 rounded-[32px] md:rounded-[40px] backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 hover:scale-[1.01] flex flex-col justify-between min-h-[340px]"
            >
              {/* Subtle top background card radial glow on hover */}
              <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] bg-gradient-to-b from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Step Index Badge Indicator */}
                {/* FIX: Injected fully qualified variable utility directly */}
                <div className={`w-12 h-12 rounded-2xl ${step.badgeBg} flex items-center justify-center font-mono font-black text-xl text-black shadow-lg shadow-fuchsia-500/10 mb-6`}>
                  {step.id}
                </div>

                {/* Step Metadata Header */}
                <h3 className="text-2xl font-bold font-sans tracking-tight text-zinc-100 group-hover:text-fuchsia-400 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1 pl-0.5">
                  {step.tagline}
                </p>

                {/* Informative Body text */}
                <p className="mt-4 text-sm md:text-base text-zinc-400 font-poppins leading-relaxed pl-0.5">
                  {step.description}
                </p>
              </div>

              {/* Ultra-thin status bar asset tracking progress */}
              <div className="w-full h-[2px] bg-zinc-800 mt-8 rounded-full overflow-hidden">
                {/* FIX: Extracted complete linear color parameters seamlessly */}
                <div className={`h-full w-0 group-hover:w-full ${step.lineBg} transition-all duration-500 ease-out`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neon Aura Backdrops securely locked behind layout boundaries via relative tracking */}
      <div className="absolute bottom-[-180px] left-[-120px] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-violet-700/30 md:bg-violet-700/50 blur-[100px] md:blur-[170px] pointer-events-none z-0" />
      <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 h-[350px] w-[450px] md:h-[550px] md:w-[650px] rounded-full bg-purple-500/20 md:bg-purple-500/30 blur-[120px] md:blur-[200px] pointer-events-none z-0" />
      <div className="absolute bottom-[-180px] right-[-120px] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-fuchsia-600/30 md:bg-fuchsia-600/50 blur-[100px] md:blur-[170px] pointer-events-none z-0" />
    </section>
  );
}