import * as React from 'react';
import { useContext, useMemo } from 'react';
import Size from '../types/Size';
import styled from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import Color from '../styles/Color';

type AvatarProps = {
  size: Size;
  src?: string;
};

// TODO DarkMode 대응
const Container = styled.div<{ size: Size; isDarkMode: boolean; src?: string }>`
  ${({ size }) => {
    switch (size) {
      case 'XL':
        return 'width: 62px; height: 62px; border-radius: 62px;';
      case 'L':
        return 'width: 48px; height: 48px; border-radius: 48px;';
      case 'M':
        return 'width: 34px; height: 34px; border-radius: 34px;';
      case 'M2':
        return 'width: 28px; height: 28px; border-radius: 28px;';
      case 'S':
        return 'width: 22px; height: 22px; border-radius: 22px;';
    }
  }}

  ${({ src, isDarkMode }) => {
    if (src) {
      console.log(src);
      return `
                background-image: url(${src});
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
            `;
    } else {
      return `${
        isDarkMode ? Color.dark.background.gray1 : Color.light.background.gray1
      };`;
    }
  }}

    border: 1px solid
        ${({ isDarkMode }) =>
    isDarkMode ? Color.dark.stroke.gray1 : Color.light.stroke.gray1};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = ({ size, src }: AvatarProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const iconMap = useMemo(
    () => ({
      XL: `
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.49994 8C6.49994 3.85786 9.85781 0.5 13.9999 0.5C18.1421 0.5 21.4999 3.85786 21.4999 8C21.4999 12.1421 18.1421 15.5 13.9999 15.5C9.85781 15.5 6.49994 12.1421 6.49994 8Z" fill="#A3A7AE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.252018 31.5089C0.380918 24.0259 6.48658 18 13.9999 18C21.5135 18 27.6193 24.0262 27.7479 31.5094C27.7564 32.0057 27.4705 32.46 27.0194 32.667C23.0545 34.4863 18.6441 35.5 14.0005 35.5C9.35637 35.5 4.94566 34.4861 0.980477 32.6665C0.52936 32.4595 0.243469 32.0052 0.252018 31.5089Z" fill="#A3A7AE"/>
</svg>
        `,
      L: `
            <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.62498 6.5C5.62498 2.97918 8.47917 0.125 12 0.125C15.5208 0.125 18.375 2.97918 18.375 6.5C18.375 10.0208 15.5208 12.875 12 12.875C8.47917 12.875 5.62498 10.0208 5.62498 6.5Z" fill="#A3A7AE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.314245 26.4825C0.423811 20.1221 5.61363 15 12 15C18.3865 15 23.5764 20.1223 23.6857 26.483C23.693 26.9048 23.45 27.291 23.0665 27.467C19.6963 29.0134 15.9476 29.875 12.0004 29.875C8.05295 29.875 4.30385 29.0132 0.933436 27.4665C0.549987 27.2906 0.306979 26.9044 0.314245 26.4825Z" fill="#A3A7AE"/>
</svg>
        `,
      M: `
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.49996 5C4.49996 2.51472 6.51468 0.5 8.99996 0.5C11.4852 0.5 13.5 2.51472 13.5 5C13.5 7.48528 11.4852 9.5 8.99996 9.5C6.51468 9.5 4.49996 7.48528 4.49996 5Z" fill="#A3A7AE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.751211 19.1053C0.828551 14.6156 4.49195 11 8.99996 11C13.5081 11 17.1716 14.6157 17.2487 19.1056C17.2538 19.4034 17.0823 19.676 16.8116 19.8002C14.4327 20.8918 11.7865 21.5 9.00028 21.5C6.21382 21.5 3.5674 20.8917 1.18829 19.7999C0.917616 19.6757 0.746081 19.4031 0.751211 19.1053Z" fill="#A3A7AE"/>
</svg>
        `,
      S: `
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.323529" y="0.323529" width="21.3529" height="21.3529" rx="10.6765" fill="#F5F6F7"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 7C7.99998 5.34315 9.34312 4 11 4C12.6568 4 14 5.34315 14 7C14 8.65685 12.6568 10 11 10C9.34312 10 7.99998 8.65685 7.99998 7Z" fill="#A3A7AE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.50081 16.4036C5.55237 13.4104 7.99463 11 11 11C14.0054 11 16.4477 13.4105 16.4992 16.4038C16.5026 16.6023 16.3882 16.784 16.2077 16.8668C14.6218 17.5945 12.8577 18 11.0002 18C9.14255 18 7.37827 17.5945 5.79219 16.8666C5.61174 16.7838 5.49739 16.6021 5.50081 16.4036Z" fill="#A3A7AE"/>
<rect x="0.323529" y="0.323529" width="21.3529" height="21.3529" rx="10.6765" stroke="#EEEEEE" stroke-width="0.647059"/>
</svg>
        `,
      M2: `<svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.323529" y="0.323529" width="21.3529" height="21.3529" rx="10.6765" fill="#F5F6F7"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 7C7.99998 5.34315 9.34312 4 11 4C12.6568 4 14 5.34315 14 7C14 8.65685 12.6568 10 11 10C9.34312 10 7.99998 8.65685 7.99998 7Z" fill="#A3A7AE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.50081 16.4036C5.55237 13.4104 7.99463 11 11 11C14.0054 11 16.4477 13.4105 16.4992 16.4038C16.5026 16.6023 16.3882 16.784 16.2077 16.8668C14.6218 17.5945 12.8577 18 11.0002 18C9.14255 18 7.37827 17.5945 5.79219 16.8666C5.61174 16.7838 5.49739 16.6021 5.50081 16.4036Z" fill="#A3A7AE"/>
<rect x="0.323529" y="0.323529" width="21.3529" height="21.3529" rx="10.6765" stroke="#EEEEEE" stroke-width="0.647059"/>
</svg>`,
    }),
    []
  );

  return (
    <Container
      size={size}
      isDarkMode={isDarkMode}
      src={src}
      dangerouslySetInnerHTML={{ __html: src ? '' : iconMap[size] }}
    ></Container>
  );
};

export default Avatar;
