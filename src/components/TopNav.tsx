import React from 'react';

import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import Color from '../styles/Color';
import { SearchField } from './TextFields';
import { ToggleButton, DefaultButton } from './Button';
import Avatar from './Avatar';
import { SideNavContext } from '../contexts/SideNavProvider';
import { UserLoginContext } from '../contexts/UserLoginProvider';
import { useCustomNavigate } from '../hooks/useCustomNavigate';
import { ColorType } from '../types/Style';
import { useStyleContext } from '../contexts/AppContextProvider';

const NotiContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NotiBadge = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-style: normal;
  line-height: 140%;
  /* or 11px */
  zoom: 0.5;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  letter-spacing: -0.6px;
`;

const Section = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 0;
  gap: 0;
`;

type TopNavProps = {
  isWritingPage: boolean;
};

const ClearButton = styled.button`
  border: none;
  box-sizing: border-box;
  padding: 0;
  background: none;
  cursor: pointer;
`;

const Container = styled.nav<{ Color: ColorType }>`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1000000000;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  background: ${(props) => props.Color.background.default};
  border-bottom: 1px solid ${(props) => props.Color.stroke.gray1};

  padding: 0 28px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    height: 64px;
    padding: 0 16px;
  }

  ${NotiBadge} {
    background: ${(props) => props.Color.text.blue};
    color: ${(props) => props.Color.text.default};
  }
`;

export const TopNav = ({ isWritingPage }: TopNavProps) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { toggleSideNav, disabled } = useContext(SideNavContext);
  const { userType } = useContext(UserLoginContext);
  const navigate = useCustomNavigate();
  const { Color } = useStyleContext();
  return (
    <Container Color={Color}>
      <Section>
        {!isWritingPage && (
          <ClearButton
            style={{ marginRight: '28px' }}
            onClick={() => {
              if (!disabled) {
                toggleSideNav();
              }
            }}
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.05176e-05 1C3.05176e-05 0.447715 0.447746 0 1.00003 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1.00003C0.447746 2 3.05176e-05 1.55228 3.05176e-05 1ZM0 11C0 10.4477 0.447716 9.99999 1 9.99999H10C10.5523 9.99999 11 10.4477 11 11C11 11.5523 10.5523 12 10 12H1C0.447715 12 0 11.5523 0 11ZM1 4.99999C0.447715 4.99999 0 5.44771 0 5.99999C0 6.55227 0.447715 6.99999 1 6.99999H15C15.5523 6.99999 16 6.55227 16 5.99999C16 5.44771 15.5523 4.99999 15 4.99999H1Z"
                fill="#1852FD"
              />
            </svg>
          </ClearButton>
        )}
        <ClearButton
          style={{
            marginRight: '56px',
          }}
          onClick={() => navigate('/')}
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
        </ClearButton>
        <SearchField
          width={'360px'}
          state={'DEFAULT'}
          size={'S'}
          placeholder={'찾으시는 기술이 있으신가요?'}
        />
      </Section>
      <Section>
        {userType === 2 && (
          <ClearButton style={{ marginRight: '23px' }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66656 7.5L9.9999 4.16667L13.3332 7.5"
                stroke="#5D6169"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.99988 12.0833L9.99988 4.58331"
                stroke="#5D6169"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8333 11.6667V14.1667C15.8333 15.0872 15.0871 15.8334 14.1666 15.8334H5.83329C4.91282 15.8334 4.16663 15.0872 4.16663 14.1667V11.6667"
                stroke="#5D6169"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ClearButton>
        )}
        {userType >= 1 && (
          <ClearButton style={{ marginRight: '20px' }}>
            <NotiContainer>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15 7.5C15 4.73858 12.7615 2.5 10 2.5C7.23862 2.5 5.00004 4.73858 5.00004 7.5V12.5L3.33337 14.1667H16.6667L15 12.5V7.5Z"
                  stroke="#5D6169"
                  stroke-width="1.66667"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 18.3333C11.3807 18.3333 12.5 17.214 12.5 15.8333H7.5C7.5 17.214 8.61929 18.3333 10 18.3333Z"
                  fill="#5D6169"
                />
              </svg>
              <NotiBadge>{15}</NotiBadge>
            </NotiContainer>
          </ClearButton>
        )}
        <ToggleButton
          isActivated={isDarkMode}
          onClick={toggleDarkMode}
          text={{
            content: '다크모드',
            isRight: false,
          }}
        />
        {userType >= 1 && (
          <ClearButton style={{ marginLeft: '24px' }}>
            <Avatar size={'M'} src={''} />
          </ClearButton>
        )}
        {userType === 0 && (
          <div style={{ marginLeft: '24px' }}>
            <DefaultButton
              style="PRIMARY"
              state="DEFAULT"
              text="무료로 시작하기"
              size="M"
              type="NONE"
              onClick={() => {
                navigate('/account/login');
              }}
            />
          </div>
        )}
      </Section>
    </Container>
  );
};

export const MobileTopNav = () => {
  const { toggleDarkMode } = useContext(DarkModeContext);
  const { disabled, toggleSideNav } = useContext(SideNavContext);
  const [searchBarOpened, setSearchBarOpened] = React.useState(false);
  const searchRef = React.useRef(null);
  const toggleSearchBar = () => {
    setSearchBarOpened(!searchBarOpened);
  };
  const navigate = useCustomNavigate();
  const { Color } = useStyleContext();
  return (
    <Container Color={Color}>
      {searchBarOpened && (
        <ClearButton onClick={toggleSearchBar}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.2928 18.7071C17.6833 19.0976 18.3165 19.0976 18.707 18.7071C19.0975 18.3166 19.0975 17.6834 18.707 17.2929L13.4141 12L18.707 6.7071C19.0975 6.31657 19.0975 5.68341 18.707 5.29289C18.3165 4.90236 17.6833 4.90236 17.2928 5.29289L11.9999 10.5858L6.70699 5.29289C6.31646 4.90236 5.6833 4.90236 5.29277 5.29288C4.90225 5.68341 4.90225 6.31657 5.29277 6.7071L10.5857 12L5.29277 17.2929C4.90225 17.6834 4.90225 18.3166 5.29277 18.7071C5.6833 19.0976 6.31646 19.0976 6.70698 18.7071L11.9999 13.4142L17.2928 18.7071Z"
              fill="#5D6169"
            />
          </svg>
        </ClearButton>
      )}
      {!searchBarOpened && (
        <ClearButton
          onClick={() => {
            !disabled && toggleSideNav();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="5" width="16" height="2" rx="1" fill="#5D6169" />
            <rect x="4" y="11" width="16" height="2" rx="1" fill="#5D6169" />
            <rect x="4" y="17" width="16" height="2" rx="1" fill="#5D6169" />
          </svg>
        </ClearButton>
      )}
      {searchBarOpened && (
        <>
          <SearchField
            width={'calc(100% - 36px)'}
            state={'DEFAULT'}
            size={'S'}
            inputRef={searchRef}
          />
        </>
      )}
      {!searchBarOpened && (
        <>
          <ClearButton
            onClick={() => {
              navigate('/');
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
                d="M57.5794 10.5091V6.9611H48.038V5.15402H58.8266C59.7844 5.15402 60.266 5.60381 60.266 6.50867V10.5091H61.7843V12.3188H55.59V13.9592H58.824C59.7818 13.9592 60.2634 14.4117 60.2634 15.3139V19.4995H57.5794V15.7663H48.0538V13.9592H52.9061V12.3188H46.696V10.5091H57.5794Z"
                fill="#1852FD"
              />
              <path
                d="M72.1309 15.4647H69.4469V6.9611H63.4948V5.15402H70.4153C71.5573 5.15402 72.1292 5.72287 72.1309 6.86056V15.4647ZM77.0621 5.14609V19.3328H74.3781V5.15402L77.0621 5.14609Z"
                fill="#1852FD"
              />
              <path
                d="M86.0194 13.229V12.5199H79.8094V10.7102H94.895V12.5199H88.7034V13.229H93.3925V17.1394H84.0143V17.6236H93.553V19.3328H82.7039C81.7881 19.3328 81.3303 18.8698 81.3303 17.9438V15.4144H90.7085V14.9302H81.3303V13.229H86.0194ZM87.3351 7.62252C86.1246 9.01068 84.0853 9.90937 81.2171 10.3186L80.5382 8.62793C82.3697 8.25928 83.7389 7.71513 84.6458 6.99547C85.5527 6.27581 86.0053 5.66552 86.0036 5.16458H88.6771C88.6771 5.632 89.1077 6.22554 89.9691 6.9452C90.8304 7.66486 92.2215 8.22577 94.1424 8.62793L93.4714 10.3186C90.5506 9.88821 88.5086 8.98687 87.3456 7.61459L87.3351 7.62252Z"
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
              <path d="M0 18.6529V24H5.66269L0 18.6529Z" fill="#1852FD" />
              <path
                d="M0 0V17.2453L8.22038 9.35288H10.9333L2.41296 17.7903L8.27827 24H25.2769V22.8041H12.7779L7.00469 16.5838L6.13371 17.3987L11.1517 22.8041H8.78349L4.07861 17.8194L13.8331 8.15698H7.7441L4.66014 11.1123V8.27075H1.18938V1.1959H24.0822V23.6852H25.2716V0H0ZM3.47077 9.46665V12.2606L1.18938 14.4513V9.46665H3.47077Z"
                fill="#1852FD"
              />
            </svg>
          </ClearButton>
          <ClearButton onClick={toggleSearchBar}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="6.33333"
                stroke="#5D6169"
                stroke-width="1.33333"
              />
              <path
                d="M16 16L19 19"
                stroke="#5D6169"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ClearButton>
        </>
      )}
    </Container>
  );
};
