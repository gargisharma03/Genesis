import { useRef } from 'react';
import gsap from 'gsap';

export default function Laptop3DImage() {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    
    // Track mouse coordinate positioning relative to the container center (-0.5 to 0.5)
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;

    gsap.to(card, {
      rotateY: x * 20, 
      rotateX: -y * 30, 
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 800, // Provides the depth factor
    });
  };

  const handleMouseLeave = (e) => {
    // Smoothly snap the element back to center alignment
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div className="flex items-center justify-center bg-zinc-950 p-4">
      {/* Perspective wrapper layer to secure spatial 3D bounds */}
      <div className="perspective-[1000px]">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative h-108 w-[700px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl cursor-pointer [transform-style:preserve-3d]"
        >
          {/* Base image element layer */}
          <img
            src="/src/assets/dashboardmock.png"
            alt="3D Visualization"
            className="h-full w-full object-cover transition-scale duration-500 group-hover:scale-105 select-none pointer-events-none"
          />

          
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent [transform:translateZ(40px)]">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Neural Grid
            </h3>
            <p className="text-sm text-zinc-400 mt-8">
              Synthesized operations console
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}