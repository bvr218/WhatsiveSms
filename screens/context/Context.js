import React, { createContext, useState } from 'react';

const Context = createContext();

const MyContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [less, setLess] = useState("false");
    const [token, setToken] = useState("");
    const [id, setId] = useState("");
    const [type, setType] = useState("false");
    const [isRunning, setIsRunning] = useState(false);
    const [isReady, setIsReady] = useState(false);

    return (
        <Context.Provider value={{ less, setLess, isLoading, setIsLoading, isRunning, setIsRunning, isReady, setIsReady,type,setType, id, token, setToken, setId }}>
        {children}
        </Context.Provider>
    );
};

export { Context, MyContextProvider };
