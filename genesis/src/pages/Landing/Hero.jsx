import Tilt from "react-parallax-tilt";
import Laptop3D from "./Laptop3D";
import gsap from "gsap";
import LiftButton from "../../components/Button/Liftbutton";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] relative min-h-screen overflow-hidden bg-[#09090B] text-white select-none">
            
            {/* Left Content Column */}
            {/* FIX: Replaced absolute padding with fluid responsive paddings, centers items when stacked on mobile */}
            <div className="flex flex-col items-center md:items-start justify-center px-6 py-16 md:py-0 md:pl-16 z-10 w-full">
                
                {/* Heading 1: UNIFY YOUR */}
                {/* FIX: Added step-up font sizes from text-5xl on mobile to your high-fidelity text-[6rem] on desktop */}
                <h1 className="font-bold font-archivo-black text-white text-5xl sm:text-6xl md:text-[4.5rem] lg:text-[6rem] leading-none tracking-[-0.06em] text-center md:text-left w-full">
                    UNIFY YOUR
                </h1>

                {/* Subtitle: genesis */}
                {/* FIX: Removed hardcoded text-[4rem] to keep layout fluent on small screens */}
                <h2 className="font-serif italic text-4xl sm:text-5xl md:text-[3rem] lg:text-[4rem] text-fuchsia-400  text-center md:text-left w-full mt-1 md:mt-2">
                    genesis
                </h2>

                {/* Heading 2: RESEARCH */}
                <h1 className="font-bold text-center md:text-left font-archivo-black text-white text-5xl sm:text-6xl md:text-[4.5rem] lg:text-[6rem] leading-none tracking-[-0.06em] w-full mt-1">
                    RESEARCH
                </h1>

                {/* Tagline Paragraph */}
                <p className="mt-6 text-base sm:text-lg md:text-base lg:text-lg text-zinc-400 font-poppins text-center md:text-left max-w-md md:max-w-none">
                    From literature survey to manuscript, built in a high-density team workspace.
                </p>
                
                {/* CTA Interaction Layer */}
                <div className="mt-8 md:mt-10 flex justify-center md:justify-start w-full">
                    <LiftButton onClick={() => navigate("/register")}>
                        GET STARTED
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        >
                            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </LiftButton>
                </div>
            </div>

            {/* Right Asset Container (3D Canvas / Mockup Asset) */}
            {/* FIX: Added max width constraints and fluid heights to prevent the 3D canvas tracking box from breaking element borders */}
            <div className="flex justify-center items-center px-6 pb-16 md:pb-0 md:px-0 w-full overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-0">
                <div className="hidden lg:block w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-none transform scale-90 sm:scale-100 transition-transform duration-300">
                    <Laptop3D />
                </div>
            </div>

            {/* Neon Aura Backdrops: Re-calculated coordinate offsets to prevent overflow wrapping bugs on smartphones */}
            <div className="absolute bottom-[-180px] left-[-120px] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-violet-700/40 md:bg-violet-700/60 blur-[100px] md:blur-[170px] pointer-events-none" />
            <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 h-[350px] w-[450px] md:h-[550px] md:w-[650px] rounded-full bg-purple-500/30 md:bg-purple-500/40 blur-[120px] md:blur-[200px] pointer-events-none" />
            <div className="absolute bottom-[-180px] right-[-120px] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-fuchsia-600/40 md:bg-fuchsia-600/60 blur-[100px] md:blur-[170px] pointer-events-none" />
            
        </section>
    );
}