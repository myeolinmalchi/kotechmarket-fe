import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Mobile, Desktop } from '../../components/common/Responsive';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import Color from '../../styles/Color';
import Font from '../../styles/Font';
import { DropDown } from '../../components/DropDown';
import { TextField } from '../../components/TextFields';
import { DefaultButton } from '../../components/Button';
import {
  ContentCard,
  EventCard,
  NewsCard,
  SpCard,
} from '../../components/Card';
import Modal from '../../components/Modal';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';

const SearchContainer = styled.div<{ isDarkMode: boolean }>`
  flex: 1 0 auto;
  border: 1px solid
    ${(props) => (props.isDarkMode ? '' : Color.light.stroke.gray1)};
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    padding: 0 16px;
    box-sizing: border-box;
    border: none;
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
  margin-bottom: 80px;
  @media (max-width: 1024px) {
    padding: 0 16px;
    box-sizing: border-box;
    gap: 16px;
    margin-bottom: 60px;
  }
`;

const stored = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [selectedCategory, setSelectecCategory] = useState(-1);
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <>
      <Modal
        buttonType={2}
        title={'보관함 콘텐츠를 삭제할까요?'}
        content={'보관함 콘텐츠 삭제시 복구가 불가능합니다.'}
        visible={deleteModalOpened}
        primaryButtonLabel={'보관함 콘텐츠 지우기'}
        secondaryButtonLabel={'취소하기'}
        onPrimaryButtonClick={() => {
          alert('삭제가 완료되었습니다.');
          setDeleteModalOpened(false);
        }}
        onSecondaryButtonClick={() => {
          setDeleteModalOpened(false);
        }}
      />
      <span
        style={{
          ...(isDesktop ? Font.title.display3 : Font.title.display1),
          padding: isDesktop ? '' : '0 16px',
          marginTop: isDesktop ? '' : '60px',
          boxSizing: 'border-box',
          color: isDarkMode ? '' : Color.light.text.primary,
          width: '100%',
          textAlign: 'start',
          marginBottom: isDesktop ? '48px' : '36px',
        }}
      >
        보관함
      </span>
      <SearchContainer isDarkMode={isDarkMode}>
        <DropDown
          width={isDesktop ? '120px' : '84px'}
          size={'S'}
          isOpened={categoryOpened}
          type="DEFAULT"
          contents={[
            {
              label: '기술이전',
              value: '',
            },
            {
              label: '온오프라인 행사',
              value: '',
            },
            {
              label: '지원사업',
              value: '',
            },
            {
              label: '뉴스',
              value: '',
            },
          ]}
          selected={selectedCategory}
          onClickUnit={(idx: number) => () => {
            setSelectecCategory(idx);
            setCategoryOpened(false);
          }}
          onClick={() => {
            setCategoryOpened(!categoryOpened);
          }}
          placeholder={'전체'}
        />
        <TextField
          width={
            isDesktop
              ? 'calc(100% - 120px - 69px - 8px)'
              : 'calc(100% - 84px - 69px - 8px)'
          }
          state={'DEFAULT'}
          size={'S'}
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
      <span
        style={{
          ...(isDesktop ? Font.title.display1 : Font.title.headline),
          boxSizing: 'border-box',
          padding: isDesktop ? '' : '0 16px',
          color: isDarkMode ? '' : Color.light.text.primary,
          width: '100%',
          textAlign: 'start',
          marginBottom: '28px',
        }}
      >
        기술이전
      </span>
      <CardContainer>
        {new Array(8).fill(0).map(() => (
          <>
            <ContentCard
              width={isDesktop ? 'calc(25% - 15px)' : 'calc(50% - 8px)'}
              src={
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zZj6XVimok962QJeHfcs4QHaE0%26pid%3DApi&f=1&ipt=d70f143a053857baf1313e07f88f255d92d1aab8bb1d0c33c3f8c35f1547a946&ipo=images'
              }
              title={'안녕하세요 저는 기술찾기카드입니다.'}
              tags={[
                '저는 태그입니다',
                '저는 태그입니다',
                '저는 태그입니다',
                '저는 태그입니다',
              ]}
              date={new Date()}
              isMobile={!isDesktop}
              author={{
                name: 'Name',
                img: '',
              }}
              marked={true}
            />
          </>
        ))}
      </CardContainer>
      <span
        style={{
          ...(isDesktop ? Font.title.display1 : Font.title.headline),
          boxSizing: 'border-box',
          padding: isDesktop ? '' : '0 16px',
          color: isDarkMode ? '' : Color.light.text.primary,
          width: '100%',
          textAlign: 'start',
          marginBottom: '28px',
        }}
      >
        행사
      </span>
      <CardContainer>
        {new Array(8).fill(0).map(() => (
          <>
            <EventCard
              width={isDesktop ? 'calc(25% - 15px)' : 'calc(50% - 8px)'}
              src={
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RzAHK936x1p0dHeDa93SnAHaDt%26pid%3DApi&f=1&ipt=837d35239c07983b34e26b4d414e68733b35ac60d3c843cdccda31b194edfd20&ipo=images'
              }
              preInfo={{
                date: new Date(),
                isOffline: true,
              }}
              title={'안녕하세요 저는 행사카드입니다.'}
              date={new Date()}
              isMobile={!isDesktop}
              author={{
                name: 'Name',
                img: '',
              }}
              marked={true}
            />
          </>
        ))}
      </CardContainer>
      <span
        style={{
          ...(isDesktop ? Font.title.display1 : Font.title.headline),
          boxSizing: 'border-box',
          padding: isDesktop ? '' : '0 16px',
          color: isDarkMode ? '' : Color.light.text.primary,
          width: '100%',
          textAlign: 'start',
          marginBottom: '28px',
        }}
      >
        지원사업
      </span>
      <CardContainer>
        {new Array(8).fill(0).map(() => (
          <>
            <SpCard
              isProceeding={true}
              src={
                'http://www.thefirstmedia.net/news/photo/202108/80255_62324_611.jpg'
              }
              marked={true}
              width={isDesktop ? 'calc(25% - 15px)' : 'calc(50% - 8px)'}
              title={'제목'}
              dday={300}
              isMobile={!isDesktop}
              category={'카테고리'}
            />
          </>
        ))}
      </CardContainer>
      <span
        style={{
          ...(isDesktop ? Font.title.display1 : Font.title.headline),
          boxSizing: 'border-box',
          padding: isDesktop ? '' : '0 16px',
          color: isDarkMode ? '' : Color.light.text.primary,
          width: '100%',
          textAlign: 'start',
          marginBottom: '28px',
        }}
      >
        뉴스
      </span>
      <CardContainer
        style={{
          marginBottom: '32px',
        }}
      >
        {new Array(8).fill(0).map(() => (
          <>
            <NewsCard
              category={'카테고리'}
              width={isDesktop ? 'calc(25% - 15px)' : 'calc(50% - 8px)'}
              summary={
                '국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다.'
              }
              src={
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zZj6XVimok962QJeHfcs4QHaE0%26pid%3DApi&f=1&ipt=d70f143a053857baf1313e07f88f255d92d1aab8bb1d0c33c3f8c35f1547a946&ipo=images'
              }
              title={'안녕하세요 저는 뉴스카드입니다.'}
              date={new Date()}
              isMobile={!isDesktop}
              author={{
                name: 'Name',
                img: '',
              }}
              marked={true}
            />
          </>
        ))}
      </CardContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          padding: isDesktop ? '' : '0 16px',
          boxSizing: 'border-box',
          marginBottom: isDesktop ? '' : '120px',
        }}
      >
        <DefaultButton
          style={'OUTLINE'}
          state={'DEFAULT'}
          type={'NONE'}
          size={'S'}
          text={'전체 삭제'}
          onClick={() => setDeleteModalOpened(true)}
        />
      </div>
    </>
  );
};

export default stored;
