import React, { useCallback, useState } from 'react';

interface ModalProps {
  title: string | React.ReactNode;
  content: string | string[];
  image?: string;
  qrvalue?: string;
  buttonType: number;
  buttonDirection?: 'vertical' | 'horizontal';
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick: (e: React.MouseEvent) => void;
  onSecondaryButtonClick?: (e: React.MouseEvent) => void;
  secondaryButtonType?: boolean;
  closeModal?: () => void;
  visible?: boolean;
  reverseButtonOrder?: boolean;
}

type ModalContextType = {
  value: ModalProps;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
};

export const ModalContext = React.createContext({} as ModalContextType);
const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [value, setValue] = useState<ModalProps>({
    title: '',
    content: '',
    buttonType: 0,
    primaryButtonLabel: '',
    onPrimaryButtonClick: () => {},
    visible: false,
  } as ModalProps);

  const openModal = useCallback((props: ModalProps) => {
    setValue({ ...props, visible: true });
  }, []);

  const closeModal = useCallback(() => {
    setValue((props) => ({ ...props, visible: false }));
  }, []);

  const props = React.useMemo(
    () => ({
      value,
      openModal,
      closeModal,
    }),
    [value]
  );

  return (
    <ModalContext.Provider value={props}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
