import styled, { css } from 'styled-components';
import React, { useContext } from 'react';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import Font from '../styles/Font';
import { useStyleContext } from '../contexts/AppContextProvider';
import { ColorType } from '../types/Style';

export const Title = ({ children }: React.PropsWithChildren) => {
  const { Color } = useStyleContext();
  const { isDesktop, isMobile } = useContext(MediaQueryContext);
  return (
    <span
      style={{
        ...(isDesktop ? Font.title.display3 : Font.title.display1),
        padding: isDesktop ? '' : isMobile ? '0 16px' : '0 28px',
        marginTop: isDesktop ? '' : '60px',
        boxSizing: 'border-box',
        color: Color.text.primary,
        width: '100%',
        textAlign: 'start',
        marginBottom: isDesktop ? '48px' : '36px',
      }}
    >
      {children}
    </span>
  );
};

export const SubTitle = ({ children }: React.PropsWithChildren) => {
  const { Color } = useStyleContext();
  const { isDesktop, isMobile } = useContext(MediaQueryContext);
  return (
    <span
      style={{
        ...(isDesktop ? Font.body.body2 : Font.body.body1),
        padding: isDesktop ? '' : isMobile ? '0 16px' : '0 28px',
        marginTop: isDesktop ? '' : '60px',
        boxSizing: 'border-box',
        color: Color.text.secondary,
        width: '100%',
        textAlign: 'start',
      }}
    >
      {children}
    </span>
  );
};

export const SmallTitle = ({ children }: React.PropsWithChildren) => {
  const { Color } = useStyleContext();
  const { isDesktop, isMobile } = useContext(MediaQueryContext);
  return (
    <span
      style={{
        ...(isDesktop ? Font.title.display1 : Font.title.display1),
        padding: isDesktop ? '' : isMobile ? '0 16px' : '0 28px',
        marginTop: isDesktop ? '8px' : '8px',
        boxSizing: 'border-box',
        color: Color.text.primary,
        width: '100%',
        textAlign: 'start',
        marginBottom: isDesktop ? '24px' : '18px',
      }}
    >
      {children}
    </span>
  );
};

const $SearchContainer = styled.div<{ Color: ColorType }>`
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 32px;
  box-sizing: border-box;
  background: ${(props) => props.Color.background.default};

  @media (max-width: 1024px) {
    padding: 0 28px;
    border: none;
  }

  @media (max-width: 600px) {
    padding: 0 16px;
    border: none;
  }
`;

export const SearchContainer = ({ children }: React.PropsWithChildren) => {
  const { Color } = useStyleContext();
  return <$SearchContainer Color={Color}>{children}</$SearchContainer>;
};

const $SearchContainer2 = styled.div<{ Color: ColorType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  gap: 12px 8px;
  margin-bottom: 28px;
  box-sizing: border-box;
  background: ${(props) => props.Color.background.default};
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    background: none;
    border: none;
    padding: 0;
    width: calc(100% - 56px);
  }
  @media (max-width: 600px) {
    width: calc(100% - 32px);
  }
`;

export const SearchContainer2 = ({ children }: React.PropsWithChildren) => {
  const { Color } = useStyleContext();
  return <$SearchContainer2 Color={Color}>{children}</$SearchContainer2>;
};
