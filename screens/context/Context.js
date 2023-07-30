import React, { createContext, useState } from 'react';

const Context = createContext();

const MyContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Context.Provider value={{ isLoading, setIsLoading }}>
        {children}
        </Context.Provider>
    );
};

export { Context, MyContextProvider };
