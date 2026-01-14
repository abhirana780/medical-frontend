import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import api from '../utils/api';

interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: any) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // Do not force reload, let the component handle navigation
    };

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);

                try {
                    // Refresh user profile to get latest isAdmin status
                    const { data } = await api.get('/api/auth/profile');
                    // data contains _id, name, email, isAdmin. Preserve token from localStorage
                    const updatedUser = { ...data, token: parsedUser.token };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (error) {
                    console.error("Failed to refresh user session", error);
                    // If 401, logout
                    if (axios.isAxiosError(error) && error.response?.status === 401) {
                        setUser(null);
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                    }
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
