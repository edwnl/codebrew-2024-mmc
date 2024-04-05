import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, getAuth } from "firebase/auth";

const AuthContext = createContext({
    user: null,
    isLoading: false,
    isLoggedIn: false,
}
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsLoading(false);
                setIsLoggedIn(true);
                setUser(currentUser);
            } else {
                setIsLoading(false);
                setIsLoggedIn(false);
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
