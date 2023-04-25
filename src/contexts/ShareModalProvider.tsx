import React, { useCallback, useState } from 'react';

type ShareModalContextType = {
  visible: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ShareModalContext = React.createContext(
  {} as ShareModalContextType
);

const ShareModalProvider = ({ children }: React.PropsWithChildren) => {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const props = React.useMemo(
    () => ({
      visible,
      openModal,
      closeModal,
    }),
    [visible]
  );

  return (
    <ShareModalContext.Provider value={props}>
      {children}
    </ShareModalContext.Provider>
  );
};

export default ShareModalProvider;
