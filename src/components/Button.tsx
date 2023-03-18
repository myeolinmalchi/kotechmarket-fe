import React, { useRef, useState } from 'react';
import { useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { useMouseInteraction } from '../hooks/useMouseInteraction';
import Color from '../styles/Color';
import Font from '../styles/Font';
import Shadow from '../styles/Shadow';

type ButtonStyle = 'PRIMARY' | 'SECONDARY' | 'OUTLINE';
type ButtonState = 'DEFAULT' | 'DISABLED';
type ButtonSize = 'SS' | 'S' | 'M' | 'L' | 'XL';
type ButtonType = 'NONE' | 'LEFT' | 'RIGHT' | 'UNDERLINE';

interface ButtonProps {
  style: ButtonStyle;
  state: ButtonState;
  size: ButtonSize;
  type: ButtonType;
  onClick?: (e: React.MouseEvent) => void;
  width?: string;
  text?: string;
  children?: React.ReactNode;
  height?: string;
}

const DefaultButton1 = styled.button<{
  style: ButtonStyle;
  state: ButtonState;
  size: ButtonSize;
  buttonType: ButtonType;
  width?: string;
  isDarkMode: boolean;
}>`
  // 공통
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: ${(props) => props.width ?? 'fit-content'};

  // 사이즈 S
  ${(props) =>
    props.size === 'S' &&
    css`
      height: '33px';
      padding: 8px 12px;
    `}

  // 사이즈 M
    ${(props) =>
    props.size === 'S' &&
    css`
      height: '33px';
      padding: 8px 12px;
    `}

    // 사이즈 L
    ${(props) =>
    props.size === 'S' &&
    css`
      height: '33px';
      padding: 8px 12px;
    `}

    // 사이즈 XL
    ${(props) =>
    props.size === 'S' &&
    css`
      height: '33px';
      padding: 8px 12px;
    `}

    // 라이트모드
    ${(props) =>
    props.style === 'PRIMARY' &&
    css`
      background: ${Color.light.action.blue.filled};
      color: ${Color.light.text.white};
      border: none;
      &:disabled {
        background: ${Color.light.action.blue.disabled};
        color: ${Color.light.text.disabled};
      }
      &:hover {
        background: ${Color.light.action.blue.hover};
      }
      &:action {
        background: ${Color.light.action.blue.pressed};
      }
    `}
    ${(props) =>
    props.style === 'SECONDARY' &&
    css`
      background: ${Color.light.action.gray.filled};
      color: ${Color.light.text.white};
      border: none;
      &:disabled {
        background: ${Color.light.action.gray.disabled};
        color: ${Color.light.text.disabled};
      }
      &:hover {
        background: ${Color.light.action.gray.hover};
      }
      &:action {
        background: ${Color.light.action.gray.pressed};
      }
    `}
    ${(props) =>
    props.style === 'OUTLINE' &&
    css`
      background: none;
      color: ${Color.light.text.secondary};
      border: 1px solid ${Color.light.stroke.gray2};
      &:disabled {
        background: ${Color.light.background.gray2};
      }
      &:hover {
        background: ${Color.light.background.gray1};
      }
      &:action {
        background: ${Color.light.action.blue.pressed};
      }
    `}
    // 다크모드
    ${(props) =>
    props.isDarkMode &&
    css`
      ${props.style === 'PRIMARY' && css``}
      ${props.style === 'SECONDARY' && css``}
            ${props.style === 'OUTLINE' && css``}
    `}
`;

export const DefaultButton = ({
  style,
  state,
  size,
  type,
  onClick,
  width,
  text,
  children,
  height,
}: ButtonProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const button = useRef<HTMLButtonElement>(null);
  const { isHovered, isActivated } = useMouseInteraction(button);

  const plusIcon = useMemo(() => {
    const [length, viewbox] = (() => {
      if (size === 'S') {
        return ['8', '0 0 18 18'];
      } else if (size === 'M') {
        return ['10', '0 0 14.4 14.4'];
      } else {
        return ['12', '0 0 12 12'];
      }
    })();

    const [color, opacity] = (() => {
      if (state === 'DISABLED') {
        return ['black', '0.2'];
      } else if (style === 'OUTLINE') {
        return [Color.light.text.secondary, '1'];
      } else {
        return [Color.light.text.white, '1'];
      }
    })();

    return (
      <svg
        width={length}
        height={length}
        viewBox={viewbox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.66669 1.33335C6.66669 0.965164 6.36821 0.666687 6.00002 0.666687C5.63183 0.666687 5.33335 0.965164 5.33335 1.33335V5.33335H1.33335C0.965163 5.33335 0.666687 5.63183 0.666687 6.00002C0.666687 6.36821 0.965163 6.66669 1.33335 6.66669H5.33335V10.6667C5.33335 11.0349 5.63183 11.3334 6.00002 11.3334C6.36821 11.3334 6.66669 11.0349 6.66669 10.6667V6.66669H10.6667C11.0349 6.66669 11.3334 6.36821 11.3334 6.00002C11.3334 5.63183 11.0349 5.33335 10.6667 5.33335H6.66669V1.33335Z"
          fill={color}
          fill-opacity={opacity}
        />
      </svg>
    );
  }, [size, state, style]);

  const buttonStyle: React.CSSProperties = useMemo(
    () => ({
      cursor: 'pointer',
      fontFamily: "'Spoqa Han Sans Neo', 'sans-serif'",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: width ?? 'fit-content',
      transition: 'background 0.2s, border 0.2s',
      borderRadius: '2px',
      ...(() => {
        if (size === 'S') {
          return {
            height: height ?? '33px',
            padding: '8px 12px',
            ...Font.body.caption,
            fontSize: 'clamp(10px, 2.5vw, 12px)',
          };
        } else if (size === 'M') {
          return {
            height: height ?? '40px',
            padding: '10px 12px',
            ...Font.body.body1,
            fontSize: 'clamp(12px, 2.5vw, 14px)',
          };
        } else if (size === 'L') {
          return {
            height: height ?? '46px',
            padding: '12px 14px',
            ...Font.body.body2,
          };
        } else if (size === 'XL') {
          return {
            height: height ?? '53px',
            padding: '14px 16px',
            ...Font.body.body3,
          };
        } else if (size === 'SS') {
          return {
            height: height ?? '23px',
            padding: '6px 12px',
            ...Font.body.caption,
            fontSize: 'clamp(8px, 2.5vw, 10px)',
          };
        }
      })(),
      ...(() => {
        if (isDarkMode) {
        } else {
          if (style === 'PRIMARY') {
            if (state === 'DISABLED') {
              return {
                background: Color.light.action.blue.disabled,
                color: Color.light.text.disabled,
                border: 'none',
              };
            }
            if (isActivated) {
              return {
                background: Color.light.action.blue.pressed,
                color: Color.light.text.white,
                border: 'none',
              };
            }
            if (isHovered) {
              return {
                background: Color.light.action.blue.hover,
                color: Color.light.text.white,
                border: 'none',
              };
            }
            return {
              background: Color.light.action.blue.filled,
              color: Color.light.text.white,
              border: 'none',
            };
          } else if (style === 'SECONDARY') {
            if (state === 'DISABLED') {
              return {
                background: Color.light.action.gray.disabled,
                color: Color.light.text.disabled,
                border: 'none',
              };
            }
            if (isActivated) {
              return {
                background: Color.light.action.gray.pressed,
                color: Color.light.text.white,
                border: 'none',
              };
            }
            if (isHovered) {
              return {
                background: Color.light.action.gray.hover,
                color: Color.light.text.white,
                border: 'none',
              };
            }
            return {
              background: Color.light.action.gray.filled,
              color: Color.light.text.white,
              border: 'none',
            };
          } else if (style === 'OUTLINE') {
            if (state === 'DISABLED') {
              return {
                background: Color.light.background.gray2,
                color: Color.light.text.disabled,
                border: `1px solid ${Color.light.stroke.gray1}`,
              };
            }
            if (isActivated) {
              return {
                background: Color.light.background.gray2,
                color: Color.light.text.secondary,
                border: `1px solid ${Color.light.stroke.gray2}`,
              };
            }
            if (isHovered) {
              return {
                background: Color.light.background.gray1,
                color: Color.light.text.secondary,
                border: `1px solid ${Color.light.stroke.gray2}`,
              };
            }
            return {
              background: 'none',
              color: Color.light.text.secondary,
              border: `1px solid ${Color.light.stroke.gray2}`,
            };
          }
        }
      })(),
      boxSizing: 'border-box',
    }),
    [style, size, type, width, isHovered, isActivated, state]
  );

  return (
    <button
      onClick={onClick}
      ref={button}
      style={buttonStyle}
      disabled={state === 'DISABLED'}
    >
      {type === 'LEFT' ? plusIcon : ''}
      {children ?? <span>{text}</span>}
      {type === 'RIGHT' ? plusIcon : ''}
    </button>
  );
};

export const TextButton = ({
  style,
  state,
  size,
  type,
  onClick,
  width,
  text,
  height,
}: ButtonProps & { height?: string }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const button = useRef<HTMLButtonElement>(null);
  const { isHovered, isActivated } = useMouseInteraction(button);

  const plusIcon = useMemo(() => {
    const [length, viewbox] = (() => {
      if (size === 'S') {
        return ['8', '0 0 18 18'];
      } else if (size === 'M') {
        return ['10', '0 0 14.4 14.4'];
      } else {
        return ['12', '0 0 12 12'];
      }
    })();

    const [color, opacity] = (() => {
      if (style === 'PRIMARY') {
        if (state === 'DISABLED') {
          return [Color.light.action.blue.disabled, '1'];
        }
        if (isActivated) {
          return [Color.light.action.blue.pressed, '1'];
        }
        if (isHovered) {
          return [Color.light.action.blue.hover, '1'];
        }
        return [Color.light.action.blue.filled, '1'];
      }
      if (style === 'SECONDARY') {
        if (state === 'DISABLED') {
          return [Color.light.action.gray.disabled, '1'];
        }
        if (isActivated) {
          return [Color.light.action.gray.pressed, '1'];
        }
        if (isHovered) {
          return [Color.light.action.gray.hover, '1'];
        }
        return [Color.light.action.gray.filled, '1'];
      }
      return ['', ''];
    })();

    return (
      <svg
        width={length}
        height={length}
        viewBox={viewbox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.66669 1.33335C6.66669 0.965164 6.36821 0.666687 6.00002 0.666687C5.63183 0.666687 5.33335 0.965164 5.33335 1.33335V5.33335H1.33335C0.965163 5.33335 0.666687 5.63183 0.666687 6.00002C0.666687 6.36821 0.965163 6.66669 1.33335 6.66669H5.33335V10.6667C5.33335 11.0349 5.63183 11.3334 6.00002 11.3334C6.36821 11.3334 6.66669 11.0349 6.66669 10.6667V6.66669H10.6667C11.0349 6.66669 11.3334 6.36821 11.3334 6.00002C11.3334 5.63183 11.0349 5.33335 10.6667 5.33335H6.66669V1.33335Z"
          fill={color}
          fill-opacity={opacity}
        />
      </svg>
    );
  }, [size, state, style, isHovered, isActivated]);

  const buttonStyle: React.CSSProperties = useMemo(
    () => ({
      cursor: 'pointer',
      fontFamily: "'Spoqa Han Sans Neo', 'sans-serif'",
      transition: 'background 0.2s, border 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: width ?? 'fit-content',
      padding: '0',
      border: 'none',
      background: 'none',
      height: height,
      ...(() => {
        if (size === 'S') {
          return { ...Font.body.caption, fontSize: 'clamp(11px, 2.5vw, 13px)' };
        } else if (size === 'M') {
          return { ...Font.body.body1, fontSize: 'clamp(13px, 2.5vw, 15px)' };
        } else if (size === 'L') {
          return Font.body.body2;
        } else if (size === 'XL') {
          return { ...Font.body.body3 };
        }
      })(),
      textDecoration: type === 'UNDERLINE' ? 'underline' : '',
      ...(() => {
        if (isDarkMode) {
        } else {
          if (style === 'PRIMARY') {
            if (state === 'DISABLED') {
              return {
                color: Color.light.action.blue.disabled,
              };
            }
            if (isActivated) {
              return {
                color: Color.light.action.blue.pressed,
              };
            }
            if (isHovered) {
              return {
                color: Color.light.action.blue.hover,
              };
            }
            return {
              color: Color.light.action.blue.filled,
            };
          } else if (style === 'SECONDARY') {
            if (state === 'DISABLED') {
              return {
                color: Color.light.action.gray.disabled,
              };
            }
            if (isActivated) {
              return {
                color: Color.light.action.gray.pressed,
              };
            }
            if (isHovered) {
              return {
                color: Color.light.action.gray.hover,
              };
            }
            return {
              color: Color.light.action.gray.filled,
            };
          }
        }
      })(),
    }),
    [style, size, type, width, isHovered, isActivated]
  );

  return (
    <button onClick={onClick} ref={button} style={buttonStyle}>
      {type === 'LEFT' ? plusIcon : ''}
      <span>{text}</span>
      {type === 'RIGHT' ? plusIcon : ''}
    </button>
  );
};

type LightButtonProps = {
  style: ButtonStyle;
  size: ButtonSize;
  state: ButtonState;
  onClick?: () => void;
};
export const IconButton = ({
  style,
  state,
  size,
  onClick,
}: LightButtonProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const button = useRef<HTMLButtonElement>(null);
  const { isHovered, isActivated } = useMouseInteraction(button);

  const plusIcon = useMemo(() => {
    const [length, viewbox] = (() => {
      if (size === 'S') {
        return ['8', '0 0 18 18'];
      } else if (size === 'M') {
        return ['10', '0 0 14.4 14.4'];
      } else {
        return ['12', '0 0 12 12'];
      }
    })();

    const [color, opacity] = (() => {
      if (state === 'DISABLED') {
        return ['black', '0.2'];
      } else if (style === 'OUTLINE') {
        return [Color.light.text.secondary, '1'];
      } else {
        return [Color.light.text.white, '1'];
      }
    })();

    return (
      <svg
        width={length}
        height={length}
        viewBox={viewbox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.66669 1.33335C6.66669 0.965164 6.36821 0.666687 6.00002 0.666687C5.63183 0.666687 5.33335 0.965164 5.33335 1.33335V5.33335H1.33335C0.965163 5.33335 0.666687 5.63183 0.666687 6.00002C0.666687 6.36821 0.965163 6.66669 1.33335 6.66669H5.33335V10.6667C5.33335 11.0349 5.63183 11.3334 6.00002 11.3334C6.36821 11.3334 6.66669 11.0349 6.66669 10.6667V6.66669H10.6667C11.0349 6.66669 11.3334 6.36821 11.3334 6.00002C11.3334 5.63183 11.0349 5.33335 10.6667 5.33335H6.66669V1.33335Z"
          fill={color}
          fill-opacity={opacity}
        />
      </svg>
    );
  }, [size, state, style]);

  const buttonStyle: React.CSSProperties = useMemo(
    () => ({
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '2px',
      ...(() => {
        if (size === 'S') {
          return {
            width: '30px',
            height: '39px',
            ...Font.body.caption,
          };
        } else if (size === 'M') {
          return {
            width: '36px',
            height: '36px',
            ...Font.body.body1,
          };
        } else if (size === 'L') {
          return {
            width: '40px',
            height: '40px',
            ...Font.body.body2,
          };
        } else if (size === 'XL') {
          return {
            width: '44px',
            height: '44px',
            ...Font.body.body3,
          };
        }
      })(),
      border: 'none',
      transition: 'background 0.2s, border 0.2s',
      ...(() => {
        if (isDarkMode) {
        } else {
          if (style === 'PRIMARY') {
            if (state === 'DISABLED') {
              return {
                background: Color.light.action.blue.disabled,
              };
            }
            if (isActivated) {
              return {
                background: Color.light.action.blue.pressed,
              };
            }
            if (isHovered) {
              return {
                background: Color.light.action.blue.hover,
                color: 'a',
              };
            }
            return {
              background: Color.light.action.blue.filled,
            };
          } else if (style === 'SECONDARY') {
            if (state === 'DISABLED') {
              return {
                background: Color.light.action.gray.disabled,
              };
            }
            if (isActivated) {
              return {
                background: Color.light.action.gray.pressed,
              };
            }
            if (isHovered) {
              return {
                background: Color.light.action.gray.hover,
              };
            }
            return {
              background: Color.light.action.gray.filled,
            };
          } else if (style === 'OUTLINE') {
            if (state === 'DISABLED') {
              return {
                background: Color.light.background.gray2,
                border: `1px solid ${Color.light.stroke.gray1}`,
              };
            }
            if (isActivated) {
              return {
                background: Color.light.background.gray2,
                border: `1px solid ${Color.light.stroke.gray2}`,
              };
            }
            if (isHovered) {
              return {
                background: Color.light.background.gray1,
                border: `1px solid ${Color.light.stroke.gray2}`,
              };
            }
            return {
              background: 'none',
              border: `1px solid ${Color.light.stroke.gray2}`,
            };
          }
        }
      })(),
    }),
    [style, size, isHovered, isActivated]
  );

  return (
    <button onClick={onClick} ref={button} style={buttonStyle}>
      {plusIcon}
    </button>
  );
};

type ToggleButtonProps = {
  text?: {
    content: string;
    isRight: boolean;
  };
  isActivated: boolean;
  onClick?: () => void;
};

const ToggleButtonText = styled.span`
  width: fit-content;
  color: ${Color.light.text.secondary};
  text-align: start;
`;

const ToggleCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${Color.light.background.white};
  transition: all 0.2s;
`;

const ToggleWrapper = styled.div<{ isActivated: boolean }>`
  width: 46px;
  height: 22px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: 'start';
  background: ${(props) =>
    props.isActivated
      ? Color.light.background.blue1
      : Color.light.background.gray2};
  padding: 3px;
  box-sizing: border-box;
  margin: 0;
  ${(props) =>
    props.isActivated &&
    css`
      ${ToggleCircle} {
        transform: translateX(24px);
      }
    `}
  transition: all 0.2s;
`;

export const ToggleButton = ({
  text,
  isActivated,
  onClick,
}: ToggleButtonProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: 'fit-content',
        cursor: 'pointer',
        boxSizing: 'border-box',
      }}
      onClick={onClick}
    >
      {text && !text.isRight ? (
        <ToggleButtonText>{text.content}</ToggleButtonText>
      ) : (
        <></>
      )}
      <ToggleWrapper isActivated={isActivated}>
        <ToggleCircle style={{ ...Shadow.light.shadow1 }}></ToggleCircle>
      </ToggleWrapper>
      {text && text.isRight ? (
        <ToggleButtonText>{text.content}</ToggleButtonText>
      ) : (
        <></>
      )}
    </div>
  );
};
