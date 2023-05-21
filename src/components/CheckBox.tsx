// TODO 다크모드 로직 변경
import React from 'react';
import styled from 'styled-components';
import { useStyleContext } from '../contexts/AppContextProvider';
import Font from '../styles/Font';
import { ColorType } from '../types/Style';

type ButtonSizeType = 'L' | 'S';

export const $CheckBoxField = styled.fieldset<{
  size: ButtonSizeType;
  Color: ColorType;
}>`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  [type='checkbox'] {
    appearance: none;
    border: 0.15em solid ${(props) => props.Color.stroke.gray2};
    ${(props) =>
      props.size === 'L'
        ? `
        width: 18px;
        height: 18px;
        `
        : `
          width: 13px;
          height: 13px;
          `}
    border-radius: 2px;
    margin: 0;
    position: relative;
    cursor: pointer;
  }

  [type='checkbox']:hover {
    border-color: ${(props) => props.Color.stroke.gray3};
  }

  [type='checkbox']:active {
    border-color: ${(props) => props.Color.stroke.gray4};
  }

  [type='checkbox']:active {
    border-color: ${(props) => props.Color.stroke.gray4};
  }
  [type='checkbox']:disabled {
    border-color: ${(props) => props.Color.stroke.gray1};
  }

  [type='checkbox']:checked {
    background-image: url(/images/components/CheckBox/light-default.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: none;
  }

  [type='checkbox']:checked:hover {
    background-image: url(/images/components/CheckBox/light-hover.png);
    border: none;
  }

  [type='checkbox']:checked:active {
    background-image: url(/images/components/CheckBox/light-pressed.png);
    border: none;
  }
  [type='checkbox']:checked:disabled {
    background-image: url(/images/components/CheckBox/light-disabled.png);
    border: none;
  }
`;

/**
 *
 **/
export const CheckBoxField = ({
  children,
  size,
  style,
  isRow,
  marginTop,
}: React.PropsWithChildren & {
  size: ButtonSizeType;
  style?: React.StyleHTMLAttributes<HTMLFieldSetElement>;
  isRow?: boolean;
  marginTop?: number;
}) => {
  const { Color } = useStyleContext();
  return (
    <$CheckBoxField
      size={size}
      Color={Color}
      style={{
        marginTop: marginTop ?? '20px',
        display: 'flex',
        alignItems: 'start',
        justifyContent: isRow ? 'start' : 'center',
        width: '100%',
        flexDirection: isRow ? 'row' : 'column',
        gap: isRow ? '16px' : '8px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </$CheckBoxField>
  );
};

type CheckBoxProps = {
  name?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  inputRef?:
    | React.MutableRefObject<HTMLInputElement>
    | ((el: HTMLInputElement) => void);
  size: ButtonSizeType;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

// checked는 정적으로 값 넣으면 안되고 바깥에서 상태관리 해줘야함
export const CheckBox = ({
  name,
  value,
  checked,
  label,
  size,
  disabled,
  onChange,
  inputRef,
}: CheckBoxProps) => {
  const { Color } = useStyleContext();
  return (
    <label>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        ref={inputRef}
      />
      {label && (
        <span
          style={{
            ...(size === 'L' ? Font.body.body2 : Font.body.caption),
            verticalAlign: 'middle',
            textAlign: 'center',
            width: 'fit-content',
            color: Color.text.secondary,
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};
