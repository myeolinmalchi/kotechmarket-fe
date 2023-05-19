import React, { useContext, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useStyleContext } from '../contexts/AppContextProvider';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import Color from '../styles/Color';
import Font from '../styles/Font';
import { ColorType } from '../types/Style';

type Size = 'L' | 'S';
type State = 'DEFAULT' | 'SUCCESS' | 'ERROR' | 'DISABLED';
const SearchContainer = styled.div<{
  Color: ColorType;
  state: State;
  size: Size;
}>`
  height: ${(props) => (props.size === 'L' ? '52px' : '36px')};
  border: none;
  border-radius: 2px;

  transition: background 0.2s, border 0.2s;
  background: ${(props) => props.Color.background.gray1};
  input {
    color: ${(props) => props.Color.text.primary};
    background: none;
  }

  input::placeholder {
    color: ${(props) => props.Color.text.third};
  }
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  gap: 0;
`;

const Container = styled.div<{
  Color: ColorType;
  size: Size;
  state: State;
  height?: number;
}>`
  height: ${({ size, height }) =>
    height ? `${height}px` : size === 'L' ? '52px' : '34px'};
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  border-radius: 2px;

  transition: background 0.2s, border 0.2s;
  input,
  textarea {
    color: ${Color.light.text.primary};
    resize: none;
  }

  input::placeholder {
    color: ${Color.light.text.third};
  }

  textarea::placeholder {
    color: ${Color.light.text.third};
  }

  ${(props) =>
    props.state === 'DEFAULT' &&
    css`
      &:hover {
        border-color: ${props.Color.stroke.gray2};
      }
      textarea:focus + & {
        border-color: ${props.Color.stroke.gray2};
      }
      input:focus + & {
        border-color: ${props.Color.stroke.gray2};
      }
    `}

  ${(props) =>
    props.state === 'SUCCESS' &&
    css`
      border-color: ${props.Color.stroke.blue1};
    `}

    ${(props) =>
    props.state === 'ERROR' &&
    css`
      border-color: ${props.Color.stroke.red1};
    `}

    ${(props) =>
    props.state === 'DISABLED' &&
    css`
      & {
        background: ${props.Color.background.gray2};
      }
      input,
      textarea {
        corsor: not-allowed;
        background: ${props.Color.background.gray2};
      }
      border-color: ${props.Color.stroke.gray2};
    `}

    display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  padding: ${(props) => (props.size === 'L' ? '16px' : '8px')};
  gap: 0;
  box-sizing: border-box;
`;

type TextFieldType = {
  width?: string;
  state?: State;
  size?: Size;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  isPassword?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
};
const ClearInput = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  text-align: start;
  padding: 0;
`;

const ClearTextArea = styled.textarea`
  border: none;
  &:focus {
    outline: none;
  }
  text-align: start;
  padding: 0;
`;

export const TextArea = ({
  state = 'DEFAULT',
  placeholder,
  size = 'L',
  onChange,
  width,
  onBlur,
  value,
  setValue,
  height,
}: Omit<TextFieldType, 'isPassword'> & { height: number }) => {
  const { Color } = useStyleContext();

  return (
    <Container
      Color={Color}
      size={size}
      state={state}
      style={{
        width: width ?? '100%',
      }}
      className={'text-field'}
      height={height}
    >
      <ClearTextArea
        disabled={state === 'DISABLED'}
        placeholder={placeholder}
        onChange={
          onChange ??
          ((e) => {
            setValue?.(e.target.value);
          })
        }
        onBlur={(e) => {
          onBlur?.(e);
        }}
        style={{
          ...(size === 'L' ? Font.body.body1 : Font.body.caption),
          width: '100%',
          height: `${height - (size === 'L' ? 32 : 16)}px`,
        }}
        value={value}
      ></ClearTextArea>
    </Container>
  );
};

export const TextField = ({
  state = 'DEFAULT',
  placeholder,
  size = 'L',
  onChange,
  width = '100%',
  isPassword,
  onBlur,
  value,
  setValue,
}: TextFieldType) => {
  const [resetVisible, setResetVisible] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onFocusHandler = () => {
    setResetVisible(true);
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
      buttonRef.current.style.cursor = 'pointer';
    }
  };
  const onFocusOutHandler = () => {
    setTimeout(() => {
      setResetVisible(false);
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
        buttonRef.current.style.cursor = 'default';
      }
    }, 100);
  };
  const { Color } = useStyleContext();

  return (
    <Container
      Color={Color}
      size={size}
      state={state}
      style={{
        width: width,
      }}
      className={'text-field'}
    >
      <ClearInput
        disabled={state === 'DISABLED'}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        onChange={
          onChange ??
          ((e) => {
            setValue?.(e.target.value);
          })
        }
        onFocus={onFocusHandler}
        onBlur={(e) => {
          onBlur?.(e);
          onFocusOutHandler();
        }}
        style={{
          ...(size === 'L' ? Font.body.body1 : Font.body.caption),
          width: `calc(100% - ${size === 'L' ? '26px' : '20px'})`,
          marginRight: '8px',
        }}
        value={value}
      />
      <button
        ref={buttonRef}
        onClick={() => {
          setValue?.('');
        }}
        style={{
          display: 'flex',
          opacity: resetVisible ? '1' : '0',
          transition: 'all 0.2s',
          width: 'fit-content',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          padding: '0',
        }}
      >
        {size === 'L' ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="18" height="18" rx="9" fill="#A3A7AE" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5285 13.4713C12.7889 13.7317 13.211 13.7317 13.4714 13.4713C13.7317 13.211 13.7317 12.7889 13.4714 12.5285L9.94276 8.99992L13.4714 5.47132C13.7317 5.21097 13.7317 4.78886 13.4714 4.52851C13.211 4.26816 12.7889 4.26816 12.5285 4.52851L8.99995 8.05711L5.47135 4.52851C5.211 4.26816 4.78889 4.26816 4.52854 4.52851C4.2682 4.78886 4.2682 5.21097 4.52854 5.47132L8.05714 8.99992L4.52854 12.5285C4.2682 12.7889 4.2682 13.211 4.52854 13.4713C4.78889 13.7317 5.211 13.7317 5.47135 13.4713L8.99995 9.94273L12.5285 13.4713Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="12" height="12" rx="6" fill="#A3A7AE" />
            <g clip-path="url(#clip0_156_1922)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.35236 8.98096C8.52593 9.15453 8.80734 9.15453 8.9809 8.98096C9.15447 8.8074 9.15447 8.52599 8.9809 8.35242L6.62851 6.00003L8.9809 3.64763C9.15447 3.47406 9.15447 3.19266 8.9809 3.01909C8.80734 2.84552 8.52593 2.84552 8.35236 3.01909L5.99997 5.37149L3.64757 3.01909C3.474 2.84552 3.1926 2.84552 3.01903 3.01909C2.84546 3.19266 2.84546 3.47406 3.01903 3.64763L5.37143 6.00003L3.01903 8.35242C2.84546 8.52599 2.84546 8.8074 3.01903 8.98096C3.1926 9.15453 3.474 9.15453 3.64757 8.98096L5.99997 6.62857L8.35236 8.98096Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_156_1922">
                <rect
                  width="8"
                  height="8"
                  fill="white"
                  transform="translate(2 2)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
    </Container>
  );
};
export const TextFieldCount = ({
  state = 'DEFAULT',
  placeholder,
  size = 'L',
  onChange,
  maxCount,
  width = '100%',
  inputRef,
}: TextFieldType & { maxCount: number }) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const keyUpHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > maxCount) {
      e.currentTarget.value = value;
    } else {
      setValue(e.currentTarget.value);
      setCount(e.currentTarget.value.length);
    }
  };
  const { Color } = useStyleContext();
  return (
    <Container
      size={size}
      state={state}
      style={{
        width: width,
      }}
      Color={Color}
    >
      <ClearInput
        disabled={state === 'DISABLED'}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        ref={inputRef as React.MutableRefObject<HTMLInputElement>}
        style={{
          ...(size === 'L' ? Font.body.body1 : Font.body.caption),
          width: `calc(100% - 56px)`,
          marginRight: '8px',
        }}
        onKeyUp={keyUpHandler}
      />
      <span
        style={{
          ...Font.body.caption,
          width: `48px`,
          textAlign: 'end',
        }}
      >
        {`${count}/${maxCount}`}
      </span>
    </Container>
  );
};

export const SearchField = ({
  state = 'DEFAULT',
  placeholder,
  onChange,
  size = 'L',
  width = '100%',
  inputRef,
  value,
  setValue,
}: TextFieldType) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [focus, setFocus] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const onFocusHandler = () => {
    setResetVisible(true);
    setFocus(true);
  };
  const onFocusOutHandler = () => {
    setFocus(false);
    setTimeout(() => {
      setResetVisible(false);
    }, 100);
  };

  React.useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  const { Color } = useStyleContext();
  return (
    <SearchContainer
      Color={Color}
      size={size}
      state={state}
      style={{
        background: focus
          ? Color.background.default
          : inputRef?.current && inputRef.current?.value !== ''
          ? Color.background.default
          : Color.background.gray1,
        width: width,
        border: `1px solid ${
          focus
            ? Color.stroke.gray2
            : inputRef?.current && inputRef.current?.value !== ''
            ? Color.stroke.gray2
            : Color.background.gray1
        }`,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="9.16668"
          cy="9.16671"
          r="5.16667"
          stroke="#111111"
          stroke-width="1.33333"
        />
        <path
          d="M13.3333 13.3334L15.8333 15.8334"
          stroke="#111111"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <ClearInput
        disabled={state === 'DISABLED'}
        type="text"
        placeholder={placeholder}
        onChange={
          onChange ??
          ((e: React.ChangeEvent<HTMLInputElement>) => {
            setValue?.(e.target.value);
          })
        }
        onFocus={onFocusHandler}
        onBlur={onFocusOutHandler}
        ref={inputRef as React.MutableRefObject<HTMLInputElement>}
        style={{
          ...(size === 'L' ? Font.body.body1 : Font.body.body1),
          fontFamily: "'Spoqa Han Sans Neo','sans-serif'",
          width: `calc(100% - ${size === 'L' ? '54px' : '54px'})`,
          marginRight: '8px',
          marginLeft: '8px',
        }}
        value={value}
      />
      <button
        onClick={() => {
          console.log('test');
          if (inputRef?.current) inputRef.current.value = '';
        }}
        style={{
          opacity: resetVisible ? '1' : '0',
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="18" height="18" rx="9" fill="#A3A7AE" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.5285 13.4713C12.7889 13.7317 13.211 13.7317 13.4714 13.4713C13.7317 13.211 13.7317 12.7889 13.4714 12.5285L9.94276 8.99992L13.4714 5.47132C13.7317 5.21097 13.7317 4.78886 13.4714 4.52851C13.211 4.26816 12.7889 4.26816 12.5285 4.52851L8.99995 8.05711L5.47135 4.52851C5.211 4.26816 4.78889 4.26816 4.52854 4.52851C4.2682 4.78886 4.2682 5.21097 4.52854 5.47132L8.05714 8.99992L4.52854 12.5285C4.2682 12.7889 4.2682 13.211 4.52854 13.4713C4.78889 13.7317 5.211 13.7317 5.47135 13.4713L8.99995 9.94273L12.5285 13.4713Z"
            fill="white"
          />
        </svg>
      </button>
    </SearchContainer>
  );
};
