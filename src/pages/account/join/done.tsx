import { Desktop, Mobile, Tablet } from '../../../components/common/Responsive';
import React, { useContext, useEffect, useState } from 'react';
import Font from '../../../styles/Font';
import Color from '../../../styles/Color';
import { DarkModeContext } from '../../../contexts/DarkModeProvider';
import { navigate } from 'gatsby';
import { DefaultButton } from '../../../components/Button';
import { MediaQueryContext } from '../../../contexts/MediaQueryProvider';

const done = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const [joinedUser, setJoinedUser] = useState('');
  const [joinedUserType, setJoinedUserType] = useState<
    'STANDARD' | 'ENTERPRISE'
  >();
  useEffect(() => {
    try {
      const joinedUser = localStorage.getItem('JoinedUser');
      const joinedUserType = localStorage.getItem('JoinedUserType');
      if (joinedUser && joinedUserType) {
        setJoinedUser(joinedUser);
        setJoinedUserType(joinedUserType as 'STANDARD' | 'ENTERPRISE');
      } else {
        //navigate('/');
      }
    } catch (e) {
      console.log('error has occured: ' + e);
      navigate('/');
    }
    return () => {
      localStorage.removeItem('JoinedUser');
    };
  }, []);
  return (
    <>
      <svg
        width="144"
        height="144"
        viewBox="0 0 144 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          marginTop: isDesktop ? '100px' : '60px',
          marginBottom: isDesktop ? '32px' : '28px',
        }}
      >
        <g clip-path="url(#clip0_43_8906)">
          <rect width="144" height="144" rx="72" fill="white" />
          <rect
            x="108"
            y="115.2"
            width="2.06397"
            height="33.0235"
            rx="1.03198"
            transform="rotate(-35.5596 108 115.2)"
            fill="#222222"
          />
          <circle
            cx="107.527"
            cy="44.3796"
            r="4.6919"
            transform="rotate(-35.5596 107.527 44.3796)"
            stroke="#1852FD"
            stroke-width="3"
          />
          <circle
            cx="65.183"
            cy="54.3533"
            r="4.6919"
            transform="rotate(-35.5596 65.183 54.3533)"
            stroke="#1852FD"
            stroke-width="3"
          />
          <circle
            cx="43.8441"
            cy="93.7097"
            r="4.6919"
            transform="rotate(-35.5596 43.8441 93.7097)"
            stroke="#1852FD"
            stroke-width="3"
          />
          <circle
            cx="67.83"
            cy="74.0269"
            r="4.12793"
            transform="rotate(-35.5596 67.83 74.0269)"
            fill="#1852FD"
          />
          <circle
            cx="64.4511"
            cy="23.1626"
            r="4.12793"
            transform="rotate(-35.5596 64.4511 23.1626)"
            fill="#1852FD"
          />
          <circle
            cx="28.9555"
            cy="58.686"
            r="4.12793"
            transform="rotate(-35.5596 28.9555 58.686)"
            fill="#1852FD"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M39.3815 74.7153C40.1332 74.3082 41.0727 74.5877 41.4798 75.3395C41.6425 75.64 42.0078 76.0016 42.5125 76.0987C42.9617 76.1851 43.907 76.1335 45.4062 74.8415C46.4164 73.9709 47.4524 73.4282 48.5118 73.2803C49.6039 73.1279 50.5635 73.4178 51.3346 73.9296C52.7716 74.8832 53.5345 76.5753 53.8468 77.6958C54.0763 78.5193 53.5948 79.373 52.7713 79.6025C51.9477 79.8321 51.094 79.3505 50.8645 78.527C50.6363 77.7081 50.1566 76.8635 49.6227 76.5092C49.4084 76.3669 49.2005 76.3101 48.9397 76.3465C48.6461 76.3875 48.1439 76.5691 47.4272 77.1868C45.4725 78.8713 43.5988 79.4605 41.9275 79.1389C40.3117 78.8279 39.2548 77.7325 38.7573 76.8136C38.3502 76.0618 38.6297 75.1224 39.3815 74.7153Z"
            fill="#222222"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M84.4718 50.8944C83.8898 51.5207 83.9257 52.5002 84.5519 53.0821C84.8023 53.3148 85.0612 53.7588 85.0291 54.2719C85.0006 54.7284 84.7144 55.6308 83.0889 56.7596C81.9935 57.5203 81.2091 58.3879 80.8013 59.3767C80.3809 60.3962 80.4219 61.3978 80.7247 62.2723C81.2891 63.9019 82.737 65.0634 83.7439 65.6457C84.484 66.0737 85.4309 65.8207 85.8589 65.0806C86.2869 64.3406 86.0339 63.3936 85.2938 62.9656C84.558 62.5401 83.8599 61.8646 83.6502 61.2591C83.566 61.016 83.563 60.8005 83.6634 60.5572C83.7764 60.2831 84.0777 59.8422 84.8548 59.3025C86.9743 57.8306 88.0129 56.1636 88.119 54.4649C88.2216 52.8227 87.4249 51.5256 86.6595 50.8143C86.0333 50.2323 85.0538 50.2682 84.4718 50.8944Z"
            fill="#222222"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M86.5632 26.1578C85.7635 26.4602 85.3604 27.3536 85.6627 28.1532C85.7836 28.4729 85.8181 28.9857 85.5614 29.4311C85.333 29.8274 84.6755 30.5085 82.7177 30.7974C81.3984 30.992 80.3101 31.4206 79.5053 32.1251C78.6756 32.8515 78.2672 33.767 78.1499 34.685C77.9312 36.3956 78.7121 38.0796 79.3553 39.0487C79.828 39.761 80.7887 39.9552 81.501 39.4825C82.2133 39.0097 82.4075 38.0491 81.9348 37.3367C81.4647 36.6285 81.1396 35.7131 81.2208 35.0775C81.2535 34.8224 81.3465 34.628 81.5446 34.4546C81.7676 34.2593 82.2335 33.9982 83.1695 33.8602C85.7223 33.4836 87.3936 32.4518 88.2436 30.9772C89.0654 29.5517 88.9281 28.0357 88.5586 27.0583C88.2562 26.2587 87.3629 25.8555 86.5632 26.1578Z"
            fill="#222222"
          />
          <path
            d="M115.659 118.842C116.134 122.064 112.764 124.474 109.868 122.981L66.9432 100.851C64.2839 99.4795 64.016 95.7811 66.4499 94.0412L102.326 68.3945C104.76 66.6545 108.173 68.1048 108.61 71.0647L115.659 118.842Z"
            fill="#1852FD"
          />
          <mask
            id="mask0_43_8906"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="64"
            y="67"
            width="52"
            height="57"
          >
            <path
              d="M115.659 118.842C116.134 122.064 112.764 124.474 109.868 122.981L66.9432 100.851C64.2839 99.4795 64.016 95.7811 66.4499 94.0412L102.326 68.3945C104.76 66.6545 108.173 68.1048 108.61 71.0647L115.659 118.842Z"
              fill="#1852FD"
            />
          </mask>
          <g mask="url(#mask0_43_8906)">
            <circle
              cx="97.591"
              cy="99.6879"
              r="3.09595"
              transform="rotate(-35.5596 97.591 99.6879)"
              fill="white"
            />
            <circle
              cx="110.906"
              cy="95.2439"
              r="4.6919"
              transform="rotate(-35.5596 110.906 95.2439)"
              stroke="white"
              stroke-width="3"
            />
            <circle
              cx="97.591"
              cy="99.6879"
              r="3.09595"
              transform="rotate(-35.5596 97.591 99.6879)"
              fill="white"
            />
            <circle
              cx="99.0375"
              cy="117.682"
              r="4.12793"
              transform="rotate(-35.5596 99.0375 117.682)"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M76.9606 106.839C77.7123 106.432 78.6518 106.712 79.0589 107.463C79.2216 107.764 79.5869 108.126 80.0916 108.223C80.5408 108.309 81.4861 108.257 82.9853 106.966C83.9955 106.095 85.0315 105.552 86.0909 105.404C87.183 105.252 88.1426 105.542 88.9137 106.054C90.3507 107.007 91.1136 108.699 91.4259 109.82C91.6554 110.643 91.1739 111.497 90.3504 111.727C89.5268 111.956 88.6731 111.475 88.4436 110.651C88.2154 109.832 87.7357 108.987 87.2018 108.633C86.9875 108.491 86.7796 108.434 86.5188 108.471C86.2253 108.512 85.7231 108.693 85.0063 109.311C83.0516 110.995 81.1779 111.585 79.5066 111.263C77.8908 110.952 76.8339 109.856 76.3364 108.938C75.9293 108.186 76.2088 107.246 76.9606 106.839Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M94.6213 80.0182C93.8216 80.3206 93.4185 81.2139 93.7208 82.0136C93.8417 82.3333 93.8762 82.8461 93.6195 83.2914C93.3911 83.6877 92.7336 84.3689 90.7758 84.6577C89.4565 84.8523 88.3682 85.281 87.5634 85.9855C86.7337 86.7119 86.3253 87.6273 86.208 88.5453C85.9893 90.256 86.7702 91.9399 87.4134 92.9091C87.8861 93.6214 88.8468 93.8156 89.5591 93.3428C90.2714 92.8701 90.4657 91.9094 89.9929 91.1971C89.5228 90.4888 89.1977 89.5735 89.2789 88.9379C89.3116 88.6827 89.4046 88.4883 89.6027 88.3149C89.8257 88.1197 90.2916 87.8586 91.2276 87.7205C93.7804 87.3439 95.4517 86.3121 96.3017 84.8376C97.1235 83.4121 96.9862 81.8961 96.6167 80.9187C96.3143 80.119 95.421 79.7159 94.6213 80.0182Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M114.45 104.68C113.6 104.776 112.989 105.542 113.085 106.392C113.124 106.732 113.031 107.237 112.672 107.605C112.353 107.933 111.548 108.431 109.579 108.228C108.253 108.091 107.092 108.238 106.138 108.723C105.155 109.222 104.534 110.008 104.194 110.869C103.56 112.473 103.901 114.298 104.286 115.395C104.568 116.202 105.451 116.627 106.258 116.345C107.065 116.062 107.49 115.179 107.208 114.372C106.927 113.57 106.837 112.603 107.073 112.007C107.167 111.768 107.306 111.602 107.54 111.483C107.805 111.349 108.32 111.211 109.262 111.308C111.828 111.572 113.703 110.985 114.89 109.765C116.038 108.586 116.279 107.083 116.162 106.045C116.066 105.196 115.3 104.585 114.45 104.68Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M116.382 77.5089C115.54 77.3605 114.737 77.9227 114.589 78.7647C114.529 79.1013 114.297 79.5598 113.849 79.8116C113.45 80.0357 112.537 80.2857 110.706 79.5343C109.473 79.028 108.318 78.8408 107.266 79.0356C106.182 79.2365 105.364 79.8151 104.794 80.5444C103.732 81.9036 103.544 83.7502 103.602 84.9119C103.645 85.7657 104.372 86.4233 105.226 86.3805C106.079 86.3378 106.737 85.611 106.694 84.7571C106.652 83.9081 106.839 82.9551 107.234 82.4501C107.392 82.2473 107.572 82.1277 107.83 82.0798C108.122 82.0258 108.656 82.0392 109.531 82.3984C111.918 83.3782 113.882 83.3444 115.366 82.5106C116.8 81.7046 117.456 80.331 117.638 79.302C117.786 78.46 117.224 77.6572 116.382 77.5089Z"
              fill="white"
            />
          </g>
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="143"
          height="143"
          rx="71.5"
          stroke="#EEEEEE"
        />
        <defs>
          <clipPath id="clip0_43_8906">
            <rect width="144" height="144" rx="72" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span
        style={{
          ...(isDesktop ? Font.title.display2 : Font.title.display1),
          color: isDarkMode ? '' : Color.light.text.primary,
          marginBottom: isDesktop ? '12px' : '8px',
        }}
      >
        안녕하세요!{' '}
        <span
          style={{
            color: Color.light.text.blue,
          }}
        >
          {joinedUser}
        </span>
        님
      </span>
      <span
        style={{
          ...(isDesktop ? Font.body.bodyLong2 : Font.body.bodyLong1),
          color: isDarkMode ? '' : Color.light.text.secondary,
          marginBottom: isDesktop ? '36px' : '24px',
          textAlign: 'center',
        }}
      >
        {joinedUserType === 'STANDARD' && (
          <>한국기술마켓에 오신 것을 환영합니다.</>
        )}
        {joinedUserType === 'ENTERPRISE' && (
          <>
            회원가입 승인을 대기중입니다.
            <br />
            승인이 완료되면 안내 메일이 발송됩니다.
          </>
        )}
      </span>
      <DefaultButton
        style="PRIMARY"
        type="NONE"
        state="DEFAULT"
        size="M"
        width="min(calc(100% - 32px), 360px)"
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로 이동하기
      </DefaultButton>
    </>
  );
};

export default done;
