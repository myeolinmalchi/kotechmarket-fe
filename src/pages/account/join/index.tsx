import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { API_URL } from '../../../../config';
import Font from '../../../styles/Font';
import { DarkModeContext } from '../../../contexts/DarkModeProvider';
import Color from '../../../styles/Color';
import { TextField } from '../../../components/TextFields';
import styled from 'styled-components';
import { CheckBox, CheckBoxField } from '../../../components/CheckBox';
import { DefaultButton } from '../../../components/Button';
import { Title } from '../../../components/account/Text';
import { MediaQueryContext } from '../../../contexts/MediaQueryProvider';
import { JoinRequestDTO, Organization } from '../../../types/account/Join';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 420px;
  gap: 24px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
    padding: 0 16px;
  }
`;

const InputWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  span:first-child {
    width: 100%;
    text-align: start;
    color: ${(props) => (props.isDarkMode ? '' : Color.light.text.secondary)};
  }

  span:first-child > span {
    color: ${Color.light.text.red};
  }

  @media (max-width: 1024px) {
  }
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
const ClearButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const OrganizationModalWrapper = styled.div<{ isDarkMode: boolean }>`
  width: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
  box-sizing: border-box;

  background: ${(props) =>
    props.isDarkMode ? '' : Color.light.background.white};
  padding: 16px;
  gap: 16px;
`;

const OrganizationModalTableContainer = styled.div<{ isDarkMode: boolean }>`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  div:nth-child(2n) {
    width: 128px;
    height: 42px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div:nth-child(2n-1) {
    width: 380px;
    height: 42px;
    padding: 12px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: start;
  }

  div > span {
    width: 100%;
    color: ${(props) => (props.isDarkMode ? '' : Color.light.text.secondary)};
    text-align: start;
  }
  div:first-child {
    background: ${(props) =>
      props.isDarkMode ? '' : Color.light.background.gray1};
  }

  div:first-child > span,
  div:nth-child(2) > span {
    text-align: center;
  }

  div:nth-child(2) {
    background: ${(props) =>
      props.isDarkMode ? '' : Color.light.background.gray1};
  }
`;

// TODO: 소속 검색 모달 밖으로 빼야함
const FindOrgModal = ({
  isOpened,
  closeModal,
  applyOrganization,
  organizations,
  onOrgCheckboxChange,
  checkboxes,
  selectedOrg,
  setCurrentKeyword,
}: {
  isOpened: boolean;
  closeModal: () => void;
  applyOrganization: () => void;
  organizations: Organization[];
  onOrgCheckboxChange: (idx: number) => React.ChangeEventHandler;
  checkboxes: React.MutableRefObject<HTMLInputElement[]>;
  selectedOrg: number;
  setCurrentKeyword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [keyword, setKeyword] = useState('');

  return isOpened ? (
    <ModalContainer>
      <OrganizationModalWrapper isDarkMode={isDarkMode}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              ...Font.title.subhead3,
              color: isDarkMode ? '' : Color.light.text.primary,
            }}
          >
            소속
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
                d="M15.5285 16.4714C15.7889 16.7318 16.211 16.7318 16.4713 16.4714C16.7317 16.2111 16.7317 15.789 16.4713 15.5286L12.9427 12L16.4713 8.47145C16.7317 8.2111 16.7317 7.78899 16.4713 7.52864C16.211 7.26829 15.7889 7.26829 15.5285 7.52864L11.9999 11.0572L8.47132 7.52864C8.21097 7.26829 7.78886 7.26829 7.52851 7.52864C7.26817 7.78899 7.26817 8.2111 7.52851 8.47145L11.0571 12L7.52851 15.5286C7.26816 15.789 7.26816 16.2111 7.52851 16.4714C7.78886 16.7318 8.21097 16.7318 8.47132 16.4714L11.9999 12.9429L15.5285 16.4714Z"
                fill="#111111"
              />
            </svg>
          </ClearButton>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
          }}
        >
          <TextField
            width="431px"
            state="DEFAULT"
            size="S"
            value={keyword}
            setValue={setKeyword}
            placeholder={'검색어를 입력해주세요'}
          />
          <DefaultButton
            style="PRIMARY"
            state="DEFAULT"
            size="S"
            width="69px"
            type="NONE"
            onClick={() => {
              setCurrentKeyword(keyword);
            }}
          >
            검색하기
          </DefaultButton>
        </div>
        <CheckBoxField size="S">
          <OrganizationModalTableContainer isDarkMode={isDarkMode}>
            <div>
              <span style={{ ...Font.body.caption }}>기관명</span>
            </div>
            <div>
              <span style={{ ...Font.body.caption }}>선택</span>
            </div>
            {organizations.map(({ name, extOrganizationId }, idx) => (
              <>
                <div>
                  <span style={{ ...Font.body.caption }}>{name}</span>
                </div>
                <div>
                  <CheckBox
                    name={name}
                    value={extOrganizationId.toString()}
                    label={''}
                    size={'S'}
                    onChange={onOrgCheckboxChange(idx)}
                    inputRef={(el) => (checkboxes.current[idx] = el)}
                  />
                </div>
              </>
            ))}
          </OrganizationModalTableContainer>
        </CheckBoxField>
        <DefaultButton
          style={'PRIMARY'}
          state={selectedOrg === -1 ? 'DISABLED' : 'DEFAULT'}
          type={'NONE'}
          size={'L'}
          width={'100%'}
          onClick={applyOrganization}
        >
          등록하기
        </DefaultButton>
      </OrganizationModalWrapper>
    </ModalContainer>
  ) : (
    <></>
  );
};

type UserType = 'STANDARD' | 'ENTERPRISE';

const join = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [userType, setUserType] = React.useState<
    'STANDARD' | 'ENTERPRISE' | undefined
  >(undefined);

  const [emailTimer, setEmailTimer] = useState<NodeJS.Timer | null>(null);

  const navigate = useCustomNavigate();

  useEffect(() => {
    try {
      const userType = localStorage.getItem('JoinUserType');
      if (userType) {
        setUserType(userType as UserType);
      } else {
        navigate('/account/choose');
      }
    } catch (e) {
      console.log(e);
      navigate('/');
    }
    return () => {
      localStorage.removeItem('JoinUserType');
    };
  }, []);

  const [currentSearchOrgKeyword, setCurrentSearchOrgKeyword] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  useEffect(() => {
    /*
    const body = {
      page: 0,
      size: 10,
      sort: [],
    };

    const queryParams = new URLSearchParams(JSON.stringify(body)).toString();
    
    (async () => {
      const res = await fetch(
        `${API_URL}/public/api/v1/members/organizations?${queryParams}${
          currentSearchOrgKeyword === ''
            ? ''
            : `&search=${currentSearchOrgKeyword}`
        }`
      );
      const data: Organization[] = await res.json();
      setOrganizations(data);
    })();
     */
  }, [currentSearchOrgKeyword]);

  const { isDesktop } = useContext(MediaQueryContext);
  const [orgModalOpened, setOrgModalOpened] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(-1);
  const checkboxes = useRef<HTMLInputElement[]>([]);
  const onOrgCheckboxChange = useCallback(
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      checkboxes.current.forEach((el) => {
        if (el !== e.target) {
          el.checked = false;
        }
      });

      if (!e.target.checked) {
        setSelectedOrg(-1);
      } else {
        setSelectedOrg(idx);
      }
    },
    [selectedOrg, checkboxes.current]
  );

  useEffect(() => {
    if (selectedOrg < 0 || selectedOrg >= organizations.length) {
      setOrganization(-1);
    } else {
      setOrganization(organizations[selectedOrg].extOrganizationId);
    }
  }, [selectedOrg]);
  /* Org Modal 관련 변수 및 함수*/

  /* 회원과입 Form 관련 변수 및 함수 */
  /** 0: 입력값 없음 1: 형식이 올바르지 않음 2: 중복된 이메일 3: 가능한 값 */
  const [emailState, setEmailState] = useState<0 | 1 | 2 | 3>(0);

  /** 0: 입력값 없음 1: 형식이 올바르지 않음 2: 가능한 값 */
  const [pwState, setPwState] = useState<0 | 1 | 2>(0);

  /** 0: 입력값 없음 1: 비밀번호가 일치하지 않음 2: 비밀번호 일치 */
  const [pwCheckState, setPwCheckState] = useState<0 | 1 | 2>(0);

  /** 0: 입력값 없음 1: 한글 또는 영어가 아님 2: 가능한 값 */
  const [nameState, setNameState] = useState<0 | 1 | 2>(0);

  /** 0: 입력값 없음 1: 중복된 전화번호 2: 가능한 값 */
  const [phoneState, setPhoneState] = useState<0 | 1 | 2>(0);

  // Form value
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bPhone, setBPhone] = useState<string>('');
  const [organization, setOrganization] = useState<number>(-1);
  const [BRCImage, setBRCImage] = useState<{ file: File; url: string }>();

  // 동의여부
  const [emailConsent, setEmailConsent] = useState<boolean>(false);
  const [newsLetterConsent, setNewsLetterConsent] = useState<boolean>(false);

  /**
   * Check if the email is a valid email format
   */
  const checkValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, []);

  /**
   * 이미 등록된 이메일인지 체크.
   * 존재하면 true 반환
   */
  const checkDuplicateEmail = useCallback(
    async (email: string): Promise<boolean> => {
      const query =
        encodeURIComponent('email') + '=' + encodeURIComponent(email);
      const res = await fetch(
        `${API_URL}/public/api/v1/members/duplicate?${query}`
      );
      const { isUnique }: { isUnique: boolean } = await res.json();
      return !isUnique;
    },
    []
  );

  /**
   * Check if the password follows the rules of containing at least 1 English alphabet,
   * at least 1 digit, and has a length between 8 to 12 characters.
   */
  const checkValidPW = useCallback((password: string) => {
    if (password.length < 8 || password.length > 12) {
      return false;
    }

    let hasAlpha = false;
    let hasDigit = false;

    for (const char of password) {
      if (/[a-zA-Z]/.test(char)) {
        hasAlpha = true;
      } else if (/[0-9]/.test(char)) {
        hasDigit = true;
      }
    }

    return hasAlpha && hasDigit;
  }, []);

  /**
   * Check if the name is either written in Korean or English
   */
  const checkValidName = useCallback((name: string): boolean => {
    const koreanRegex = /^[가-힣]+$/;
    const englishRegex = /^[A-Za-z]+$/;

    return koreanRegex.test(name) || englishRegex.test(name);
  }, []);
  /* 회원과입 Form 관련 변수 및 함수*/

  // Validation
  useEffect(() => {
    if (emailTimer) {
      clearTimeout(emailTimer);
    }

    if (email === '') {
      setEmailState(0);
    } else if (checkValidEmail(email)) {
      setEmailState(0);
      setEmailTimer(
        setTimeout(async () => {
          const test = await checkDuplicateEmail(email);
          if (test) setEmailState(2);
          else setEmailState(3);
        }, 1000)
      );
    } else {
      setEmailState(1);
    }
  }, [email]);

  useEffect(() => {
    if (pw === '') {
      setPwState(0);
    } else if (checkValidPW(pw ?? '')) {
      setPwState(2);
    } else {
      setPwState(1);
    }

    if (pwCheck === '') {
      setPwCheckState(0);
    } else if (pwCheck === pw) {
      setPwCheckState(2);
    } else {
      setPwCheckState(1);
    }
  }, [pw, pwCheck]);

  useEffect(() => {
    if (name === '') {
      setNameState(0);
    } else if (checkValidName(name)) {
      setNameState(2);
    } else {
      setNameState(1);
    }
  }, [name]);
  // Validation
  const [joinAvailable, setJoinAvailable] = useState<boolean>(false);

  // TODO phoneState 체크 필요
  useEffect(() => {
    if (userType === 'STANDARD') {
      const test =
        emailState === 3 &&
        pwState === 2 &&
        pwCheckState === 2 &&
        nameState === 2;
      setJoinAvailable(test);
    } else if (userType === 'ENTERPRISE') {
      const test =
        emailState === 3 &&
        pwState === 2 &&
        pwCheckState === 2 &&
        nameState === 2 &&
        organization !== -1 &&
        BRCImage?.file !== undefined;
      setJoinAvailable(test);
    }
  }, [
    emailState,
    pwState,
    pwCheckState,
    nameState,
    phoneState,
    organization,
    BRCImage,
  ]);

  const join = useCallback(() => {
    if (userType === 'STANDARD') {
      const requestBody = {
        name,
        email,
        password: pw,
        phoneNumber: phone,
        isAgreedForReceivingMessage: emailConsent,
        isAgreedForReceivingNewsletter: newsLetterConsent,
      } as JoinRequestDTO;
      (async () => {
        const res = await fetch(`${API_URL}/api/v1/members/member`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (res.status === 200) {
          localStorage.setItem('JoinedUser', name);
          localStorage.setItem('JoinedUserType', userType as string);
          navigate('/account/join/done');
        } else {
          alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      })();
    } else if (userType === 'ENTERPRISE') {
    }
  }, [name, email, pw, phone, emailConsent, newsLetterConsent]);

  return (
    <>
      <FindOrgModal
        setCurrentKeyword={setCurrentSearchOrgKeyword}
        isOpened={orgModalOpened}
        closeModal={() => {
          setOrgModalOpened(false);
          setSelectedOrg(-1);
        }}
        applyOrganization={() => {
          setOrgModalOpened(false);
        }}
        organizations={organizations}
        checkboxes={checkboxes}
        onOrgCheckboxChange={onOrgCheckboxChange}
        selectedOrg={selectedOrg}
      />
      <Title style={{ marginBottom: '36px' }}>회원가입</Title>
      <InputContainer>
        <InputWrapper isDarkMode={isDarkMode}>
          <span style={{ ...Font.body.body1 }}>
            <span>*</span> 이메일
          </span>
          <TextField
            placeholder="이메일을 입력해주세요"
            size="L"
            value={email}
            setValue={setEmail}
            state={
              emailState === 1 || emailState === 2
                ? 'ERROR'
                : emailState === 3
                ? 'SUCCESS'
                : 'DEFAULT'
            }
            width={'100%'}
          />
          <span
            style={{
              ...Font.body.caption,
              color:
                emailState === 1 || emailState === 2
                  ? Color.light.text.red
                  : emailState === 3
                  ? Color.light.text.blue
                  : isDarkMode
                  ? ''
                  : Color.light.text.third,
              width: '100%',
              textAlign: 'start',
            }}
          >
            {emailState === 1 && '형식에 맞지 않은 이메일 주소입니다.'}
            {emailState === 2 && '이미 가입되어 있는 이메일 주소입니다.'}
            {emailState === 3 && '사용가능한 이메일입니다.'}
          </span>
        </InputWrapper>
        <InputWrapper isDarkMode={isDarkMode}>
          <span style={{ ...Font.body.body1 }}>
            <span>*</span> 비밀번호
          </span>
          <TextField
            isPassword={true}
            placeholder="비밀번호를 입력해주세요"
            size="L"
            state={
              pwState === 0 ? 'DEFAULT' : pwState === 1 ? 'ERROR' : 'SUCCESS'
            }
            width={'100%'}
            value={pw}
            setValue={setPw}
          />
          <span
            style={{
              ...Font.body.caption,
              color:
                pwState === 1
                  ? Color.light.text.red
                  : pwState === 2
                  ? Color.light.text.blue
                  : isDarkMode
                  ? ''
                  : Color.light.text.third,
              width: '100%',
              textAlign: 'start',
            }}
          >
            {pwState < 2 &&
              '영문/숫자 조합 8자 이상 12자 이하로 입력해 주세요.'}
            {pwState === 2 && '사용 가능한 비밀번호입니다.'}
          </span>
        </InputWrapper>
        <InputWrapper isDarkMode={isDarkMode}>
          <span style={{ ...Font.body.body1 }}>
            <span>*</span> 비밀번호 확인
          </span>
          <TextField
            isPassword={true}
            placeholder="비밀번호를 다시 입력해주세요"
            size="L"
            state={
              pwCheckState === 0
                ? 'DEFAULT'
                : pwCheckState === 1
                ? 'ERROR'
                : 'SUCCESS'
            }
            width={'100%'}
            value={pwCheck}
            setValue={setPwCheck}
          />
          {pwCheckState > 0 && (
            <span
              style={{
                ...Font.body.caption,
                color:
                  pwCheckState === 1
                    ? Color.light.text.red
                    : pwCheckState === 2
                    ? Color.light.text.blue
                    : isDarkMode
                    ? ''
                    : Color.light.text.third,
                width: '100%',
                textAlign: 'start',
              }}
            >
              {pwCheckState < 2 && '비밀번호가 일치하지 않습니다.'}
              {pwCheckState === 2 && '비밀번호가 일치합니다.'}
            </span>
          )}
        </InputWrapper>
        <InputWrapper isDarkMode={isDarkMode}>
          <span style={{ ...Font.body.body1 }}>
            <span>*</span> 이름
          </span>
          <TextField
            placeholder="이름을 입력해주세요"
            size="L"
            state={
              nameState === 2
                ? 'SUCCESS'
                : nameState === 1
                ? 'ERROR'
                : 'DEFAULT'
            }
            width={'100%'}
            value={name}
            setValue={setName}
          />
          {nameState > 0 && (
            <span
              style={{
                ...Font.body.caption,
                color:
                  nameState === 1
                    ? Color.light.text.red
                    : nameState === 2
                    ? Color.light.text.blue
                    : isDarkMode
                    ? ''
                    : Color.light.text.third,
                width: '100%',
                textAlign: 'start',
              }}
            >
              {nameState === 1 && '한글 또는 영어만 입력 가능합니다.'}
              {nameState === 2 && '사용 가능한 이름입니다.'}
            </span>
          )}
        </InputWrapper>
        {userType === 'ENTERPRISE' && (
          <>
            <InputWrapper isDarkMode={isDarkMode}>
              <span style={{ ...Font.body.body1 }}>
                <span>*</span> 소속
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                }}
              >
                <TextField
                  placeholder={
                    selectedOrg === -1 ? '' : organizations[selectedOrg].name
                  }
                  size="L"
                  state="DISABLED"
                  width={'calc(100% - 100px)'}
                />
                <DefaultButton
                  style="PRIMARY"
                  type="NONE"
                  state="DEFAULT"
                  size="M"
                  width="92px"
                  height="52px"
                  onClick={() => {
                    setOrgModalOpened(true);
                  }}
                >
                  소속찾기
                </DefaultButton>
              </div>
            </InputWrapper>
            <InputWrapper isDarkMode={isDarkMode}>
              <span style={{ ...Font.body.body1 }}>
                <span>*</span> 사업자 등록증
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    width: '50%',
                    paddingTop: '33.3%',
                    borderRadius: '4px',
                    background: isDarkMode ? '' : Color.light.background.gray1,
                    backgroundImage: `url(${BRCImage?.url})` ?? 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                ></div>
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    padding: '0 20px',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      ...Font.body.body1,
                      color: isDarkMode ? '' : Color.light.text.third,
                    }}
                  >
                    (jpg, jpeg, png) 업로드만 가능
                  </span>
                  <DefaultButton
                    style={'PRIMARY'}
                    type={'NONE'}
                    state={'DEFAULT'}
                    size={'S'}
                    onClick={() => {
                      const image = document.createElement('input');
                      image.type = 'file';
                      image.multiple = false;
                      image.accept = 'image/jpg,impge/png,image/jpeg';
                      image.onchange = () => {
                        const file = image.files?.[0];
                        const fileReader = new FileReader();
                        fileReader.onloadend = () => {
                          file &&
                            fileReader.result &&
                            setBRCImage({
                              file: file,
                              url: fileReader.result as string,
                            });
                        };
                        file && fileReader.readAsDataURL(file);
                      };
                      image.click();
                    }}
                  >
                    이미지 업로드
                  </DefaultButton>
                </div>
              </div>
            </InputWrapper>
          </>
        )}
        <InputWrapper isDarkMode={isDarkMode}>
          <span style={{ ...Font.body.body1 }}>
            <span>*</span> 휴대전화
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
            }}
          >
            <TextField
              placeholder={''}
              size="L"
              state="DISABLED"
              width={'calc(100% - 100px)'}
            />
            <DefaultButton
              style="PRIMARY"
              type="NONE"
              state="DEFAULT"
              size="M"
              width="92px"
              height="52px"
              onClick={() => {}}
            >
              인증하기
            </DefaultButton>
          </div>
        </InputWrapper>
        {userType === 'ENTERPRISE' && (
          <>
            <InputWrapper isDarkMode={isDarkMode}>
              <span style={{ ...Font.body.body1 }}>기관 전화번호</span>
              <TextField
                placeholder="전화번호를 입력해주세요"
                size="L"
                state="DEFAULT"
                width={'100%'}
                onChange={(e) => {
                  const phone = e.target.value;
                  setBPhone(phone);
                }}
              />
            </InputWrapper>
          </>
        )}
      </InputContainer>
      <CheckBoxField
        size={'S'}
        style={
          {
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            width: 'min(100%, 420px)',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '20px',
            marginBottom: '36px',
            padding: isDesktop ? '' : '0 16px',
            boxSizing: 'border-box',
          } as React.StyleHTMLAttributes<any>
        }
      >
        <CheckBox
          name={'email_consent'}
          label={'[선택] 이메일/SMS 등 수신을 동의합니까?'}
          value={'email_consent'}
          size={'S'}
          onChange={(e) => {
            if (e.target.checked) {
              setEmailConsent(true);
            } else {
              setEmailConsent(false);
            }
          }}
        />
        <CheckBox
          name={'newsletter_consent'}
          label={'[선택] 한국기술마켓의 뉴스레터 발송에 동의합니까?'}
          value={'newsletter_consent'}
          size={'S'}
          onChange={(e) => setNewsLetterConsent(e.target.checked)}
        />
      </CheckBoxField>
      <DefaultButton
        style={'PRIMARY'}
        type={'NONE'}
        state={joinAvailable ? 'DEFAULT' : 'DISABLED'}
        size={'L'}
        width={isDesktop ? 'min(calc(100% - 32px), 420px)' : '388px'}
        onClick={() => {
          join();
        }}
      >
        회원가입
      </DefaultButton>
      <span
        style={{
          width: 'min(420px, 100%)',
          textAlign: 'center',
          ...Font.body.caption,
          color: isDarkMode ? '' : Color.light.text.secondary,
          marginTop: '14px',
          marginBottom: isDesktop ? '60px' : '120px',
        }}
      >
        회원가입 시{' '}
        <span
          style={{
            color: Color.light.text.blue,
            cursor: 'pointer',
          }}
        >
          이용약관
        </span>{' '}
        및{' '}
        <span style={{ color: Color.light.text.blue, cursor: 'pointer' }}>
          개인정보처리방침
        </span>
        에 동의하게 됩니다.
      </span>
    </>
  );
};

export default withPageLoadedEffect(join);
