"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserBase, Client, Talent, Role } from "@/types";
import { MOCK_CLIENTS, MOCK_TALENT } from "@/lib/data";
import { useRouter } from "next/navigation";

interface UserContextType {
    user: UserBase | Client | Talent | null;
    login: (role: Role, id?: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserBase | Client | Talent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem("opulenss_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (role: Role, id?: string) => {
        let newUser: UserBase | Client | Talent | null = null;

        if (role === "CLIENT") {
            newUser = MOCK_CLIENTS.find((c) => c.id === (id || "c1")) || MOCK_CLIENTS[0];
        } else if (role === "TALENT") {
            newUser = MOCK_TALENT.find((t) => t.id === (id || "t1")) || MOCK_TALENT[0];
        } else if (role === "ADMIN") {
            newUser = {
                id: "admin1",
                role: "ADMIN",
                name: "Admin User",
                email: "admin@opulenss.com",
                city: "London",
            };
        }

        if (newUser) {
            setUser(newUser);
            localStorage.setItem("opulenss_user", JSON.stringify(newUser));

            // Redirect based on role
            if (role === "CLIENT") router.push("/app/dashboard");
            else if (role === "TALENT") router.push("/t/dashboard");
            else if (role === "ADMIN") router.push("/admin/dashboard");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("opulenss_user");
        router.push("/");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
