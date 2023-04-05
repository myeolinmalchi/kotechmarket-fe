import React from 'react';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DarkModeContext = React.createContext<DarkModeContextType>(
  {} as DarkModeContextType
);

const DarkModeProvider = ({ children }: React.PropsWithChildren) => {
  const [isDarkMode, setDarkMode] = React.useState<boolean>(
    ((typeof window !== 'undefined'
      ? localStorage.getItem('isDarkMode')
      : null) ?? 'false') === 'true'
  );

  const toggleDarkMode = React.useCallback(() => {
    localStorage.setItem('isDarkMode', `${!isDarkMode}`);
    setDarkMode((isDarkMode) => !isDarkMode);
  }, [isDarkMode]);

  const value = React.useMemo(
    () => ({
      isDarkMode,
      setDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
