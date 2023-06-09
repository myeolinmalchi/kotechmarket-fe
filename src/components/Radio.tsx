import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleContext } from '../contexts/AppContextProvider';
import Font from '../styles/Font';
import { ColorType } from '../types/Style';

type ButtonSizeType = 'L' | 'S';

const $RadioField = styled.fieldset<{
  size: ButtonSizeType;
  Color: ColorType;
  isRow?: boolean;
}>`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => (props.isRow ? 'row' : 'column')};

  ${(props) =>
    props.isRow
      ? css`
          align-items: center;
          justify-content: start;
        `
      : css`
          align-items: start;
          justify-content: center;
        `}
  gap: 8px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  [type='radio'] {
    appearance: none;
    border: 0.15em solid ${(props) => props.Color.stroke.gray2};
    ${(props) =>
      props.size === 'L'
        ? `
                width: 16px;
                height: 16px;
                `
        : `
                width: 13px;
                height: 13px;
            `}
    border-radius: 50%;
    margin: 0;
    position: relative;
    cursor: pointer;
  }

  [type='radio']:hover {
    border-color: ${(props) => props.Color.stroke.gray3};
  }

  [type='radio']:active {
    border-color: ${(props) => props.Color.stroke.gray4};
  }

  [type='radio']:active {
    border-color: ${(props) => props.Color.stroke.gray4};
  }
  [type='radio']:disabled {
    border-color: ${(props) => props.Color.stroke.gray1};
  }

  [type='radio']:checked {
    border-color: ${(props) => props.Color.action.blue.filled};
  }

  [type='radio']:before {
    position: absolute;
    content: '';
    display: block;
    ${(props) =>
      props.size === 'L'
        ? `
                width: 8px;
                height:8px;
        top: calc(50% - 4px);
        left: calc(50% - 4px);
                `
        : `
                width: 7px;
                height:7px;
        top: calc(50% - 3.5px);
        left: calc(50% - 3.5px);
            `}
    border-radius: 50%;
    background-color: ${(props) => props.Color.action.blue.filled};
    opacity: 0;
  }

  [type='radio']:checked:before {
    opacity: 1;
  }

  [type='radio']:checked:hover:before {
    background-color: ${(props) => props.Color.action.blue.hover};
  }
  [type='radio']:checked:active:before {
    background-color: ${(props) => props.Color.action.blue.pressed};
  }
  [type='radio']:checked:disabled:before {
    background-color: ${(props) => props.Color.action.blue.disabled};
  }

  [type='radio']:checked:hover {
    border-color: ${(props) => props.Color.action.blue.hover};
  }
  [type='radio']:checked:active {
    border-color: ${(props) => props.Color.action.blue.pressed};
  }
  [type='radio']:checked:disabled {
    border-color: ${(props) => props.Color.action.blue.disabled};
  }
`;

export const RadioField = ({
  children,
  size,
  isRow,
  style,
}: React.PropsWithChildren & {
  size: ButtonSizeType;
  isRow?: boolean;
  style?: React.StyleHTMLAttributes<HTMLFieldSetElement>;
}) => {
  const { Color } = useStyleContext();
  return (
    <$RadioField size={size} Color={Color} isRow={isRow} style={{ ...style }}>
      {children}
    </$RadioField>
  );
};

type RadioButtonProps = {
  name?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  size: ButtonSizeType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// checked는 정적으로 값 넣으면 안되고 바깥에서 상태관리 해줘야함
export const RadioButton = ({
  name,
  value,
  checked,
  label,
  size,
  disabled,
  onChange,
}: RadioButtonProps) => {
  const { Color } = useStyleContext();
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
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
