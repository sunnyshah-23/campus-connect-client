import { createContext, useEffect, useReducer, axios } from "react";
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
    isAuthenticated: false,
}
export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, isAuthenticated: state.isAuthenticated, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}