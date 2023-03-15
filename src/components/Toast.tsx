import React, { useContext } from 'react';
import styled from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { SideNavContext } from '../contexts/SideNavProvider';
import { ToastContext } from '../contexts/ToastProvider';
import Color from '../styles/Color';
import Font from '../styles/Font';

const ToastContainer = styled.div<{
  isDarkMode: boolean;
  isSideNavOpened: boolean;
  isSideNavDisabled: boolean;
  visible: boolean;
}>`
  z-index: 10000000;
  position: fixed;
  bottom: 40px;
  left: ${(props) =>
    props.isSideNavDisabled
      ? '50%'
      : props.isSideNavOpened
      ? 'calc(50% + 120px)'
      : 'calc(50% + 38px)'};
  transform: translateX(-50%);
  transition: all 0.2s;

  opacity: ${(props) => (props.visible ? '1' : '0')};

  height: 56px;
  border-radius: 4px;

  border: 1px solid
    ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};
  background: ${(props) =>
    props.isDarkMode ? '' : Color.light.background.white};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;

  @media (max-width: 1024px) {
    left: 50%;
  }
`;

export const Toast = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isOpened, disabled } = useContext(SideNavContext);

  const { state, visible, text } = useContext(ToastContext);
  return (
    <ToastContainer
      isDarkMode={isDarkMode}
      isSideNavOpened={isOpened}
      isSideNavDisabled={disabled}
      visible={visible}
    >
      {state === 0 && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.7749 16.2782C20.4158 17.3891 19.6113 18.7778 18.3313 18.7778H1.66855C0.386017 18.7778 -0.414747 17.387 0.224906 16.2782L8.55636 1.83281C9.19758 0.721389 10.8036 0.723403 11.4437 1.83281L19.7749 16.2782ZM10 13.2917C9.11789 13.2917 8.40279 14.0068 8.40279 14.8889C8.40279 15.771 9.11789 16.4861 10 16.4861C10.8821 16.4861 11.5972 15.771 11.5972 14.8889C11.5972 14.0068 10.8821 13.2917 10 13.2917ZM8.48358 7.55049L8.74115 12.2727C8.7532 12.4937 8.93591 12.6667 9.15719 12.6667H10.8428C11.0641 12.6667 11.2468 12.4937 11.2589 12.2727L11.5164 7.55049C11.5295 7.31181 11.3394 7.11111 11.1004 7.11111H8.89959C8.66056 7.11111 8.47056 7.31181 8.48358 7.55049Z"
            fill="#EAC645"
          />
        </svg>
      )}
      {state === 1 && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 10C20 15.5241 15.5225 20 10 20C4.47754 20 0 15.5241 0 10C0 4.47915 4.47754 0 10 0C15.5225 0 20 4.47915 20 10ZM10 12.0161C8.97561 12.0161 8.14516 12.8466 8.14516 13.871C8.14516 14.8954 8.97561 15.7258 10 15.7258C11.0244 15.7258 11.8548 14.8954 11.8548 13.871C11.8548 12.8466 11.0244 12.0161 10 12.0161ZM8.23899 5.34895L8.5381 10.8328C8.5521 11.0894 8.76427 11.2903 9.02125 11.2903H10.9788C11.2357 11.2903 11.4479 11.0894 11.4619 10.8328L11.761 5.34895C11.7761 5.07177 11.5554 4.83871 11.2779 4.83871H8.7221C8.44452 4.83871 8.22387 5.07177 8.23899 5.34895Z"
            fill="#D65745"
          />
        </svg>
      )}

      {state === 2 && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 6.23004e-10 15.5228 6.23004e-10 10C6.23004e-10 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
            fill="#F7F7F7"
          />
          <path
            d="M10 0C8.02219 0 6.08879 0.586489 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433286 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9949 7.3494 18.9397 4.80881 17.0655 2.93455C15.1912 1.06028 12.6506 0.00508266 10 0ZM14.7596 8.25L9.125 13.6346C8.97933 13.7716 8.78653 13.8474 8.58654 13.8461C8.48879 13.8475 8.39173 13.8296 8.30096 13.7933C8.21019 13.757 8.12751 13.703 8.0577 13.6346L5.24039 10.9423C5.16225 10.8741 5.0987 10.7909 5.05356 10.6975C5.00842 10.6041 4.98262 10.5026 4.97772 10.399C4.97282 10.2954 4.98892 10.1919 5.02504 10.0947C5.06116 9.99751 5.11656 9.90861 5.18792 9.83336C5.25928 9.75812 5.34511 9.69807 5.44027 9.65684C5.53542 9.61561 5.63793 9.59405 5.74163 9.59345C5.84533 9.59285 5.94808 9.61322 6.0437 9.65334C6.13933 9.69346 6.22585 9.7525 6.29808 9.82692L8.58654 12.0096L13.7019 7.13461C13.8515 7.00412 14.0457 6.9365 14.244 6.94588C14.4423 6.95526 14.6292 7.04092 14.7658 7.18495C14.9024 7.32898 14.978 7.52023 14.9768 7.71871C14.9757 7.9172 14.8979 8.10756 14.7596 8.25Z"
            fill="#0EB20B"
          />
        </svg>
      )}
      <span
        style={{
          ...Font.body.body2,
          color: isDarkMode ? '' : Color.light.text.primary,
        }}
      >
        {text}
      </span>
    </ToastContainer>
  );
};
