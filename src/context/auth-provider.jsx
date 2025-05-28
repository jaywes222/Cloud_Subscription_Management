import React, { createContext, useContext, useEffect } from "react";
import useWorkspaceId from "../hooks/use-workspace-id";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const workspaceId = useWorkspaceId();

    useEffect(() => {
    }, []);

    return (
        <AuthContext.Provider value={{ workspaceId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuthContext must be used within an AuthProvider"
        );
    }
    return context;
};
