import React from 'react';
import { useMediaQuery } from 'react-responsive';
type MediaQueryContextType = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

export const MediaQueryContext = React.createContext<MediaQueryContextType>(
  {} as MediaQueryContextType
);

const MediaQueryProvider = ({ children }: React.PropsWithChildren) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 599 });

  const value = {
    isDesktop,
    isTablet,
    isMobile,
  };

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export default MediaQueryProvider;
