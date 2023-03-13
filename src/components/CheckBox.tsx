import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Color from '../styles/Color';
import Font from '../styles/Font';

type ButtonSizeType = 'L' | 'S';
export const CheckBoxField = styled.fieldset<{ size: ButtonSizeType }>`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  [type='checkbox'] {
    appearance: none;
    border: 0.15em solid ${Color.light.stroke.gray2};
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
    border-color: ${Color.light.stroke.gray3};
  }

  [type='checkbox']:active {
    border-color: ${Color.light.stroke.gray4};
  }

  [type='checkbox']:active {
    border-color: ${Color.light.stroke.gray4};
  }
  [type='checkbox']:disabled {
    border-color: ${Color.light.stroke.gray1};
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

type CheckBoxProps = {
  name: string;
  value: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  inputRef?:
    | React.RefObject<HTMLInputElement>
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
            color: Color.light.text.secondary,
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};
