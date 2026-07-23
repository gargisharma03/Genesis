import { useState, useEffect } from "react";

export default function Home() {
  const [state, setState] = useState();

  useEffect(() => {
    // Runs when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
        {/* Adjusted brand color to match your new vibrant theme */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Welcome to <span className="text-neonYellow drop-shadow-[0_0_15px_rgba(224,254,0,0.3)]">GENESIS OS</span>
        </h1>
        
        <p className="mt-6 text-xl md:text-2xl text-zinc-400">
          Get started by editing{" "}
          {/* Swapped bg-gray-100 for a glassmorphic border block with high-contrast text */}
          <code className="px-3 py-1.5 font-mono text-sm md:text-base bg-white/5 border border-white/10 rounded-md text-neonPink select-all">
            src/pages/Home.jsx
          </code>
        </p>
      </main>
    </div>
  );
}