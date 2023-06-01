import React from 'react';
import { useState } from 'react';
import { DefaultButton } from '../../components/Button';
import { DropDown } from '../../components/DropDown';
import { TextField } from '../../components/TextFields';
import { ContentCard, EventCard } from '../../components/Card';
import { Pagination } from '../../components/Pagination';
import withPageLoadedEffect from '../../hocs/withPageLoadedEffect';
import { SearchContainer2, Title } from '../../components/Search';
import { CardContainer } from '../../components/CardContainer';
import { useDropDown } from '../../hooks/useDropDown';
import { useMediaQueryContext } from '../../contexts/AppContextProvider';

const transfer = () => {
  const [contents, setContents] = useState(new Array(16).fill(0));

  const stateStates = useDropDown();
  const sortbyStates = useDropDown();

  const { isDesktop, isTablet } = useMediaQueryContext();

  return (
    <>
      <Title>기술이전</Title>
      <SearchContainer2>
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '기계/소재',
              value: '0',
            },
            {
              label: '바이오/의류',
              value: '0',
            },
            {
              label: '전기/전자',
              value: '0',
            },
            {
              label: '딥러닝',
              value: '0',
            },
            {
              label: '네트워크',
              value: '0',
            },
            {
              label: '정보통신',
              value: '0',
            },
            {
              label: '지식서비스',
              value: '0',
            },
            {
              label: '로봇',
              value: '0',
            },
            {
              label: '화학',
              value: '0',
            },
            {
              label: '의료기기',
              value: '0',
            },
            {
              label: '식품',
              value: '0',
            },
            {
              label: '식물',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          states={stateStates}
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
          <ContentCard
            src={
              'https://blog.kakaocdn.net/dn/FvgoH/btroVrBfne2/TyxT9NTywOkvBhLin5qZs0/img.jpg'
            }
            marked={false}
            width={
              isDesktop
                ? 'calc(25% - 15px)'
                : isTablet
                ? 'calc(33.3% - 13.3px)'
                : 'calc(50% - 8px)'
            }
            tags={[
              '저는 태그입니다.',
              '저는 태그입니다.',
              '저는 태그입니다.',
              '저는 태그입니다.',
              '저는 태그입니다.',
              '저는 태그입니다.',
              '저는 태그입니다.',
            ]}
            title={'안녕하세요 저는 기술찾기 카드입니다.'}
            author={{
              name: 'Name',
              img: 'https://img.hankyung.com/photo/202108/BF.27112611.1.jpg',
            }}
            date={new Date()}
            isMobile={!isDesktop}
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

export default withPageLoadedEffect(transfer);
