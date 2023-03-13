import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import Color from '../../styles/Color';
import Font from '../../styles/Font';

export const Title = ({
  children,
  style,
}: React.HTMLProps<HTMLSpanElement>) => {
  const { isDesktop } = useContext(MediaQueryContext);
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <span
      style={{
        ...style,
        ...(isDesktop ? Font.title.display4 : Font.title.display1),
        color: isDarkMode ? '' : Color.light.text.primary,
        marginTop: isDesktop ? '100px' : '60px',
      }}
    >
      {children}
    </span>
  );
};

export const Summary = ({
  children,
  style,
}: React.HTMLProps<HTMLSpanElement>) => {
  const { isDesktop } = useContext(MediaQueryContext);
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <span
      style={{
        ...style,
        ...(isDesktop ? Font.body.body2 : Font.body.body1),
        color: isDarkMode ? '' : Color.light.text.secondary,
      }}
    >
      {children}
    </span>
  );
};
