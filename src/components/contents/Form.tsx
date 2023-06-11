import React from 'react';
import styled from 'styled-components';
import { useStyleContext } from '../../contexts/AppContextProvider';

const Spacer = styled.div<{ height: number }>`
  margin-bottom: ${(props) => props.height}px;
`;

export const FormTitle = ({
  label,
  optional,
}: {
  label: string;
  optional: boolean;
}) => {
  const { Color, Font } = useStyleContext();
  return (
    <>
      <Spacer height={24} />
      <span
        style={{
          ...Font.body.body1,
          color: Color.text.secondary,
          width: '100%',
          textAlign: 'start',
        }}
      >
        {label}
        {!optional && (
          <>
            <span style={{ color: Color.text.red }}>*</span>
          </>
        )}
      </span>
      <Spacer height={16} />
    </>
  );
};
