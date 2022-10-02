import { createContext } from "react";

export type TAppContextProps = {
  appData: any;
  getData: () => void;
};

export const AppContext = createContext<TAppContextProps>({} as TAppContextProps);
