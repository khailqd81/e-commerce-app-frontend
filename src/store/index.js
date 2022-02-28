import { useContext } from 'react'
import TypeContext from './TypeContext'
export * as actions from './actions'
export {default as TypeContext} from './TypeContext'
export const useStore = () => {
    const [state, dispatch] = useContext(TypeContext);
    return [state,dispatch];
}