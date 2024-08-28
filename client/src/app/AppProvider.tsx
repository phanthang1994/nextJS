'use client'
import { clientSessionToken } from '@/lib/http';
import { createContext, useState } from 'react';
const AppContext = createContext({});


export default function AppProvider({ children, initialSessionToken ='' }:
    { children: React.ReactNode, initialSessionToken: string | undefined }) {

        useState(() => {  
            if (typeof window !== 'undefined') {  
                clientSessionToken.value = initialSessionToken  
            }  
           
        });

    return (
        <>
            {children}
        </>
    );
}
