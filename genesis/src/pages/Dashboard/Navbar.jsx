import { Bell, ChevronDown } from "lucide-react";
import SearchBar from "../../components/Dashboard/Searchbar";
import { useAuth } from "../../contexts/authcontext";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header
      className="
        sticky
        top-0
        h-20
        bg-white/80
        backdrop-blur-md
        border-b
        border-zinc-200
        flex
        items-center
        justify-between
        px-8
        z-30
      "
    >
      <SearchBar />

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-zinc-500 hover:text-black transition">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-3 rounded bg-zinc-200 animate-pulse"></div>
              <div className="w-16 h-2 rounded bg-zinc-100 animate-pulse"></div>
            </div>
          </div>
        ) : (
          <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-zinc-100 transition">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{
                backgroundColor: user?.avatarColor || "#4F46E5",
              }}
            >
              {user?.initials}
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-zinc-900">
                {user?.name}
              </p>

              <p className="text-xs text-zinc-500">
                @{user?.username}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="text-zinc-400 hidden md:block"
            />
          </button>
        )}
      </div>
    </header>
  );
}