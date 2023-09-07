import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IWine } from "../types";

//defing type of context data
interface IContextData {
  wineData: IWine[];
  setWineData: Dispatch<SetStateAction<IWine[]>>;
}

//creating the context
const appContext = createContext<IContextData | undefined>(undefined);

const { Provider } = appContext;

// provider component
interface IProviderProps {
  children: ReactNode;
}
export const ContextProvider: React.FC<IProviderProps> = ({ children }) => {
  const [wineData, setWineData] = useState<IWine[]>([]);
  const contextValue: IContextData = { wineData, setWineData };
  return <Provider value={contextValue}>{children}</Provider>;
};

//custom hook for using context values
export const useAppContext = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useAppContext must be used with a Context Provider");
  }
  return context;
};
