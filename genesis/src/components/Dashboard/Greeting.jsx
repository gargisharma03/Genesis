import getGreeting from "../../../../backend/src/utils/getGreeting";

export default function Greeting() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <h1 className="text-5xl font-bold">
                {getGreeting()}, {user?.username}
            </h1>

            
        </>
    );
}