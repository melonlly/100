import React, { useState, createContext } from "react";

export const context = createContext({});

export function ContextProvider({ children }) {
    const [count, setCount] = useState(100);

    const provider = {
        count,
        setCount,
        mul: () => setCount(count * 2),
        divide: () => setCount(count / 2),
    };
    return <context.Provider value={provider}>{children}</context.Provider>;
}
