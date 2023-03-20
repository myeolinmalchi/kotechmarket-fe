import React from 'react';
import styled from 'styled-components';
import { DropDown } from '../../../components/DropDown';
import { TextField } from '../../../components/TextFields';
import { DarkModeContext } from '../../../contexts/DarkModeProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import Color from '../../../styles/Color';
import Font from '../../../styles/Font';

const SubTitle = styled.span`
  width: 100%;
  text-align: left;
  margin-bottom: 8px;
`;

const ClearButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const Title = styled.span`
  width: 100%;
  text-align: left;
  margin-bottom: 36px;
`;
const Container = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 682px;

  ${Title} {
    color: ${(props) => (props.isDarkMode ? '' : Color.light.text.primary)};
  }
  ${SubTitle} {
    color: ${(props) => (props.isDarkMode ? '' : Color.light.text.blue)};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  & > span:first-child {
    width: 100%;
    text-align: start;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const InputContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 24px;

  ${InputWrapper} {
    span:first-child {
      color: ${(props) => (props.isDarkMode ? '' : Color.light.text.secondary)};
    }

    span:first-child > span {
      color: ${Color.light.text.red};
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }
`;

const edit = () => {
  const { isDarkMode } = React.useContext(DarkModeContext);

  const [name, setName] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [officeContact, setOfficeContact] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [workStatus, setWorkStatus] = React.useState(-1);

  const [workStatusDropdownOpened, setWorkStatusDropdownOpened] =
    React.useState(false);
  return (
    <>
      <Container isDarkMode={isDarkMode}>
        <SubTitle style={{ ...Font.body.body2 }}>수정하기</SubTitle>
        <Title style={{ ...Font.title.display1 }}>담당자관리</Title>
        <InputContainer isDarkMode={isDarkMode}>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 이름
            </span>
            <TextField
              placeholder="이름을 입력해주세요"
              size="L"
              value={''}
              setValue={() => {}}
              state={'DEFAULT'}
              width={'100%'}
            />
          </InputWrapper>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 부서
            </span>
            <TextField
              placeholder="부서를 입력해주세요"
              size="L"
              value={''}
              setValue={() => {}}
              state={'DEFAULT'}
              width={'100%'}
            />
          </InputWrapper>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 직책
            </span>
            <TextField
              placeholder="직책을 입력해주세요"
              size="L"
              value={''}
              setValue={() => {}}
              state={'DEFAULT'}
              width={'100%'}
            />
          </InputWrapper>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 이메일
            </span>
            <TextField
              placeholder="이메일을 입력해주세요"
              size="L"
              value={''}
              setValue={() => {}}
              state={'DEFAULT'}
              width={'100%'}
            />
          </InputWrapper>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 사무실 연락처
            </span>
            <TextField
              placeholder="사무실 연락처를 입력해주세요"
              size="L"
              value={''}
              setValue={() => {}}
              state={'DEFAULT'}
              width={'100%'}
            />
          </InputWrapper>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 휴대폰 번호
            </span>
            <TextField
              placeholder="휴대폰 번호를 입력해주세요"
              size="L"
              value={''}
              setValue={() => {}}
              state={'DEFAULT'}
              width={'100%'}
            />
          </InputWrapper>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 근무상태
            </span>
            <DropDown
              width={'100%'}
              onClickUnit={(idx: number) => () => {
                setWorkStatus(idx);
                setWorkStatusDropdownOpened(false);
              }}
              onClick={() =>
                setWorkStatusDropdownOpened(!workStatusDropdownOpened)
              }
              selected={workStatus}
              type={'DEFAULT'}
              size={'L'}
              isOpened={workStatusDropdownOpened}
              contents={[
                {
                  label: '근무중',
                  value: '0',
                },
                {
                  label: '휴직중',
                  value: '0',
                },
                {
                  label: '퇴사',
                  value: '0',
                },
              ]}
              placeholder={'선택'}
            />
          </InputWrapper>
        </InputContainer>
      </Container>
    </>
  );
};

export default withPageLoadedEffect(edit);
