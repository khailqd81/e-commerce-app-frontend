import { useReducer } from "react";
import TypeContext from "./TypeContext";
import reducer, { initialState } from "./reducers";
function TypeProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <TypeContext.Provider value={[state, dispatch]}>
            {children}
        </TypeContext.Provider>
    )
}

export default TypeProvider;