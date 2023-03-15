import React from 'react';
import styled from 'styled-components';
import Color from '../../styles/Color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 420px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 420px;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 120px;
  }
`;

export const FreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 120px;
  }
`;
export const InputContainer = styled.div<{
  width?: string;
  padding?: string;
  maxWidth?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${(props) => props.width ?? '420px'};
  gap: 24px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: ${(props) => props.padding ?? '0 16px'};
    box-sizing: border-box;
    max-width: ${(props) => props.maxWidth ?? '420px'};
  }
`;

export const InputWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  span:first-child {
    width: 100%;
    text-align: start;
    color: ${(props) => (props.isDarkMode ? '' : Color.light.text.secondary)};
  }

  span:first-child > span {
    color: ${Color.light.text.red};
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
