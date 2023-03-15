import React, { useContext, useEffect, useRef, useState } from 'react';
import { navigate } from 'gatsby';
import { DefaultButton, TextButton } from '../../components/Button';
import { TextField } from '../../components/TextFields';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import Font from '../../styles/Font';
import Color from '../../styles/Color';
import Modal from '../../components/Modal';
import { Container } from '../../components/account/Container';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import { Title } from '../../components/account/Text';

const login = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPW] = useState('');

  useEffect(() => {
    setButtonDisabled(email === '' || pw === '');
  }, [email, pw]);

  // 승인 대기중인 기관 아이디의 경우
  const [pendingUserModalOpened, setPendingUserModalOpened] = useState(false);

  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <>
      <Modal
        visible={pendingUserModalOpened}
        title={
          <>
            안녕하세요{' '}
            <span style={{ color: Color.light.text.blue }}>닉네임</span>님!
          </>
        }
        content={[
          '회원가입 승인을 대기중입니다.',
          '승인이 완료되면 안내 메일이 발송됩니다.',
        ]}
        buttonType={1}
        primaryButtonLabel={'홈으로 이동하기'}
        onPrimaryButtonClick={() => {
          navigate('/');
        }}
      />
      <Container>
        <Title style={{ marginBottom: '40px' }}>환영합니다</Title>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px',
            width: '100%',
          }}
        >
          <DefaultButton
            style={'OUTLINE'}
            state={'DEFAULT'}
            type={'NONE'}
            size={'L'}
            width={'100%'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1711 8.36824H17.4998V8.33366H9.99984V11.667H14.7094C14.0223 13.6074 12.1761 15.0003 9.99984 15.0003C7.23859 15.0003 4.99984 12.7616 4.99984 10.0003C4.99984 7.23908 7.23859 5.00033 9.99984 5.00033C11.2744 5.00033 12.434 5.48116 13.3169 6.26658L15.674 3.90949C14.1857 2.52241 12.1948 1.66699 9.99984 1.66699C5.39775 1.66699 1.6665 5.39824 1.6665 10.0003C1.6665 14.6024 5.39775 18.3337 9.99984 18.3337C14.6019 18.3337 18.3332 14.6024 18.3332 10.0003C18.3332 9.44158 18.2757 8.89616 18.1711 8.36824Z"
                fill="#FFC107"
              />
              <path
                d="M2.62744 6.12158L5.36536 8.12949C6.10619 6.29533 7.90036 5.00033 9.99994 5.00033C11.2745 5.00033 12.4341 5.48116 13.317 6.26658L15.6741 3.90949C14.1858 2.52241 12.1949 1.66699 9.99994 1.66699C6.79911 1.66699 4.02327 3.47408 2.62744 6.12158Z"
                fill="#FF3D00"
              />
              <path
                d="M9.9998 18.3336C12.1523 18.3336 14.1081 17.5099 15.5869 16.1703L13.0077 13.9878C12.1429 14.6454 11.0862 15.0011 9.9998 15.0003C7.8323 15.0003 5.99189 13.6182 5.29855 11.6895L2.58105 13.7832C3.96022 16.482 6.76105 18.3336 9.9998 18.3336Z"
                fill="#4CAF50"
              />
              <path
                d="M18.1713 8.36759H17.5V8.33301H10V11.6663H14.7096C14.3809 12.5898 13.7889 13.3968 13.0067 13.9876L13.0079 13.9868L15.5871 16.1693C15.4046 16.3351 18.3333 14.1663 18.3333 9.99967C18.3333 9.44092 18.2758 8.89551 18.1713 8.36759Z"
                fill="#1976D2"
              />
            </svg>
            구글아이디로 이용하기
          </DefaultButton>
          <DefaultButton
            style={'OUTLINE'}
            state={'DEFAULT'}
            type={'NONE'}
            size={'L'}
            width={'100%'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_43_7705)">
                <path
                  d="M10 3C5.584 3 2 5.69641 2 9.01741C2 11.1806 3.52 13.0849 5.792 14.136C5.632 14.7301 5.184 16.284 5.104 16.6192C4.992 17.0305 5.264 17.0305 5.44 16.9238C5.584 16.8324 7.632 15.5071 8.512 14.9282C8.992 14.9891 9.488 15.0348 10 15.0348C14.416 15.0348 18 12.3384 18 9.01741C18 5.69641 14.416 3 10 3Z"
                  fill="#3B1E1E"
                />
              </g>
              <defs>
                <clipPath id="clip0_43_7705">
                  <rect
                    width="16"
                    height="14"
                    fill="white"
                    transform="translate(2 3)"
                  />
                </clipPath>
              </defs>
            </svg>
            카카오톡으로 이용하기
          </DefaultButton>
          <DefaultButton
            style={'OUTLINE'}
            state={'DEFAULT'}
            type={'NONE'}
            size={'L'}
            width={'100%'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_43_7711)">
                <path
                  d="M14.7047 9.45544C14.6967 8.14395 15.3156 7.15553 16.5654 6.42671C15.8664 5.46521 14.8089 4.93639 13.4149 4.83447C12.095 4.73447 10.6509 5.5729 10.1222 5.5729C9.56338 5.5729 8.28555 4.86908 7.28011 4.86908C5.20515 4.89985 3 6.45748 3 9.62659C3 10.5631 3.17825 11.5304 3.53476 12.5265C4.01144 13.838 5.7299 17.0513 7.52246 16.9994C8.4598 16.9782 9.12275 16.3609 10.3425 16.3609C11.5262 16.3609 12.1391 16.9994 13.1845 16.9994C14.9931 16.9744 16.5474 14.0533 17 12.738C14.5745 11.64 14.7047 9.52275 14.7047 9.45544ZM12.5997 3.59028C13.6152 2.43264 13.523 1.37883 13.493 1C12.5957 1.05 11.5582 1.58652 10.9674 2.24611C10.3165 2.95377 9.93391 3.82874 10.016 4.81524C10.9854 4.88639 11.8707 4.40756 12.5997 3.59028Z"
                  fill="#555555"
                />
              </g>
              <defs>
                <clipPath id="clip0_43_7711">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            애플아이디로 이용하기
          </DefaultButton>
        </div>

        <hr
          style={{
            border: 'none',
            width: '100%',
            height: '1px',
            background: isDarkMode ? '' : Color.light.stroke.gray1,
            marginBottom: '20px',
          }}
        />
        <span
          style={{
            ...Font.body.body1,
            color: isDarkMode ? '' : Color.light.text.secondary,
            width: '100%',
            textAlign: 'start',
            marginBottom: '8px',
          }}
        >
          아이디
        </span>
        <TextField
          width={'100%'}
          state={'DEFAULT'}
          size={'L'}
          placeholder={'아이디를 입력해주세요.'}
          value={email}
          setValue={setEmail}
        />
        <span
          style={{
            ...Font.body.body1,
            color: isDarkMode ? '' : Color.light.text.secondary,
            width: '100%',
            textAlign: 'start',
            marginBottom: '8px',
            marginTop: '24px',
          }}
        >
          비밀번호
        </span>
        <TextField
          width={'min(100%, 420px)'}
          state={'DEFAULT'}
          size={'L'}
          placeholder={'비밀번호를 입력해주세요.'}
          isPassword={true}
          value={pw}
          setValue={setPW}
        />
        {isIncorrect && (
          <span
            style={{
              ...Font.body.body1,
              color: isDarkMode ? '' : Color.light.text.red,
              width: '420px',
              textAlign: 'start',
              marginTop: '12px',
            }}
          >
            아이디 또는 비밀번호를 확인해주세요.
          </span>
        )}
        <div
          style={{
            marginBottom: '36px',
          }}
        ></div>
        <DefaultButton
          style={'PRIMARY'}
          state={buttonDisabled ? 'DISABLED' : 'DEFAULT'}
          type={'NONE'}
          size={'L'}
          width={'100%'}
        >
          로그인
        </DefaultButton>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '16px',
            width: '100%',
          }}
        >
          <TextButton
            text={'한국기술마켓은 처음인가요?'}
            size={'M'}
            style={'PRIMARY'}
            type={'UNDERLINE'}
            state={'DEFAULT'}
            onClick={() => {
              navigate('/account/choose');
            }}
          />
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            <TextButton
              text={'아이디 찾기'}
              size={'M'}
              style={'SECONDARY'}
              type={'UNDERLINE'}
              state={'DEFAULT'}
              onClick={() => {
                navigate('/account/find/email');
              }}
            />
            <TextButton
              text={'비밀번호 찾기'}
              size={'M'}
              style={'SECONDARY'}
              type={'UNDERLINE'}
              state={'DEFAULT'}
              onClick={() => {
                navigate('/account/find/pw');
              }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default login;
