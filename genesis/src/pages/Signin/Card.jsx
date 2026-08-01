import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Card1({type}) {
    const isLogin =type==="login";
    const[name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (isLogin) {

                const res = await axios.post(
                    "http://localhost:5000/api/auth/login",
                    {
                        email,
                        password,
                    }
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/dashboard");

                console.log(res.data);

            } else {

                const res = await axios.post(
                    "http://localhost:5000/api/auth/register",
                    {
                        name,
                        username,
                        email,
                        password,
                    }
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/dashboard");

                console.log(res.data);

            }

        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="w-full max-w-md p-8 rounded-[40px] shadow-2xl bg-zinc-50 dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 hover:scale-[1.02] group">
            
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-4xl text-center font-semibold font-sans text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {isLogin ?"Login" : "Sign-In"}
                </h2>
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    {isLogin ?"Resume your research":"Access your research workspace"}
                </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-6">
                {!isLogin && (
                    <div className="w-full flex flex-col gap-2 max-w-sm">
                        <label
                            htmlFor="username"
                            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pl-2"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all duration-200 text-sm"
                        />

                        <label
                            htmlFor="name"
                            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pl-2"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-5 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all duration-200 text-sm"
                        />
                    </div>
                )}
                
                {/* Email Input Field */}
                <div className="w-full flex flex-col gap-2 max-w-sm">
                    <label 
                        htmlFor="email" 
                        className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pl-2"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full px-5 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all duration-200 text-sm"
                    />
                </div>

                {/* Password Input Field */}
                <div className="w-full flex flex-col gap-2 max-w-sm">
                    <div className="flex justify-between items-center px-2">
                        <label 
                            htmlFor="password" 
                            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
                        >
                            Password
                        </label>
                        {isLogin && (
                            <a href="#" className="text-xs text-fuchsia-500 hover:underline">
                                Forgot?
                            </a>
                        )}
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-5 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all duration-200 text-sm"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full max-w-sm py-3 px-4 mt-4 bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 cursor-pointer font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-fuchsia-500/10 text-sm"
                >
                    
                    {isLogin ? "Log In" : "Sign In with email"}

                </button>

                {/* Account Toggle Link Footer */}
                <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-2 text-center">
                    {isLogin ? "Not a member? " : "Already a member? "}
                    <button
                        className="text-fuchsia-500 dark:text-fuchsia-400 font-medium hover:underline cursor-pointer bg-transparent border-none"
                        type="button"
                        onClick={() => navigate(isLogin ? "/register" : "/login")}
                    >
                        {isLogin ? "Sign Up" : "Log In"}
                    </button>
                </p>
            </form>
        </div>
    );
}