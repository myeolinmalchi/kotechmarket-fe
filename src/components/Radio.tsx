import React from 'react';
import styled from 'styled-components';
import Color from '../styles/Color';
import Font from '../styles/Font';

type ButtonSizeType = 'L' | 'S';
export const RadioField = styled.fieldset<{ size: ButtonSizeType }>`
    label {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    [type='radio'] {
        appearance: none;
        border: 0.15em solid ${Color.light.stroke.gray2};
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
        border-color: ${Color.light.stroke.gray3};
    }

    [type='radio']:active {
        border-color: ${Color.light.stroke.gray4};
    }

    [type='radio']:active {
        border-color: ${Color.light.stroke.gray4};
    }
    [type='radio']:disabled {
        border-color: ${Color.light.stroke.gray1};
    }

    [type='radio']:checked {
        border-color: ${Color.light.action.blue.filled};
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
        background-color: ${Color.light.action.blue.filled};
        opacity: 0;
    }

    [type='radio']:checked:before {
        opacity: 1;
    }

    [type='radio']:checked:hover:before {
        background-color: ${Color.light.action.blue.hover};
    }
    [type='radio']:checked:active:before {
        background-color: ${Color.light.action.blue.pressed};
    }
    [type='radio']:checked:disabled:before {
        background-color: ${Color.light.action.blue.disabled};
    }

    [type='radio']:checked:hover {
        border-color: ${Color.light.action.blue.hover};
    }
    [type='radio']:checked:active {
        border-color: ${Color.light.action.blue.pressed};
    }
    [type='radio']:checked:disabled {
        border-color: ${Color.light.action.blue.disabled};
    }
`;

type RadioButtonProps = {
    name: string;
    value: string;
    checked?: boolean;
    label: string;
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
        </label>
    );
};
