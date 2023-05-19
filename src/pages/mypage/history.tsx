import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import { DropDown } from '../../components/DropDown';
import { TextField } from '../../components/TextFields';
import { DefaultButton } from '../../components/Button';
import {
  ContentCard,
  EventCard,
  NewsCard,
  SpCard,
} from '../../components/Card';
import { MediaQueryContext } from '../../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../../hocs/withPageLoadedEffect';
import { ModalContext } from '../../contexts/ModalProvider';
import { SearchContainer, Title } from '../../components/Search';
import {
  CardContainer,
  CardSectionTitle,
} from '../../components/CardContainer';
import { useDropDown } from '../../hooks/useDropDown';
import { useStyleContext } from '../../contexts/AppContextProvider';

const history = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [selectedCategory, setSelectecCategory] = useState(-1);
  const [categoryOpened, setCategoryOpened] = useState(false);
  const { isDesktop, isMobile, isTablet } = useContext(MediaQueryContext);

  const { openModal, closeModal } = useContext(ModalContext);

  const categoryState = useDropDown();

  const openDeleteModal = React.useCallback(() => {
    openModal({
      title: '시청기록을 삭제할까요?',
      content: '시청기록 삭제시 복구가 불가능합니다.',
      buttonType: 2,
      primaryButtonLabel: '시청기록 지우기',
      secondaryButtonLabel: '취소하기',
      onPrimaryButtonClick: () => {
        alert('삭제가 완료되었습니다.');
        closeModal();
      },
      onSecondaryButtonClick: () => {
        closeModal();
      },
    });
  }, []);

  return (
    <>
      <Title>시청기록</Title>
      <SearchContainer>
        <DropDown
          width={isDesktop ? '120px' : '84px'}
          size={'S'}
          states={categoryState}
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
      <CardSectionTitle>기술이전</CardSectionTitle>
      <CardContainer>
        {new Array(isTablet ? 9 : 8).fill(0).map(() => (
          <>
            <ContentCard
              width={
                isDesktop
                  ? 'calc(25% - 15px)'
                  : isMobile
                  ? 'calc(50% - 8px)'
                  : 'calc(33.3% - 11px)'
              }
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
      <CardSectionTitle>행사</CardSectionTitle>
      <CardContainer>
        {new Array(isTablet ? 9 : 8).fill(0).map(() => (
          <>
            <EventCard
              id={0}
              width={
                isDesktop
                  ? 'calc(25% - 15px)'
                  : isMobile
                  ? 'calc(50% - 8px)'
                  : 'calc(33.3% - 11px)'
              }
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
      <CardSectionTitle>지원사업</CardSectionTitle>
      <CardContainer>
        {new Array(isTablet ? 9 : 8).fill(0).map(() => (
          <>
            <SpCard
              id={0}
              isProceeding={true}
              src={
                'http://www.thefirstmedia.net/news/photo/202108/80255_62324_611.jpg'
              }
              marked={true}
              width={
                isDesktop
                  ? 'calc(25% - 15px)'
                  : isMobile
                  ? 'calc(50% - 8px)'
                  : 'calc(33.3% - 11px)'
              }
              title={'제목'}
              dday={300}
              isMobile={!isDesktop}
              category={'카테고리'}
            />
          </>
        ))}
      </CardContainer>
      <CardSectionTitle>뉴스</CardSectionTitle>
      <CardContainer
        style={{
          marginBottom: '32px',
        }}
      >
        {new Array(isTablet ? 9 : 8).fill(0).map(() => (
          <>
            <NewsCard
              id={0}
              category={'카테고리'}
              width={
                isDesktop
                  ? 'calc(25% - 15px)'
                  : isMobile
                  ? 'calc(50% - 8px)'
                  : 'calc(33.3% - 11px)'
              }
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
          onClick={() => openDeleteModal()}
        />
      </div>
    </>
  );
};

export default withPageLoadedEffect(history);
