import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import {
  InputContainer,
  InputWrapper,
} from '../../components/account/Container';
import { DefaultButton, TextButton } from '../../components/Button';
import { CheckBox, CheckBoxField } from '../../components/CheckBox';
import Modal from '../../components/Modal';
import { TextField } from '../../components/TextFields';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import ModalProvider, { ModalContext } from '../../contexts/ModalProvider';
import { ToastContext } from '../../contexts/ToastProvider';
import withPageLoadedEffect from '../../hocs/withPageLoadedEffect';
import { useCustomNavigate } from '../../hooks/useCustomNavigate';
import Color from '../../styles/Color';
import Font from '../../styles/Font';

const DeleteImageButton = styled.button`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`;

const ImageContainer = styled.div<{ src?: string }>`
  position: relative;
  width: 174px;
  height: 174px;
  border-radius: 50%;
  margin-bottom: 64px;
  ${(props) =>
    props.src &&
    css`
      background-image: url(${props.src});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    `}

  @media(max-width: 600px) {
    margin-bottom: 36px;
  }
`;

const InfoContainer = styled.div<{ isDarkMode: boolean }>`
  box-sizing: border-box;
  width: 560px;
  border: 1px solid
    ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};
  border-radius: 4px;
  padding: 80px 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .animated {
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    animation-name: fadeIn;
  }

  ${DeleteImageButton} {
    background: ${(props) =>
      props.isDarkMode ? '' : Color.light.background.gray1};
    border: none;
    svg {
      fill: ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray4)};
    }
  }

  ${ImageContainer} {
    border: 1px solid
      ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};
  }

  @media (max-width: 1024px) {
    max-width: 480px;
    width: 100%;
  }

  @media (max-width: 600px) {
    border: none;
    padding: 52px 16px;
  }
`;

const info = () => {
  const navigate = useCustomNavigate();

  const { isDarkMode } = useContext(DarkModeContext);
  const { isDesktop, isMobile } = useContext(MediaQueryContext);
  const { openModal, closeModal } = useContext(ModalContext);

  const openWithdrawModal = useCallback(() => {
    openModal({
      title: '정말로 탈퇴하시겠습니까?',
      content: [
        '회원탈퇴를 하시면 데이터가 모두 삭제됩니다.',
        '모든 데이터는 복구가 불가능합니다.',
      ],
      buttonType: 2,
      buttonDirection: 'horizontal',
      primaryButtonLabel: '취소하기',
      secondaryButtonLabel: '탈퇴하기',
      secondaryButtonType: true,
      onSecondaryButtonClick: () => {
        openWithdrowDoneModal();
      },
      onPrimaryButtonClick: () => closeModal(),
      reverseButtonOrder: true,
    });
  }, []);

  const openWithdrowDoneModal = useCallback(() => {
    openModal({
      title: '탈퇴가 완료되었습니다.',
      content: [
        '그동안 한국기술마켓을 이용해주셔서 감사합니다.',
        '좋은 하루 보내세요. 감사합니다.',
      ],
      buttonType: 1,
      primaryButtonLabel: '확인하기',
      onPrimaryButtonClick: () => {
        navigate('/');
        closeModal();
      },
    });
  }, []);

  const [pwMode, setPwMode] = useState(false);

  const [pwChangeAvailable, setPwChangeAvailable] = useState(false);

  const [exPw, setExPw] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [pwState, setPwState] = useState<0 | 1 | 2>(0);
  const [pwCheckState, setPwCheckState] = useState<0 | 1 | 2>(0);

  const [nameChangeAvailable, setNameChangeAvailable] = useState(false);

  const [exName, setExName] = useState('홍길동');

  const [name, setName] = useState('홍길동');
  const [nameState, setNameState] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    setNameChangeAvailable(name !== exName && nameState === 2);
  }, [name, nameState]);

  const { alertToast } = useContext(ToastContext);

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
    if (name === '' || name === exName) {
      setNameState(0);
    } else if (checkValidName(name)) {
      setNameState(2);
    } else {
      setNameState(1);
    }
  }, [name]);

  useEffect(() => {
    setPwChangeAvailable(pwState === 2 && pwCheckState === 2);
  }, [pwState, pwCheckState]);

  return (
    <>
      <span
        style={{
          ...(isDesktop ? Font.title.display3 : Font.title.display1),
          color: isDarkMode ? '' : Color.light.text.primary,
          marginBottom: isMobile ? '0' : '36px',
          marginTop: isDesktop ? '0' : '60px',
        }}
      >
        내 정보
      </span>
      <InfoContainer isDarkMode={isDarkMode}>
        <ImageContainer
          src={
            'https://file.namu.moe/file/e4fe8a368870250234624540d39e73ae0fda8aed348b1f90f362dfa430c238ece225284704787e41c92bb22dd1187b40'
          }
        >
          <DeleteImageButton>
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
                d="M14.6347 15.7655C14.9471 16.0779 15.4537 16.0779 15.7661 15.7655C16.0785 15.4531 16.0785 14.9465 15.7661 14.6341L11.5318 10.3998L15.7661 6.16549C16.0785 5.85307 16.0785 5.34654 15.7661 5.03412C15.4537 4.7217 14.9471 4.7217 14.6347 5.03412L10.4004 9.26843L6.16607 5.03412C5.85365 4.7217 5.34712 4.7217 5.0347 5.03412C4.72228 5.34654 4.72228 5.85307 5.0347 6.16549L9.26901 10.3998L5.0347 14.6341C4.72228 14.9465 4.72228 15.4531 5.0347 15.7655C5.34712 16.0779 5.85365 16.0779 6.16607 15.7655L10.4004 11.5312L14.6347 15.7655Z"
                fill="#5D6169"
              />
            </svg>
          </DeleteImageButton>
        </ImageContainer>
        <InputContainer width={'100%'} padding="0" maxWidth="100%">
          <InputWrapper isDarkMode={isDarkMode}>
            <span style={{ ...Font.body.body1 }}>이메일</span>
            <TextField
              placeholder="rkd2274@pusan.ac.kr"
              size="L"
              state={'DISABLED'}
              width={'100%'}
            />
          </InputWrapper>
          {pwMode && (
            <>
              <InputWrapper isDarkMode={isDarkMode} className="animated fadeIn">
                <span style={{ ...Font.body.body1 }}>현재 비밀번호</span>
                <TextField
                  isPassword={true}
                  size="L"
                  state={'DEFAULT'}
                  width={'100%'}
                  value={exPw}
                  setValue={setExPw}
                />
              </InputWrapper>
              <InputWrapper isDarkMode={isDarkMode} className="animated fadeIn">
                <span style={{ ...Font.body.body1 }}>새 비밀번호</span>
                <TextField
                  isPassword={true}
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
              <InputWrapper isDarkMode={isDarkMode} className="animated fadeIn">
                <span style={{ ...Font.body.body1 }}>새 비밀번호 확인</span>
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
                    isPassword={true}
                    size="L"
                    state={
                      pwCheckState === 0
                        ? 'DEFAULT'
                        : pwCheckState === 1
                        ? 'ERROR'
                        : 'SUCCESS'
                    }
                    width={'calc(100% - 200px)'}
                    value={pwCheck}
                    setValue={setPwCheck}
                  />
                  <DefaultButton
                    style="PRIMARY"
                    type="NONE"
                    state={pwChangeAvailable ? 'DEFAULT' : 'DISABLED'}
                    size="M"
                    width="92px"
                    height="52px"
                    onClick={() =>
                      alertToast(2, '비밀번호 정보변경이 완료되었습니다.')
                    }
                  >
                    변경하기
                  </DefaultButton>
                  <DefaultButton
                    style="SECONDARY"
                    type="NONE"
                    state="DEFAULT"
                    size="M"
                    width="92px"
                    height="52px"
                    onClick={() => {
                      setPw('');
                      setPwCheck('');
                      setPwMode(false);
                    }}
                  >
                    취소하기
                  </DefaultButton>
                </div>
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
          {!pwMode && (
            <InputWrapper isDarkMode={isDarkMode}>
              <span style={{ ...Font.body.body1 }}>현재 비밀번호</span>
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
                  onClick={() => setPwMode(true)}
                >
                  변경하기
                </DefaultButton>
              </div>
            </InputWrapper>
          )}
          <InputWrapper isDarkMode={isDarkMode}>
            <span style={{ ...Font.body.body1 }}>이름</span>
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
                state={
                  nameState === 2
                    ? 'SUCCESS'
                    : nameState === 1
                    ? 'ERROR'
                    : 'DEFAULT'
                }
                width={'calc(100% - 100px)'}
                value={name}
                setValue={setName}
              />
              <DefaultButton
                style="PRIMARY"
                type="NONE"
                state={nameChangeAvailable ? 'DEFAULT' : 'DISABLED'}
                size="M"
                width="92px"
                height="52px"
                onClick={() => {
                  alertToast(2, '이름이 변경되었습니다.');
                }}
              >
                변경하기
              </DefaultButton>
            </div>
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
          <InputWrapper isDarkMode={isDarkMode}>
            <span style={{ ...Font.body.body1 }}>휴대전화</span>
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
                placeholder={'010-1234-5678'}
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
                변경하기
              </DefaultButton>
            </div>
          </InputWrapper>
        </InputContainer>
        <CheckBoxField
          size={'S'}
          style={
            {
              marginTop: '20px',
              //padding: isDesktop ? '' : '0 16px',
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
                //setEmailConsent(true);
              } else {
                //setEmailConsent(false);
              }
            }}
          />
          <CheckBox
            name={'newsletter_consent'}
            label={'[선택] 한국기술마켓의 뉴스레터 발송에 동의합니까?'}
            value={'newsletter_consent'}
            size={'S'}
            onChange={(e) => {
              if (e.target.checked) {
                //setNewsLetterConsent(true);
              } else {
                //setNewsLetterConsent(false);
              }
            }}
          />
        </CheckBoxField>
      </InfoContainer>
      <div
        style={{
          width: isDesktop ? '560px' : 'min(480px, 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          marginTop: '24px',
          marginBottom: '60px',
          boxSizing: 'border-box',
          padding: isMobile ? '0 16px' : '',
        }}
      >
        <TextButton
          state="DEFAULT"
          style="SECONDARY"
          type="UNDERLINE"
          text="회원탈퇴"
          size="S"
          onClick={() => openWithdrawModal()}
        />
      </div>
    </>
  );
};

export default withPageLoadedEffect(info);
