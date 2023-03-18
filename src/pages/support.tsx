import React from 'react';
import { useContext, useState } from 'react';
import { DefaultButton } from '../components/Button';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { DropDown } from '../components/DropDown';
import { TextField } from '../components/TextFields';
import { SpCard } from '../components/Card';
import { Pagination } from '../components/Pagination';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../hocs/withPageLoadedEffect';
import { SearchContainer2, Title } from '../components/Search';
import { CardContainer } from '../components/CardContainer';

const support = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const [stateOpened, setStateOpened] = useState(false);
  const [selectedState, setSelectedState] = useState(-1);
  const [contents, setContents] = useState(new Array(16).fill(0));

  const { isDesktop } = useContext(MediaQueryContext);
  return (
    <>
      <Title>지원사업</Title>
      <SearchContainer2 isDarkMode={isDarkMode}>
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
      </SearchContainer2>
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

export default withPageLoadedEffect(support);
