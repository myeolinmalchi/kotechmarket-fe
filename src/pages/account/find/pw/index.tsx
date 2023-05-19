import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  InputContainer,
  InputWrapper,
} from '../../../../components/account/Container';
import { Title } from '../../../../components/account/Text';
import { DefaultButton, TextButton } from '../../../../components/Button';
import { TextField } from '../../../../components/TextFields';
import { DarkModeContext } from '../../../../contexts/DarkModeProvider';
import { MediaQueryContext } from '../../../../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../../../../hocs/withPageLoadedEffect';
import { useCustomNavigate } from '../../../../hooks/useCustomNavigate';
import Color from '../../../../styles/Color';
import Font from '../../../../styles/Font';

const pw = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<0 | 1 | 2>(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [pwState, setPwState] = useState<0 | 1 | 2>(0);
  const [pwCheckState, setPwCheckState] = useState<0 | 1 | 2>(0);

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

  useEffect(() => {
    (async function () {
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
    })();
  }, [pw, pwCheck]);

  const checkExistEmail = async (email: string): Promise<boolean> => {
    return true;
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    if (email === '') {
      setEmailState(0);
      return;
    }

    setTimer(
      setTimeout(async () => {
        const test = await checkExistEmail(email);
        if (test) {
          setEmailState(2);
        } else {
          setEmailState(1);
        }
      }, 1000)
    );
  }, [email]);

  useEffect(() => {
    if (currentStep === 0 && emailState === 2) {
      setNextButtonDisabled(false);
    }
  }, [emailState]);

  useEffect(() => {
    if (currentStep === 2 && pwState === 2 && pwCheckState === 2) {
      setNextButtonDisabled(false);
    }
  }, [pwState, pwCheckState]);

  const changePW = async () => {
    localStorage.setItem('PWChanged', 'true');
    navigate('/account/find/pw/done');
  };

  const { isDesktop } = useContext(MediaQueryContext);
  const navigate = useCustomNavigate();

  return (
    <>
      <Title style={{ marginBottom: '36px' }}>
        {currentStep < 2 && <>비밀번호 찾기</>}
        {currentStep === 2 && <>비밀번호 재설정</>}
      </Title>
      <InputContainer>
        {currentStep === 0 && (
          <InputWrapper isDarkMode={isDarkMode}>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 이메일
            </span>
            <TextField
              placeholder="이메일을 입력해주세요"
              size="L"
              value={email}
              setValue={setEmail}
              state={emailState === 1 ? 'ERROR' : 'DEFAULT'}
              width={'100%'}
            />
            <span
              style={{
                ...Font.body.caption,
                color:
                  emailState === 1
                    ? Color.light.text.red
                    : isDarkMode
                    ? ''
                    : Color.light.text.third,
                width: '100%',
                textAlign: 'start',
              }}
            >
              {emailState === 1 && '입력하신 정보를 찾을 수 없습니다.'}
            </span>
          </InputWrapper>
        )}
        {currentStep === 1 && (
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
                width={'320px'}
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
        )}
        {currentStep === 2 && (
          <>
            <InputWrapper isDarkMode={isDarkMode}>
              <span style={{ ...Font.body.body1 }}>
                <span>*</span> 새 비밀번호
              </span>
              <TextField
                isPassword={true}
                placeholder="비밀번호를 입력해주세요"
                size="L"
                state={
                  pwState === 0
                    ? 'DEFAULT'
                    : pwState === 1
                    ? 'ERROR'
                    : 'SUCCESS'
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
                <span>*</span> 새 비밀번호 확인
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
          </>
        )}
        <DefaultButton
          style={'PRIMARY'}
          state={nextButtonDisabled ? 'DISABLED' : 'DEFAULT'}
          type={'NONE'}
          size={'L'}
          width={'100%'}
          onClick={() => {
            if (currentStep === 0) {
              setNextButtonDisabled(true);
              setCurrentStep(1);
            } else if (currentStep === 1) {
              setNextButtonDisabled(true);
              setCurrentStep(2);
            } else {
              changePW();
            }
          }}
        >
          {currentStep < 2 && <>다음으로</>}
          {currentStep === 2 && <>비밀번호 재설정</>}
        </DefaultButton>
      </InputContainer>
      {currentStep === 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: '',
            gap: '12px',
            marginTop: '14px',
          }}
        >
          <span
            style={{
              ...Font.body.caption,
              color: isDarkMode ? '' : Color.light.text.secondary,
            }}
          >
            이메일이 기억나지 않는다면?
          </span>
          <TextButton
            style={'PRIMARY'}
            type={'UNDERLINE'}
            state={'DEFAULT'}
            onClick={() => {
              navigate('/account/find/email');
            }}
            size={'S'}
            text={'이메일 찾기'}
          />
        </div>
      )}
    </>
  );
};

export default withPageLoadedEffect(pw);
