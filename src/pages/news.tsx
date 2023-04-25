import React from 'react';
import { useContext, useState } from 'react';
import { DefaultButton } from '../components/Button';
import { DropDown } from '../components/DropDown';
import { TextField } from '../components/TextFields';
import { NewsCard } from '../components/Card';
import { Pagination } from '../components/Pagination';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../hocs/withPageLoadedEffect';
import { SearchContainer, Title } from '../components/Search';
import { CardContainer } from '../components/CardContainer';
import { useDropDown } from '../hooks/useDropDown';

const news = () => {
  const [contents, setContents] = useState(new Array(16).fill(0));

  const stateStates = useDropDown();
  const categoryStates = useDropDown();

  const { isDesktop } = useContext(MediaQueryContext);
  return (
    <>
      <Title>뉴스</Title>
      <SearchContainer>
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '특허',
              value: '0',
            },
            {
              label: '기술동향',
              value: '0',
            },
            {
              label: '기술동향',
              value: '0',
            },
            {
              label: '기술정책',
              value: '0',
            },
            {
              label: '기술이전',
              value: '0',
            },
            {
              label: '기술사업화',
              value: '0',
            },
            {
              label: '업무협약',
              value: '0',
            },
            {
              label: '연구성과',
              value: '0',
            },
            {
              label: '행사',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          width={isDesktop ? '200px' : 'calc(50% - 4px)'}
          placeholder={'카테고리'}
          states={categoryStates}
        />
        <TextField
          state={'DEFAULT'}
          size={'S'}
          width={
            isDesktop
              ? 'calc(100% - 69px - 12px - 200px)'
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
          <NewsCard
            id={1}
            author={{
              name: '홍길동 기자',
            }}
            date={new Date()}
            summary={
              '국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다.'
            }
            src={
              'https://img.freepik.com/premium-photo/innovation-technology-for-business-finance-background_31965-2378.jpg'
            }
            marked={false}
            width={isDesktop ? 'calc(25% - 15px)' : 'calc(50% - 8px)'}
            title={'안녕하세요 저는 뉴스 카드입니다.'}
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

export default withPageLoadedEffect(news);
