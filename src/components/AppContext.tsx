import { createContext, useEffect, useState, ReactNode } from "react";
import { getAllLocalStorage } from "../services/storage";

interface IAppContext {
  user: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AppContext = createContext({} as IAppContext);

interface IAppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: IAppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storage = getAllLocalStorage();
    if (storage?.login === true) {
      setIsLoggedIn(true);
    }
  }, []);

  const user = "bernardo";

  return (
    <AppContext.Provider value={{ user, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};
