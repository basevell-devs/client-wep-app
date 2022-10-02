import { useReducer } from "react";
import axios from "axios";

import { AppContext } from "./AppContext";
import { appReducer } from "./AppReducer";

const initialState: ITAppDateState = {
  loading: null,
  alert: null,
};

interface AppProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [appData, dispatch] = useReducer(appReducer, initialState);

  const getData = async () => {
    console.log("Testing...");
  };

  return (
    <AppContext.Provider
      value={{
        appData,
        getData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
