import React, { createContext, useState } from 'react';

export const URLContext = createContext<{
  urlStack: string[];
  setURL: (url: string) => void;
  popURL: () => void;
}>({
  urlStack: [],
  setURL: () => {},
  popURL: () => {},
});

export const URLProvider: React.FC = ({
  children,
}: React.PropsWithChildren) => {
  const [urlStack, setUrlStack] = useState<string[]>([
    typeof window !== 'undefined' ? window.location.pathname : '',
  ]);

  const setURL = (url: string) => {
    setUrlStack((prevStack) => [...prevStack, url]);
  };

  const popURL = () => {
    setUrlStack((prevStack) => {
      if (prevStack.length === 1) return [];
      return prevStack.slice(0, prevStack.length - 1);
    });
  };

  return (
    <URLContext.Provider value={{ urlStack, setURL, popURL }}>
      {children}
    </URLContext.Provider>
  );
};
