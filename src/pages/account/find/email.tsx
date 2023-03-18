import React, { useContext, useState } from 'react';
import { DefaultButton } from '../../../components/Button';
import { TextField } from '../../../components/TextFields';
import { DarkModeContext } from '../../../contexts/DarkModeProvider';
import Color from '../../../styles/Color';
import Font from '../../../styles/Font';
import { MediaQueryContext } from '../../../contexts/MediaQueryProvider';
import { Title } from '../../../components/account/Text';
import {
  InputContainer,
  InputWrapper,
} from '../../../components/account/Container';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';

const email = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const [currentStep, setCurrentStep] = useState<0 | 1>(0);
  const [email, setEmail] = useState('example1234@gmail.com');
  const [regDate, setRegDate] = useState(new Date());
  const navigate = useCustomNavigate();
  return (
    <>
      <Title>이메일 찾기</Title>
      {currentStep === 0 && (
        <InputContainer style={{ marginTop: isDesktop ? '36px' : '28px' }}>
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
        </InputContainer>
      )}
      {currentStep === 1 && (
        <>
          <span
            style={{
              ...(isDesktop ? Font.body.bodyLong2 : Font.body.bodyLong1),
              color: isDarkMode ? '' : Color.light.text.secondary,
              marginTop: isDesktop ? '12px' : '8px',
              marginBottom: isDesktop ? '36px' : '24px',
              textAlign: 'center',
              width: 'min(420px, 100%)',
              padding: '0 16px',
              boxSizing: 'border-box',
            }}
          >
            회원님의 이메일은{' '}
            <span
              style={{
                color: Color.light.text.blue,
              }}
            >
              {email}
            </span>
            입니다.
            <br />
            가입일자는 {regDate.getFullYear()}년 {regDate.getMonth() + 1}월{' '}
            {regDate.getDate()}일입니다.
          </span>
          <DefaultButton
            style="PRIMARY"
            type="NONE"
            state="DEFAULT"
            size="M"
            width="min(calc(100% - 32px, 360px))"
            onClick={() => {
              navigate('/account/login');
            }}
          >
            로그인 페이지로 이동하기
          </DefaultButton>
        </>
      )}
    </>
  );
};

export default withPageLoadedEffect(email);
