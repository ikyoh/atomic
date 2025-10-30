'use client'

import { createContext, useContext } from 'react'

export const Context = createContext<Promise<any> | null>(null)

export function ContextProvider({
    children,
    promise,
}: {
    children: React.ReactNode
    promise: Promise<any>
}) {
    return (
        <Context.Provider value={promise}>{children}</Context.Provider>
    )
}

export function useSiteContext() {
    const context = useContext(Context)
    if (!context) {
        throw new Error('useSiteContext must be used within a ContextProvider')
    }
    return context
}