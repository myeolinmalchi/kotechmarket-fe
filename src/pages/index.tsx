import * as React from 'react';
import styled, { css } from 'styled-components';
import Color from '../styles/Color';
import Font from '../styles/Font';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { Tag } from '../components/Tag';
import {
  ContentCard,
  EventCard,
  NewsCard,
  SpCard,
  SubscribeCard,
} from '../components/Card';
import ImageCarousel from '../components/index/ImageCarousel';
import ChannelCarousel from '../components/index/ChannelCarousel';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import { ToastContext } from '../contexts/ToastProvider';
import { useCustomNavigate } from '../hooks/useCustomNavigate';
import withPageLoadedEffect from '../hocs/withPageLoadedEffect';

const TagContainer = styled.div<{ isDarkMode: boolean }>`
  border-radius: 4px;
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  margin: 40px 0;

  background: ${Color.light.background.gray1};
  border: ${Color.light.background.gray1};
  ${(props) =>
    props.isDarkMode &&
    css`
      background: ${Color.light.background.gray1};
      border: ${Color.light.background.gray1};
    `}
  transition: all 0.2s;
  padding: 0 20px;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.light.stroke.gray2};
  }

  @media (max-width: 1024px) {
    box-sizing: border-box;
    margin: 28px 28px 0 28px;
    width: calc(100% - 56px);
  }

  @media (max-width: 600px) {
    height: 48px;
    margin: 28px 16px 0 16px;
    width: calc(100% - 32px);
    padding: 0 8px;
  }
`;

const CardSection = styled.div<{ isDarkMode: boolean }>`
  width: 100%;
  padding: 40px 0;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;

  & > span:first-child {
    text-align: start;
    margin-bottom: 8px;
    color: ${Color.light.text.primary};
  }

  & > span:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: start;
    margin-bottom: 28px;
    color: ${Color.light.text.secondary};
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    box-sizing: border-box;
    padding: 30px 28px;
  }

  @media (max-width: 600px) {
    padding: 30px 16px;
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

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

const SubCardContainer = styled.div`
  width: 100%;
  padding-left: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 16px;
  box-sizing: border-box;
  margin-bottom: 90px;
  padding-bottom: 20px;

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.light.stroke.gray1};
  }

  @media (max-width: 600px) {
    padding-left: 16px;
  }
`;

const index = () => {
  const { isDarkMode } = React.useContext(DarkModeContext);
  const tagContainer = useHorizontalScroll();
  const { isDesktop, isTablet, isMobile } = React.useContext(MediaQueryContext);
  const { alertToast } = React.useContext(ToastContext);
  const navigate = useCustomNavigate();
  return (
    <>
      <ImageCarousel
        images={[
          'https://www.tpiinsight.co.kr/app/uploads/2020/07/%EA%B2%BD%EC%98%81%EC%BB%A8%EC%84%A4%ED%8C%85-%ED%9A%8C%EC%82%AC.jpg',
          'https://www.tpiinsight.co.kr/app/uploads/2020/07/%EA%B2%BD%EC%98%81%EC%BB%A8%EC%84%A4%ED%8C%85-%ED%9A%8C%EC%82%AC.jpg',
          'https://www.tpiinsight.co.kr/app/uploads/2020/07/%EA%B2%BD%EC%98%81%EC%BB%A8%EC%84%A4%ED%8C%85-%ED%9A%8C%EC%82%AC.jpg',
          'https://www.tpiinsight.co.kr/app/uploads/2020/07/%EA%B2%BD%EC%98%81%EC%BB%A8%EC%84%A4%ED%8C%85-%ED%9A%8C%EC%82%AC.jpg',
        ]}
      />
      <TagContainer isDarkMode={isDarkMode} ref={tagContainer}>
        {new Array(30).fill(0).map(() => (
          <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
        ))}
        <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
        <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
        <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
        <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
        <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
        <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
        <Tag state={'DEFAULT'} type={'DEFAULT'} size={'M'} text={'테스트'} />
      </TagContainer>
      <CardSection isDarkMode={isDarkMode}>
        <span
          style={{ ...(isDesktop ? Font.title.display1 : Font.title.headline) }}
        >
          기술이전
        </span>
        <span style={{ ...Font.body.body2 }}>
          전체 기술이전 보러가기
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.97578 3.57576C6.2101 3.34145 6.59 3.34145 6.82431 3.57576L10.5415 7.29292C10.932 7.68344 10.932 8.31661 10.5415 8.70713L6.82431 12.4243C6.59 12.6586 6.2101 12.6586 5.97579 12.4243C5.74147 12.19 5.74147 11.8101 5.97579 11.5758L9.55152 8.00002L5.97578 4.42429C5.74147 4.18997 5.74147 3.81007 5.97578 3.57576Z"
              fill="#5D6169"
            />
          </svg>
        </span>
        <CardContainer>
          {new Array(isDesktop ? 12 : isTablet ? 9 : 8).fill(0).map(() => (
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
      </CardSection>
      <CardSection isDarkMode={isDarkMode}>
        <span
          style={{ ...(isDesktop ? Font.title.display1 : Font.title.headline) }}
        >
          온・오프라인 행사
        </span>
        <span style={{ ...Font.body.body2 }}>
          온・오프라인 행사 보러가기
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.97578 3.57576C6.2101 3.34145 6.59 3.34145 6.82431 3.57576L10.5415 7.29292C10.932 7.68344 10.932 8.31661 10.5415 8.70713L6.82431 12.4243C6.59 12.6586 6.2101 12.6586 5.97579 12.4243C5.74147 12.19 5.74147 11.8101 5.97579 11.5758L9.55152 8.00002L5.97578 4.42429C5.74147 4.18997 5.74147 3.81007 5.97578 3.57576Z"
              fill="#5D6169"
            />
          </svg>
        </span>
        <CardContainer>
          {new Array(isTablet ? 3 : 4).fill(0).map(() => (
            <EventCard
              id={1}
              src={
                'https://www.namutech.co.kr/wp-content/uploads/2020/03/main-section-002.jpg'
              }
              marked={false}
              width={
                isDesktop
                  ? 'calc(25% - 15px)'
                  : isTablet
                  ? 'calc(33.3% - 13.3px)'
                  : 'calc(50% - 8px)'
              }
              title={'안녕하세요 저는 행사카드입니다.'}
              date={new Date()}
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
      </CardSection>
      <CardSection isDarkMode={isDarkMode}>
        <span
          style={{ ...(isDesktop ? Font.title.display1 : Font.title.headline) }}
        >
          지원사업
        </span>
        <span
          style={{ ...Font.body.body2 }}
          onClick={() => navigate('/support')}
        >
          전체 지원사업 보러가기
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.97578 3.57576C6.2101 3.34145 6.59 3.34145 6.82431 3.57576L10.5415 7.29292C10.932 7.68344 10.932 8.31661 10.5415 8.70713L6.82431 12.4243C6.59 12.6586 6.2101 12.6586 5.97579 12.4243C5.74147 12.19 5.74147 11.8101 5.97579 11.5758L9.55152 8.00002L5.97578 4.42429C5.74147 4.18997 5.74147 3.81007 5.97578 3.57576Z"
              fill="#5D6169"
            />
          </svg>
        </span>
        <CardContainer>
          {new Array(isTablet ? 9 : 8).fill(0).map(() => (
            <SpCard
              id={1}
              isProceeding={true}
              src={
                'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201506/15/htm_20150615180939534.jpg'
              }
              marked={false}
              width={
                isDesktop
                  ? 'calc(25% - 15px)'
                  : isTablet
                  ? 'calc(33.3% - 13.3px)'
                  : 'calc(50% - 8px)'
              }
              category={'카테고리'}
              title={'안녕하세요 저는 지원사업 카드입니다.'}
              dday={500}
              isMobile={!isDesktop}
            />
          ))}
        </CardContainer>
      </CardSection>
      <CardSection isDarkMode={isDarkMode}>
        <span
          style={{ ...(isDesktop ? Font.title.display1 : Font.title.headline) }}
        >
          뉴스
        </span>
        <span style={{ ...Font.body.body2 }}>
          전체 뉴스 보러가기
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.97578 3.57576C6.2101 3.34145 6.59 3.34145 6.82431 3.57576L10.5415 7.29292C10.932 7.68344 10.932 8.31661 10.5415 8.70713L6.82431 12.4243C6.59 12.6586 6.2101 12.6586 5.97579 12.4243C5.74147 12.19 5.74147 11.8101 5.97579 11.5758L9.55152 8.00002L5.97578 4.42429C5.74147 4.18997 5.74147 3.81007 5.97578 3.57576Z"
              fill="#5D6169"
            />
          </svg>
        </span>
        <CardContainer>
          {new Array(isTablet ? 3 : 4).fill(0).map(() => (
            <NewsCard
              id={1}
              src={
                'https://img.freepik.com/premium-photo/innovation-technology-for-business-finance-background_31965-2378.jpg'
              }
              marked={false}
              width={
                isDesktop
                  ? 'calc(25% - 15px)'
                  : isTablet
                  ? 'calc(33.3% - 13.3px)'
                  : 'calc(50% - 8px)'
              }
              title={'안녕하세요 저는 뉴스 카드입니다.'}
              summary={
                '국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다.'
              }
              author={{
                name: 'Name',
                img: 'http://img.segye.com/content/image/2020/08/07/20200807507499.jpg',
              }}
              date={new Date()}
              isMobile={!isDesktop}
            />
          ))}
        </CardContainer>
      </CardSection>
      <CardSection isDarkMode={isDarkMode} style={{ padding: '30px 0' }}>
        <span
          style={{
            ...(isDesktop ? Font.title.display1 : Font.title.headline),
            padding: isDesktop ? '' : isTablet ? '0 28px' : '0 16px',
          }}
        >
          추천 채널
        </span>
        <span
          style={{
            ...Font.body.body2,
            padding: isDesktop ? '' : isTablet ? '0 28px' : '0 16px',
          }}
        >
          전체 채널 보러가기
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.97578 3.57576C6.2101 3.34145 6.59 3.34145 6.82431 3.57576L10.5415 7.29292C10.932 7.68344 10.932 8.31661 10.5415 8.70713L6.82431 12.4243C6.59 12.6586 6.2101 12.6586 5.97579 12.4243C5.74147 12.19 5.74147 11.8101 5.97579 11.5758L9.55152 8.00002L5.97578 4.42429C5.74147 4.18997 5.74147 3.81007 5.97578 3.57576Z"
              fill="#5D6169"
            />
          </svg>
        </span>
        {!isDesktop && (
          <SubCardContainer>
            {new Array(12).fill(0).map((_, idx) => (
              <SubscribeCard
                summary={'한줄소개'}
                src={
                  'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png'
                }
                minWidth={'max(150px, calc(25% - 8px))'}
                width={'calc(40% - 8px)'}
                title={`업체 이름${idx}`}
                isMobile={!isDesktop}
                subscribed={false}
              />
            ))}
          </SubCardContainer>
        )}
      </CardSection>
      {isDesktop && (
        <ChannelCarousel
          images={[
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
            'https://blog.kakaocdn.net/dn/cqr8Fg/btroYjJwRj0/t0Q2qchFFksi6GbOiTGpt0/img.png',
          ]}
        />
      )}
    </>
  );
};

export default withPageLoadedEffect(index);
