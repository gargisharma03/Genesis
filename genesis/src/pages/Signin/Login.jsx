import Card1 from './Card.jsx';
import LiquidChrome from './Particles';

export default function login() {
    return (
        <>
        <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-[#09090B] select-none">
            
            {/* Background Canvas */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <LiquidChrome
                    baseColor={[0.1, 0.1, 0.1]}
                    speed={0.3}
                    amplitude={0.3}
                    interactive
                />
            </div>

            {/* 
              px-4: Adds safe margins on mobile so the card doesn't touch the screen edges.
              md:px-0: Removes that padding on desktop since there's plenty of space.
            */}
            <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 md:px-0">
                <Card1 type="login"/>
            </div>
        </div>
        </>
    );
}