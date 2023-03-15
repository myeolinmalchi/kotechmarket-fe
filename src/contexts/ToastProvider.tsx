import React, { useState, useCallback } from 'react';

type ToastContextType = {
  visible: boolean;
  alertToast: (state: 0 | 1 | 2, value: string) => void;
  text: string;
  state: 0 | 1 | 2;
};

export const ToastContext = React.createContext<ToastContextType>(
  {} as ToastContextType
);

const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [text, setText] = useState('');
  const [state, setState] = useState<0 | 1 | 2>(0);
  const [visible, setVisible] = useState(false);

  const alertToast = useCallback(
    (state: 0 | 1 | 2, value: string) => {
      setVisible(true);
      setText(value);
      setState(state);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    },
    [text, state, visible]
  );

  const value = React.useMemo(
    () => ({
      text,
      alertToast,
      state,
      visible,
    }),
    [text, state, visible]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
