// TODO: 기관회원 여부 따라서 페이지 구분
import React, {
  useMemo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import Font from '../../../styles/Font';
import { DefaultButton } from '../../../components/Button';
import { Tag } from '../../../components/Tag';
import useQueryString from '../../../hooks/useQueryString';
import { MediaQueryContext } from '../../../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import { ColorType } from '../../../types/Style';
import {
  useShareModalContext,
  useStyleContext,
} from '../../../contexts/AppContextProvider';
import Avatar from '../../../components/Avatar';
import { TextField } from '../../../components/TextFields';
import { DropDown } from '../../../components/DropDown';
import { useDropDown } from '../../../hooks/useDropDown';
import { CheckBox, CheckBoxField } from '../../../components/CheckBox';
import { RadioButton, RadioField } from '../../../components/Radio';

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
  width: calc(70% - 10px);

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

const CardInfo = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const CardInfoContainer = styled.div<{ recruitmentStep: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin-bottom: ${(props) => (props.recruitmentStep ? '0' : '24px')};
`;

const CardArea = styled.div<{ Color: ColorType }>`
  position: relative;
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

const AuthorInfoTopArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthorInfoMiddleArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 14px;
`;

const AuthorInfoMiddleAreaTextArea = styled.div`
  width: calc(100% - 62px);
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 7px;
`;

const AuthorInfoMiddleAreaTextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const AuthorInfoBottomArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 4px;
`;

const AuthorInfoName = styled.span``;

const AuthorInfoContainer = styled.div<{ Color: ColorType }>`
  top: 46px;
  left: 20px;
  position: absolute;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 24px);

  background: ${(props) => props.Color.background.default};
  border-radius: 4px;
  border: solid 1px ${(props) => props.Color.stroke.gray1};
  gap: 20px;

  ${AuthorInfoName} {
    color: ${(props) => props.Color.text.primary};
  }
  ${AuthorInfoMiddleAreaTextWrapper} > span:first-child {
    color: ${(props) => props.Color.text.primary};
    width: 72px;
  }
  ${AuthorInfoMiddleAreaTextWrapper} > span:nth-child(2) {
    color: ${(props) => props.Color.text.secondary};
    width: calc(100% - 72px);
  }
`;

const Spacer = styled.div`
  margin-bottom: 24px;
`;

/**
 * CASE
 *  - 일반회원 / 기관회원(본인꺼, 남의꺼)
 *  - 무료 / 유료(신청 form에서 입금자명, 은행, 계좌 추가)
 *  - 설문조사 유 / 무
 *  - 온라인 / 오프라인 / 온오프라인
 *  TODO: 나중에 fetch할 때 데이터 타입 수정 필요
 */
type EventDetailState = {
  price?: number; // 가격, undefined일 경우 무료
  hasSurvey: boolean; // 설문 유무
  online?: {
    // 온라인 정보
    place: string;
    maxParticipants: number;
  };
  offline?: {
    // 오프라인 정보
    place: string;
    maxParticipants: number;
  };
  recruitmentSchedule: {
    // 모집 일정
    start: Date;
    end: Date;
  };
  eventSchedule: {
    // 행사 일정
    start: Date;
    end: Date;
  };
  isExternalRecruitment: boolean; // 외부 모집 여부
};

const detail = () => {
  const { isDesktop } = useContext(MediaQueryContext);
  const [id, setId] = useQueryString('id', '1');
  const { Color } = useStyleContext();
  const shareModal = useShareModalContext();

  const [authorModalVisible, setAuthorModalVisible] = useState(false);
  const [authorModalOpacity, setAuthorModalOpacity] = useState(false);

  const [
    {
      price,
      hasSurvey,
      online,
      offline,
      recruitmentSchedule,
      eventSchedule,
      isExternalRecruitment,
    },
    _,
  ] = React.useState<EventDetailState>({
    price: 13000,
    hasSurvey: true,
    online: {
      place: '메타버스 플랫폼',
      maxParticipants: 13,
    },
    offline: {
      place: '경기도 부천시 소사로 281번길 88 4층 별관',
      maxParticipants: 20,
    },
    recruitmentSchedule: {
      start: new Date(2022, 9, 3, 0, 0),
      end: new Date(2023, 10, 2, 23, 55),
    },
    eventSchedule: {
      start: new Date(2022, 9, 3, 0, 0),
      end: new Date(2023, 10, 2, 23, 55),
    },
    isExternalRecruitment: false,
  });

  /**
   * 온오프라인 동시 모집인지 판단하는 state
   */
  const [isDualRecruitment, setIsDualRecruitment] = useState(false);
  useEffect(() => {
    if (online && offline) {
      setIsDualRecruitment(true);
    } else {
      setIsDualRecruitment(false);
    }
  }, [online, offline]);

  /**
   * 모집 마감과 행사 종료 여부를 판단하는 state
   **/
  const [isRecruitmentClosed, setIsRecruitmentClosed] = useState(false);
  const [eventEnded, setEventEnded] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    if (currentDate >= recruitmentSchedule.end) {
      setIsRecruitmentClosed(true);
    } else {
      setIsRecruitmentClosed(false);
    }

    if (currentDate >= eventSchedule.end) {
      setEventEnded(true);
    } else {
      setEventEnded(false);
    }
  }, [recruitmentSchedule, eventSchedule]);

  /**
   * Date 객체를 'YYYY년 MM월 DD일 hh시 mm분' 포맷 문자열로 반환하는 함수
   */
  const formatDate = useCallback((date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}시 ${minutes}분`;
  }, []);

  /**
   * 참가 신청중인지 여부 판단하는 state.
   * false면 행사 정보, true면 신청 form
   */
  const [recruitmentStep, setRecruitementStep] = useState(false);

  /**
   * 참가 신청 인원 state.
   */
  const [onlineParticipants, setOnlineParticipants] = useState(0);
  const [offlineParticipants, setOfflineParticipants] = useState(0);

  /**
   * 필수약관 동의 state.
   */
  const [all, setAll] = useState(false);
  const [ageOver14, setAgeOver14] = useState(false);
  const [personalInfoAgreement, setPersonalInfoAgreement] = useState(false);
  const [termsOfServiceAgreement, setTermsOfServiceAgreement] = useState(false);
  const [thirdPartySharingAgreement, setThirdPartySharingAgreement] =
    useState(false);
  const [
    purchaseAndPaymentTermsAgreement,
    setPurchaseAndPaymentTermsAgreement,
  ] = useState(false);

  useEffect(() => {
    setAgeOver14(all);
    setPersonalInfoAgreement(all);
    setTermsOfServiceAgreement(all);
    setThirdPartySharingAgreement(all);
    setPurchaseAndPaymentTermsAgreement(all);
  }, [all]);

  /**
   * 환불 은행 선택 드롭박스 state
   */
  const refundbankStates = useDropDown();

  /**
   * 설문조사 radio button state
   * TODO: 임시 필드로, 나중에 수정 필요함.
   */
  const survey1 = useMemo(
    () => [
      {
        label: '경희대학교 산학협력단',
        value: '1',
      },
      {
        label: '기술보증기금',
        value: '2',
      },
      {
        label: '용인산업진흥원',
        value: '3',
      },
    ],
    []
  );
  const [survey1Selected, setSurvey1Selected] = useState(-1);

  /**
   * 설문조사 radio button state
   * TODO: 임시 필드로, 나중에 수정 필요함.
   */
  const survey2 = useMemo(
    () => [
      {
        label: '기술이전',
        value: '1',
      },
      {
        label: '라이센싱',
        value: '2',
      },
      {
        label: '공동연구개발',
        value: '3',
      },
    ],
    []
  );
  const [survey2Selected, setSurvey2Selected] = useState<Set<number>>(
    new Set()
  );

  /**
   * Set에서 element 삭제해서 반환하는 함수
   */
  function removeValueFromSet<T>(
    originalSet: Set<T>,
    valueToRemove: T
  ): Set<T> {
    const newSet = new Set<T>();

    for (const item of originalSet) {
      if (item !== valueToRemove) {
        newSet.add(item);
      }
    }

    return newSet;
  }

  /**
   * 신청 영역 fade in, out 효과 주기 위한 state
   */
  const [recruitmentOpacity, setRecruitementOpacity] = useState(true);

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
                state={isRecruitmentClosed ? 'DISABLED' : 'DEFAULT'}
              >
                {isRecruitmentClosed ? '모집 마감' : '참가 신청'}
              </DefaultButton>
            </div>
          </>
        )}

        <ContentArea Color={Color}>
          <ImageBox
            src={
              'https://src.hidoc.co.kr/image/lib/2021/9/23/1632383087561_0.jpg'
            }
            Color={Color}
          ></ImageBox>

          {/* Mobile Card Area */}
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
                  {/* Author */}
                  <span
                    style={{
                      ...Font.body.body1,
                      color: Color.text.blue,
                    }}
                  >
                    D-000
                  </span>
                  {/* Author */}
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
                  {/* Author */}
                  <AuthorInfoContainer Color={Color}>test</AuthorInfoContainer>
                </div>
                <span>카테고리</span>
                <span
                  style={{
                    ...Font.title.headline,
                    color: Color.text.primary,
                    width: '100%',
                    marginBottom: '16px',
                  }}
                >
                  NTB 메타버스 기술이전 전시회 (유망기술 및 소액특허)
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
          {/* Mobile Card Area */}

          {!recruitmentStep && (
            <div
              style={{
                opacity: recruitmentOpacity ? '1' : '0',
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
                  문 교수는 “이번 연구로 북극의 변화가 그 지역만이 아닌 전
                  지구적, 특히 우리가 살고 있는 중위도 지역의 극단적 기상현상을
                  증가시킬 수 있는 중요한 요소라는 점을 명확히 했다.”라며, “특히
                  중위도 한가운데 위치한 우리나라의 기후변화와 그에 따른 기상
                  재해의 심화 정도를 밝히기 위해 북극의 변화를 동시에 연구하는
                  것이 필요하고, 매년 극지를 방문해 북극 상태를 연구하는
                  극지연구소의 역할이 더욱
                </span>
              </AISummaryContainer>
              <ContentTitle style={{ ...Font.title.headline }}>
                행사 정보
              </ContentTitle>
              {/* Event info container */}

              {/* Event info container */}
              <ContentTitle style={{ ...Font.title.headline }}>
                문의처
              </ContentTitle>
              <ContactContainer Color={Color}>
                <ContactImage
                  src={
                    'https://www.sciencetimes.co.kr/wp-content/uploads/2021/08/GettyImages-a10699683.jpg'
                  }
                ></ContactImage>
                <ContactInfoWrapper>
                  <OrganizationName style={{ ...Font.title.headline }}>
                    귀여운 라마
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
                        담당자
                      </span>
                      <span
                        style={{
                          ...Font.body.body1,
                          color: Color.text.primary,
                        }}
                      >
                        홍길동
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
                        연락처
                      </span>
                      <span
                        style={{
                          ...Font.body.body1,
                          color: Color.text.primary,
                        }}
                      >
                        010-1234-5678
                      </span>
                    </div>
                  </div>
                </ContactInfoWrapper>
              </ContactContainer>
            </div>
          )}

          {recruitmentStep && (
            <div
              style={{
                opacity: recruitmentOpacity ? '1' : '0',
                transition: 'opacity 0.2s ease-out',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              {/* 신청자 인원 */}
              <ContentTitle style={{ ...Font.title.headline }}>
                신청자 인원
              </ContentTitle>
              {online && (
                <>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    온라인 참가인원
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DISABLED'}
                    placeholder={'13명'}
                  />
                  <Spacer></Spacer>
                </>
              )}
              {isDualRecruitment && <Spacer></Spacer>}
              {offline && (
                <>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    오프라인 참가인원
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DISABLED'}
                    placeholder={'13명'}
                  />
                  <Spacer></Spacer>
                </>
              )}
              {/* 신청자 인원 */}

              {/* 온라인 신청자 정보 */}
              {online && (
                <>
                  <ContentTitle style={{ ...Font.title.headline }}>
                    온라인 신청자 정보
                  </ContentTitle>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    이메일 (ID)
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'이메일을 입력해주세요'}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    이름
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'이름을 입력해주세요'}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    전화번호
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'전화번호를 입력해주세요'}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    소속/직함
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'예: 서울대학교 / 연구원'}
                  />
                  <Spacer></Spacer>
                </>
              )}
              {/* 온라인 신청자 정보 */}

              {/* 오프라인 신청자 정보 */}
              {offline && (
                <>
                  <ContentTitle style={{ ...Font.title.headline }}>
                    오프라인 신청자 정보
                  </ContentTitle>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    이메일 (ID)
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'이메일을 입력해주세요'}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    이름
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'이름을 입력해주세요'}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    전화번호
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'전화번호를 입력해주세요'}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    소속/직함
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'예: 서울대학교 / 연구원'}
                  />
                  <Spacer></Spacer>
                </>
              )}
              {/* 오프라인 신청자 정보 */}

              {/* 사전 설문 */}
              {hasSurvey && (
                <>
                  <ContentTitle style={{ ...Font.title.headline }}>
                    사전 설문
                  </ContentTitle>
                  <SurveyLabel style={{ ...Font.title.subhead2 }}>
                    <span style={{ color: Color.text.red }}>* </span>
                    기관의 추천을 받아 참가 신청하는 경우 추천한 기관을
                    선택해주세요.
                  </SurveyLabel>
                  <RadioField size={'S'}>
                    {survey1.map(({ label, value }, idx) => (
                      <>
                        <RadioButton
                          label={label}
                          size={'S'}
                          checked={survey1Selected === idx}
                          onChange={(e) =>
                            e.target.checked && setSurvey1Selected(idx)
                          }
                        />
                      </>
                    ))}
                  </RadioField>
                  <Spacer></Spacer>
                  <SurveyLabel style={{ ...Font.title.subhead2 }}>
                    <span style={{ color: Color.text.red }}>* </span>
                    기술이전 희망유형을 선택해주세요.
                  </SurveyLabel>
                  <CheckBoxField
                    size={'S'}
                    style={
                      {
                        marginTop: '0',
                      } as React.StyleHTMLAttributes<any>
                    }
                  >
                    {survey2.map(({ label }, idx) => (
                      <>
                        <CheckBox
                          label={label}
                          size={'S'}
                          onChange={(e) =>
                            e.target.checked
                              ? setSurvey2Selected(
                                  new Set(survey2Selected.add(idx))
                                )
                              : setSurvey2Selected(
                                  removeValueFromSet(survey2Selected, idx)
                                )
                          }
                          checked={survey2Selected.has(idx)}
                        />
                      </>
                    ))}
                  </CheckBoxField>
                  <Spacer></Spacer>
                </>
              )}
              {/* 사전 설문 */}

              {/* 입금정보 */}
              {price && (
                <>
                  <ContentTitle style={{ ...Font.title.headline }}>
                    입금정보
                  </ContentTitle>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    입금자명
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'입금자명을 입력해주세요'}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    환불받을 은행
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <DropDown
                    size={'L'}
                    states={refundbankStates}
                    type={'DEFAULT'}
                    placeholder={'은행을 선택해주세요'}
                    width={'100%'}
                    contents={[
                      {
                        label: '카카오뱅크',
                        value: '',
                      },
                      {
                        label: '하나은행',
                        value: '',
                      },
                      {
                        label: '기업은행',
                        value: '',
                      },
                      {
                        label: '부산은행',
                        value: '',
                      },
                    ]}
                  />
                  <Spacer></Spacer>
                  <TextFieldLabel style={{ ...Font.body.body1 }}>
                    환불받을 계좌
                    <span style={{ color: Color.text.red }}> *</span>
                  </TextFieldLabel>
                  <TextField
                    width={'100%'}
                    size={'L'}
                    state={'DEFAULT'}
                    placeholder={'계좌번호를 입력해주세요'}
                  />
                  <Spacer></Spacer>
                </>
              )}
              {/* 입금정보 */}

              {/* 필수약관 */}
              <ContentTitle style={{ ...Font.title.headline }}>
                필수약관 전체 동의
              </ContentTitle>
              <CheckBoxField
                size={'L'}
                style={
                  {
                    marginTop: '12px',
                    gap: '12px',
                  } as React.StyleHTMLAttributes<any>
                }
              >
                <CheckBox
                  name={'all'}
                  label={'모두 동의합니다.'}
                  value={'all'}
                  size={'L'}
                  onChange={(e) => setAll(e.target.checked)}
                  checked={all}
                />
                <CheckBox
                  name={'age_over_14'}
                  label={'[필수] 만 14세 이상입니다.'}
                  value={'age_over_14'}
                  size={'L'}
                  onChange={(e) => setAgeOver14(e.target.checked)}
                  checked={ageOver14}
                />
                <CheckBox
                  name={'personal_info_agreement'}
                  label={'[필수] 개인정보 수집 이용 동의서 (약관)'}
                  value={'personal_info_agreement'}
                  size={'L'}
                  onChange={(e) => setPersonalInfoAgreement(e.target.checked)}
                  checked={personalInfoAgreement}
                />
                <CheckBox
                  name={'terms_of_service_agreement'}
                  label={'[필수] 서비스 이용 약관 동의서 (약관)'}
                  value={'terms_of_service_agreement'}
                  size={'L'}
                  onChange={(e) => setTermsOfServiceAgreement(e.target.checked)}
                  checked={termsOfServiceAgreement}
                />
                <CheckBox
                  name={'third_party_sharing_agreement'}
                  label={'[필수] 제 3자 제공 동의서 (약관)'}
                  value={'third_party_sharing_agreement'}
                  size={'L'}
                  onChange={(e) =>
                    setThirdPartySharingAgreement(e.target.checked)
                  }
                  checked={thirdPartySharingAgreement}
                />
                <CheckBox
                  name={'purchase_and_payment_terms_agreement'}
                  label={'[필수] 구매조건 확인 및 결제대행 약관 동의 (약관)'}
                  value={'purchase_and_payment_terms_agreement'}
                  size={'L'}
                  onChange={(e) =>
                    setPurchaseAndPaymentTermsAgreement(e.target.checked)
                  }
                  checked={purchaseAndPaymentTermsAgreement}
                />
              </CheckBoxField>
              <Spacer></Spacer>
              {/* 필수약관 */}

              <hr
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: Color.stroke.gray1,
                  border: 'none',
                  marginBottom: '20px',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  width: '100%',
                  gap: '12px',
                }}
              >
                <DefaultButton
                  state={'DEFAULT'}
                  style={'OUTLINE'}
                  type={'NONE'}
                  size={'M'}
                  onClick={() => {
                    setRecruitementOpacity(false);
                    setTimeout(() => {
                      setRecruitementStep(false);
                      setTimeout(() => {
                        setRecruitementOpacity(true);
                      }, 10);
                    }, 200);
                  }}
                >
                  취소하기
                </DefaultButton>
                <DefaultButton
                  state={'DEFAULT'}
                  style={'PRIMARY'}
                  type={'NONE'}
                  size={'M'}
                >
                  신청하기
                </DefaultButton>
              </div>
            </div>
          )}
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
                marginBottom: '17px',
              }}
            >
              {/* Author */}
              <div
                onClick={() => {
                  setAuthorModalVisible(true);
                  setTimeout(() => {
                    setAuthorModalOpacity(true);
                  });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <Avatar size={'S'} />
                <span
                  style={{
                    ...Font.body.body1,
                    color: Color.text.secondary,
                  }}
                >
                  Name
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.32132 4.48141C9.49706 4.65715 9.49706 4.94207 9.32132 5.11781L6.53346 7.90568C6.24056 8.19857 5.76569 8.19857 5.4728 7.90568L2.68493 5.11781C2.50919 4.94207 2.50919 4.65715 2.68493 4.48141C2.86066 4.30568 3.14559 4.30568 3.32132 4.48141L6.00313 7.16321L8.68493 4.48141C8.86066 4.30568 9.14559 4.30568 9.32132 4.48141Z"
                    fill="#5D6169"
                  />
                </svg>
              </div>
              {/* Author */}

              {authorModalVisible && (
                <AuthorInfoContainer
                  Color={Color}
                  style={{
                    opacity: authorModalOpacity ? '1' : '0',
                    transition: 'opacity 0.2s ease-out',
                  }}
                >
                  <AuthorInfoTopArea>
                    <AuthorInfoName style={{ ...Font.title.headline }}>
                      Name
                    </AuthorInfoName>
                    <ClearButton
                      onClick={() => {
                        setAuthorModalOpacity(false);
                        setTimeout(() => {
                          setAuthorModalVisible(false);
                        }, 200);
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.52729 9.47108C8.78764 9.73143 9.20975 9.73143 9.4701 9.47108C9.73045 9.21073 9.73045 8.78862 9.4701 8.52827L5.94151 4.99968L9.4701 1.47108C9.73045 1.21073 9.73045 0.78862 9.4701 0.52827C9.20975 0.267921 8.78764 0.267921 8.52729 0.52827L4.9987 4.05687L1.4701 0.52827C1.20975 0.26792 0.787643 0.26792 0.527294 0.52827C0.266945 0.788619 0.266945 1.21073 0.527294 1.47108L4.05589 4.99967L0.527293 8.52827C0.266944 8.78862 0.266944 9.21073 0.527293 9.47108C0.787643 9.73143 1.20975 9.73143 1.4701 9.47108L4.9987 5.94248L8.52729 9.47108Z"
                          fill="#5D6169"
                        />
                      </svg>
                    </ClearButton>
                  </AuthorInfoTopArea>
                  <AuthorInfoMiddleArea>
                    <Avatar size={'XL'} />
                    <AuthorInfoMiddleAreaTextArea>
                      <AuthorInfoMiddleAreaTextWrapper>
                        <span style={{ ...Font.title.subhead2 }}>문의처</span>
                        <span style={{ ...Font.body.bodyLong1 }}>
                          010-1234-5678
                        </span>
                      </AuthorInfoMiddleAreaTextWrapper>
                      <AuthorInfoMiddleAreaTextWrapper>
                        <span style={{ ...Font.title.subhead2 }}>
                          구독자 수
                        </span>
                        <span style={{ ...Font.body.bodyLong1 }}>4명</span>
                      </AuthorInfoMiddleAreaTextWrapper>
                    </AuthorInfoMiddleAreaTextArea>
                  </AuthorInfoMiddleArea>
                  <AuthorInfoBottomArea>
                    <DefaultButton
                      style={'OUTLINE'}
                      state={'DEFAULT'}
                      size={'S'}
                      type={'NONE'}
                    >
                      <svg
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.20312 2.375C2.28489 2.375 1.5625 3.08646 1.5625 3.9375C1.5625 5.31061 2.42175 6.48292 3.33808 7.33713C3.79116 7.75948 4.24552 8.09204 4.58706 8.31909C4.75753 8.43241 4.89911 8.51893 4.99733 8.57671C4.99823 8.57724 4.99911 8.57776 5 8.57828C5.00088 8.57776 5.00177 8.57724 5.00267 8.57671C5.10088 8.51893 5.24247 8.43241 5.41294 8.31909C5.75448 8.09204 6.20884 7.75948 6.66191 7.33713C7.57825 6.48292 8.4375 5.31061 8.4375 3.9375C8.4375 3.08646 7.71511 2.375 6.79688 2.375C6.1126 2.375 5.53285 2.77272 5.2855 3.32849C5.23531 3.44126 5.12344 3.51393 5 3.51393C4.87656 3.51393 4.76469 3.44126 4.7145 3.32849C4.46714 2.77272 3.8874 2.375 3.20312 2.375ZM5 8.9375C4.85343 9.2135 4.85333 9.21344 4.85322 9.21338L4.85207 9.21277L4.84935 9.21131L4.83991 9.20621C4.83187 9.20183 4.82038 9.19553 4.80566 9.18732C4.77622 9.17089 4.73385 9.14684 4.6804 9.1154C4.57354 9.05252 4.42216 8.95996 4.24106 8.83957C3.87948 8.59921 3.39634 8.24587 2.91192 7.7943C1.95325 6.90064 0.9375 5.57296 0.9375 3.9375C0.9375 2.71748 1.964 1.75 3.20312 1.75C3.93183 1.75 4.5843 2.08295 5 2.60483C5.4157 2.08295 6.06817 1.75 6.79688 1.75C8.036 1.75 9.0625 2.71748 9.0625 3.9375C9.0625 5.57296 8.04675 6.90064 7.08808 7.7943C6.60366 8.24587 6.12052 8.59921 5.75894 8.83957C5.57784 8.95996 5.42646 9.05252 5.3196 9.1154C5.26615 9.14684 5.22378 9.17089 5.19434 9.18732C5.17962 9.19553 5.16813 9.20183 5.16009 9.20621L5.15065 9.21131L5.14793 9.21277L5.14708 9.21323C5.14696 9.21329 5.14657 9.2135 5 8.9375ZM5 8.9375L5.14657 9.2135C5.05492 9.26217 4.94487 9.26206 4.85322 9.21338L5 8.9375Z"
                          fill="#5D6169"
                        />
                      </svg>
                      구독하기
                    </DefaultButton>
                    <DefaultButton
                      style={'OUTLINE'}
                      state={'DEFAULT'}
                      size={'S'}
                      type={'NONE'}
                    >
                      <svg
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.25 1.4375C1.42259 1.4375 1.5625 1.57741 1.5625 1.75V1.97476L2.32841 1.78328C3.26922 1.54808 4.26313 1.65718 5.13052 2.09087L5.1754 2.11331C5.89466 2.47294 6.71724 2.56903 7.50002 2.38484L8.79569 2.07998C8.89439 2.05676 8.99823 2.08287 9.07421 2.15002C9.15019 2.21717 9.18886 2.31701 9.17794 2.41783C9.10166 3.12214 9.0625 3.83769 9.0625 4.5625C9.0625 5.29335 9.10231 6.01479 9.17986 6.72479C9.197 6.8817 9.09443 7.02676 8.94078 7.06291L7.64317 7.36823C6.71807 7.5859 5.74593 7.47235 4.8959 7.04733L4.85101 7.02489C4.11707 6.65792 3.27607 6.5656 2.48 6.76462L1.5625 6.99399V9.25C1.5625 9.42259 1.42259 9.5625 1.25 9.5625C1.07741 9.5625 0.9375 9.42259 0.9375 9.25V1.75C0.9375 1.57741 1.07741 1.4375 1.25 1.4375Z"
                          fill="#5D6169"
                        />
                      </svg>
                      채널구경
                    </DefaultButton>
                    <DefaultButton
                      style={'OUTLINE'}
                      state={'DEFAULT'}
                      size={'S'}
                      type={'NONE'}
                    >
                      <svg
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.9375 3C0.9375 2.30964 1.49714 1.75 2.1875 1.75H7.8125C8.50286 1.75 9.0625 2.30964 9.0625 3V8C9.0625 8.69036 8.50286 9.25 7.8125 9.25H2.1875C1.49714 9.25 0.9375 8.69036 0.9375 8V3ZM8.4375 4.25H1.5625V8C1.5625 8.34518 1.84232 8.625 2.1875 8.625H7.8125C8.15768 8.625 8.4375 8.34518 8.4375 8V4.25ZM2.1875 2.6875C2.01491 2.6875 1.875 2.82741 1.875 3V3.00313C1.875 3.17571 2.01491 3.31563 2.1875 3.31563H2.19063C2.36321 3.31563 2.50313 3.17571 2.50313 3.00313V3C2.50313 2.82741 2.36321 2.6875 2.19063 2.6875H2.1875ZM2.8125 3C2.8125 2.82741 2.95241 2.6875 3.125 2.6875H3.12813C3.30071 2.6875 3.44063 2.82741 3.44063 3V3.00313C3.44063 3.17571 3.30071 3.31563 3.12813 3.31563H3.125C2.95241 3.31563 2.8125 3.17571 2.8125 3.00313V3ZM4.0625 2.6875C3.88991 2.6875 3.75 2.82741 3.75 3V3.00313C3.75 3.17571 3.88991 3.31563 4.0625 3.31563H4.06563C4.23821 3.31563 4.37813 3.17571 4.37813 3.00313V3C4.37813 2.82741 4.23821 2.6875 4.06563 2.6875H4.0625Z"
                          fill="#5D6169"
                        />
                      </svg>
                      사이트 구경
                    </DefaultButton>
                  </AuthorInfoBottomArea>
                </AuthorInfoContainer>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'fit-content',
                  gap: '4px',
                }}
              >
                {/* Star Button*/}
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
                {/* Star Button*/}

                {/* Share Button */}
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
                {/* Share Button */}
              </div>
            </div>
            <span
              style={{
                ...Font.body.body2,
                color: Color.text.secondary,
                width: '100%',
                textAlign: 'start',
                marginBottom: '8px',
              }}
            >
              카테고리
            </span>
            <span
              style={{
                ...Font.title.headline,
                width: '100%',
                color: Color.text.primary,
                marginBottom: '16px',
              }}
            >
              라마와 알파카를 구분하는 컴퓨터 비전 시스템
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
            <CardInfoContainer recruitmentStep={recruitmentStep}>
              <CardInfo>
                <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                  행사장소
                </CardInfoTitle>
                <CardInfoContent style={{ ...Font.body.body1 }}>
                  {online && <p>{`온라인 · ${online.place}`}</p>}
                  {offline && <p>{`오프라인 · ${offline.place}`}</p>}
                </CardInfoContent>
              </CardInfo>
              <CardInfo>
                <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                  모집 일정
                </CardInfoTitle>
                <CardInfoContent style={{ ...Font.body.body1 }}>
                  {`${formatDate(recruitmentSchedule.start)} ~ ${formatDate(
                    recruitmentSchedule.end
                  )}`}
                </CardInfoContent>
              </CardInfo>
              <CardInfo>
                <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                  행사 일정
                </CardInfoTitle>
                <CardInfoContent style={{ ...Font.body.body1 }}>
                  {`${formatDate(eventSchedule.start)} ~ ${formatDate(
                    eventSchedule.end
                  )}`}
                </CardInfoContent>
              </CardInfo>
              <CardInfo>
                <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                  가격
                </CardInfoTitle>
                <CardInfoContent style={{ ...Font.body.body1 }}>
                  {price
                    ? `유료  ·  ${Intl.NumberFormat().format(price)}원`
                    : '무료'}
                </CardInfoContent>
              </CardInfo>
              <CardInfo>
                <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                  모집인원
                </CardInfoTitle>
                <CardInfoContent style={{ ...Font.body.body1 }}>
                  {isDualRecruitment && (
                    <>
                      <p>{`온라인: ${online?.maxParticipants}명`}</p>
                      <p>{`오프라인: ${offline?.maxParticipants}명`}</p>
                    </>
                  )}
                  {!isDualRecruitment &&
                    `${
                      online ? online.maxParticipants : offline?.maxParticipants
                    }명`}
                </CardInfoContent>
              </CardInfo>
              {!isRecruitmentClosed &&
                !isExternalRecruitment &&
                !recruitmentStep && (
                  <>
                    {!isDualRecruitment && (
                      <CardInfo>
                        <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                          참가인원
                        </CardInfoTitle>
                        {/* TODO: TextFieldNumber 만들어아함 */}
                        <TextField
                          width={'100%'}
                          state={'DEFAULT'}
                          size={'L'}
                        />
                      </CardInfo>
                    )}
                    {isDualRecruitment && (
                      <>
                        <CardInfo>
                          <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                            온라인 참가인원
                          </CardInfoTitle>
                          {/* TODO: TextFieldNumber 만들어아함 */}
                          <TextField
                            width={'100%'}
                            state={'DEFAULT'}
                            size={'L'}
                          />
                        </CardInfo>
                        <CardInfo>
                          <CardInfoTitle style={{ ...Font.title.subhead3 }}>
                            오프라인 참가인원
                          </CardInfoTitle>
                          {/* TODO: TextFieldNumber 만들어아함 */}
                          <TextField
                            width={'100%'}
                            state={'DEFAULT'}
                            size={'L'}
                          />
                        </CardInfo>
                      </>
                    )}
                  </>
                )}
            </CardInfoContainer>
            {!recruitmentStep && (
              <>
                <DefaultButton
                  style={'PRIMARY'}
                  type={'NONE'}
                  state={isRecruitmentClosed ? 'DISABLED' : 'DEFAULT'}
                  width={'100%'}
                  size={'XL'}
                  text={isRecruitmentClosed ? '모집 마감' : '참가 신청'}
                  onClick={() => {
                    setRecruitementOpacity(false);
                    setTimeout(() => {
                      setRecruitementStep(true);
                      setTimeout(() => {
                        setRecruitementOpacity(true);
                      }, 10);
                    }, 200);
                  }}
                />
              </>
            )}
          </CardArea>
        )}
      </RowContainer>
    </>
  );
};

export default withPageLoadedEffect(detail);
