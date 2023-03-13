import styled from 'styled-components';
import { Desktop, Mobile, Tablet } from '../../components/common/Responsive';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import Color from '../../styles/Color';
import React, { useContext, useState, useEffect } from 'react';
import Font from '../../styles/Font';
import { TextButton, DefaultButton } from '../../components/Button';
import { Tag } from '../../components/Tag';
import Modal from '../../components/Modal';
import useQueryString from '../../hooks/useQueryString';
import { useMediaQuery } from 'react-responsive';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
`;

const ImageBox = styled.div<{ src: string; isDarkMode: boolean }>`
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 66.66%;
  width: 100%;

  border: 1px solid
    ${({ isDarkMode }) => (isDarkMode ? '' : Color.light.stroke.gray1)};

  border-radius: 4px;
  margin-bottom: 36px;
  @media (max-width: 1024px) {
    margin: 0;
    border: none;
    border-radius: 0;
  }
`;

const TableWrapper = styled.table<{ isDarkMode: boolean }>`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 24px;

  th,
  td {
    color: ${(props) => (props.isDarkMode ? '' : Color.light.text.secondary)};
    border: 1px solid
      ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};
  }

  th {
    background: ${(props) =>
      props.isDarkMode ? '' : Color.light.background.gray1};
  }

  @media (max-width: 1024px) {
    padding: 0 16px;
    box-sizing: border-box;
    width: calc(100% - 32px);
  }
`;

const TableRow = styled.tr``;

const TableHeaderCell = styled.th`
  text-align: start;
  padding: 12px 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.6px;
  box-sizing: border-box;
  height: 44px;
`;

const TableCell = styled.td`
  text-align: left;
  padding: 12px 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  letter-spacing: -0.6px;
  box-sizing: border-box;
  height: 44px;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(70% - 10px);

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const CardArea = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(30% - 10px);

  border: 1px solid
    ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};

  padding: 25px 23px;

  @media (max-width: 1024px) {
    width: 100%;
    box-sizing: border-box;
    padding: 24px 16px;
    border: none;
  }
`;

const FileContainer = styled.div<{ isDarkMode: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  margin-bottom: 60px;
  flex: 1 0 auto;

  border: 1px solid
    ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};
  height: 72px;
  padding: 0 24px;
  gap: 8px;
  @media (max-width: 1024px) {
    margin: 0 16px;
    width: calc(100% - 32px);
    margin-bottom: 182px;
    padding: 0 16px;
  }
`;

const ClearButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1000000;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 0, 0, 0.4);
`;

const ShareModalWrapper = styled.div<{ isDarkMode: boolean }>`
  width: min(410px, calc(100vw - 32px));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 4px;

  background: ${(props) =>
    props.isDarkMode ? '' : Color.light.background.white};
  padding: 16px;

  @media (max-width: 1024px) {
    svg.share {
      width: min(66px, 100%);
    }
  }
`;

const ShareModal = ({
  isOpened,
  closeModal,
  openQRCodeModal,
}: {
  isOpened: boolean;
  closeModal: () => void;
  openQRCodeModal: () => void;
}) => {
  const { isDarkMode } = useContext(DarkModeContext);
  return isOpened ? (
    <ModalContainer>
      <ShareModalWrapper isDarkMode={isDarkMode}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '33px',
          }}
        >
          <span
            style={{
              ...Font.title.subhead3,
              color: isDarkMode ? '' : Color.light.text.primary,
            }}
          >
            공유하기
          </span>
          <ClearButton onClick={closeModal}>
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
                d="M15.5288 16.4714C15.7891 16.7318 16.2112 16.7318 16.4716 16.4714C16.7319 16.2111 16.7319 15.789 16.4716 15.5286L12.943 12L16.4716 8.47145C16.7319 8.2111 16.7319 7.78899 16.4716 7.52864C16.2112 7.26829 15.7891 7.26829 15.5288 7.52864L12.0002 11.0572L8.47157 7.52864C8.21122 7.26829 7.78911 7.26829 7.52876 7.52864C7.26841 7.78899 7.26841 8.2111 7.52876 8.47145L11.0574 12L7.52876 15.5286C7.26841 15.789 7.26841 16.2111 7.52876 16.4714C7.78911 16.7318 8.21122 16.7318 8.47157 16.4714L12.0002 12.9429L15.5288 16.4714Z"
                fill="#111111"
              />
            </svg>
          </ClearButton>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '8px',
          }}
        >
          <ClearButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'fit-content',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <svg
              className="share"
              width="66"
              height="auto"
              viewBox="0 0 66 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.5 -0.3125C15.3799 -0.3125 0.6875 14.3799 0.6875 32.5C0.6875 50.6201 15.3799 65.3125 33.5 65.3125C51.6201 65.3125 66.3125 50.6201 66.3125 32.5C66.3125 14.3799 51.6201 -0.3125 33.5 -0.3125ZM49.269 24.4214C49.291 24.7656 49.291 25.1245 49.291 25.4761C49.291 36.228 41.1025 48.6133 26.1392 48.6133C21.5249 48.6133 17.2476 47.2729 13.644 44.9658C14.3032 45.0391 14.9331 45.0684 15.6069 45.0684C19.4155 45.0684 22.9165 43.7793 25.707 41.5967C22.1328 41.5234 19.1299 39.1797 18.1045 35.957C19.3569 36.1401 20.4849 36.1401 21.7739 35.8105C19.9335 35.4366 18.2794 34.4371 17.0924 32.9818C15.9055 31.5265 15.2589 29.7051 15.2627 27.8271V27.7246C16.3394 28.3325 17.6064 28.7061 18.9321 28.7573C17.8177 28.0146 16.9037 27.0084 16.2713 25.8279C15.6389 24.6473 15.3075 23.329 15.3066 21.9897C15.3066 20.4736 15.7021 19.0894 16.4126 17.8882C18.4553 20.4029 21.0044 22.4595 23.894 23.9246C26.7837 25.3896 29.9493 26.2301 33.1851 26.3916C32.0352 20.8618 36.166 16.3867 41.1318 16.3867C43.4756 16.3867 45.585 17.3682 47.0718 18.9502C48.9102 18.606 50.668 17.9175 52.2354 16.9946C51.6274 18.877 50.353 20.4663 48.6611 21.4697C50.3018 21.2939 51.8838 20.8398 53.3486 20.2026C52.2427 21.8286 50.8584 23.2715 49.269 24.4214Z"
                fill="#18CBF2"
              />
            </svg>
            <span
              style={{
                ...Font.body.body1,
                fontSize: 'clamp(8px, 2.5vw, 16px)',
                color: isDarkMode ? '' : Color.light.text.secondary,
              }}
            >
              트위터
            </span>
          </ClearButton>
          <ClearButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'fit-content',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <svg
              className="share"
              width="66"
              height="auto"
              viewBox="0 0 66 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_45_13700)">
                <path
                  d="M65 33C65 15.327 50.673 1 33 1C15.327 1 1 15.3267 1 33C1 48.972 12.702 62.2108 28 64.6113V42.25H19.875V33H28V25.95C28 17.93 32.7775 13.5 40.0868 13.5C43.588 13.5 47.25 14.125 47.25 14.125V22H43.215C39.2395 22 38 24.4667 38 26.9975V33H46.875L45.4562 42.25H38V64.6113C53.298 62.2108 65 48.9722 65 33Z"
                  fill="#1877F2"
                />
                <path
                  d="M45.4562 42.25L46.875 33H38V26.9975C38 24.4665 39.2398 22 43.215 22H47.25V14.125C47.25 14.125 43.588 13.5 40.0868 13.5C32.7775 13.5 28 17.93 28 25.95V33H19.875V42.25H28V64.6113C29.654 64.8705 31.3258 65.0004 33 65C34.6742 65.0005 36.346 64.8705 38 64.6113V42.25H45.4562Z"
                  fill="white"
                />
              </g>
              <rect
                x="0.5"
                y="0.5"
                width="65"
                height="65"
                rx="32.5"
                stroke="#EEEEEE"
              />
              <defs>
                <clipPath id="clip0_45_13700">
                  <rect
                    width="64"
                    height="64"
                    fill="white"
                    transform="translate(1 1)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span
              style={{
                ...Font.body.body1,
                fontSize: 'clamp(8px, 2.5vw, 16px)',
                color: isDarkMode ? '' : Color.light.text.secondary,
              }}
            >
              페이스북
            </span>
          </ClearButton>
          <ClearButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'fit-content',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <svg
              width="66"
              height="auto"
              className="share"
              viewBox="0 0 66 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_45_13706)">
                <rect width="66" height="66" rx="33" fill="#F5F6F7" />
                <rect
                  width="68"
                  height="68"
                  transform="translate(-1 -1)"
                  fill="#FAE100"
                />
                <g clip-path="url(#clip1_45_13706)">
                  <rect
                    x="10"
                    y="10"
                    width="46"
                    height="46"
                    rx="23"
                    fill="#3C1D1E"
                  />
                  <g clip-path="url(#clip2_45_13706)">
                    <path
                      d="M52.4062 10H13.5938C11.6081 10 10 11.61 10 13.5938V52.4062C10 54.3919 11.61 56 13.5938 56H52.4062C54.3919 56 56 54.39 56 52.4062V13.5938C56 11.6081 54.39 10 52.4062 10ZM33 45.9375C31.8673 45.9375 30.7575 45.8589 29.6803 45.7075C28.6032 46.4665 22.3721 50.8422 21.7837 50.9247C21.7837 50.9247 21.5441 51.0186 21.339 50.8978C21.1339 50.7771 21.1703 50.4589 21.1703 50.4589C21.2317 50.0372 22.7861 44.6744 23.0717 43.6873C17.8104 41.0807 14.3125 36.4634 14.3125 31.2041C14.3125 23.0659 22.6787 16.4688 33 16.4688C43.3213 16.4688 51.6875 23.0659 51.6875 31.2041C51.6875 39.3403 43.3213 45.9375 33 45.9375ZM25.4292 28.9117H23.7463V35.3172C23.7463 35.8846 23.2633 36.3465 22.6672 36.3465C22.0712 36.3465 21.5901 35.8865 21.5901 35.3172V28.9117H19.9073C19.6409 28.8921 19.3918 28.7724 19.21 28.5767C19.0282 28.381 18.9272 28.1237 18.9272 27.8566C18.9272 27.5895 19.0282 27.3323 19.21 27.1366C19.3918 26.9409 19.6409 26.8212 19.9073 26.8015H25.4272C25.6936 26.8212 25.9427 26.9409 26.1245 27.1366C26.3063 27.3323 26.4073 27.5895 26.4073 27.8566C26.4073 28.1237 26.3063 28.381 26.1245 28.5767C25.9427 28.7724 25.6936 28.8921 25.4272 28.9117H25.4292ZM46.4876 34.5793C46.5737 34.692 46.6365 34.8208 46.6723 34.958C46.7082 35.0952 46.7164 35.2382 46.6965 35.3786C46.6768 35.5186 46.6296 35.6534 46.5575 35.7751C46.4855 35.8969 46.3901 36.0031 46.2767 36.0877C46.0906 36.2296 45.863 36.3064 45.6289 36.3062C45.4616 36.3071 45.2964 36.2688 45.1466 36.1942C44.9968 36.1196 44.8666 36.011 44.7664 35.8769L42.2383 32.5285L41.8646 32.9023V35.254C41.8641 35.5397 41.7505 35.8136 41.5486 36.0158C41.3468 36.218 41.0731 36.3321 40.7874 36.3331C40.5012 36.3331 40.2268 36.2194 40.0244 36.017C39.822 35.8147 39.7083 35.5402 39.7083 35.254V27.8787C39.7201 27.6006 39.8388 27.3378 40.0397 27.1452C40.2406 26.9526 40.5081 26.8451 40.7865 26.8451C41.0648 26.8451 41.3323 26.9526 41.5332 27.1452C41.7341 27.3378 41.8529 27.6006 41.8646 27.8787V30.1978L44.8737 27.1887C44.9523 27.1111 45.0454 27.0499 45.1477 27.0084C45.25 26.967 45.3595 26.9462 45.4698 26.9472C45.7382 26.9472 46.0103 27.0641 46.2135 27.2673C46.3985 27.4486 46.5109 27.6912 46.5298 27.9496C46.5397 28.0698 46.5236 28.1908 46.4826 28.3042C46.4416 28.4177 46.3766 28.5209 46.2921 28.607L43.8349 31.0623L46.4895 34.5793H46.4876ZM30.4834 27.8672C30.3013 27.3497 29.7493 26.8168 29.0459 26.8015C28.3444 26.8168 27.7924 27.3497 27.6103 27.8652L25.0324 34.6522C24.7047 35.668 24.9902 36.0475 25.2873 36.1855C25.5022 36.2833 25.7355 36.3336 25.9716 36.3331C26.422 36.3331 26.7651 36.151 26.8686 35.8577L27.4033 34.4586H30.6904L31.2252 35.8577C31.3287 36.151 31.6717 36.3331 32.1222 36.3331C32.3583 36.3328 32.5917 36.2819 32.8064 36.1836C33.1035 36.0475 33.3891 35.6699 33.0613 34.6502L30.4834 27.8652V27.8672ZM27.9707 32.5496L29.0478 29.4906L30.1231 32.5496H27.9707ZM39.2886 35.2003C39.2825 35.4684 39.1704 35.7231 38.9767 35.9086C38.783 36.094 38.5236 36.195 38.2555 36.1893H34.7978C34.6649 36.1924 34.5327 36.1692 34.4088 36.1212C34.2848 36.0731 34.1715 36.0011 34.0754 35.9093C33.9793 35.8174 33.9022 35.7075 33.8486 35.5859C33.795 35.4643 33.7658 35.3332 33.7628 35.2003V27.8787C33.7628 27.2845 34.2573 26.8015 34.8649 26.8015C35.4725 26.8015 35.9651 27.2845 35.9651 27.8787V34.2133H38.2555C38.8247 34.2133 39.2905 34.656 39.2905 35.2003H39.2886Z"
                      fill="#FAE100"
                    />
                  </g>
                </g>
              </g>
              <rect
                x="0.5"
                y="0.5"
                width="65"
                height="65"
                rx="32.5"
                stroke="#EEEEEE"
              />
              <defs>
                <clipPath id="clip0_45_13706">
                  <rect width="66" height="66" rx="33" fill="white" />
                </clipPath>
                <clipPath id="clip1_45_13706">
                  <rect
                    width="46"
                    height="46"
                    fill="white"
                    transform="translate(10 10)"
                  />
                </clipPath>
                <clipPath id="clip2_45_13706">
                  <rect
                    width="46"
                    height="46"
                    fill="white"
                    transform="translate(10 10)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span
              style={{
                ...Font.body.body1,
                fontSize: 'clamp(8px, 2.5vw, 16px)',
                color: isDarkMode ? '' : Color.light.text.secondary,
              }}
            >
              카카오톡
            </span>
          </ClearButton>
          <ClearButton
            onClick={() => {
              closeModal();
              openQRCodeModal();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'fit-content',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <svg
              width="66"
              height="auto"
              className="share"
              viewBox="0 0 66 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="65"
                height="65"
                rx="32.5"
                fill="#F5F6F7"
              />
              <path
                d="M18 31.3333V18H31.3333V31.3333H18ZM21.3333 28H28V21.3333H21.3333V28ZM18 48V34.6667H31.3333V48H18ZM21.3333 44.6667H28V38H21.3333V44.6667ZM34.6667 31.3333V18H48V31.3333H34.6667ZM38 28H44.6667V21.3333H38V28ZM44.6667 48V44.6667H48V48H44.6667ZM34.6667 38V34.6667H38V38H34.6667ZM38 41.3333V38H41.3333V41.3333H38ZM34.6667 44.6667V41.3333H38V44.6667H34.6667ZM38 48V44.6667H41.3333V48H38ZM41.3333 44.6667V41.3333H44.6667V44.6667H41.3333ZM41.3333 38V34.6667H44.6667V38H41.3333ZM44.6667 41.3333V38H48V41.3333H44.6667Z"
                fill="#5D6169"
              />
              <rect
                x="0.5"
                y="0.5"
                width="65"
                height="65"
                rx="32.5"
                stroke="#EEEEEE"
              />
            </svg>
            <span
              style={{
                ...Font.body.body1,
                fontSize: 'clamp(8px, 2.5vw, 16px)',
                color: isDarkMode ? '' : Color.light.text.secondary,
              }}
            >
              QR코드
            </span>
          </ClearButton>
          <ClearButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'fit-content%',
              flexDirection: 'column',
              gap: '8px',
            }}
            onClick={() => {
              try {
                const isBrowser = () => typeof window !== 'undefined';
                const url = isBrowser() ? window.location.href : '';
                window.navigator.clipboard.writeText(url);

                alert('클립보드에 복사했습니다.');
              } catch (e) {
                console.log(`오류가 발생하였습니다. 오류 내용: ${e}`);
              }
            }}
          >
            <svg
              className="share"
              width="66"
              height="auto"
              viewBox="0 0 66 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="65"
                height="65"
                rx="32.5"
                fill="#F5F6F7"
              />
              <path
                d="M35.25 30.75L46.5 19.5M39 19.5H46.5V27M46.5 36V43.5C46.5 44.2956 46.1839 45.0587 45.6213 45.6213C45.0587 46.1839 44.2956 46.5 43.5 46.5H22.5C21.7044 46.5 20.9413 46.1839 20.3787 45.6213C19.8161 45.0587 19.5 44.2956 19.5 43.5V22.5C19.5 21.7044 19.8161 20.9413 20.3787 20.3787C20.9413 19.8161 21.7044 19.5 22.5 19.5H30"
                stroke="#5D6169"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="0.5"
                y="0.5"
                width="65"
                height="65"
                rx="32.5"
                stroke="#EEEEEE"
              />
            </svg>
            <span
              style={{
                ...Font.body.body1,
                fontSize: 'clamp(8px, 2.5vw, 16px)',
                color: isDarkMode ? '' : Color.light.text.secondary,
              }}
            >
              URL복사
            </span>
          </ClearButton>
        </div>
      </ShareModalWrapper>
    </ModalContainer>
  ) : (
    <></>
  );
};

const detail = () => {
  const { isDesktop, isTablet, isMobile } = useContext(MediaQueryContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const [shareModalOpened, setShareModalOpened] = useState(false);
  const [qrcodeModalOpened, setQRCodeModalOpened] = useState(false);

  const closeShareModal = () => {
    setShareModalOpened(false);
  };
  const openShareModal = () => {
    setShareModalOpened(true);
  };

  const openQRCodeModal = () => {
    setQRCodeModalOpened(true);
  };
  const closeQRCodeModal = () => {
    setQRCodeModalOpened(false);
  };

  const [id, setId] = useQueryString('id', '1');

  const getLocation = () => {
    const isBrowser = () => typeof window !== 'undefined';
    return isBrowser() && location.href;
  };

  return (
    <>
      <RowContainer>
        <ShareModal
          isOpened={shareModalOpened}
          closeModal={closeShareModal}
          openQRCodeModal={openQRCodeModal}
        />
        <Modal
          title="QR코드가 생성되었습니다."
          content="상단 QR코드를 확인해보세요."
          qrvalue={`${getLocation()}?id=${id}`}
          buttonType={1}
          primaryButtonLabel={'이미지 저장하기'}
          onPrimaryButtonClick={(e: React.MouseEvent) => {
            const $svg =
              document.querySelector('.ModalContentArea > svg') ??
              new HTMLElement();
            //window.URL.revokeObjectURL(canvas.toDataURL());
            const source = new XMLSerializer().serializeToString($svg as Node);
            const blob = new Blob([source], {
              type: 'image/svg+xml;charset=utf-8',
            });

            const $canvas = document.createElement('canvas');

            const { width, height } = $svg.getBoundingClientRect();

            $canvas.width = width;
            $canvas.height = height;

            const ctx = $canvas.getContext('2d');

            const img = new Image();

            img.onload = (e) => {
              ctx?.drawImage(e.target as CanvasImageSource, 0, 0);

              const $link = document.createElement('a');

              $link.download = 'QRCode.png';
              $link.href = $canvas.toDataURL('image/png');

              $link.click();
            };

            img.src = URL.createObjectURL(blob);
          }}
          closeModal={closeQRCodeModal}
          visible={qrcodeModalOpened}
        />

        {!isDesktop && (
          <>
            <div
              style={{
                position: 'fixed',
                bottom: '78px',
                left: '0px',
                height: '30px',
                width: '100vw',
                background:
                  'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 100%)',
              }}
            ></div>
            <div
              style={{
                position: 'fixed',
                bottom: '0px',
                left: '0px',
                width: '100vw',
                height: '78px',
                padding: '16px',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 1)',
              }}
            >
              <DefaultButton
                style={'PRIMARY'}
                size={'L'}
                type={'NONE'}
                width={'100%'}
                state={'DEFAULT'}
              >
                신청하기
              </DefaultButton>
            </div>
          </>
        )}

        <ContentArea>
          <ImageBox
            src={
              'https://i.ytimg.com/vi/vEf18OWCwHU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFTyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLALFbPWYf7WbDr81FhqE1dmVZJ5Nw'
            }
            isDarkMode={isDarkMode}
          ></ImageBox>
          {!isDesktop && (
            <>
              <CardArea isDarkMode={isDarkMode}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: '17px',
                  }}
                >
                  <span
                    style={{
                      ...Font.body.body1,
                      color: isDarkMode ? '' : Color.light.text.blue,
                    }}
                  >
                    D-000
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 'fit-content',
                      gap: '4px',
                    }}
                  >
                    <ClearButton>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.56736 2.91557C9.72748 2.53059 10.2728 2.53059 10.433 2.91557L12.2046 7.17511C12.2721 7.33741 12.4248 7.4483 12.6 7.46235L17.1985 7.83101C17.6141 7.86433 17.7827 8.38301 17.466 8.65426L13.9624 11.6555C13.8289 11.7698 13.7706 11.9492 13.8114 12.1202L14.8818 16.6076C14.9785 17.0132 14.5373 17.3338 14.1815 17.1164L10.2445 14.7117C10.0945 14.6201 9.90584 14.6201 9.75583 14.7117L5.81884 17.1164C5.46301 17.3338 5.0218 17.0132 5.11854 16.6076L6.18895 12.1202C6.22973 11.9492 6.17143 11.7698 6.03794 11.6555L2.53434 8.65426C2.21768 8.38301 2.38621 7.86433 2.80183 7.83101L7.40037 7.46235C7.57558 7.4483 7.72821 7.33741 7.79571 7.17511L9.56736 2.91557Z"
                          stroke="#5D6169"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </ClearButton>
                    <ClearButton onClick={openShareModal}>
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
                          d="M12.564 4.64286C12.564 3.45939 13.4824 2.5 14.6153 2.5C15.7482 2.5 16.6666 3.45939 16.6666 4.64286C16.6666 5.82632 15.7482 6.78571 14.6153 6.78571C14.0295 6.78571 13.5016 6.5291 13.1282 6.11874L7.37012 9.46048C7.41301 9.6331 7.43582 9.81396 7.43582 10C7.43582 10.186 7.41301 10.3669 7.37012 10.5395L13.1282 13.8813C13.5016 13.4709 14.0295 13.2143 14.6153 13.2143C15.7482 13.2143 16.6666 14.1737 16.6666 15.3571C16.6666 16.5406 15.7482 17.5 14.6153 17.5C13.4824 17.5 12.564 16.5406 12.564 15.3571C12.564 15.1711 12.5868 14.9902 12.6297 14.8176L6.87163 11.4759C6.49827 11.8862 5.97029 12.1429 5.38453 12.1429C4.25164 12.1429 3.33325 11.1835 3.33325 10C3.33325 8.81653 4.25164 7.85714 5.38453 7.85714C5.97029 7.85714 6.49827 8.11375 6.87163 8.52412L12.6297 5.18237C12.5868 5.00976 12.564 4.82889 12.564 4.64286Z"
                          fill="#5D6169"
                        />
                      </svg>
                    </ClearButton>
                  </div>
                </div>
                <span
                  style={{
                    ...Font.title.headline,
                    color: isDarkMode ? '' : Color.light.text.primary,
                    width: '100%',
                    marginBottom: '16px',
                  }}
                >
                  그래핀과 반도체 사이의 결함을 개선시킨 컬러 광센서 제조 시스템
                </span>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'start',
                    marginBottom: isDesktop ? '32px' : '0',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <Tag
                    state={'DEFAULT'}
                    size={'S'}
                    type={'DEFAULT'}
                    text={'저는 태그입니다.'}
                  />
                  <Tag
                    state={'DEFAULT'}
                    size={'S'}
                    type={'DEFAULT'}
                    text={'저는 태그입니다.'}
                  />
                  <Tag
                    state={'DEFAULT'}
                    size={'S'}
                    type={'DEFAULT'}
                    text={'저는 태그입니다.'}
                  />
                  <Tag
                    state={'DEFAULT'}
                    size={'S'}
                    type={'DEFAULT'}
                    text={'저는 태그입니다.'}
                  />
                </div>
              </CardArea>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  background:
                    Color[isDarkMode ? 'dark' : 'light'].background.gray1,
                }}
              ></div>
            </>
          )}
          <span
            style={{
              width: '100%',
              textAlign: 'start',
              ...Font.title.headline,
              color: isDarkMode ? '' : Color.light.text.primary,
              marginBottom: '24px',
              marginTop: '24px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            지원사업 정보
          </span>
          <TableWrapper isDarkMode={isDarkMode}>
            {isDesktop && (
              <tbody>
                <TableRow>
                  <TableHeaderCell>등록일</TableHeaderCell>
                  <TableHeaderCell>소관부처</TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>Content 2</TableCell>
                  <TableCell>Content 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableHeaderCell>수행기관</TableHeaderCell>
                  <TableHeaderCell>신청기간</TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>Content 2</TableCell>
                  <TableCell>Content 2</TableCell>
                </TableRow>
              </tbody>
            )}
            {!isDesktop && (
              <tbody>
                <TableRow>
                  <TableHeaderCell>등록일</TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>Content 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableHeaderCell>소관부처</TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>Content 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableHeaderCell>수행기관</TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>Content 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableHeaderCell>신청기간</TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>Content 2</TableCell>
                </TableRow>
              </tbody>
            )}
          </TableWrapper>
          <span
            style={{
              ...Font.title.subhead3,
              color: isDarkMode ? '' : Color.light.text.primary,
              width: '100%',
              textAlign: 'start',
              marginBottom: '14px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            사업개요
          </span>
          <span
            style={{
              ...Font.body.bodyLong1,
              color: isDarkMode ? '' : Color.light.text.secondary,
              width: '100%',
              textAlign: 'start',
              marginBottom: '24px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            디바이스층의 두께 및 삽입층의 광응답 특성
          </span>
          <span
            style={{
              ...Font.title.subhead3,
              color: isDarkMode ? '' : Color.light.text.primary,
              width: '100%',
              textAlign: 'start',
              marginBottom: '14px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            공고내용
          </span>
          <span
            style={{
              ...Font.body.bodyLong1,
              color: isDarkMode ? '' : Color.light.text.secondary,
              width: '100%',
              textAlign: 'start',
              marginBottom: '24px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            소제목
            <br />
            본문내용
          </span>
          <span
            style={{
              ...Font.title.subhead3,
              color: isDarkMode ? '' : Color.light.text.primary,
              width: '100%',
              textAlign: 'start',
              marginBottom: '14px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            첨부파일
          </span>
          <FileContainer isDarkMode={isDarkMode}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M26.6665 9.33317L19.9998 2.6665L19.9998 9.33317L20 9.33317V9.33333L26.6666 9.33333L26.6664 9.33317L26.6665 9.33317ZM18.6666 2.66667H7.99992C6.52716 2.66667 5.33325 3.86058 5.33325 5.33333V26.6667C5.33325 28.1394 6.52716 29.3333 7.99992 29.3333H23.9999C25.4727 29.3333 26.6666 28.1394 26.6666 26.6667V10.6667H20C19.2636 10.6667 18.6666 10.0697 18.6666 9.33333V2.66667ZM22.6666 14.6667H9.33325V17.3333H22.6666V14.6667ZM17.111 20H9.33325V22.6667H17.111V20Z"
                fill="#5D6169"
              />
            </svg>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0',
                flex: '1 0 auto',
              }}
            >
              <span
                style={{
                  ...Font.title.subhead3,
                  fontSize: 'clamp(12px, 2.5vw, 16px)',
                  color: isDarkMode ? '' : Color.light.text.primary,
                  width: '100%',
                  textAlign: 'start',
                }}
              >
                사업계획서 양식.hwp
              </span>
              <span
                style={{
                  ...Font.body.caption,
                  color: isDarkMode ? '' : Color.light.text.third,
                  width: '100%',
                  textAlign: 'start',
                }}
              >
                1000mb
              </span>
            </div>
            <TextButton
              style={'SECONDARY'}
              type={'UNDERLINE'}
              size={isDesktop ? 'L' : 'M'}
              state={'DEFAULT'}
              text={'다운로드'}
            />
          </FileContainer>
        </ContentArea>
        {isDesktop && (
          <CardArea isDarkMode={isDarkMode}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '17px',
              }}
            >
              <span
                style={{
                  ...Font.body.body1,
                  color: isDarkMode ? '' : Color.light.text.blue,
                }}
              >
                D-000
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'fit-content',
                  gap: '4px',
                }}
              >
                <ClearButton>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.56736 2.91557C9.72748 2.53059 10.2728 2.53059 10.433 2.91557L12.2046 7.17511C12.2721 7.33741 12.4248 7.4483 12.6 7.46235L17.1985 7.83101C17.6141 7.86433 17.7827 8.38301 17.466 8.65426L13.9624 11.6555C13.8289 11.7698 13.7706 11.9492 13.8114 12.1202L14.8818 16.6076C14.9785 17.0132 14.5373 17.3338 14.1815 17.1164L10.2445 14.7117C10.0945 14.6201 9.90584 14.6201 9.75583 14.7117L5.81884 17.1164C5.46301 17.3338 5.0218 17.0132 5.11854 16.6076L6.18895 12.1202C6.22973 11.9492 6.17143 11.7698 6.03794 11.6555L2.53434 8.65426C2.21768 8.38301 2.38621 7.86433 2.80183 7.83101L7.40037 7.46235C7.57558 7.4483 7.72821 7.33741 7.79571 7.17511L9.56736 2.91557Z"
                      stroke="#5D6169"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ClearButton>
                <ClearButton onClick={openShareModal}>
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
                      d="M12.564 4.64286C12.564 3.45939 13.4824 2.5 14.6153 2.5C15.7482 2.5 16.6666 3.45939 16.6666 4.64286C16.6666 5.82632 15.7482 6.78571 14.6153 6.78571C14.0295 6.78571 13.5016 6.5291 13.1282 6.11874L7.37012 9.46048C7.41301 9.6331 7.43582 9.81396 7.43582 10C7.43582 10.186 7.41301 10.3669 7.37012 10.5395L13.1282 13.8813C13.5016 13.4709 14.0295 13.2143 14.6153 13.2143C15.7482 13.2143 16.6666 14.1737 16.6666 15.3571C16.6666 16.5406 15.7482 17.5 14.6153 17.5C13.4824 17.5 12.564 16.5406 12.564 15.3571C12.564 15.1711 12.5868 14.9902 12.6297 14.8176L6.87163 11.4759C6.49827 11.8862 5.97029 12.1429 5.38453 12.1429C4.25164 12.1429 3.33325 11.1835 3.33325 10C3.33325 8.81653 4.25164 7.85714 5.38453 7.85714C5.97029 7.85714 6.49827 8.11375 6.87163 8.52412L12.6297 5.18237C12.5868 5.00976 12.564 4.82889 12.564 4.64286Z"
                      fill="#5D6169"
                    />
                  </svg>
                </ClearButton>
              </div>
            </div>
            <span
              style={{
                ...Font.title.headline,
                width: '100%',
                color: isDarkMode ? '' : Color.light.text.primary,
                marginBottom: '16px',
              }}
            >
              그래핀과 반도체 사이의 결함을 개선시킨 컬러 광센서 제조 시스템
            </span>
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'start',
                marginBottom: '32px',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <Tag
                state={'DEFAULT'}
                size={'S'}
                type={'DEFAULT'}
                text={'저는 태그입니다.'}
              />
              <Tag
                state={'DEFAULT'}
                size={'S'}
                type={'DEFAULT'}
                text={'저는 태그입니다.'}
              />
              <Tag
                state={'DEFAULT'}
                size={'S'}
                type={'DEFAULT'}
                text={'저는 태그입니다.'}
              />
              <Tag
                state={'DEFAULT'}
                size={'S'}
                type={'DEFAULT'}
                text={'저는 태그입니다.'}
              />
            </div>
            <DefaultButton
              style={'PRIMARY'}
              type={'NONE'}
              state={'DEFAULT'}
              width={'100%'}
              size={'XL'}
              text={'신청하기'}
            />
          </CardArea>
        )}
      </RowContainer>
    </>
  );
};

export default detail;
