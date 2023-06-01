import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from '../../../../components/Button';
import { DropDown } from '../../../../components/DropDown';
import { Pagination } from '../../../../components/Pagination';
import { SearchContainer, Title } from '../../../../components/Search';
import {
  ColumnWidth,
  FlexWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
} from '../../../../components/Table';
import { TextField } from '../../../../components/TextFields';
import {
  useMediaQueryContext,
  useStyleContext,
} from '../../../../contexts/AppContextProvider';
import withPageLoadedEffect from '../../../../hocs/withPageLoadedEffect';
import { useCustomNavigate } from '../../../../hooks/useCustomNavigate';
import { useDropDown } from '../../../../hooks/useDropDown';
import Font from '../../../../styles/Font';
import { ColorType } from '../../../../types/Style';

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

const news = () => {
  const { isDesktop } = useMediaQueryContext();

  const categoryState = useDropDown();
  const { Color } = useStyleContext();

  const navigate = useCustomNavigate();

  return (
    <>
      <Title>행사관리</Title>
      <SearchContainer>
        <DropDown
          width={isDesktop ? '120px' : '84px'}
          size={'S'}
          type="DEFAULT"
          contents={[
            {
              label: '전체',
              value: '',
            },
            {
              label: '모집중',
              value: '',
            },
            {
              label: '모집 마감',
              value: '',
            },
          ]}
          states={categoryState}
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
              <Th>등록시간</Th>
              <Th>행사명</Th>
              <Th>참가인원</Th>
              <Th>상태</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody style={{ ...Font.body.caption }}>
            {new Array(10).fill(0).map(() => (
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
                      fontWeight: '500',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/contents/manage/events/subs')}
                  >
                    2명/50명
                  </Td>
                  <Td
                    style={{
                      color: Color.text.blue,
                    }}
                  >
                    모집중
                  </Td>
                  <Td>
                    <FlexWrapper
                      style={{
                        gap: '4px',
                      }}
                    >
                      <DefaultButton
                        size={'SS'}
                        style={'SECONDARY'}
                        onClick={() =>
                          navigate('/contents/manage/events/edit?id=1')
                        }
                      >
                        수정
                      </DefaultButton>
                      <DefaultButton size={'SS'} style={'OUTLINE'}>
                        삭제
                      </DefaultButton>
                    </FlexWrapper>
                  </Td>
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

export default withPageLoadedEffect(news);
