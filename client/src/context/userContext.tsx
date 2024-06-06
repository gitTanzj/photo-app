import { createContext, useReducer } from "react";

export const UserContext = createContext<any>(null);

export const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
}

export const UserContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: null,
        isFetching: false,
        error: false,
    });

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}