import React, { createContext, useContext, useEffect } from "react";
import useWorkspaceId from "../hooks/use-workspace-id";
import useAuth from './../hooks/api/use-auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const {
        data: authData,
        error: authError,
        isLoading: authLoading,
        isFetching,
        refetch: refetchAuth
    } = useAuth();

    const user = authData;

    return (
        <AuthContext.Provider value={{ user, authError, authLoading, isFetching, refetchAuth }}>
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
