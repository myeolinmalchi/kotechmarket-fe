import React, { useState } from 'react';

type SideNavContextType = {
  isOpened: boolean;
  disabled: boolean;
  toggleSideNav: () => void;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideNavContext = React.createContext<SideNavContextType>(
  {} as SideNavContextType
);

const SideNavProvider = ({ children }: React.PropsWithChildren) => {
  const [disabled, setDisabled] = useState(false);

  const [isOpened, setIsOpened] = React.useState<boolean>(
    (typeof window !== 'undefined'
      ? localStorage.getItem('sideNavOpened')
      : null ?? 'false') === 'true'
  );

  const toggleSideNav = React.useCallback(() => {
    localStorage.setItem('sideNavOpened', `${!isOpened}`);
    setIsOpened((isOpened) => !isOpened);
  }, [isOpened]);

  const value = React.useMemo(
    () => ({
      isOpened,
      disabled,
      setIsOpened,
      toggleSideNav,
      setDisabled,
    }),
    [isOpened, disabled]
  );

  return (
    <SideNavContext.Provider value={value}>{children}</SideNavContext.Provider>
  );
};

export default SideNavProvider;
