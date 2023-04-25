// TODO: 기관회원 여부 따라서 페이지 구분
import React, { useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Font from '../../styles/Font';
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

const ContentTitle = styled.span`
  width: 100%;
  text-align: start;
  margin-bottom: 20px;
  margin-top: 24px;
  padding: 0;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
`;

const TextFieldLabel = styled.span`
  width: 100%;
  text-align: start;
  margin-bottom: 8px;
  padding: 0;
  box-sizing: border-box;
`;

const SurveyLabel = styled(TextFieldLabel)`
  margin-bottom: 20px;
`;

const ContentArea = styled.div<{ Color: ColorType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(65% - 10px);

  @media (max-width: 1024px) {
    width: 100%;
  }
  ${ContentTitle} {
    color: ${(props) => props.Color.text.primary};
  }

  ${TextFieldLabel} {
    color: ${(props) => props.Color.text.secondary};
  }

  ${SurveyLabel} {
    color: ${(props) => props.Color.text.secondary};
  }
`;

const AlignedLeftSpan = styled.span`
  width: 100%;
  text-align: start;
`;

const CardInfoTitle = styled.span(AlignedLeftSpan);

const CardInfoContent = styled.span(AlignedLeftSpan);

const CardArea = styled.div<{ Color: ColorType }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(35% - 10px);
  box-sizing: border-box;

  border: 1px solid ${(props) => props.Color.stroke.gray1};

  padding: 25px 23px;

  @media (max-width: 1024px) {
    width: 100%;
    box-sizing: border-box;
    padding: 24px 16px;
    border: none;
  }

  ${CardInfoTitle} {
    color: ${(props) => props.Color.text.primary};
  }

  ${CardInfoContent} {
    color: ${(props) => props.Color.text.secondary};
  }
`;

const ClearButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const AISummaryContainer = styled.div<{ Color: ColorType }>`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  border-radius: 4px;
`;

const ContactImage = styled.div<{ src?: string }>`
  background-image: url(${({ src }) => src});
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 136px;
  height: 136px;
  border-radius: 4px;
`;

const OrganizationName = styled.span``;

const ContactInfoWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: calc(100% - 136px - 20px);
  gap: 14px;
`;

const ContactContainer = styled.div<{ Color: ColorType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  padding: 16px 24px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  border-radius: 4px;

  ${OrganizationName} {
    color: ${(props) => props.Color.text.primary};
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

const NewsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

const NewsInnerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: calc(100% - 102px - 8px);
  height: 68px;
`;

const NewsInnerTitle = styled.span`
  text-align: start;
  width: 100%;
`;

const NewsInnerDate = styled.span`
  text-align: end;
  width: 100%;
`;
const NewsImage = styled.div<{
  src?: string;
  loaded?: boolean;
}>`
  background-image: url(${({ src }) => src});
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  //opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  animation: ${({ loaded }) =>
    loaded
      ? css`
          ${fadeIn} 0.3s ease-in-out forwards
        `
      : 'none'};

  width: 102px;
  height: 68px;
`;

const NewsListContainer = styled.div<{ Color: ColorType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 18px;

  ${NewsImage} {
    border: 1px solid ${(props) => props.Color.stroke.gray1};
  }

  ${NewsInnerTitle} {
    color: ${(props) => props.Color.text.secondary};
  }
  ${NewsInnerDate} {
    color: ${(props) => props.Color.text.third};
  }
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const TopArea = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: calc(65% - 10px);
`;

const detail = () => {
  const { isDesktop } = useContext(MediaQueryContext);
  const [id, setId] = useQueryString('id', '1');
  const { Color } = useStyleContext();
  const shareModal = useShareModalContext();

  return (
    <>
      <TopContainer>
        <TopArea>
          <span
            style={{
              ...Font.body.body2,
              color: Color.text.secondary,
              marginBottom: '8px',
            }}
          >
            카테고리
          </span>
          <div
            style={{
              marginBottom: '12px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                ...Font.title.display2,
                color: Color.text.primary,
              }}
            >
              세계적 학술지에 연구결과 게재
            </span>
            <ClearButton>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12.002" cy="6.49805" r="1.5" fill="#5D6169" />
                <circle cx="12.002" cy="11.998" r="1.5" fill="#5D6169" />
                <path
                  d="M13.502 17.498C13.502 18.3265 12.8304 18.998 12.002 18.998C11.1735 18.998 10.502 18.3265 10.502 17.498C10.502 16.6696 11.1735 15.998 12.002 15.998C12.8304 15.998 13.502 16.6696 13.502 17.498Z"
                  fill="#5D6169"
                />
              </svg>
            </ClearButton>
          </div>
          <span
            style={{
              ...Font.body.body2,
              color: Color.text.secondary,
              marginBottom: '12px',
            }}
          >
            부제목입니다 부제목입니다.
          </span>
          <span
            style={{
              ...Font.body.body1,
              color: Color.text.third,
              marginBottom: '48px',
            }}
          >
            00분 전
          </span>
        </TopArea>
      </TopContainer>
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
            ></div>
          </>
        )}

        <ContentArea Color={Color}>
          <ImageBox
            src={
              'https://src.hidoc.co.kr/image/lib/2021/9/23/1632383087561_0.jpg'
            }
            Color={Color}
          ></ImageBox>

          <div
            style={{
              transition: 'opacity 0.2s ease-out',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <AISummaryContainer Color={Color}>
              <span
                style={{ ...Font.title.subhead3, color: Color.text.primary }}
              >
                AI요약
              </span>

              <span
                style={{
                  ...Font.body.bodyLong1,
                  color: Color.text.secondary,
                }}
              >
                문 교수는 “이번 연구로 북극의 변화가 그 지역만이 아닌 전 지구적,
                특히 우리가 살고 있는 중위도 지역의 극단적 기상현상을 증가시킬
                수 있는 중요한 요소라는 점을 명확히 했다.”라며, “특히 중위도
                한가운데 위치한 우리나라의 기후변화와 그에 따른 기상 재해의 심화
                정도를 밝히기 위해 북극의 변화를 동시에 연구하는 것이 필요하고,
                매년 극지를 방문해 북극 상태를 연구하는 극지연구소의 역할이 더욱
              </span>
            </AISummaryContainer>
            <span
              style={{
                ...Font.body.bodyLong1,
                color: Color.text.secondary,
                margin: '24px 0',
                padding: '0 4px',
              }}
            >
              세계적으로 이상 기후에 대한 우려가 커지는 가운데 북극의 온도
              상승이 제트기류 변동에 영향을 미친다는 연구결과가 나와 관심을
              모은다.
              <br />
              <br />
              국립부경대학교 문우석 교수(환경대기과학전공)팀은 미국 예일대학교
              존 웨틀라우퍼(John Wettlaufer) 교수와의 공동연구를 진행하고, 이
              같은 연구결과를 담은 논문 ‘Wavier jet streams driven by zonally
              asymmetric surface thermal forcing’을 최근 세계적 학술지인
              PNAS(미국국립과학원회보)에 게재했다고 밝혔다.
              <br />
              북극이 전 지구 평균보다 4배나 빠른 속도로 뜨거워지는 가운데,
              북극의 빠른 온도 상승이 이상 기후 발생에 어떤 관련이 있는지에 대해
              최근 관심이 높아지고 있었다.
              <br />
              지금까지는 북극의 온도 상승으로 중위도 제트기류가 흔들릴 수 있다는
              가설과 함께, 중위도 제트기류의 변화에 북극의 역할은 제한적일 수
              있다는 반대 연구도 나오면서 논란이 지속됐지만, 두 주장 모두 이론적
              근거나 실험적 증거가 부족한 상황이었다.
              <br />
              <br />문 교수 연구팀은 이번 연구에서 이론연구와 수치 시뮬레이션 등
              컴퓨터 실험을 진행해 학계에서는 처음으로 이론적 근거를 제시했다.
              <br />
              연구팀은 연구를 통해 북극의 온도 상승이 심화할수록 제트기류의
              세기가 약해지고, 그 세기가 특정 값 이하로 떨어지게 되는 경우
              지표면에 국한된 반응이 아닌 대기 상층까지 연결된 대규모 파동
              현상들이 나타날 수 있음을 입증해냈다.
              <br />
              <br />
              제트기류의 평균적인 속도가 떨어지면 떨어질수록 제트기류의 출렁거림
              역시 강해질 수 있다는 것이다.
              <br />
              <br />문 교수는 “이번 연구로 북극의 변화가 그 지역만이 아닌 전
              지구적, 특히 우리가 살고 있는 중위도 지역의 극단적 기상현상을
              증가시킬 수 있는 중요한 요소라는 점을 명확히 했다.”라며, “특히
              중위도 한가운데 위치한 우리나라의 기후변화와 그에 따른 기상 재해의
              심화 정도를 밝히기 위해 북극의 변화를 동시에 연구하는 것이
              필요하고, 매년 극지를 방문해 북극 상태를 연구하는 극지연구소의
              역할이 더욱 강화돼야 한다.”라고 말했다.
            </span>
            <AISummaryContainer Color={Color} style={{ marginBottom: '60px' }}>
              <span
                style={{ ...Font.title.subhead3, color: Color.text.primary }}
              >
                주요 키워드
              </span>

              <span
                style={{
                  ...Font.body.bodyLong1,
                  color: Color.text.secondary,
                }}
              >
                {`#키워드1 `}
                {`#키워드1 `}
                {`#키워드1 `}
                {`#키워드1 `}
                {`#키워드1 `}
              </span>
            </AISummaryContainer>
            <ContactContainer Color={Color}>
              <ContactImage
                src={
                  'https://www.sciencetimes.co.kr/wp-content/uploads/2021/08/GettyImages-a10699683.jpg'
                }
              ></ContactImage>
              <ContactInfoWrapper>
                <OrganizationName style={{ ...Font.title.headline }}>
                  강민석 기자
                </OrganizationName>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        width: '60px',
                        ...Font.body.body1,
                        color: Color.text.secondary,
                      }}
                    >
                      소속
                    </span>
                    <span
                      style={{
                        ...Font.body.body1,
                        color: Color.text.primary,
                      }}
                    >
                      부산대학교 기계공학부
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        width: '60px',
                        ...Font.body.body1,
                        color: Color.text.secondary,
                      }}
                    >
                      이메일
                    </span>
                    <span
                      style={{
                        ...Font.body.body1,
                        color: Color.text.primary,
                      }}
                    >
                      minsuk4820@gmail.com
                    </span>
                  </div>
                </div>
              </ContactInfoWrapper>
            </ContactContainer>
          </div>
        </ContentArea>

        {/* Desktop Card Area */}
        {isDesktop && (
          <CardArea Color={Color}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  ...Font.title.subhead3,
                  color: Color.text.primary,
                }}
              >
                기관의 <span style={{ color: Color.text.blue }}>인기</span> 뉴스
              </span>
              <ClearButton>
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
                    d="M5.97554 3.57576C6.20986 3.34145 6.58975 3.34145 6.82407 3.57576L10.5412 7.29292C10.9318 7.68344 10.9318 8.31661 10.5412 8.70713L6.82407 12.4243C6.58975 12.6586 6.20986 12.6586 5.97554 12.4243C5.74123 12.19 5.74123 11.8101 5.97554 11.5758L9.55128 8.00002L5.97554 4.42429C5.74123 4.18997 5.74123 3.81007 5.97554 3.57576Z"
                    fill="#111111"
                  />
                </svg>
              </ClearButton>
            </div>
            <NewsListContainer Color={Color}>
              {new Array(5).fill(0).map(() => (
                <NewsWrapper>
                  <NewsImage
                    src={
                      'https://me.pusan.ac.kr/mgr/professor/images/%EC%9D%B4%EC%9A%A9-2.jpg'
                    }
                  ></NewsImage>
                  <NewsInnerContent>
                    <NewsInnerTitle style={{ ...Font.body.bodyLong1 }}>
                      부산대, 청정에너지 도입 드림팀 구성 업무협약 체결
                    </NewsInnerTitle>
                    <NewsInnerDate style={{ ...Font.body.caption }}>
                      0000.00.00
                    </NewsInnerDate>
                  </NewsInnerContent>
                </NewsWrapper>
              ))}
            </NewsListContainer>
          </CardArea>
        )}
        {/* Desktop Card Area */}
      </RowContainer>
    </>
  );
};

export default withPageLoadedEffect(detail);
