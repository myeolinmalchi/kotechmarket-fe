import React, { PropsWithChildren, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SideNavContext } from '../../contexts/SideNavProvider';
import GlobalStyle from '../../styles/GlobalStyle';
import { MobileTopNav, TopNav } from '../TopNav';
import { SideNav } from '../SideNav';
import styled, { css, keyframes } from 'styled-components';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import { Toast } from '../../components/Toast';
import { NavigationContext } from '../../contexts/NavigatingContext';
import Modal from '../Modal';
import { ModalContext } from '../../contexts/ModalPrivider';

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

  .page-transition {
    opacity: 0;
    transform: translateY(-5px);
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out, width 0.2s;
  }

  .page-transition.active {
    opacity: 1;
    transform: translateY(0);
  }

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
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div<{ visible: boolean }>`
  ${({ visible }) =>
    visible
      ? css`
          animation: ${fadeIn} 0.5s ease-in-out;
          animation-fill-mode: both;
        `
      : ''}
`;
const Layout = ({ children }: PropsWithChildren) => {
  const { isDesktop, isTablet, isMobile } = useContext(MediaQueryContext);
  const { isOpened, disabled } = useContext(SideNavContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isNavigating } = useContext(NavigationContext);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { value } = useContext(ModalContext);

  return (
    <>
      <Helmet>
        <link
          href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>
      <GlobalStyle />
      {!isLoaded && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <svg
            width="128"
            height="24"
            viewBox="0 0 128 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.2525 4.49786V5.48474H40.0837V7.29182H38.6812C39.1856 7.96089 39.4524 8.78065 39.439 9.62012C39.439 10.8548 39.0268 11.825 38.2023 12.5305C37.3778 13.236 36.2867 13.5888 34.9289 13.5888C33.5606 13.5888 32.4642 13.229 31.6397 12.5093C31.2293 12.1488 30.905 11.7 30.6908 11.1961C30.4767 10.6922 30.3783 10.1463 30.4029 9.59896C30.3831 8.76233 30.6415 7.94297 31.1371 7.27066H29.7556V5.48739H33.5711V4.49786H36.2525ZM43.4624 17.5205V19.3302H33.5027C32.4501 19.3302 31.9239 18.7605 31.9239 17.621V14.3429H34.6236V17.5178L43.4624 17.5205ZM34.9262 7.44528C34.6668 7.42827 34.407 7.47335 34.1683 7.57684C33.9295 7.68032 33.7185 7.83925 33.5527 8.04058C33.2196 8.49983 33.0542 9.06049 33.0843 9.62806C33.0652 10.1808 33.227 10.7245 33.5448 11.1758C33.7059 11.3867 33.9163 11.5543 34.1573 11.6637C34.3983 11.7731 34.6624 11.8209 34.9262 11.8029C35.191 11.8245 35.4568 11.7786 35.6992 11.6695C35.9416 11.5603 36.1527 11.3915 36.313 11.1785C36.6232 10.7212 36.7791 10.1759 36.7577 9.62277C36.7842 9.0585 36.6159 8.50237 36.2814 8.04852C36.1192 7.84721 35.9117 7.68754 35.6761 7.58265C35.4405 7.47777 35.1835 7.43069 34.9262 7.44528ZM43.4624 6.9611V14.6339H40.7863V6.6436C40.7863 5.64878 41.3468 5.15226 42.4677 5.15402H45.6254V6.9611H43.4624Z"
              fill="#1852FD"
            />
            <path
              d="M57.5794 10.5091V6.96113H48.038V5.15405H58.8266C59.7844 5.15405 60.266 5.60384 60.266 6.5087V10.5091H61.7843V12.3189H55.59V13.9593H58.824C59.7818 13.9593 60.2634 14.4117 60.2634 15.3139V19.4995H57.5794V15.7663H48.0538V13.9593H52.9061V12.3189H46.696V10.5091H57.5794Z"
              fill="#1852FD"
            />
            <path
              d="M72.1309 15.4647H69.4469V6.96113H63.4948V5.15406H70.4153C71.5573 5.15406 72.1292 5.7229 72.1309 6.86059V15.4647ZM77.0621 5.14612V19.3329H74.3781V5.15406L77.0621 5.14612Z"
              fill="#1852FD"
            />
            <path
              d="M86.0194 13.2289V12.5199H79.8094V10.7101H94.895V12.5199H88.7034V13.2289H93.3925V17.1394H84.0143V17.6236H93.553V19.3328H82.7039C81.7881 19.3328 81.3303 18.8698 81.3303 17.9437V15.4144H90.7085V14.9302H81.3303V13.2289H86.0194ZM87.3351 7.62249C86.1246 9.01065 84.0853 9.90934 81.2171 10.3186L80.5382 8.6279C82.3697 8.25925 83.7389 7.7151 84.6458 6.99544C85.5527 6.27578 86.0053 5.66549 86.0036 5.16455H88.6771C88.6771 5.63197 89.1077 6.22551 89.9691 6.94517C90.8304 7.66483 92.2215 8.22573 94.1424 8.6279L93.4714 10.3186C90.5506 9.88818 88.5086 8.98684 87.3456 7.61456L87.3351 7.62249Z"
              fill="#1852FD"
            />
            <path
              d="M105.404 13.4221C105.404 14.5598 104.887 15.1295 103.852 15.1313H98.3392C97.2866 15.1313 96.7603 14.5616 96.7603 13.4221V5.15402H105.394L105.404 13.4221ZM102.72 6.9611H99.4654V13.311H102.731L102.72 6.9611ZM109.688 6.9611V19.3328H107.007V6.63302C107.007 5.6382 107.567 5.14167 108.688 5.14344H111.846V6.95051L109.688 6.9611Z"
              fill="#1852FD"
            />
            <path
              d="M120.182 12.4512H117.498V10.2922H113.004V8.48511H117.498V6.96113H113.004V5.15405H118.469C119.611 5.15405 120.182 5.7229 120.182 6.86059V12.4512ZM121.306 16.1394C120.034 17.8697 118.137 18.9916 115.617 19.5048L114.614 17.6792C116.004 17.3729 117.295 16.7165 118.364 15.7716C119.397 14.8456 119.914 13.9698 119.916 13.1444V12.938H122.698V13.1391C122.698 13.9857 123.228 14.8729 124.29 15.8007C125.351 16.7267 126.627 17.3707 128 17.674L126.997 19.4995C124.503 19.0074 122.606 17.8874 121.306 16.1394ZM121.453 12.6417V6.96113H120.2V5.15405H122.203C123.389 5.15405 123.982 5.61089 123.982 6.52457V12.6364L121.453 12.6417ZM124.687 12.6417V5.15405H127.208V12.6364L124.687 12.6417Z"
              fill="#1852FD"
            />
            <path d="M0 18.6528V24H5.66269L0 18.6528Z" fill="#1852FD" />
            <path
              d="M0 0V17.2453L8.22038 9.35288H10.9333L2.41296 17.7903L8.27827 24H25.2769V22.8041H12.7779L7.00469 16.5838L6.13371 17.3987L11.1517 22.8041H8.78349L4.07861 17.8194L13.8331 8.15698H7.7441L4.66014 11.1123V8.27075H1.18938V1.1959H24.0822V23.6852H25.2716V0H0ZM3.47077 9.46665V12.2606L1.18938 14.4513V9.46665H3.47077Z"
              fill="#1852FD"
            />
          </svg>
        </div>
      )}
      {isLoaded && (
        <Wrapper visible={isLoaded}>
          <Toast />
          {isDesktop && <TopNav isWritingPage={false} />}
          {(isMobile || isTablet) && <MobileTopNav />}
          <Modal {...value} />
          <ContentWrapper isOpened={isOpened} disabled={disabled}>
            <SideNavArea>
              <SideNav />
            </SideNavArea>
            <OuterContainer
              className={`page-transition ${!isNavigating && 'active'}`}
            >
              <InnerContainer>{children}</InnerContainer>
            </OuterContainer>
          </ContentWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default Layout;
