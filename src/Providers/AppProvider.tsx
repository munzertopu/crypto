/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
} from 'react'
import Application from '../Application';

interface AppContextInterface {
  app: Application;
}

interface AppProviderProps {
  children: React.ReactNode;
  app: Application;
}

export const AppContext = createContext({} as AppContextInterface)

const AppProvider = ({ children, app }: AppProviderProps) => {
  return (
    <AppContext.Provider value={{ app }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
