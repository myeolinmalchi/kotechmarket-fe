import styled, { css } from 'styled-components';
import React, { useContext } from 'react';
import Color from '../styles/Color';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import Font from '../styles/Font';

export const Title = ({ children }: React.PropsWithChildren) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isDesktop, isMobile } = useContext(MediaQueryContext);
  return (
    <span
      style={{
        ...(isDesktop ? Font.title.display3 : Font.title.display1),
        padding: isDesktop ? '' : isMobile ? '0 16px' : '0 28px',
        marginTop: isDesktop ? '' : '60px',
        boxSizing: 'border-box',
        color: isDarkMode ? '' : Color.light.text.primary,
        width: '100%',
        textAlign: 'start',
        marginBottom: isDesktop ? '48px' : '36px',
      }}
    >
      {children}
    </span>
  );
};

export const SearchContainer = styled.div<{ isDarkMode: boolean }>`
  border: 1px solid
    ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 32px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 28px;
    border: none;
  }

  @media (max-width: 600px) {
    padding: 0 16px;
    border: none;
  }
`;

export const SearchContainer2 = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  gap: 12px 8px;
  margin-bottom: 28px;
  box-sizing: border-box;
  background: ${Color.light.background.white};
  border: 1px solid ${Color.light.stroke.gray1};
  ${(props) =>
    props.isDarkMode &&
    css`
      background: ${Color.light.background.gray1};
      border: 1px solid ${Color.light.stroke.gray1};
    `}
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    margin: 0 28px;
    width: calc(100% - 32px);
    margin-bottom: 28px;
    background: none;
    border: none;
    padding: 0;
  }
  @media (max-width: 1024px) {
    margin: 0 16px;
  }
`;
