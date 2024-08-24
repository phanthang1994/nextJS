'use client'
import { createContext, useState, useContext } from 'react';

const AppContext = createContext({
    sessionToken: '',
    setSessionToken: (setSessionToken: string) => { },
});

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}

export default function AppProvider({ children, initialSessionToken }:
    { children: React.ReactNode, initialSessionToken: string | undefined }) {

    const [sessionToken, setSessionToken] = useState(initialSessionToken ?? '');

    return (
        <AppContext.Provider value={{ sessionToken, setSessionToken }}>
            {children}
        </AppContext.Provider>
    );
}