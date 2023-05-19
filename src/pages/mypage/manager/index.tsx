import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import Avatar from '../../../components/Avatar';
import { DefaultButton } from '../../../components/Button';
import { DropDown } from '../../../components/DropDown';
import { Pagination } from '../../../components/Pagination';
import { SearchContainer2, Title } from '../../../components/Search';
import { TextField } from '../../../components/TextFields';
import { DarkModeContext } from '../../../contexts/DarkModeProvider';
import { MediaQueryContext } from '../../../contexts/MediaQueryProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import { useDropDown } from '../../../hooks/useDropDown';
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';
import Color from '../../../styles/Color';
import Font from '../../../styles/Font';

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;

  @media (max-width: 1024px) {
    width: calc(100% - 56px);
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    width: calc(100% - 32px);
  }

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.light.background.gray2};
    border-radius: 5px;
  }
`;

const Th = styled.th`
  border: none;
  box-sizing: border-box;
  text-align: center;
  height: 42px;
  vertical-align: middle;
`;

const Td = styled.td`
  border: none;
  text-align: center;
  box-sizing: border-box;
  height: 42px;
  vertical-align: middle;
`;

const FlexWrapper = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: ${({ gap }) => gap ?? '8px'};
`;

const AddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    padding: 0 28px;
  }
  @media (max-width: 600) {
    padding: 0 16px;
  }
`;

const Table = styled.table<{ isDarkMode: boolean }>`
  width: 100%;
  min-width: 900px;
  ${Th} {
    background: ${({ isDarkMode }) =>
      isDarkMode ? '' : Color.light.background.gray1};
    color: ${({ isDarkMode }) =>
      isDarkMode ? '' : Color.light.text.secondary};
    text-align: center;
  }
  ${Td} {
    color: ${({ isDarkMode }) =>
      isDarkMode ? '' : Color.light.text.secondary};
  }
  ${Td}:first-child {
    color: ${({ isDarkMode }) =>
      isDarkMode ? '' : Color.light.text.secondary};
    padding: 0 16px;
  }
  ${Td}:first-child > ${FlexWrapper} {
    justify-content: start;
  }

  ${Td}:nth-child(8).active {
    color: ${({ isDarkMode }) => (isDarkMode ? '' : Color.light.text.blue)};
  }
  ${Td}:nth-child(8).onleave {
    color: ${({ isDarkMode }) =>
      isDarkMode ? '' : Color.light.text.secondary};
  }
  ${Td}:nth-child(8).terminated {
    color: ${({ isDarkMode }) => (isDarkMode ? '' : Color.light.text.disabled)};
  }
`;

const ColumnWidth = styled.col`
  width: ${(props) => props.width};
`;

const manager = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const [stateOpened, setStateOpened] = useState(false);
  const [selectedState, setSelectedState] = useState(-1);

  const navigate = useCustomNavigate();
  const tableRef = useHorizontalScroll();

  const categoryState = useDropDown();
  const stateState = useDropDown();
  return (
    <>
      <Title>담당자 관리</Title>
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
          states={categoryState}
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
              label: '진행 중',
              value: '0',
            },
            {
              label: '마감',
              value: '0',
            },
          ]}
          type={'DEFAULT'}
          states={stateState}
          width={isDesktop ? '120px' : 'calc(50% - 4px)'}
          placeholder={'상태'}
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
      <TableWrapper style={{ marginBottom: '32px' }} ref={tableRef}>
        <Table isDarkMode={isDarkMode}>
          <colgroup>
            <ColumnWidth width="17%" />
            <ColumnWidth width="8%" />
            <ColumnWidth width="8%" />
            <ColumnWidth width="8%" />
            <ColumnWidth width="18%" />
            <ColumnWidth width="10%" />
            <ColumnWidth width="10%" />
            <ColumnWidth width="10%" />
            <ColumnWidth width="10%" />
          </colgroup>
          <thead>
            <tr style={{ ...Font.body.caption }}>
              <Th>담당자</Th>
              <Th>부서</Th>
              <Th>직책</Th>
              <Th>기자유무</Th>
              <Th>이메일</Th>
              <Th>사무실 연락처</Th>
              <Th>휴대폰 번호</Th>
              <Th>근무상태</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody style={{ ...Font.body.caption }}>
            <tr>
              <Td>
                <FlexWrapper>
                  <Avatar size={'M2'} />
                  김사무엘
                </FlexWrapper>
              </Td>
              <Td>부서명</Td>
              <Td>직책</Td>
              <Td>X</Td>
              <Td>test@naver.com</Td>
              <Td>051-123-1234</Td>
              <Td>010-1234-5678</Td>
              <Td className="onleave">휴직중</Td>
              <Td>
                <FlexWrapper gap={'4px'}>
                  <DefaultButton
                    style={'SECONDARY'}
                    type={'NONE'}
                    size={'SS'}
                    state={'DEFAULT'}
                  >
                    수정
                  </DefaultButton>
                  <DefaultButton
                    style={'OUTLINE'}
                    type={'NONE'}
                    size={'SS'}
                    state={'DEFAULT'}
                  >
                    삭제
                  </DefaultButton>
                </FlexWrapper>
              </Td>
            </tr>
            <tr>
              <Td>
                <FlexWrapper>
                  <Avatar size={'M2'} />
                  김사무엘
                </FlexWrapper>
              </Td>
              <Td>부서명</Td>
              <Td>직책</Td>
              <Td>X</Td>
              <Td>test@naver.com</Td>
              <Td>051-123-1234</Td>
              <Td>010-1234-5678</Td>
              <Td className="terminated">퇴사</Td>
              <Td>
                <FlexWrapper gap={'4px'}>
                  <DefaultButton
                    style={'SECONDARY'}
                    type={'NONE'}
                    size={'SS'}
                    state={'DEFAULT'}
                  >
                    수정
                  </DefaultButton>
                  <DefaultButton
                    style={'OUTLINE'}
                    type={'NONE'}
                    size={'SS'}
                    state={'DEFAULT'}
                  >
                    삭제
                  </DefaultButton>
                </FlexWrapper>
              </Td>
            </tr>
            <tr>
              <Td>
                <FlexWrapper>
                  <Avatar size={'M2'} />
                  김사무엘
                </FlexWrapper>
              </Td>
              <Td>부서명</Td>
              <Td>직책</Td>
              <Td>X</Td>
              <Td>test@naver.com</Td>
              <Td>051-123-1234</Td>
              <Td>010-1234-5678</Td>
              <Td className="active">재직중</Td>
              <Td>
                <FlexWrapper gap={'4px'}>
                  <DefaultButton
                    style={'SECONDARY'}
                    type={'NONE'}
                    size={'SS'}
                    state={'DEFAULT'}
                  >
                    수정
                  </DefaultButton>
                  <DefaultButton
                    style={'OUTLINE'}
                    type={'NONE'}
                    size={'SS'}
                    state={'DEFAULT'}
                  >
                    삭제
                  </DefaultButton>
                </FlexWrapper>
              </Td>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
      <AddButtonWrapper>
        <DefaultButton
          style={'PRIMARY'}
          state={'DEFAULT'}
          type={'NONE'}
          size={'S'}
          onClick={() => {
            navigate('/mypage/manager/edit');
          }}
        >
          추가하기
        </DefaultButton>
      </AddButtonWrapper>
      <div
        style={{
          marginTop: '60px',
        }}
      ></div>
      <Pagination
        {...(isDesktop
          ? {
              start: 1,
              end: 10,
              currentPage: 1,
              mode: 'NORMAL',
            }
          : {
              start: 1,
              end: 5,
              currentPage: 1,
              mode: 'NORMAL',
            })}
      />
      <div style={{ marginBottom: isDesktop ? '60px' : '120px' }}></div>
    </>
  );
};

export default withPageLoadedEffect(manager);
