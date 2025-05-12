import { IUser } from "@/lib/api";
import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";


interface GlobalContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// ✅ This fixes your error:
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      isLogged,
      setIsLogged,
      isLoading,
      setIsLoading,
      token,
      setToken,
    }),
    [user, isLogged, isLoading, token]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
