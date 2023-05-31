import styled from 'styled-components';
import { ColorType } from '../types/Style';

export const TableWrapper = styled.div<{ Color: ColorType }>`
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
    background: ${(props) => props.Color.background.gray2};
    border-radius: 5px;
  }
`;

export const Th = styled.th`
  border: none;
  box-sizing: border-box;
  text-align: center;
  height: 42px;
  vertical-align: middle;
`;

export const Td = styled.td`
  border: none;
  text-align: center;
  box-sizing: border-box;
  height: 42px;
  vertical-align: middle;
`;

export const ColumnWidth = styled.col`
  width: ${(props) => props.width};
`;

export const FlexWrapper = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${({ gap }) => gap ?? '8px'};
`;

/**
 * @example
   <TableWrapper Color={Color}>
      <Table Color={Color}>
        <colgroup>
          <ColumnWidth width="8%" />
          <ColumnWidth width="12%" />
          <ColumnWidth width="30%" />
          <ColumnWidth width="12%" />
          <ColumnWidth width="8%" />
          <ColumnWidth width="20%" />
          <ColumnWidth width="10%" />
        </colgroup>
        <thead>
          <tr style={{ ...Font.body.caption }}>
            <Th>카테고리</Th>
            <Th>문서번호</Th>
            <Th>기술명</Th>
            <Th>연구원</Th>
            <Th>등록년도</Th>
            <Th>문서조회</Th>
            <Th>선택</Th>
          </tr>
        </thead>
        <tbody style={{...Font.body.caption }}>
          <tr>
            <Td>특허</Td>
            <Td>00000000000</Td>
            <Td>기술명</Td>
            <Td>홍길동</Td>
            <Td>2023</Td>
            <Td>PDF 보기</Td>
            <Td></Td>
          </tr>
        </tbody>
      </Table>
    </TableWrapper>
 */
export const Table = styled.table<{ Color: ColorType }>`
  width: 100%;
  min-width: 900px;

  ${Th} {
    background: ${({ Color }) => Color.background.gray1};
    color: ${({ Color }) => Color.text.secondary};
    text-align: center;
  }
  ${Td} {
    color: ${({ Color }) => Color.text.secondary};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  @media (max-width: 1024px) {
    padding: 0 28px;
  }
  @media (max-width: 600) {
    padding: 0 16px;
  }
`;
