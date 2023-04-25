import React from 'react';
import { useState } from 'react';
import { DefaultButton } from '../components/Button';
import { DropDown } from '../components/DropDown';
import { TextField } from '../components/TextFields';
import { EventCard } from '../components/Card';
import { Pagination } from '../components/Pagination';
import withPageLoadedEffect from '../hocs/withPageLoadedEffect';
import { SearchContainer2, Title } from '../components/Search';
import { CardContainer } from '../components/CardContainer';
import { useDropDown } from '../hooks/useDropDown';
import { useMediaQueryContext } from '../contexts/AppContextProvider';

const event = () => {
  const [contents, setContents] = useState(new Array(16).fill(0));

  const stateStates = useDropDown();
  const sortbyStates = useDropDown();

  const { isDesktop } = useMediaQueryContext();

  return (
    <>
      <Title>행사</Title>
      <SearchContainer2>
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
          states={stateStates}
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'상태'}
        />
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '최신순',
              value: '0',
            },
            {
              label: '인기순',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          states={sortbyStates}
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'정렬 기준'}
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
        {contents.map((_, idx) => (
          <EventCard
            id={idx}
            date={new Date()}
            src={
              'https://www.namutech.co.kr/wp-content/uploads/2020/03/main-section-002.jpg'
            }
            marked={false}
            width={isDesktop ? 'calc(25% - 15px)' : 'calc(50% - 8px)'}
            title={'안녕하세요 행사카드입니다.'}
            isMobile={!isDesktop}
            preInfo={{
              date: new Date(),
              isOffline: true,
            }}
            author={{
              name: 'Name',
            }}
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

export default withPageLoadedEffect(event);
