import SearchBar from "../../components/Dashboard/Searchbar";

export default function Navbar() {

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

            <div className="flex items-center gap-5">

                🔔

                👤

            </div>

        </header>

    );

}