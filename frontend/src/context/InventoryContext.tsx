import React, { useReducer, createContext, ReactNode } from 'react';

export interface InventoryItem {
  _id: React.Key;
  name: string;
  quantity: number;
  price: number;
  isAvailable: string;
}

interface InventoryState {
  inventory: InventoryItem[] | null;
}

type InventoryAction =
  | { type: 'SET_INVENTORY'; payload: InventoryItem[] }
  | { type: 'CREATE_INVENTORY'; payload: InventoryItem }
  | { type: 'UPDATE_INVENTORY'; payload: InventoryItem }
  | { type: 'DELETE_INVENTORY'; payload: InventoryItem };

interface InventoryContextValue extends InventoryState {
  dispatch: React.Dispatch<InventoryAction>;
}

export const InventoryContext = createContext<InventoryContextValue | undefined>(undefined);

export const inventoryReducer = (state: InventoryState, action: InventoryAction): InventoryState => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return {
        inventory: action.payload,
      };
    case 'CREATE_INVENTORY':
      return {
        inventory: [action.payload, ...(state.inventory || [])],
      };
    case 'UPDATE_INVENTORY':
      return {
        inventory: state.inventory?.map((item) => item._id === action.payload._id ? action.payload : item) || null
      }
    case 'DELETE_INVENTORY':
      return {
        inventory: state.inventory?.filter((i) => i._id !== action.payload._id) || null,
      };
    default:
      return state;
  }
};

interface InventoryContextProviderProps {
  children: ReactNode;
}

const InventoryContextProvider: React.FC<InventoryContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, {
    inventory: null,
  });

  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContextProvider;
