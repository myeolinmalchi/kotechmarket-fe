import React, { createContext } from 'react';

export const NavigationContext = createContext(
  {} as {
    isNavigating: boolean;
    setIsNavigating: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

export const NavigationContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isNavigating, setIsNavigating] = React.useState(false);

  return (
    <NavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
      {children}
    </NavigationContext.Provider>
  );
};
