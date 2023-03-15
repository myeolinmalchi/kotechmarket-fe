import React, { PropsWithChildren, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SideNavContext } from '../../contexts/SideNavProvider';
import GlobalStyle from '../../styles/GlobalStyle';
import { MobileTopNav, TopNav } from '../TopNav';
import { SideNav } from '../SideNav';
import styled from 'styled-components';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import { Toast } from '../../components/Toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const OuterContainer = styled(Container)`
  padding: 0;
`;

const InnerContainer = styled(Container)`
  padding: 60px 28px;
  width: 100%;
  max-width: 1200px;
  position: relative;
`;

const SideNavArea = styled.div``;

const ContentWrapper = styled.div<{ disabled: boolean; isOpened: boolean }>`
  position: relative;
  display: flex;
  top: 60px;
  left: 0px;

  ${SideNavArea} {
    width: ${({ disabled, isOpened }) =>
      disabled ? '0px' : isOpened ? '240px' : '76px'};
    transition: width 0.2s;
  }

  ${OuterContainer} {
    width: calc(
      100% -
        ${({ disabled, isOpened }) =>
          disabled ? '0px' : isOpened ? '240px' : '76px'}
    );
    transition: width 0.2s;
  }

  @media (max-width: 600px) {
    top: 64px;
    ${SideNavArea} {
      display: ${({ disabled, isOpened }) =>
        disabled ? 'none' : isOpened ? 'block' : 'none'};
      width: ${({ isOpened }) => (isOpened ? '0' : '100vw')};
    }
    ${OuterContainer} {
      display: ${({ isOpened }) => (isOpened ? 'none' : 'block')};
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    ${SideNavArea} {
      display: ${({ disabled, isOpened }) =>
        disabled ? 'none' : isOpened ? 'block' : 'none'};
      width: ${({ isOpened }) => (isOpened ? '0' : '240px')};
    }
    ${InnerContainer} {
      padding: 0;
    }

    ${OuterContainer} {
      width: 100%;
    }
  }
`;

const Layout = ({ children }: PropsWithChildren) => {
  const { isDesktop, isTablet, isMobile } = useContext(MediaQueryContext);
  const { isOpened, disabled } = useContext(SideNavContext);
  const [isLoaded, setIsLoaded] = useState(false);
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="flex-gap-polyfill">
      <Helmet>
        <link
          href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>
      <GlobalStyle />
      {isLoaded && (
        <div>
          {isDesktop && <TopNav isWritingPage={false} />}
          {(isMobile || isTablet) && <MobileTopNav />}
          <ContentWrapper isOpened={isOpened} disabled={disabled}>
            <SideNavArea>
              <SideNav />
            </SideNavArea>
            <OuterContainer>
              <InnerContainer>
                <Toast />
                {children}
              </InnerContainer>
            </OuterContainer>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Layout;
