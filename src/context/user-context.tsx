"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface UserData {
    name: string;
    email: string;
    initials: string;
}

interface UserContextType {
    user: UserData | null;
    login: (name: string, email: string, password: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    login: () => { },
    logout: () => { },
});

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const stored = localStorage.getItem("khlan-user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("khlan-user");
            }
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;
        if (!user && pathname.startsWith("/dashboard")) {
            router.replace("/login");
        }
    }, [user, pathname, loaded, router]);

    const login = (name: string, email: string, _password: string) => {
        const initials = name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
        const userData: UserData = { name, email, initials };
        setUser(userData);
        localStorage.setItem("khlan-user", JSON.stringify(userData));
        router.push("/dashboard");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("khlan-user");
        router.push("/login");
    };

    if (!loaded) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-transparent" />
            </div>
        );
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
