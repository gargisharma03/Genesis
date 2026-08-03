import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    console.log("AuthProvider mounted");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await getCurrentUser();
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
        
    );
}

export const useAuth = () => useContext(AuthContext);