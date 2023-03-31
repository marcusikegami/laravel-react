import { createContext, useContext, useState } from "react";

// default values for the context are set as null and the functions are made empty simply to enable autocomplete in the IDE
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

// This provider will be used to share the authentification state of the user across the app
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        // Any function which receives this context will have access to the values (user, token) and the functions (setUser, setToken)
        <StateContext.Provider value={{
            user, 
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
};

// this function will be used in the components which need to determine the authentification state of the user
// it will return the values (user, token) and the functions (setUser, setToken)

export const useStateContext = () => useContext(StateContext);