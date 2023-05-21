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
import {
  useStyleContext,
  useUserLoginContext,
} from '../contexts/AppContextProvider';

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

const AccordionContainer = styled.div<{
  isSelected: boolean;
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

type PagePrefix =
  | 'support'
  | 'sctown'
  | 'mypage'
  | 'event'
  | 'news'
  | 'account'
  | 'contents'
  | 'search'
  | 'channel'
  | 'transfer';

type PageItemType = {
  isOpened: boolean;
  label: string;
  minUserType: 0 | 1 | 2;
  page: PagePrefix;
};

const PageItem = ({ isOpened, label, minUserType, page }: PageItemType) => {
  const { userType } = useUserLoginContext();
  const { Color } = useStyleContext();
  const currentLocation = useLocation();
  const navigate = useCustomNavigate();

  const Icon = require(`../assets/images/components/SideNav/${page}.svg`);
  return userType >= minUserType ? (
    <ListUnit
      isOpened={isOpened}
      currentPage={currentLocation.pathname.startsWith(`/${page}`)}
      onClick={() => navigate(`/${page}`)}
    >
      <Icon />
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
            {label}
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
  ) : (
    <></>
  );
};

type PageAccordionItemType = PageItemType & {
  accOpened: boolean;
  setAccOpened: React.Dispatch<React.SetStateAction<boolean>>;
  pages: {
    path: string;
    label: string;
  }[];
};

const PageAccordionItem = ({
  isOpened,
  label,
  minUserType,
  page,
  accOpened,
  setAccOpened,
  pages,
}: PageAccordionItemType) => {
  const { Color } = useStyleContext();
  const { userType } = useUserLoginContext();
  const currentLocation = useLocation();
  const navigate = useCustomNavigate();
  const Icon = require(`../assets/images/components/SideNav/${page}.svg`);

  return userType >= minUserType ? (
    <>
      <ListUnit
        isSelected={accOpened}
        isOpened={isOpened}
        onClick={() => isOpened && setAccOpened(!accOpened)}
        currentPage={currentLocation.pathname.startsWith(`/${page}`)}
      >
        <Icon />
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
              {label}
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
        <AccordionContainer
          isSelected={accOpened}
          height={`${48 * pages.length}px`}
        >
          {pages.map(({ path, label }) => (
            <>
              <ListUnit
                isOpened={isOpened}
                disabled={!accOpened}
                onClick={() => navigate(`/${page}/${path}`)}
                currentPage={currentLocation.pathname === `/${page}/${path}`}
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
                      {label}
                    </span>
                  </>
                )}
              </ListUnit>
            </>
          ))}
        </AccordionContainer>
      )}
    </>
  ) : (
    <></>
  );
};

export const SideNav = () => {
  const navigate = useCustomNavigate();
  const { isDarkMode } = useContext(DarkModeContext);
  const { isOpened, disabled, setDisabled, setIsOpened } =
    useContext(SideNavContext);
  const { userType } = useContext(UserLoginContext);
  const { isDesktop } = useContext(MediaQueryContext);

  // 아코디언 열렸는지 여부
  const [myPageOpened, setMyPageOpened] = useState(false);
  const [channelOpened, setChannelOpened] = useState(false);
  const [contentsOpened, setContentsOpened] = useState(false);

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

  const { Color } = useStyleContext();

  return (
    <Container
      Color={Color}
      isOpened={isOpened}
      disabled={disabled}
      height={visibleViewportHeight}
    >
      <ListSection isOpened={isOpened}>
        <PageItem
          isOpened={isOpened}
          page={'search'}
          label={'기술찾기'}
          minUserType={1}
        />
        <PageItem
          isOpened={isOpened}
          page={'transfer'}
          label={'기술이전'}
          minUserType={0}
        />
        <PageItem
          isOpened={isOpened}
          page={'event'}
          label={'행사'}
          minUserType={0}
        />
        <PageItem
          isOpened={isOpened}
          page={'support'}
          label={'지원사업'}
          minUserType={0}
        />
        <PageItem
          isOpened={isOpened}
          page={'news'}
          label={'뉴스'}
          minUserType={0}
        />
        <PageItem
          isOpened={isOpened}
          page={'sctown'}
          label={'과학도시'}
          minUserType={0}
        />
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
        <PageAccordionItem
          label={'채널'}
          page={'channel'}
          isOpened={isOpened}
          minUserType={2}
          accOpened={channelOpened}
          setAccOpened={setChannelOpened}
          pages={[
            {
              path: 'mychannel',
              label: '내 채널',
            },
          ]}
        />

        <PageAccordionItem
          label={'콘텐츠'}
          page={'contents'}
          isOpened={isOpened}
          minUserType={2}
          accOpened={contentsOpened}
          setAccOpened={setContentsOpened}
          pages={[
            {
              path: 'upload',
              label: '콘텐츠 등록',
            },
          ]}
        />

        <PageAccordionItem
          label={'마이페이지'}
          page={'mypage'}
          isOpened={isOpened}
          minUserType={1}
          accOpened={myPageOpened}
          setAccOpened={setMyPageOpened}
          pages={[
            {
              path: 'stored',
              label: '보관함',
            },
            {
              path: 'history',
              label: '시청기록',
            },
            {
              path: 'info',
              label: '내 정보',
            },
            ...(userType === 2
              ? [
                  {
                    path: 'manage',
                    label: '담당자 관리',
                  },
                ]
              : []),
          ]}
        />
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
