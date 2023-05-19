import React, { useContext, useEffect, useState } from 'react';
import EventUploadIcon from '../../../assets/images/pages/contents/upload/event.svg';
import NewsUploadIcon from '../../../assets/images/pages/contents/upload/news.svg';
import TransferUploadIcon from '../../../assets/images/pages/contents/upload/transfer.svg';
import styled from 'styled-components';
import { FreeContainer } from '../../../components/account/Container';
import { Summary, Title } from '../../../components/account/Text';
import { DefaultButton } from '../../../components/Button';
import { DarkModeContext } from '../../../contexts/DarkModeProvider';
import { MediaQueryContext } from '../../../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import Color from '../../../styles/Color';
import Font from '../../../styles/Font';

const ChooseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  margin-bottom: 36px;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    max-width: 388px;
    box-sizing: border-box;
  }
`;

const ChooseItem = styled.div<{ selected: boolean; isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 280px;
  border: 2px solid
    ${(props) =>
      props.selected
        ? Color.light.stroke.blue1
        : props.isDarkMode
        ? ''
        : Color.light.stroke.gray1};
  padding: 24px 0;
  cursor: pointer;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const ChooseItemDetail = ({
  children,
  style,
}: React.HTMLProps<HTMLSpanElement>) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isDesktop } = useContext(MediaQueryContext);
  return (
    <span
      style={{
        ...style,
        width: '100%',
        ...(isDesktop ? Font.body.body2 : Font.body.body1),
        color: isDarkMode ? '' : Color.light.text.secondary,
        display: 'flex',
        gap: '4px',
      }}
    >
      {children}
    </span>
  );
};

const choose = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [uploadType, setUploadType] = useState<'transfer' | 'event' | 'news'>();
  const { isDesktop } = useContext(MediaQueryContext);
  const navigate = useCustomNavigate();

  return (
    <FreeContainer>
      <Title style={{ marginBottom: '12px' }}>콘텐츠 등록</Title>
      <Summary style={{ marginBottom: '36px' }}>
        등록할 콘텐츠에 알맞은 카테고리를 선택해주세요.
      </Summary>
      <ChooseContainer>
        <ChooseItem
          selected={uploadType === 'transfer'}
          isDarkMode={isDarkMode}
          onClick={() => setUploadType('transfer')}
        >
          <span
            style={{
              width: '100%',
              ...(isDesktop ? Font.title.display1 : Font.title.headline),
              color: isDarkMode ? '' : Color.light.text.primary,
              textAlign: 'start',
              marginBottom: '16px',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            기술이전
          </span>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '8px',
              height: isDesktop ? '80px' : 'fit-content',
              marginBottom: isDesktop ? '24px' : '',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            <ChooseItemDetail>
              특허권, 논문 등 기술이전이 가능한 콘텐츠를 등록합니다.
            </ChooseItemDetail>
          </div>
          {isDesktop && (
            <>
              <TransferUploadIcon />
            </>
          )}
        </ChooseItem>
        <ChooseItem
          selected={uploadType === 'event'}
          isDarkMode={isDarkMode}
          onClick={() => setUploadType('event')}
        >
          <span
            style={{
              width: '100%',
              ...(isDesktop ? Font.title.display1 : Font.title.headline),
              color: isDarkMode ? '' : Color.light.text.primary,
              textAlign: 'start',
              marginBottom: '16px',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            온・오프라인 행사
          </span>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '8px',
              height: isDesktop ? '80px' : 'fit-content',
              marginBottom: isDesktop ? '24px' : '',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            <ChooseItemDetail>
              기술이전과 관련된 온오프라인 행사를 등록합니다.
            </ChooseItemDetail>
          </div>
          {isDesktop && (
            <>
              <EventUploadIcon />
            </>
          )}
        </ChooseItem>
        <ChooseItem
          isDarkMode={isDarkMode}
          selected={uploadType === 'news'}
          onClick={() => {
            setUploadType('news');
          }}
        >
          <span
            style={{
              width: '100%',
              ...(isDesktop ? Font.title.display1 : Font.title.headline),
              color: isDarkMode ? '' : Color.light.text.primary,
              textAlign: 'start',
              marginBottom: '16px',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            스토리
          </span>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '8px',
              height: isDesktop ? '80px' : 'fit-content',
              marginBottom: isDesktop ? '24px' : '',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            <ChooseItemDetail>
              기술이전 및 기술사업화에 대한 소식을 업로드합니다.
            </ChooseItemDetail>
          </div>
          {isDesktop && (
            <>
              <NewsUploadIcon />
            </>
          )}
        </ChooseItem>
      </ChooseContainer>
      <DefaultButton
        type="NONE"
        size="L"
        style="PRIMARY"
        state={uploadType ? 'DEFAULT' : 'DISABLED'}
        width={'min(420px, 100%)'}
        onClick={() => {
          try {
            navigate(`/contents/upload/${uploadType}`);
          } catch (e) {
            console.log(e);
            alert('일시적인 오류가 발생했습니다.');
            navigate('/');
          }
        }}
      >
        다음으로
      </DefaultButton>
    </FreeContainer>
  );
};

export default withPageLoadedEffect(choose);
