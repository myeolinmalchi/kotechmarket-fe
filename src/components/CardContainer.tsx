import React, { useContext } from 'react';
import styled from 'styled-components';
import Color from '../styles/Color';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import Font from '../styles/Font';

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 80px;

  @media (max-width: 1024px) {
    padding: 0 28px;
    box-sizing: border-box;
    gap: 16px;
    margin-bottom: 60px;
  }
  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const CardSectionTitle = ({ children }: React.PropsWithChildren) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isDesktop, isMobile } = useContext(MediaQueryContext);
  return (
    <span
      style={{
        ...(isDesktop ? Font.title.display1 : Font.title.headline),
        boxSizing: 'border-box',
        padding: isDesktop ? '' : isMobile ? '0 16px' : '0 28px',
        color: isDarkMode ? '' : Color.light.text.primary,
        width: '100%',
        textAlign: 'start',
        marginBottom: '28px',
      }}
    >
      {children}
    </span>
  );
};
