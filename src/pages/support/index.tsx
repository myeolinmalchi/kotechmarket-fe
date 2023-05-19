import React from 'react';
import { useContext, useState } from 'react';
import { DefaultButton } from '../../components/Button';
import { DropDown } from '../../components/DropDown';
import { TextField } from '../../components/TextFields';
import { SpCard } from '../../components/Card';
import { Pagination } from '../../components/Pagination';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../../hocs/withPageLoadedEffect';
import { SearchContainer2, Title } from '../../components/Search';
import { CardContainer } from '../../components/CardContainer';
import { useDropDown } from '../../hooks/useDropDown';

const support = () => {
  const [contents, setContents] = useState(new Array(16).fill(0));

  const stateStates = useDropDown();
  const categoryStates = useDropDown();

  const { isDesktop } = useContext(MediaQueryContext);
  return (
    <>
      <Title>지원사업</Title>
      <SearchContainer2>
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
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'카테고리'}
          states={categoryStates}
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
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'상태'}
          states={stateStates}
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
            title={'저는 지원사업 카드입니다.'}
            dday={300}
            isMobile={!isDesktop}
            category={'카테고리'}
            id={1}
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
