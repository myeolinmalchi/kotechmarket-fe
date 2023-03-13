import React from 'react';
import { useContext, useState } from 'react';
import { DefaultButton } from '../components/Button';
import styled, { css } from 'styled-components';
import { Mobile, Desktop, Tablet } from '../components/common/Responsive';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import Color from '../styles/Color';
import Font from '../styles/Font';
import { DropDown } from '../components/DropDown';
import { TextField } from '../components/TextFields';
import { SpCard } from '../components/Card';
import { Pagination } from '../components/Pagination';
import { useMediaQuery } from 'react-responsive';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';

const SearchContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  gap: 12px 8px;
  margin-bottom: 28px;
  box-sizing: border-box;
  background: ${Color.light.background.white};
  border: 1px solid ${Color.light.stroke.gray1};
  ${(props) =>
    props.isDarkMode &&
    css`
      background: ${Color.light.background.gray1};
      border: 1px solid ${Color.light.stroke.gray1};
    `}
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    margin: 0 16px;
    width: calc(100% - 32px);
    margin-bottom: 28px;
    background: none;
    border: none;
    padding: 0;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 60px;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    padding: 0 16px;
    gap: 16px;
  }
`;

const support = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const [stateOpened, setStateOpened] = useState(false);
  const [selectedState, setSelectedState] = useState(-1);
  const [contents, setContents] = useState(new Array(16).fill(0));

  const { isDesktop, isMobile, isTablet } = useContext(MediaQueryContext);
  return (
    <>
      <span
        style={{
          ...Font.title.display3,
          color: isDarkMode ? '' : Color.light.text.primary,
          textAlign: 'start',
          width: '100%',
          marginBottom: isDesktop ? '48px' : '36px',
          marginTop: isDesktop ? '' : '60px',
          padding: isDesktop ? '' : '0 16px',
          boxSizing: 'border-box',
        }}
      >
        지원사업
      </span>
      <SearchContainer isDarkMode={isDarkMode}>
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '금융',
              value: '0',
            },
            {
              label: '기술',
              value: '0',
            },
            {
              label: '인력',
              value: '0',
            },
            {
              label: '수출',
              value: '0',
            },
            {
              label: '내수',
              value: '0',
            },
            {
              label: '창업',
              value: '0',
            },
            {
              label: '경영',
              value: '0',
            },
            {
              label: '기타',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          isOpened={categoryOpened}
          selected={selectedCategory}
          onClickUnit={(idx: number) => () => {
            setCategoryOpened(false);
            setSelectedCategory(idx);
          }}
          onClick={() => {
            setCategoryOpened(!categoryOpened);
          }}
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'카테고리'}
        />
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '진행 중',
              value: '0',
            },
            {
              label: '마감',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          isOpened={stateOpened}
          selected={selectedState}
          onClickUnit={(idx: number) => () => {
            setStateOpened(false);
            setSelectedState(idx);
          }}
          onClick={() => {
            setStateOpened(!stateOpened);
          }}
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'상태'}
        />
        <TextField
          state={'DEFAULT'}
          size={'S'}
          width={
            isDesktop
              ? 'calc(100% - 69px - 24px - 240px)'
              : 'calc(100% - 69px - 8px)'
          }
          placeholder={'검색어를 입력해주세요.'}
        />
        <DefaultButton
          size={'S'}
          state={'DEFAULT'}
          style={'PRIMARY'}
          type={'NONE'}
          text={'검색하기'}
          width={'69px'}
        />
      </SearchContainer>
      <CardContainer>
        {contents.map(() => (
          <SpCard
            isProceeding={true}
            src={
              'http://www.thefirstmedia.net/news/photo/202108/80255_62324_611.jpg'
            }
            marked={false}
            width={isDesktop ? 'calc(25% - 15px)' : 'calc(50% - 8px)'}
            title={'제목'}
            dday={300}
            isMobile={!isDesktop}
            category={'카테고리'}
          />
        ))}
      </CardContainer>
      <Pagination
        start={1}
        end={5}
        mode={'NORMAL'}
        currentPage={1}
        handleNextSection={() => {}}
        handlePrevSection={() => {}}
        handlePage={(page: number) => () => {}}
      />
      <div
        style={{
          marginBottom: isDesktop ? '60px' : '120px',
        }}
      ></div>
    </>
  );
};

export default support;
