import React from 'react';
import styled from 'styled-components';
import { DefaultButton, TextButton } from '../../components/Button';
import { DropDown } from '../../components/DropDown';
import { Pagination } from '../../components/Pagination';
import {
  SearchContainer,
  SearchContainer2,
  Title,
} from '../../components/Search';
import {
  ColumnWidth,
  FlexWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
} from '../../components/Table';
import { TextField } from '../../components/TextFields';
import {
  useMediaQueryContext,
  useStyleContext,
} from '../../contexts/AppContextProvider';
import withPageLoadedEffect from '../../hocs/withPageLoadedEffect';
import { useCustomNavigate } from '../../hooks/useCustomNavigate';
import { useDropDown } from '../../hooks/useDropDown';
import Font from '../../styles/Font';
import { ColorType } from '../../types/Style';

const Spacer = styled.div<{ height: number }>`
  margin-bottom: ${(props) => `${props.height}px`};
`;

const ImageArea = styled.div<{ src?: string; Color: ColorType }>`
  background-image: url(${({ src }) => src});
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 120px;
  height: 80px;
  position: relative;
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  border-radius: 4px;
`;

const EventsDetailInfo = ({ opacity }: { opacity: boolean }) => {
  const { Color } = useStyleContext();
  return (
    <>
      <tr
        style={{
          opacity: opacity ? '1' : '0',
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <td
          colSpan={5}
          style={{
            padding: '24px',
            boxSizing: 'border-box',
            background: Color.background.gray1,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '14px',
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                width: '100%',
                ...Font.title.headline,
                color: Color.text.primary,
                marginBottom: '6px',
              }}
            >
              행사정보
            </span>
            <span
              style={{
                width: '140px',
                ...Font.body.body1,
                color: Color.text.primary,
              }}
            >
              행사 날짜
            </span>
            <span
              style={{
                width: 'calc(100% - 154px)',
                ...Font.title.subhead2,
                color: Color.text.primary,
              }}
            >
              2023-00-00 00시 00분
            </span>
            <span
              style={{
                width: '140px',
                ...Font.body.body1,
                color: Color.text.primary,
              }}
            >
              행사 장소
            </span>
            <span
              style={{
                width: 'calc(100% - 154px)',
                ...Font.title.subhead2,
                color: Color.text.primary,
              }}
            >
              온라인 · 메타버스
            </span>
            <span
              style={{
                width: '140px',
                ...Font.body.body1,
                color: Color.text.primary,
              }}
            >
              가격
            </span>
            <span
              style={{
                width: 'calc(100% - 154px)',
                ...Font.title.subhead2,
                color: Color.text.primary,
              }}
            >
              무료
            </span>
          </div>
          <Spacer height={32} />
          <div
            style={{
              display: 'flex',
              gap: '14px',
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                width: '100%',
                ...Font.title.headline,
                color: Color.text.primary,
                marginBottom: '6px',
              }}
            >
              신청자 정보1
            </span>
            <span
              style={{
                width: '140px',
                ...Font.body.body1,
                color: Color.text.primary,
              }}
            >
              이름
            </span>
            <span
              style={{
                width: 'calc(100% - 154px)',
                ...Font.title.subhead2,
                color: Color.text.primary,
              }}
            >
              홍길동
            </span>
            <span
              style={{
                width: '140px',
                ...Font.body.body1,
                color: Color.text.primary,
              }}
            >
              이메일
            </span>
            <span
              style={{
                width: 'calc(100% - 154px)',
                ...Font.title.subhead2,
                color: Color.text.primary,
              }}
            >
              minsuk4820@gmail.com
            </span>
            <span
              style={{
                width: '140px',
                ...Font.body.body1,
                color: Color.text.primary,
              }}
            >
              전화번호
            </span>
            <span
              style={{
                width: 'calc(100% - 154px)',
                ...Font.title.subhead2,
                color: Color.text.primary,
              }}
            >
              010-1234-5678
            </span>
            <span
              style={{
                width: '140px',
                ...Font.body.body1,
                color: Color.text.primary,
              }}
            >
              신청행사
            </span>
            <span
              style={{
                width: 'calc(100% - 154px)',
                ...Font.title.subhead2,
                color: Color.text.primary,
              }}
            >
              온라인 행사
            </span>
          </div>
          <Spacer height={24} />
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'end',
            }}
          >
            <TextButton style={'SECONDARY'} type={'UNDERLINE'} size={'S'}>
              취소신청
            </TextButton>
          </div>
        </td>
      </tr>
    </>
  );
};

const events = () => {
  const { isDesktop } = useMediaQueryContext();

  const categoryState = useDropDown();
  const { Color } = useStyleContext();

  const navigate = useCustomNavigate();

  const [eventDetailsVisible, setEventDetailsVisible] = React.useState<
    boolean[]
  >(new Array(10).fill(false));

  const [eventDetailsOpacity, setEventDetailsOpacity] = React.useState<
    boolean[]
  >(new Array(10).fill(false));

  React.useEffect(() => {
    setEventDetailsOpacity(eventDetailsVisible);
  }, [eventDetailsVisible]);

  const toggleEventDetailVisible = (idx: number) => () => {
    setEventDetailsVisible(
      eventDetailsVisible.map((v, i) => (i === idx ? !v : v))
    );
  };

  const stateStates = useDropDown();
  const priceStates = useDropDown();

  return (
    <>
      <Title>신청한 행사</Title>
      <SearchContainer2>
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '확인 전',
              value: '0',
            },
            {
              label: '승인 완료',
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
              label: '무료',
              value: '0',
            },
            {
              label: '유료',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          states={priceStates}
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'유/무료'}
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
      <TableWrapper Color={Color}>
        <Table Color={Color}>
          <colgroup>
            <ColumnWidth width="15%" />
            <ColumnWidth width="50%" />
            <ColumnWidth width="15%" />
            <ColumnWidth width="10%" />
            <ColumnWidth width="10%" />
          </colgroup>
          <thead>
            <tr style={{ ...Font.body.caption }}>
              <Th>신청시간</Th>
              <Th>행사명</Th>
              <Th>주최기관</Th>
              <Th>상태</Th>
              <Th>상세정보</Th>
            </tr>
          </thead>
          <tbody style={{ ...Font.body.caption }}>
            {new Array(10).fill(0).map((_, idx) => (
              <>
                <tr>
                  <Td>2023-00-00 00시 00분</Td>
                  <Td onClick={() => navigate('/events/detail?id=1')}>
                    <FlexWrapper
                      style={{ padding: '12px 16px', boxSizing: 'border-box' }}
                    >
                      <ImageArea
                        src={
                          'https://i.namu.wiki/i/O1gm_26KActhYiVHQHBZ2HaUKMGIv1YqEJLufOdL5AzXvu4eH5x7Dov6KPthNtkhBKhfvAhY6DjC7reJyNcWUQ.webp'
                        }
                        Color={Color}
                      />
                      <span
                        style={{
                          width: 'calc(100% - 128px)',
                          textAlign: 'start',
                          cursor: 'pointer',
                        }}
                      >
                        동해물과 백두산이 마르고 닳도록 하느님이 보우하사
                        우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로
                        길이 보전하세
                      </span>
                    </FlexWrapper>
                  </Td>
                  <Td
                    style={{
                      padding: '0 16px',
                      boxSizing: 'border-box',
                    }}
                  >
                    서울대학교
                  </Td>
                  <Td
                    style={{
                      color: Color.text.blue,
                    }}
                  >
                    승인 완료
                  </Td>
                  <Td>
                    <FlexWrapper
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <DefaultButton
                        size={'S'}
                        onClick={toggleEventDetailVisible(idx)}
                      >
                        더보기
                      </DefaultButton>
                    </FlexWrapper>
                  </Td>
                </tr>
                {eventDetailsVisible[idx] && (
                  <EventsDetailInfo opacity={eventDetailsOpacity[idx]} />
                )}
              </>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Spacer height={60} />
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

export default withPageLoadedEffect(events);
