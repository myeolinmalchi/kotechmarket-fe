import React from 'react';
import styled from 'styled-components';
import { DefaultButton, TextButton } from '../../../components/Button';
import { DropDown } from '../../../components/DropDown';
import { Pagination } from '../../../components/Pagination';
import { SearchContainer2, Title } from '../../../components/Search';
import {
  ColumnWidth,
  FlexWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
} from '../../../components/Table';
import { TextField } from '../../../components/TextFields';
import {
  useMediaQueryContext,
  useStyleContext,
} from '../../../contexts/AppContextProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import { useDropDown } from '../../../hooks/useDropDown';
import Font from '../../../styles/Font';
import { ColorType } from '../../../types/Style';

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

const transfer = () => {
  const { isDesktop } = useMediaQueryContext();

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

  const categoryStates = useDropDown();
  const stateStates = useDropDown();

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
              label: '제목',
              value: '0',
            },
            {
              label: '수신기관',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          states={categoryStates}
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
              label: '답변 전',
              value: '0',
            },
            {
              label: '답변 완료',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          states={stateStates}
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
            <ColumnWidth width="10%" />
            <ColumnWidth width="50%" />
            <ColumnWidth width="10%" />
            <ColumnWidth width="20%" />
            <ColumnWidth width="10%" />
          </colgroup>
          <thead>
            <tr style={{ ...Font.body.caption }}>
              <Th>번호</Th>
              <Th>제목</Th>
              <Th>수신기관</Th>
              <Th>작성일</Th>
              <Th>작업상태</Th>
            </tr>
          </thead>
          <tbody style={{ ...Font.body.caption }}>
            {new Array(10).fill(0).map((_, idx) => (
              <>
                <tr>
                  <Td>10</Td>
                  <Td onClick={() => navigate('/mypage/transfer/detail?id=1')}>
                    <span
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textAlign: 'start',
                      }}
                    >
                      나는요 오빠가 좋은걸 암인마드리이이이이이이이이이이잉
                    </span>
                  </Td>
                  <Td
                    style={{
                      padding: '0 16px',
                      boxSizing: 'border-box',
                    }}
                  >
                    서울대학교
                  </Td>
                  <Td>2013-00-00 00시 00분</Td>
                  <Td>답변 전</Td>
                </tr>
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

export default withPageLoadedEffect(transfer);
