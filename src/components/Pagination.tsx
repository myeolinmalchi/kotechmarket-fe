import React from 'react';
import { useContext, useMemo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { useMouseInteraction } from '../hooks/useMouseInteraction';
import Color from '../styles/Color';
import Font from '../styles/Font';

type UnitType = 'NUMBER' | 'ARROW';
type UnitState = 'DEFAULT' | 'ACTIVE' | 'DISABLED';
const PaginationUnit = ({
  unitType,
  state,
  isRight,
  num,
  onClick,
}: {
  unitType: UnitType;
  isRight?: boolean;
  state: UnitState;
  num?: number;
  onClick?: () => void;
}) => {
  const button = useRef(null);
  const { isHovered } = useMouseInteraction(button);
  const { isDarkMode } = useContext(DarkModeContext);
  const isSmallDevice = useMediaQuery({
    maxWidth: 380,
  });

  const style: React.CSSProperties = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isSmallDevice ? '25px' : '38px',
      height: isSmallDevice ? '25px' : '38px',
      border: 'none',
      borderRadius: '40px',
      cursor: 'pointer',
      transition: 'background 0.2s',
      ...(isSmallDevice ? Font.body.caption : Font.body.body1),
      ...(() => {
        if (isDarkMode) {
        } else {
          if (state === 'DEFAULT') {
            if (isHovered) {
              return {
                background: Color.light.background.gray1,
                color: Color.light.text.primary,
              };
            }
            return {
              background: Color.light.background.white,
              color: Color.light.text.primary,
            };
          }
          if (state === 'DISABLED') {
            return {
              background: Color.light.background.white,
              color: Color.light.text.disabled,
            };
          }
          if (state === 'ACTIVE') {
            return {
              background: Color.light.background.blue1,
              color: Color.light.text.white,
            };
          }
        }
      })(),
    }),
    [isHovered, state, isSmallDevice]
  );

  const arrow = useMemo(() => {
    if (isRight) {
      return (
        <svg
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.963677 0.363595C1.31515 0.0121228 1.885 0.0121228 2.23647 0.363595L8.16576 6.29288C8.55628 6.68341 8.55628 7.31657 8.16576 7.7071L2.23647 13.6364C1.885 13.9879 1.31515 13.9879 0.963678 13.6364C0.612206 13.2849 0.612206 12.7151 0.963678 12.3636L6.32728 6.99999L0.963677 1.63639C0.612205 1.28492 0.612205 0.715067 0.963677 0.363595Z"
            fill={
              state === 'DEFAULT'
                ? Color.light.text.primary
                : Color.light.text.disabled
            }
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.03632 13.6364C7.68485 13.9879 7.115 13.9879 6.76353 13.6364L0.834241 7.70712C0.443717 7.31659 0.443717 6.68343 0.834241 6.2929L6.76353 0.363613C7.115 0.0121402 7.68485 0.0121402 8.03632 0.363613C8.3878 0.715084 8.3878 1.28493 8.03632 1.6364L2.67272 7.00001L8.03632 12.3636C8.38779 12.7151 8.38779 13.2849 8.03632 13.6364Z"
            fill={
              state === 'DEFAULT'
                ? Color.light.text.primary
                : Color.light.text.disabled
            }
          />
        </svg>
      );
    }
  }, []);

  return (
    <button style={style} ref={button} onClick={onClick}>
      {unitType === 'NUMBER' ? num : arrow}
    </button>
  );
};

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 16px;
  position: relative;
`;

type PaginationMode = 'NORMAL' | 'RANGE';
type PaginationProps = {
  start: number;
  end: number;
  mode: PaginationMode;
  maxPage?: number;
  currentPage: number;
  handleNextSection?: () => void;
  handlePrevSection?: () => void;
  handlePage?: (page: number) => () => void;
};
export const Pagination = ({
  start,
  end,
  mode,
  maxPage,
  currentPage,
  handleNextSection,
  handlePrevSection,
  handlePage,
}: PaginationProps) => {
  return (
    <Container>
      {mode === 'RANGE' ? (
        <span
          style={{
            ...Font.body.body2,
            color: Color.light.text.primary,
            textAlign: 'center',
            width: 'fit-content',
          }}
        >{`${maxPage}개 중 ${start}-${end}`}</span>
      ) : (
        <></>
      )}
      <PaginationUnit
        unitType="ARROW"
        state="DEFAULT"
        isRight={false}
        onClick={handlePrevSection}
      />
      <PageWrapper>
        {new Array(end - start + 1).fill(0).map((_, idx) => (
          <PaginationUnit
            onClick={handlePage?.(idx + 1)}
            unitType={'NUMBER'}
            state={currentPage === idx + 1 ? 'ACTIVE' : 'DEFAULT'}
            num={idx + 1}
          />
        ))}
      </PageWrapper>
      <PaginationUnit
        unitType="ARROW"
        state="DEFAULT"
        isRight={true}
        onClick={handleNextSection}
      />
    </Container>
  );
};
