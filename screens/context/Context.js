import React, { createContext, useState } from 'react';

const Context = createContext();

const MyContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isReady, setIsReady] = useState(false);

    return (
        <Context.Provider value={{ isLoading, setIsLoading, isRunning, setIsRunning, isReady, setIsReady }}>
        {children}
        </Context.Provider>
    );
};

export { Context, MyContextProvider };
