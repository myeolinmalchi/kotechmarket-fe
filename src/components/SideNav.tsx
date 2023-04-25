// TODO: SVG 파일 별도로 분리
import React, { useEffect, useMemo, useState } from 'react';
import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { SideNavContext } from '../contexts/SideNavProvider';
import { UserLoginContext } from '../contexts/UserLoginProvider';
import Font from '../styles/Font';
import { useLocation } from '@gatsbyjs/reach-router';
import { DefaultButton } from './Button';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import { useCustomNavigate } from '../hooks/useCustomNavigate';
import iosInnerHeight from 'ios-inner-height';
import { ColorType } from '../types/Style';
import { useStyleContext } from '../contexts/AppContextProvider';

const ListSection = styled.div<{ isOpened: boolean }>`
  width: 100%;
  padding: 0px;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;
  box-sizing: border-box;
  gap: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  transition: none;
  ::-webkit-scrollbar {
    width: 5px;
  }
`;

const FooterSection = styled.div<{ isOpened: boolean; isDarkMode: boolean }>`
  height: 80px;
  min-height: 80px;
  width: 240px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const $ListUnit = styled.button<{
  isOpened: boolean;
  isSelected?: boolean;
  currentPage?: boolean;
  disabled?: boolean;
  Color: ColorType;
}>`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  width: 100%;
  background: ${(props) =>
    props.isSelected ? (props) => props.Color.background.gray1 : 'none'};
  ${(props) =>
    props.currentPage &&
    css`
      background: ${props.Color.background.gray1};
    `};
  height: ${(props) => (props.disabled ? '0px' : '48px')};
  border: none;
  min-height: ${(props) => (props.disabled ? '0px' : '48px')};
  opacity: ${(props) => (props.disabled ? '0' : '1')};
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  padding: ${(props) => (props.isOpened ? '0 12px' : '0 26px')};
  gap: 8px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.Color.background.gray2};
  }
  transition: background 0.1s, padding 0.2s, height 0.2s, opacity 0.15s,
    min-height 0.2s, color 0.2s;
  overflow-x: visible;
  flex-wrap: nowrap;

  svg:first-child {
    min-width: 24px;
  }

  svg:last-child {
    ${(props) => props.isSelected && `transform: rotate(90deg);`}
    transition: transform 0.2s;
  }

  span {
    color: ${(props) =>
      props.isSelected
        ? (props) => props.Color.text.primary
        : (props) => props.Color.text.secondary};
  }

  svg * {
    ${(props) => props.isSelected && `fill: ${props.Color.text.primary}`};
    transition: fill 0.2s;
  }
`;

const ListUnit = ({
  children,
  isOpened,
  isSelected,
  currentPage,
  disabled,
  onClick,
}: React.PropsWithChildren & {
  isOpened: boolean;
  isSelected?: boolean;
  currentPage?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { Color } = useStyleContext();
  return (
    <$ListUnit
      isOpened={isOpened}
      isSelected={isSelected}
      currentPage={currentPage}
      disabled={disabled}
      Color={Color}
      onClick={onClick}
    >
      {children}
    </$ListUnit>
  );
};

const AccodianContainer = styled.div<{
  isSelected: boolean;
  isDarkMode: boolean;
  height: string;
}>`
  width: 100%;
  min-height: ${(props) => (props.isSelected ? props.height : '0px')};
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: start;
  gap: 0;
  transition: all 0.2s;
  background: none;

  overflow: hidden;
`;

const Container = styled.div<{
  isOpened: boolean;
  disabled: boolean;
  height: number;
  Color: ColorType;
}>`
  display: flex;
  height: -webkit-fill-available;
  width: ${(props) =>
    props.disabled ? '0px' : props.isOpened ? '240px' : '76px'};
  position: fixed;
  z-index: 1;
  top: 60px;
  left: 0;

  background: ${(props) => props.Color.background.default};
  border-right: 1px solid ${(props) => props.Color.stroke.gray1};

  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 0px;
  transition: width 0.2s;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: ${({ disabled, isOpened }) =>
      disabled ? '' : isOpened ? '240px' : '0'};

    height: ${(props) => `${props.height - 64}px;`};
  }

  @media (max-width: 600px) {
    width: ${({ disabled, isOpened }) =>
      disabled ? '' : isOpened ? '100vw' : '0'};
    border: none;
  }

  ${FooterSection} {
    background: ${(props) => props.Color.background.gray1};
    border-top: ${(props) => props.Color.stroke.gray3};
  }

  ${ListSection}::-webkit-scrollbar-thumb {
    background: ${(props) => props.Color.stroke.gray2};
  }
`;

export const SideNav = () => {
  const navigate = useCustomNavigate();
  const { isDarkMode } = useContext(DarkModeContext);
  const { isOpened, disabled, setDisabled, setIsOpened } =
    useContext(SideNavContext);
  const { userType } = useContext(UserLoginContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const [myPageOpened, setMyPageOpened] = useState(false);
  const [channelOpened, setChannelOpened] = useState(false);
  const [contentsOpened, setContentsOpened] = useState(false);
  const [siteOpened, setSiteOpened] = useState(false);

  const [supportSelected, setSupportSelected] = useState(false);
  const [sctownSelected, setSctownSelected] = useState(false);
  const [myPageSelected, setMyPageSelected] = useState(false);
  const [eventSelected, setEventSelected] = useState(false);
  const [newsSelected, setNewsSelected] = useState(false);

  const [visibleViewportHeight, setVisibleViewportHeight] = useState<number>(0);

  useEffect(() => {
    function getVisibleViewportHeight() {
      if (/(iPad|iPhone|iPod)/.test(navigator.userAgent)) {
        return iosInnerHeight();
      } else {
        return window.innerHeight;
      }
    }

    setVisibleViewportHeight((_) => getVisibleViewportHeight());
  }, []);

  // TODO: 현재 페이지 강조표시 하는 로직 개선 필요
  const resetSelected = () => {
    setSupportSelected(false);
    setSctownSelected(false);
    setMyPageSelected(false);
    setEventSelected(false);
    setNewsSelected(false);
  };

  const currentLocation = useLocation();

  useEffect(() => {
    !isDesktop && setIsOpened(false);
    resetSelected();
    const path = currentLocation.pathname;
    if (path.startsWith('/account')) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (path.startsWith('/support')) {
      setSupportSelected(true);
    } else if (path.startsWith('/sctown')) {
      setSctownSelected(true);
    } else if (path.startsWith('/mypage')) {
      setMyPageSelected(true);
    } else if (path.startsWith('/event')) {
      setEventSelected(true);
    } else if (path.startsWith('/news')) {
      setNewsSelected(true);
    }
  }, [currentLocation.pathname]);

  useEffect(() => {
    if (isDesktop) {
      setMyPageOpened(false);
      setChannelOpened(false);
      setContentsOpened(false);
      setSiteOpened(false);
    }
  }, [isOpened]);

  const { Color } = useStyleContext();

  return (
    <Container
      Color={Color}
      isOpened={isOpened}
      disabled={disabled}
      height={visibleViewportHeight}
    >
      <ListSection isOpened={isOpened}>
        {userType > 0 && (
          <ListUnit isSelected={false} isOpened={isOpened}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1015_1301)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.5 7.125C1.5 6.08947 2.33947 5.25 3.375 5.25H9.375C10.4105 5.25 11.25 6.08947 11.25 7.125V10.875C11.25 11.9105 10.4105 12.75 9.375 12.75H3.375C2.33947 12.75 1.5 11.9105 1.5 10.875V7.125ZM13.5 8.625C13.5 7.58947 14.3395 6.75 15.375 6.75H20.625C21.6605 6.75 22.5 7.58947 22.5 8.625V16.875C22.5 17.9105 21.6605 18.75 20.625 18.75H15.375C14.3395 18.75 13.5 17.9105 13.5 16.875V8.625ZM3 16.125C3 15.0895 3.83947 14.25 4.875 14.25H10.125C11.1605 14.25 12 15.0895 12 16.125V18.375C12 19.4105 11.1605 20.25 10.125 20.25H4.875C3.83947 20.25 3 19.4105 3 18.375V16.125Z"
                  fill="#5D6169"
                />
              </g>
              <defs>
                <clipPath id="clip0_1015_1301">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {isOpened && (
              <>
                <span
                  style={{
                    ...Font.body.body2,
                    textAlign: 'start',
                    transition: 'width 0.2s',
                    width: 'calc(100% - 56px)',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    color: Color.text.secondary,
                  }}
                >
                  기술찾기
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                    fill="#5D6169"
                  />
                </svg>
              </>
            )}
          </ListUnit>
        )}
        <ListUnit isSelected={false} isOpened={isOpened}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9055 9C20.2876 9 20.6548 9.05664 20.9999 9.16156V9C20.9999 7.34315 19.6567 6 17.9999 6H14.1212C13.9223 6 13.7315 5.92098 13.5909 5.78033L11.4695 3.65901C11.0476 3.23705 10.4753 3 9.87856 3H5.99988C4.34302 3 2.99988 4.34315 2.99988 6V9.16152C3.34496 9.05663 3.71211 9 4.09409 9H19.9055Z"
              fill="#5D6169"
            />
            <path
              d="M4.09417 10.5C2.72494 10.5 1.67315 11.7127 1.86679 13.0682L2.72393 19.0682C2.88228 20.1767 3.8316 21 4.95132 21H19.0485C20.1682 21 21.1175 20.1767 21.2759 19.0682L22.133 13.0682C22.3267 11.7127 21.2749 10.5 19.9056 10.5H4.09417Z"
              fill="#5D6169"
            />
          </svg>
          {isOpened && (
            <>
              <span
                style={{
                  ...Font.body.body2,
                  textAlign: 'start',
                  transition: 'width 0.2s',
                  width: 'calc(100% - 56px)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  color: Color.text.secondary,
                }}
              >
                기술이전
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                  fill="#5D6169"
                />
              </svg>
            </>
          )}
        </ListUnit>
        <ListUnit
          isOpened={isOpened}
          isSelected={false}
          currentPage={eventSelected}
          onClick={() => navigate('/event')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.75 12.75C12.75 13.1642 12.4142 13.5 12 13.5C11.5858 13.5 11.25 13.1642 11.25 12.75C11.25 12.3358 11.5858 12 12 12C12.4142 12 12.75 12.3358 12.75 12.75Z"
              fill="#5D6169"
            />
            <path
              d="M7.5 15.75C7.91421 15.75 8.25 15.4142 8.25 15C8.25 14.5858 7.91421 14.25 7.5 14.25C7.08579 14.25 6.75 14.5858 6.75 15C6.75 15.4142 7.08579 15.75 7.5 15.75Z"
              fill="#5D6169"
            />
            <path
              d="M8.25 17.25C8.25 17.6642 7.91421 18 7.5 18C7.08579 18 6.75 17.6642 6.75 17.25C6.75 16.8358 7.08579 16.5 7.5 16.5C7.91421 16.5 8.25 16.8358 8.25 17.25Z"
              fill="#5D6169"
            />
            <path
              d="M9.75 15.75C10.1642 15.75 10.5 15.4142 10.5 15C10.5 14.5858 10.1642 14.25 9.75 14.25C9.33579 14.25 9 14.5858 9 15C9 15.4142 9.33579 15.75 9.75 15.75Z"
              fill="#5D6169"
            />
            <path
              d="M10.5 17.25C10.5 17.6642 10.1642 18 9.75 18C9.33579 18 9 17.6642 9 17.25C9 16.8358 9.33579 16.5 9.75 16.5C10.1642 16.5 10.5 16.8358 10.5 17.25Z"
              fill="#5D6169"
            />
            <path
              d="M12 15.75C12.4142 15.75 12.75 15.4142 12.75 15C12.75 14.5858 12.4142 14.25 12 14.25C11.5858 14.25 11.25 14.5858 11.25 15C11.25 15.4142 11.5858 15.75 12 15.75Z"
              fill="#5D6169"
            />
            <path
              d="M12.75 17.25C12.75 17.6642 12.4142 18 12 18C11.5858 18 11.25 17.6642 11.25 17.25C11.25 16.8358 11.5858 16.5 12 16.5C12.4142 16.5 12.75 16.8358 12.75 17.25Z"
              fill="#5D6169"
            />
            <path
              d="M14.25 15.75C14.6642 15.75 15 15.4142 15 15C15 14.5858 14.6642 14.25 14.25 14.25C13.8358 14.25 13.5 14.5858 13.5 15C13.5 15.4142 13.8358 15.75 14.25 15.75Z"
              fill="#5D6169"
            />
            <path
              d="M15 17.25C15 17.6642 14.6642 18 14.25 18C13.8358 18 13.5 17.6642 13.5 17.25C13.5 16.8358 13.8358 16.5 14.25 16.5C14.6642 16.5 15 16.8358 15 17.25Z"
              fill="#5D6169"
            />
            <path
              d="M16.5 15.75C16.9142 15.75 17.25 15.4142 17.25 15C17.25 14.5858 16.9142 14.25 16.5 14.25C16.0858 14.25 15.75 14.5858 15.75 15C15.75 15.4142 16.0858 15.75 16.5 15.75Z"
              fill="#5D6169"
            />
            <path
              d="M15 12.75C15 13.1642 14.6642 13.5 14.25 13.5C13.8358 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.8358 12 14.25 12C14.6642 12 15 12.3358 15 12.75Z"
              fill="#5D6169"
            />
            <path
              d="M16.5 13.5C16.9142 13.5 17.25 13.1642 17.25 12.75C17.25 12.3358 16.9142 12 16.5 12C16.0858 12 15.75 12.3358 15.75 12.75C15.75 13.1642 16.0858 13.5 16.5 13.5Z"
              fill="#5D6169"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.75 2.25C7.16421 2.25 7.5 2.58579 7.5 3V4.5H16.5V3C16.5 2.58579 16.8358 2.25 17.25 2.25C17.6642 2.25 18 2.58579 18 3V4.5H18.75C20.4069 4.5 21.75 5.84315 21.75 7.5V18.75C21.75 20.4069 20.4069 21.75 18.75 21.75H5.25C3.59315 21.75 2.25 20.4069 2.25 18.75V7.5C2.25 5.84315 3.59315 4.5 5.25 4.5H6V3C6 2.58579 6.33579 2.25 6.75 2.25ZM20.25 11.25C20.25 10.4216 19.5784 9.75 18.75 9.75H5.25C4.42157 9.75 3.75 10.4216 3.75 11.25V18.75C3.75 19.5784 4.42157 20.25 5.25 20.25H18.75C19.5784 20.25 20.25 19.5784 20.25 18.75V11.25Z"
              fill="#5D6169"
            />
          </svg>
          {isOpened && (
            <>
              <span
                style={{
                  ...Font.body.body2,
                  textAlign: 'start',
                  transition: 'width 0.2s',
                  width: 'calc(100% - 56px)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  color: Color.text.secondary,
                }}
              >
                행사
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                  fill="#5D6169"
                />
              </svg>
            </>
          )}
        </ListUnit>
        <ListUnit
          currentPage={supportSelected}
          isOpened={isOpened}
          onClick={() => {
            navigate('/support');
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_37_2042)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.5 5.25C7.5 3.59315 8.84315 2.25 10.5 2.25H13.5C15.1569 2.25 16.5 3.59315 16.5 5.25V5.45498C17.4325 5.54034 18.3574 5.65196 19.274 5.78912C20.7281 6.00668 21.75 7.27163 21.75 8.70569V11.7389C21.75 12.95 21.0164 14.0913 19.8137 14.4911C17.3566 15.308 14.7292 15.75 12 15.75C9.27087 15.75 6.64342 15.308 4.18627 14.4911C2.98364 14.0912 2.25 12.95 2.25 11.7389V8.70569C2.25 7.27163 3.27191 6.00668 4.72596 5.78912C5.6426 5.65196 6.56753 5.54034 7.5 5.45498V5.25ZM15 5.25V5.34082C14.0077 5.28056 13.0074 5.25 12 5.25C10.9927 5.25 9.99235 5.28056 9 5.34082V5.25C9 4.42157 9.67157 3.75 10.5 3.75H13.5C14.3284 3.75 15 4.42157 15 5.25ZM12 13.5C12.4142 13.5 12.75 13.1642 12.75 12.75C12.75 12.3358 12.4142 12 12 12C11.5858 12 11.25 12.3358 11.25 12.75C11.25 13.1642 11.5858 13.5 12 13.5Z"
                fill="#5D6169"
              />
              <path
                d="M3 18.4V15.6039C3.22304 15.7263 3.46097 15.8307 3.71303 15.9145C6.32087 16.7815 9.10801 17.25 12 17.25C14.892 17.25 17.6791 16.7815 20.287 15.9145C20.539 15.8307 20.777 15.7263 21 15.604V18.4C21 19.8519 19.9528 21.1275 18.4769 21.3234C16.3575 21.6048 14.1955 21.75 12 21.75C9.80447 21.75 7.64246 21.6048 5.52314 21.3234C4.04724 21.1275 3 19.8519 3 18.4Z"
                fill="#5D6169"
              />
            </g>
            <defs>
              <clipPath id="clip0_37_2042">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isOpened && (
            <>
              <span
                style={{
                  ...Font.body.body2,
                  textAlign: 'start',
                  transition: 'width 0.2s',
                  width: 'calc(100% - 56px)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  color: Color.text.secondary,
                }}
              >
                지원사업
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                  fill="#5D6169"
                />
              </svg>
            </>
          )}
        </ListUnit>
        <ListUnit
          isSelected={false}
          isOpened={isOpened}
          currentPage={newsSelected}
          onClick={() => navigate('/news')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_37_2054)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM7.5 13.5C7.91421 13.5 8.25 13.8358 8.25 14.25V16.5C8.25 16.9142 7.91421 17.25 7.5 17.25C7.08579 17.25 6.75 16.9142 6.75 16.5V14.25C6.75 13.8358 7.08579 13.5 7.5 13.5ZM11.25 12C11.25 11.5858 10.9142 11.25 10.5 11.25C10.0858 11.25 9.75 11.5858 9.75 12V16.5C9.75 16.9142 10.0858 17.25 10.5 17.25C10.9142 17.25 11.25 16.9142 11.25 16.5V12ZM13.5 9C13.9142 9 14.25 9.33579 14.25 9.75V16.5C14.25 16.9142 13.9142 17.25 13.5 17.25C13.0858 17.25 12.75 16.9142 12.75 16.5V9.75C12.75 9.33579 13.0858 9 13.5 9ZM17.25 7.5C17.25 7.08579 16.9142 6.75 16.5 6.75C16.0858 6.75 15.75 7.08579 15.75 7.5V16.5C15.75 16.9142 16.0858 17.25 16.5 17.25C16.9142 17.25 17.25 16.9142 17.25 16.5V7.5Z"
                fill="#5D6169"
              />
            </g>
            <defs>
              <clipPath id="clip0_37_2054">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isOpened && (
            <>
              <span
                style={{
                  ...Font.body.body2,
                  textAlign: 'start',
                  transition: 'width 0.2s',
                  width: 'calc(100% - 56px)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  color: Color.text.secondary,
                }}
              >
                뉴스
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                  fill="#5D6169"
                />
              </svg>
            </>
          )}
        </ListUnit>
        <ListUnit
          isSelected={false}
          isOpened={isOpened}
          onClick={() => navigate('/sctown')}
          currentPage={sctownSelected}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_37_2066)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.6152 1.59495C14.9165 1.76289 15.0643 2.11463 14.9736 2.44736L12.982 9.75003H20.25C20.5487 9.75003 20.8189 9.92721 20.9379 10.2011C21.0569 10.475 21.0021 10.7934 20.7983 11.0118L10.2983 22.2618C10.063 22.5139 9.68604 22.573 9.38481 22.4051C9.08357 22.2372 8.9357 21.8854 9.02644 21.5527L11.0181 14.25H3.75002C3.45137 14.25 3.18118 14.0728 3.06216 13.7989C2.94313 13.525 2.99795 13.2066 3.20173 12.9883L13.7017 1.73829C13.937 1.48615 14.314 1.42701 14.6152 1.59495Z"
                fill="#5D6169"
              />
            </g>
            <defs>
              <clipPath id="clip0_37_2066">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isOpened && (
            <>
              <span
                style={{
                  ...Font.body.body2,
                  textAlign: 'start',
                  transition: 'width 0.2s',
                  width: 'calc(100% - 56px)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  color: Color.text.secondary,
                }}
              >
                과학도시
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                  fill="#5D6169"
                />
              </svg>
            </>
          )}
        </ListUnit>
        {userType === 0 && isOpened && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '240px',
              gap: '12px',
              padding: '24px 0',
              overflowX: 'hidden',
            }}
          >
            <span
              style={{
                textAlign: 'center',
                ...Font.body.bodyLong1,
                color: Color.text.secondary,
              }}
            >
              로그인을 하면 더 많은
              <br />
              서비스를 이용할 수 있습니다.
            </span>
            <DefaultButton
              style={'PRIMARY'}
              state={'DEFAULT'}
              type={'NONE'}
              size={'S'}
              onClick={() => {
                navigate('/account/login');
              }}
            >
              무료로 시작하기
            </DefaultButton>
          </div>
        )}
        {userType > 1 && (
          <>
            <ListUnit
              isSelected={channelOpened}
              isOpened={isOpened}
              onClick={() => {
                if (isOpened) {
                  setChannelOpened(!channelOpened);
                } else {
                }
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1059_757)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 2.25C3.41421 2.25 3.75 2.58579 3.75 3V3.53942L5.58819 3.07987C7.84613 2.51539 10.2315 2.77724 12.3132 3.8181L12.421 3.87196C14.1472 4.73507 16.1214 4.96567 18.0001 4.52363L21.1096 3.79196C21.3465 3.73622 21.5958 3.79888 21.7781 3.96005C21.9605 4.12121 22.0533 4.36083 22.0271 4.60278C21.844 6.29313 21.75 8.01046 21.75 9.75C21.75 11.504 21.8455 13.2355 22.0317 14.9395C22.0728 15.3161 21.8266 15.6642 21.4579 15.751L18.3436 16.4837C16.1234 17.0062 13.7902 16.7336 11.7501 15.7136L11.6424 15.6597C9.88097 14.779 7.86256 14.5574 5.95199 15.0351L3.75 15.5856V21C3.75 21.4142 3.41421 21.75 3 21.75C2.58579 21.75 2.25 21.4142 2.25 21V3C2.25 2.58579 2.58579 2.25 3 2.25Z"
                    fill="#5D6169"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1059_757">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {isOpened && (
                <>
                  <span
                    style={{
                      ...Font.body.body2,
                      textAlign: 'start',
                      transition: 'width 0.2s',
                      width: 'calc(100% - 56px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      color: Color.text.secondary,
                    }}
                  >
                    채널
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                      fill="#5D6169"
                    />
                  </svg>
                </>
              )}
            </ListUnit>
            {isOpened && (
              <AccodianContainer
                isSelected={channelOpened}
                isDarkMode={isDarkMode}
                height={`${48 * 2}px`}
              >
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!channelOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        내 채널
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!channelOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        채널선정
                      </span>
                    </>
                  )}
                </ListUnit>
              </AccodianContainer>
            )}
            <ListUnit
              isSelected={contentsOpened}
              isOpened={isOpened}
              onClick={() => setContentsOpened(!contentsOpened)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1059_423)">
                  <path
                    d="M5.56641 4.65724C5.9435 4.55472 6.34029 4.5 6.74986 4.5H17.2499C17.6594 4.5 18.0562 4.55472 18.4333 4.65724C17.9406 3.67454 16.924 3 15.7499 3H8.24986C7.0757 3 6.0591 3.67454 5.56641 4.65724Z"
                    fill="#5D6169"
                  />
                  <path
                    d="M2.25 12C2.25 10.3431 3.59315 9 5.25 9H18.75C20.4069 9 21.75 10.3431 21.75 12V18C21.75 19.6569 20.4069 21 18.75 21H5.25C3.59315 21 2.25 19.6569 2.25 18V12Z"
                    fill="#5D6169"
                  />
                  <path
                    d="M5.24986 7.5C4.84029 7.5 4.4435 7.55472 4.06641 7.65724C4.5591 6.67454 5.5757 6 6.74986 6H17.2499C18.424 6 19.4406 6.67454 19.9333 7.65724C19.5562 7.55472 19.1594 7.5 18.7499 7.5H5.24986Z"
                    fill="#5D6169"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1059_423">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {isOpened && (
                <>
                  <span
                    style={{
                      ...Font.body.body2,
                      textAlign: 'start',
                      transition: 'width 0.2s',
                      width: 'calc(100% - 56px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      color: Color.text.secondary,
                    }}
                  >
                    콘텐츠
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                      fill="#5D6169"
                    />
                  </svg>
                </>
              )}
            </ListUnit>
            {isOpened && (
              <AccodianContainer
                isSelected={contentsOpened}
                isDarkMode={isDarkMode}
                height={`${48 * 4}px`}
              >
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!contentsOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        콘텐츠 등록
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!contentsOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        콘텐츠 관리
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!contentsOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        뉴스레터 설정
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!contentsOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        연구자 관리
                      </span>
                    </>
                  )}
                </ListUnit>
              </AccodianContainer>
            )}
            <ListUnit
              isSelected={siteOpened}
              isOpened={isOpened}
              onClick={() => setSiteOpened(!siteOpened)}
            >
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
                  d="M2.25 6C2.25 4.34315 3.59315 3 5.25 3H18.75C20.4069 3 21.75 4.34315 21.75 6V18C21.75 19.6569 20.4069 21 18.75 21H5.25C3.59315 21 2.25 19.6569 2.25 18V6ZM20.25 9H3.75V18C3.75 18.8284 4.42157 19.5 5.25 19.5H18.75C19.5784 19.5 20.25 18.8284 20.25 18V9ZM5.25 5.25C4.83579 5.25 4.5 5.58579 4.5 6V6.0075C4.5 6.42171 4.83579 6.7575 5.25 6.7575H5.2575C5.67171 6.7575 6.0075 6.42171 6.0075 6.0075V6C6.0075 5.58579 5.67171 5.25 5.2575 5.25H5.25ZM6.75 6C6.75 5.58579 7.08579 5.25 7.5 5.25H7.5075C7.92171 5.25 8.2575 5.58579 8.2575 6V6.0075C8.2575 6.42171 7.92171 6.7575 7.5075 6.7575H7.5C7.08579 6.7575 6.75 6.42171 6.75 6.0075V6ZM9.75 5.25C9.33579 5.25 9 5.58579 9 6V6.0075C9 6.42171 9.33579 6.7575 9.75 6.7575H9.7575C10.1717 6.7575 10.5075 6.42171 10.5075 6.0075V6C10.5075 5.58579 10.1717 5.25 9.7575 5.25H9.75Z"
                  fill="#5D6169"
                />
              </svg>
              {isOpened && (
                <>
                  <span
                    style={{
                      ...Font.body.body2,
                      textAlign: 'start',
                      transition: 'width 0.2s',
                      width: 'calc(100% - 56px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      color: Color.text.secondary,
                    }}
                  >
                    사이트
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                      fill="#5D6169"
                    />
                  </svg>
                </>
              )}
            </ListUnit>
            {isOpened && (
              <AccodianContainer
                isSelected={siteOpened}
                isDarkMode={isDarkMode}
                height={`${48 * 2}px`}
              >
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!siteOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        내 사이트
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!siteOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        사이트 설정
                      </span>
                    </>
                  )}
                </ListUnit>
              </AccodianContainer>
            )}
          </>
        )}
        {userType > 0 && (
          <>
            <ListUnit
              isSelected={myPageOpened}
              isOpened={isOpened}
              onClick={() => setMyPageOpened(!myPageOpened)}
              currentPage={myPageSelected}
            >
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
                  d="M7.49984 6C7.49984 3.51472 9.51456 1.5 11.9998 1.5C14.4851 1.5 16.4998 3.51472 16.4998 6C16.4998 8.48528 14.4851 10.5 11.9998 10.5C9.51456 10.5 7.49984 8.48528 7.49984 6Z"
                  fill="#5D6169"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.75109 20.1053C3.82843 15.6156 7.49183 12 11.9998 12C16.508 12 20.1714 15.6157 20.2486 20.1056C20.2537 20.4034 20.0822 20.676 19.8115 20.8002C17.4326 21.8918 14.7864 22.5 12.0002 22.5C9.2137 22.5 6.56728 21.8917 4.18816 20.7999C3.91749 20.6757 3.74596 20.4031 3.75109 20.1053Z"
                  fill="#5D6169"
                />
              </svg>
              {isOpened && (
                <>
                  <span
                    style={{
                      ...Font.body.body2,
                      textAlign: 'start',
                      transition: 'width 0.2s',
                      width: 'calc(100% - 56px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      color: Color.text.secondary,
                    }}
                  >
                    마이페이지
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.97554 3.57573C6.20986 3.34142 6.58975 3.34142 6.82407 3.57573L10.5412 7.29289C10.9318 7.68341 10.9318 8.31658 10.5412 8.7071L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.1899 5.74123 11.81 5.97554 11.5757L9.55128 7.99999L5.97554 4.42426C5.74123 4.18994 5.74123 3.81004 5.97554 3.57573Z"
                      fill="#5D6169"
                    />
                  </svg>
                </>
              )}
            </ListUnit>
            {isOpened && (
              <AccodianContainer
                isSelected={myPageOpened}
                isDarkMode={isDarkMode}
                height={`${48 * (userType === 2 ? 9 : 7)}px`}
              >
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!myPageOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        요금제 관리
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!myPageOpened}
                  onClick={() => navigate('/mypage/stored')}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        보관함
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!myPageOpened}
                  onClick={() => navigate('/mypage/history')}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        시청기록
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!myPageOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        구독채널
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!myPageOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        신청한 행사
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!myPageOpened}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        문의 내역
                      </span>
                    </>
                  )}
                </ListUnit>
                <ListUnit
                  isSelected={false}
                  isOpened={isOpened}
                  disabled={!myPageOpened}
                  onClick={() => navigate('/mypage/info')}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                  </svg>
                  {isOpened && (
                    <>
                      <span
                        style={{
                          ...Font.body.body1,
                          textAlign: 'start',
                          transition: 'width 0.2s',
                          width: 'calc(100% - 40px)',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: Color.text.secondary,
                        }}
                      >
                        내 정보
                      </span>
                    </>
                  )}
                </ListUnit>
                {userType > 1 && (
                  <>
                    <ListUnit
                      isSelected={false}
                      isOpened={isOpened}
                      disabled={!myPageOpened}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                      </svg>
                      {isOpened && (
                        <>
                          <span
                            style={{
                              ...Font.body.body1,
                              textAlign: 'start',
                              transition: 'width 0.2s',
                              width: 'calc(100% - 40px)',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              color: Color.text.secondary,
                            }}
                          >
                            영상 제작 현황
                          </span>
                        </>
                      )}
                    </ListUnit>
                    <ListUnit
                      isSelected={false}
                      isOpened={isOpened}
                      disabled={!myPageOpened}
                      onClick={() => {
                        navigate('/mypage/manager');
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11.9999" cy="12" r="3.6" fill="#5D6169" />
                      </svg>
                      {isOpened && (
                        <>
                          <span
                            style={{
                              ...Font.body.body1,
                              textAlign: 'start',
                              transition: 'width 0.2s',
                              width: 'calc(100% - 40px)',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              color: Color.text.secondary,
                            }}
                          >
                            담당자 관리
                          </span>
                        </>
                      )}
                    </ListUnit>
                  </>
                )}
              </AccodianContainer>
            )}
          </>
        )}
      </ListSection>
      {isOpened && (
        <FooterSection isDarkMode={isDarkMode} isOpened={isOpened}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              ...Font.body.caption,
              gap: '14px',
            }}
          >
            <span style={{ cursor: 'pointer' }}>고객센터</span>
            <span style={{ cursor: 'pointer' }}>구독하기</span>
            <span style={{ cursor: 'pointer' }}>이용약관</span>
          </div>
          <span
            style={{
              ...Font.body.caption,
              textAlign: 'center',
              color: Color.text.third,
              fontSize: '10px',
            }}
          >
            © Copyright 2022 한국기술마켓
          </span>
        </FooterSection>
      )}
    </Container>
  );
};
