import { createContext, useEffect, useReducer, ReactNode } from "react";

interface AuthState {
  user: any;
}

interface AuthContextType extends AuthState {
  dispatch?: React.Dispatch<AuthAction>;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: any;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
