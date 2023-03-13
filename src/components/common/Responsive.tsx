import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

export const DesktopContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
`;

export const Desktop = ({ children }: React.PropsWithChildren) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return <DesktopContainer>{isDesktop && children}</DesktopContainer>;
};

export const Tablet = ({ children }: React.PropsWithChildren) => {
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1023 });
  return <>{isTablet && children}</>;
};
export const Mobile = ({ children }: React.PropsWithChildren) => {
  const isMobile = useMediaQuery({ maxWidth: 599 });
  return <>{isMobile && children}</>;
};
