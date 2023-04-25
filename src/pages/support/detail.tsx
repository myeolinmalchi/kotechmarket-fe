// TODO: 다크모드 로직 변경
import React, { useContext } from 'react';
import styled from 'styled-components';
import Font from '../../styles/Font';
import { TextButton, DefaultButton } from '../../components/Button';
import { Tag } from '../../components/Tag';
import useQueryString from '../../hooks/useQueryString';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../../hocs/withPageLoadedEffect';
import { ColorType } from '../../types/Style';
import {
  useShareModalContext,
  useStyleContext,
} from '../../contexts/AppContextProvider';

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
`;

const ImageBox = styled.div<{ src: string; Color: ColorType }>`
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 66.66%;
  width: 100%;

  border: 1px solid ${(props) => props.Color.stroke.gray1};

  border-radius: 4px;
  margin-bottom: 36px;
  @media (max-width: 1024px) {
    margin: 0;
    border: none;
    border-radius: 0;
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

const TableWrapper = styled.table<{ Color: ColorType }>`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 24px;

  th,
  td {
    color: ${(props) => props.Color.text.secondary};
    border: 1px solid ${(props) => props.Color.stroke.gray1};
  }

  th {
    background: ${(props) => props.Color.background.gray1};
  }

  @media (max-width: 1024px) {
    padding: 0 16px;
    box-sizing: border-box;
    width: calc(100% - 32px);
  }
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

const CardArea = styled.div<{ Color: ColorType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(30% - 10px);

  border: 1px solid ${(props) => props.Color.stroke.gray1};

  padding: 25px 23px;

  @media (max-width: 1024px) {
    width: 100%;
    box-sizing: border-box;
    padding: 24px 16px;
    border: none;
  }
`;

const FileContainer = styled.div<{ Color: ColorType }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  margin-bottom: 60px;
  flex: 1 0 auto;

  border: 1px solid ${(props) => props.Color.stroke.gray1};
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

const detail = () => {
  const { isDesktop } = useContext(MediaQueryContext);
  const [id, setId] = useQueryString('id', '1');
  const { Color } = useStyleContext();
  const shareModal = useShareModalContext();

  return (
    <>
      <RowContainer>
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
            Color={Color}
          ></ImageBox>
          {!isDesktop && (
            <>
              <CardArea Color={Color}>
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
                      color: Color.text.blue,
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
                    <ClearButton onClick={shareModal.openModal}>
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
                    color: Color.text.primary,
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
                  background: Color.background.gray1,
                }}
              ></div>
            </>
          )}
          <span
            style={{
              width: '100%',
              textAlign: 'start',
              ...Font.title.headline,
              color: Color.text.primary,
              marginBottom: '24px',
              marginTop: '24px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            지원사업 정보
          </span>
          <TableWrapper Color={Color}>
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
              color: Color.text.primary,
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
              color: Color.text.secondary,
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
              color: Color.text.primary,
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
              color: Color.text.secondary,
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
              color: Color.text.primary,
              width: '100%',
              textAlign: 'start',
              marginBottom: '14px',
              padding: isDesktop ? '0' : '0 16px',
              boxSizing: 'border-box',
            }}
          >
            첨부파일
          </span>
          <FileContainer Color={Color}>
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
                  color: Color.text.primary,
                  width: '100%',
                  textAlign: 'start',
                }}
              >
                사업계획서 양식.hwp
              </span>
              <span
                style={{
                  ...Font.body.caption,
                  color: Color.text.third,
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
          <CardArea Color={Color}>
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
                  color: Color.text.blue,
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
                <ClearButton onClick={shareModal.openModal}>
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
                color: Color.text.primary,
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

export default withPageLoadedEffect(detail);
