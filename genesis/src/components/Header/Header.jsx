import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import LiftButton from "../../components/Button/Liftbutton";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to check if a route is currently active
  const isActiveRoute = (path) => location.pathname === path;

  // Unified navigation click handler that handles both programmatic transition and drawer closing
  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100">
      {/* Glassmorphic Top Header Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-900/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6">
          
          {/* Dual-style Logo linking back to root */}
          <NavLink to="/" className="flex items-center gap-1 group">
            <img 
              src="/src/assets/genesislogo.png" 
              alt="Genesis OS Logo" 
              className="h-12 w-auto object-contain" 
            />
          </NavLink>

          {/* DESKTOP NAV: Hidden on mobile, visible on medium screens (md:flex) */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <LiftButton key={item.path} onClick={() => handleNavClick(item.path)}>
                <span className={isActiveRoute(item.path) ? "text-fuchsia-400" : "text-white"}>
                  {item.name}
                </span>
              </LiftButton>
            ))}
          </nav>

          {/* MOBILE BURGER TOGGLE: Visible on mobile, hidden on medium screens (md:hidden) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg border border-white/10 bg-zinc-900 text-white transition-colors duration-200 hover:bg-zinc-800"
            aria-label="Toggle navigation menu"
          >
            <span className={`h-[2px] w-5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`h-[2px] w-5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>

        {/* MOBILE DRAWER ACCORDION: Slides/fades open dynamically */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/5 bg-zinc-900/90 backdrop-blur-lg ${isOpen ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <nav className="flex flex-col gap-4 p-6">
            {navItems.map((item) => (
              <div 
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`cursor-pointer px-4 py-2 rounded-xl border text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActiveRoute(item.path) 
                    ? "text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5" 
                    : "text-zinc-400 border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </div>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}