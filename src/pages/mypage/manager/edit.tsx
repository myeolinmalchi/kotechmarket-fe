import React from 'react';
import styled from 'styled-components';
import { DropDown } from '../../../components/DropDown';
import { TextField } from '../../../components/TextFields';
import { DarkModeContext } from '../../../contexts/DarkModeProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import Color from '../../../styles/Color';
import Font from '../../../styles/Font';
import { DefaultButton, TextButton } from '../../../components/Button';

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

  ${InputWrapper} >span:first-child {
    color: ${(props) => (props.isDarkMode ? '' : Color.light.text.secondary)};
  }

  ${InputWrapper} > span:first-child > span {
    color: ${Color.light.text.red};
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
  const [profileImage, setProfileImage] = React.useState<{
    file: File;
    url: string;
  }>();

  const [workStatusDropdownOpened, setWorkStatusDropdownOpened] =
    React.useState(false);

  return (
    <>
      <Container isDarkMode={isDarkMode}>
        <SubTitle style={{ ...Font.body.body2 }}>수정하기</SubTitle>
        <Title style={{ ...Font.title.display1 }}>담당자관리</Title>
        <InputContainer isDarkMode={isDarkMode}>
          <InputWrapper>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  width: '30%',
                  paddingTop: '30%',
                  position: 'relative',
                  height: '0',
                  borderRadius: '4px',
                  background: isDarkMode ? '' : Color.light.background.gray1,
                  backgroundImage: `url(${profileImage?.url})` ?? 'none',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  border: `1px solid ${
                    isDarkMode ? '' : Color.light.stroke.gray1
                  }`,
                }}
              >
                {!profileImage?.url && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '0',
                      transform: 'translateY(-50%)',
                      width: '100%',
                    }}
                  >
                    <svg
                      width="100%"
                      height="auto"
                      viewBox="0 0 214 148"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="214"
                        height="148"
                        transform="translate(0.5)"
                        fill="#F5F6F7"
                      />
                      <path
                        d="M74.5769 91.2957V105.21H89.3282L74.5769 91.2957Z"
                        fill="#A3A7AE"
                      />
                      <path
                        d="M74.5769 42.7556V87.6328L95.991 67.0945H103.058L80.8627 89.0512L96.1418 105.211H140.423V102.098H107.863L92.8241 85.9115L90.5552 88.0322L103.627 102.098H97.4579L85.2017 89.1269L110.612 63.9824H94.7503L86.7166 71.6731V64.2785H77.6752V45.8676H137.311V104.391H140.409V42.7556H74.5769ZM83.6182 67.3905V74.6612L77.6752 80.3621V67.3905H83.6182Z"
                        fill="#A3A7AE"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div
                style={{
                  width: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'start',
                  padding: '0 20px',
                  gap: '12px',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    ...Font.body.body1,
                    color: isDarkMode ? '' : Color.light.text.secondary,
                  }}
                >
                  해당 이미지는 해당 컨텐츠 썸네일 이미지로 사용됩니다.
                  <br />
                  <span
                    style={{ color: isDarkMode ? '' : Color.light.text.third }}
                  >
                    (권장 이미지 사이즈 800*800px)
                  </span>
                </span>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {profileImage?.url && (
                    <>
                      <TextButton
                        style={'PRIMARY'}
                        type={'NONE'}
                        state={'DEFAULT'}
                        size={'S'}
                        onClick={() => {
                          const image = document.createElement('input');
                          image.type = 'file';
                          image.multiple = false;
                          image.accept = 'image/jpg,impge/png,image/jpeg';
                          image.onchange = () => {
                            const file = image.files?.[0];
                            const fileReader = new FileReader();
                            fileReader.onloadend = () => {
                              file &&
                                fileReader.result &&
                                setProfileImage({
                                  file: file,
                                  url: fileReader.result as string,
                                });
                            };
                            file && fileReader.readAsDataURL(file);
                          };
                          image.click();
                        }}
                        text={'변경하기'}
                      />
                      <TextButton
                        style={'SECONDARY'}
                        type={'NONE'}
                        state={'DEFAULT'}
                        size={'S'}
                        onClick={() => {
                          setProfileImage({ file: {} as File, url: '' });
                        }}
                        text={'삭제하기'}
                      />
                    </>
                  )}
                  {!profileImage?.url && (
                    <>
                      <DefaultButton
                        style={'PRIMARY'}
                        type={'NONE'}
                        state={'DEFAULT'}
                        size={'S'}
                        onClick={() => {
                          const image = document.createElement('input');
                          image.type = 'file';
                          image.multiple = false;
                          image.accept = 'image/jpg,impge/png,image/jpeg';
                          image.onchange = () => {
                            const file = image.files?.[0];
                            const fileReader = new FileReader();
                            fileReader.onloadend = () => {
                              file &&
                                fileReader.result &&
                                setProfileImage({
                                  file: file,
                                  url: fileReader.result as string,
                                });
                            };
                            file && fileReader.readAsDataURL(file);
                          };
                          image.click();
                        }}
                      >
                        이미지 업로드
                      </DefaultButton>
                    </>
                  )}
                </div>
              </div>
            </div>
          </InputWrapper>
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>
              <span>*</span> 이름
            </span>
            <TextField
              placeholder="이름을 입력해주세요"
              size="L"
              value={name}
              setValue={setName}
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
              value={department}
              setValue={setDepartment}
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
              value={position}
              setValue={setPosition}
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
              value={email}
              setValue={setEmail}
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
              value={officeContact}
              setValue={setOfficeContact}
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
              value={phone}
              setValue={setPhone}
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
          <InputWrapper>
            <span style={{ ...Font.body.body1 }}>기자유무</span>
          </InputWrapper>
        </InputContainer>
      </Container>
    </>
  );
};

export default withPageLoadedEffect(edit);
