import {createContext, useContext} from 'react';

export default function createAppContext<T>() {
  const appContext = createContext<T | undefined>(undefined);

  const useGenericContext = () => {
    const contextIsDefined = useContext(appContext);

    if (!contextIsDefined) {
      throw new Error(
        `useGenericContext must be used within a Provider ${appContext}`,
      );
    }
    return contextIsDefined;
  };
  return [useGenericContext, appContext.Provider] as const;
}
