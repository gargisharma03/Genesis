import getGreeting from "../../../../backend/src/utils/getGreeting";

export default function Greeting() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <h1 className="text-5xl font-medium font-serif ">
                <h1>
                {getGreeting()}, {user?.name?.split(" ")[0]}
                </h1>
            </h1>

            
        </>
    );
}