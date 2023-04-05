import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import Font from '../styles/Font';
import { useStyleContext } from '../contexts/AppContextProvider';

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
  const { isDesktop, isMobile } = useContext(MediaQueryContext);
  const { Color } = useStyleContext();
  return (
    <span
      style={{
        ...(isDesktop ? Font.title.display1 : Font.title.headline),
        boxSizing: 'border-box',
        padding: isDesktop ? '' : isMobile ? '0 16px' : '0 28px',
        color: Color.text.primary,
        width: '100%',
        textAlign: 'start',
        marginBottom: '28px',
      }}
    >
      {children}
    </span>
  );
};
