import useAuthContext from './useAuthContext'
import useInventoryContext from './useInventoryContext'

const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchInventory } = useInventoryContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout from AuthContext
        if (dispatch && dispatchInventory) {
            dispatch({ type: 'LOGOUT' })
            dispatchInventory({ type: 'SET_INVENTORY', payload: []})
        }
    }
  return { logout }
}

export default useLogout