import React from 'react';
import { FontType, ColorType } from '../types/Style';
import { DarkModeContext } from './DarkModeProvider';

type StyleContextType = {
  Font: FontType;
  Color: ColorType;
};

export const StyleContext = React.createContext<StyleContextType>(
  {} as StyleContextType
);

const StyleProvider = ({ children }: React.PropsWithChildren) => {
  const Font = React.useMemo<FontType>(
    () => ({
      title: {
        display5: {
          fontSize: '40px',
          fontWeight: '700',
          lineHeight: '52px',
          letterSpacing: '-0.6px',
        },
        display4: {
          fontSize: '36px',
          fontWeight: '700',
          lineHeight: '46px',
          letterSpacing: '-0.6px',
        },
        display3: {
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: '42px',
          letterSpacing: '-0.6px',
        },
        display2: {
          fontSize: '28px',
          fontWeight: '700',
          lineHeight: '38px',
          letterSpacing: '-0.6px',
        },
        display1: {
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '34px',
          letterSpacing: '-0.6px',
        },
        headline: {
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '28px',
          letterSpacing: '-0.6px',
        },
        subhead3: {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '22px',
          letterSpacing: '-0.6px',
        },
        subhead2: {
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '20px',
          letterSpacing: '-0.6px',
        },
        subhead1: {
          fontSize: '12px',
          fontWeight: '700',
          lineHeight: '18px',
          letterSpacing: '-0.6px',
        },
        subheadLong3: {
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '28px',
          letterSpacing: '-0.6px',
        },
        subheadLong2: {
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '24px',
          letterSpacing: '-0.6px',
        },
      },
      body: {
        body3: {
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '28px',
          letterSpacing: '-0.6px',
        },
        body2: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '-0.6px',
        },
        body1: {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '20px',
          letterSpacing: '-0.6px',
        },
        bodyLong2: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '28px',
          letterSpacing: '-0.6px',
        },
        bodyLong1: {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '-0.6px',
        },
        caption: {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '18px',
          letterSpacing: '-0.6px',
        },
      },
    }),
    []
  );

  const { isDarkMode } = React.useContext(DarkModeContext);

  const Color = React.useMemo<ColorType>(
    () =>
      isDarkMode
        ? {
            action: {
              blue: {
                filled: '#1B4FAF',
                hover: '276DD',
                pressed: '#1339AC',
                disabled: '#D1E9FF',
              },
              gray: {
                filled: '#444444',
                hover: '#7B7B7B',
                pressed: '#111111',
                disabled: '#DEDEDE',
              },
            },
            background: {
              gray2: '#EDEFF0',
              gray1: '#F5F6F7',
              default: '#FFFFFF',
              blue1: '#1852FD',
            },
            stroke: {
              gray4: '#444444',
              gray3: '#ADADAD',
              gray2: '#D8D8D8',
              gray1: '#EEEEEE',
              blue1: '#1852FD',
              red1: '#F04438',
            },
            text: {
              primary: '#111111',
              secondary: '#5D6169',
              third: '#A3A7AE',
              disabled: 'rgba(0, 0, 0, 0.2)',
              default: '#FFFFFF',
              blue: '#1852FD',
              subBlue: '#1874FD',
              red: '#F04438',
              subRed: '#FDA19B',
            },
          }
        : {
            action: {
              blue: {
                filled: '#1852FD',
                hover: '#1874FD',
                pressed: '#1339AC',
                disabled: '#D1E9FF',
              },
              gray: {
                filled: '#444444',
                hover: '#7B7B7B',
                pressed: '#111111',
                disabled: '#DEDEDE',
              },
            },
            background: {
              gray2: '#EDEFF0',
              gray1: '#F5F6F7',
              default: '#FFFFFF',
              blue1: '#1852FD',
            },
            stroke: {
              gray4: '#444444',
              gray3: '#ADADAD',
              gray2: '#D8D8D8',
              gray1: '#EEEEEE',
              blue1: '#1852FD',
              red1: '#F04438',
            },
            text: {
              primary: '#111111',
              secondary: '#5D6169',
              third: '#A3A7AE',
              disabled: 'rgba(0, 0, 0, 0.2)',
              default: '#FFFFFF',
              blue: '#1852FD',
              subBlue: '#1874FD',
              red: '#F04438',
              subRed: '#FDA19B',
            },
          },
    [isDarkMode]
  );

  const value = React.useMemo(
    () => ({
      Color,
      Font,
    }),
    [isDarkMode]
  );

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
};

export default StyleProvider;
