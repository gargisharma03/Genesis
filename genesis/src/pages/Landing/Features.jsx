import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll('.panels');

    // Executing your exact layout animation configuration rule
    gsap.to(".panels", {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 1,
        end: () => "+=" + container.offsetWidth
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    /* The master pinned section container remains stationary on the screen */
    <div ref={containerRef} className="container relative overflow-hidden min-w-screen min-h-screen bg-[#09090B] pt-24 pb-16 flex flex-col justify-start overflow-hidden">
      
      {/* 1. Static Title: Since it sits outside the sliding track, it stays fixed at this exact spot */}
      <div className="w-full px-16 mb-12 select-none">
        <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-[0.3em] mb-2">
          Analytics Engine
        </h2>
        <h3 className="font-bold text-5xl font-archivo-black tracking-tighter text-white">
          SYSTEM MATRIX
        </h3>
      </div>

      {/* 2. Horizontal Track Viewport Layer */}
      {/* Only the .panels target class inside this div will receive the horizontal xPercent offset translation */}
      <div className="w-full flex flex-nowrap pl-16 pr-4 overflow-visible items-center mt-auto mb-auto">
        
        {/* Card 01 */}
        <div className="panels w-[66.666%] h-[420px] flex-shrink-0 mr-8 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-between text-white box-border shadow-xl">
          <div>
            <span className="text-xs font-mono text-purple-400 tracking-widest">// DEPLOYMENT</span>
            <h4 className="text-3xl font-bold tracking-tight mt-4 font-archivo-black">PANEL 01 // OVERVIEW</h4>
            <p className="text-zinc-400 mt-4 text-sm max-w-md">Consolidated operational interface parsing non-linear developmental nodes.</p>
          </div>
          <div className="text-xs font-mono text-zinc-600">NODE_REF // 0x7F1A</div>
        </div>

        {/* Card 02 */}
        <div className="panels w-[66.666%] h-[420px] flex-shrink-0 mr-8 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-between text-white box-border shadow-xl">
          <div>
            <span className="text-xs font-mono text-purple-400 tracking-widest">// TELEMETRY</span>
            <h4 className="text-3xl font-bold tracking-tight mt-4 font-archivo-black">PANEL 02 // METRICS</h4>
            <p className="text-zinc-400 mt-4 text-sm max-w-md">Real-time pipeline monitoring tracking localized energy peaks and core computational loops.</p>
          </div>
          <div className="text-xs font-mono text-zinc-600">NODE_REF // 0x7F1B</div>
        </div>

        {/* Card 03 */}
        <div className="panels w-[66.666%] h-[420px] flex-shrink-0 mr-8 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-between text-white box-border shadow-xl">
          <div>
            <span className="text-xs font-mono text-purple-400 tracking-widest">// LOGISTICS</span>
            <h4 className="text-3xl font-bold tracking-tight mt-4 font-archivo-black">PANEL 03 // SYSTEMS</h4>
            <p className="text-zinc-400 mt-4 text-sm max-w-md">Asymmetric graph visualization charting systemic correlations across data silos.</p>
          </div>
          <div className="text-xs font-mono text-zinc-600">NODE_REF // 0x7F1C</div>
        </div>

        {/* Card 04 */}
        <div className="panels w-[66.666%] h-[420px] flex-shrink-0 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-between text-white box-border shadow-xl">
          <div>
            <span className="text-xs font-mono text-purple-400 tracking-widest">// INTEGRATION</span>
            <h4 className="text-3xl font-bold tracking-tight mt-4 font-archivo-black">PANEL 04 // DATA</h4>
            <p className="text-zinc-400 mt-4 text-sm max-w-md">Hyper-responsive hardware-accelerated grid layers optimized for quick reference.</p>
          </div>
          <div className="text-xs font-mono text-zinc-600">NODE_REF // 0x7F1D</div>
        </div>

      </div>
      <div className="absolute bottom-[-180px] left-[-120px] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-violet-700/40 md:bg-violet-700/60 blur-[100px] md:blur-[170px] pointer-events-none" />
            <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 h-[350px] w-[450px] md:h-[550px] md:w-[650px] rounded-full bg-purple-500/30 md:bg-purple-500/40 blur-[120px] md:blur-[200px] pointer-events-none" />
            <div className="absolute bottom-[-180px] right-[-120px] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-fuchsia-600/40 md:bg-fuchsia-600/60 blur-[100px] md:blur-[170px] pointer-events-none" />


    </div>
  );
}