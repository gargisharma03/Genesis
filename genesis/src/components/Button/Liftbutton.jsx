import gsap from "gsap";

export default function LiftButton({ children, onClick, className = "", ...props }) {
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(192, 38, 211, 0.25)", // Used a subtle fuchsia glow tint to match your borders
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 group flex items-center gap-2 rounded-full border border-fuchsia-400 px-4 py-2 md:px-6 md:py-2.5 
      text-sm md:text-base font-semibold text-white cursor-pointer bg-transparent transition-[background-color,border-color] duration-200 hover:bg-fuchsia-500/10"
    >
      {children}
    </button>
  );
}