import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { useStyleContext } from '../contexts/AppContextProvider';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import Font from '../styles/Font';
import Shadow from '../styles/Shadow';
import { ColorType } from '../types/Style';

export const DropDownContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const HeaderContainer = styled.div<{
  isClear: boolean;
  isSelected: boolean;
  size: 'S' | 'L';
  Color: ColorType;
}>`
  transition: background 0.2s, border 0.2s;
  cursor: pointer;
  display: flex;
  height: 52px;
  padding: 16px;
  ${(props) =>
    props.size === 'S' &&
    css`
      height: 34px;
      padding: 8px;
    `}
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  span {
    max-width: calc(100%-23.3px);
  }
  ${(props) => {
    if (props.isClear) {
      return ``;
    } else {
      return `
      border: 1px solid ${props.Color.stroke.gray1};
      background: ${props.Color.background.default};
      &:hover{
        border: 1px solid ${props.Color.stroke.gray2};
      }
      &:active{
        border: 1px solid ${props.Color.stroke.gray3};
      }

      ${(() => {
        if (props.isSelected) {
          return `
          span {
            color: ${props.Color.text.primary};
          }
          `;
        } else {
          return `
          span {
            color: ${props.Color.text.third};
          }
          &:hover span {
            color: ${props.Color.text.secondary};
          }
          &:active span {
            color: ${props.Color.text.primary};
          }
          `;
        }
      })()}
      `;
    }
  }}
  box-sizing: border-box;
  border-radius: 2px;
`;

type HeaderProps = {
  type: 'DEFAULT' | 'CLEAR';
  isSelected: boolean;
  isOpened: boolean;
  label: string;
  onClick: () => void;
  size: 'S' | 'L';
};

const DropDownUnit = styled.span<{ isSelected: boolean; Color: ColorType }>`
  box-sizing: border-box;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  background: none;
  color: ${(props) =>
    props.isSelected
      ? (props) => props.Color.text.primary
      : (props) => props.Color.text.secondary};
  width: 100%;
  clear: both;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.Color.background.gray1};
  }
`;

const DropDownContentContainer = styled.div<{
  isOpened: boolean;
  Color: ColorType;
}>`
  position: absolute;
  z-index: 1;
  display: flex;
  opacity: ${(props) => (props.isOpened ? 1 : 0)};
  z-index: ${(props) => (props.isOpened ? 2 : -1)};
  transition: all 0.2s;
  background: ${(props) => props.Color.background.default};
  text-align: center;
  padding: 4px 4px;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;

  ${DropDownUnit} {
  }
`;

type ContentsProps = {
  contents: { label: string; value: string }[];
  selected: number;
  onClickUnit: (idx: number) => () => void;
  isOpened: boolean;
};
export const DropDownContents = ({
  contents,
  selected,
  onClickUnit,
  isOpened,
}: ContentsProps) => {
  const { Color } = useStyleContext();
  return (
    <DropDownContentContainer
      Color={Color}
      style={{ ...Shadow.light.shadow1 }}
      isOpened={isOpened}
    >
      {contents.map((content, idx) => (
        <DropDownUnit
          Color={Color}
          isSelected={idx === selected}
          onClick={onClickUnit(idx)}
          style={{ ...Font.body.caption }}
        >
          {content.label}
        </DropDownUnit>
      ))}
    </DropDownContentContainer>
  );
};

export const DropDownHeader = ({
  type,
  isSelected,
  isOpened,
  label,
  onClick,
  size,
}: HeaderProps) => {
  const { Color } = useStyleContext();
  return (
    <HeaderContainer
      Color={Color}
      isClear={type === 'CLEAR'}
      isSelected={isSelected}
      onClick={onClick}
      size={size}
    >
      <span style={{ ...(size === 'L' ? Font.body.body1 : Font.body.caption) }}>
        {label}
      </span>
      {isOpened ? (
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.363641 8.03632C0.0121687 7.68485 0.0121687 7.115 0.363641 6.76353L5.93938 1.1878C6.52516 0.602009 7.47491 0.602009 8.0607 1.18779L13.6364 6.76353C13.9879 7.115 13.9879 7.68485 13.6364 8.03632C13.285 8.3878 12.7151 8.3878 12.3636 8.03632L7.00004 2.67272L1.63643 8.03632C1.28496 8.38779 0.715112 8.38779 0.363641 8.03632Z"
            fill="#5D6169"
          />
        </svg>
      ) : (
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.6364 0.963799C13.9878 1.31527 13.9878 1.88512 13.6364 2.23659L8.06062 7.81233C7.47484 8.39811 6.52509 8.39811 5.9393 7.81233L0.363567 2.23659C0.0120945 1.88512 0.0120945 1.31527 0.363567 0.963799C0.715038 0.612327 1.28489 0.612327 1.63636 0.963799L6.99996 6.3274L12.3636 0.963799C12.715 0.612327 13.2849 0.612327 13.6364 0.963799Z"
            fill="#5D6169"
          />
        </svg>
      )}
    </HeaderContainer>
  );
};

type DropDownStates = {
  isOpened: boolean;
  selected: number;
  onClickUnit: (idx: number) => () => void;
  onClick: () => void;
};

type DropDownProps = {
  contents: { label: string; value: string }[];
  states: DropDownStates;
  type: 'DEFAULT' | 'CLEAR';
  width: string;
  placeholder?: string;
  size: 'S' | 'L';
};

export const DropDown = ({
  contents,
  type,
  states: { isOpened, selected, onClick, onClickUnit },
  width,
  placeholder,
  size,
}: DropDownProps) => {
  return (
    <DropDownContainer style={{ width: width }}>
      <DropDownHeader
        size={size}
        type={type}
        label={
          selected === -1
            ? placeholder ?? contents[0].label
            : contents[selected].label
        }
        isSelected={selected !== -1}
        isOpened={isOpened}
        onClick={onClick}
      />
      <DropDownContents
        contents={contents}
        selected={selected}
        onClickUnit={onClickUnit}
        isOpened={isOpened}
      />
    </DropDownContainer>
  );
};
