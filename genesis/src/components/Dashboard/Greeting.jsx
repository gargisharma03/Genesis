import { useAuth } from "../../contexts/authcontext";
import getGreeting from "../Dashboard/getGreeting";

export default function Greeting() {
    const { user } = useAuth();

    return (
        <h1 className="text-5xl font-medium font-serif">
            {getGreeting()}, {user?.name?.split(" ")[0]}
        </h1>
    );
}