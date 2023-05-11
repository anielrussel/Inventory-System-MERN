import { useContext } from 'react'
import { InventoryContext } from '../context/InventoryContext'

const useInventoryContext = () => {

    const context = useContext(InventoryContext)

    if (!context) {
        throw Error('useInventoryContext must be used inside an InventoryContextProvider')
    }
  return context
}

export default useInventoryContext