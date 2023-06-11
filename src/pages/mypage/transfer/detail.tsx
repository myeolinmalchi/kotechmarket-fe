import React from 'react';
import styled from 'styled-components';
import Avatar from '../../../components/Avatar';
import { FormTitle } from '../../../components/contents/Form';
import { TextArea, TextField } from '../../../components/TextFields';
import { useStyleContext } from '../../../contexts/AppContextProvider';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import Font from '../../../styles/Font';
import { ColorType } from '../../../types/Style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 682px;
`;

const Spacer = styled.div<{ height: number }>`
  margin-bottom: ${(props) => props.height}px;
`;

const ImageArea = styled.div<{ src?: string; Color: ColorType }>`
  background-image: url(${({ src }) => src});
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  padding-top: 66.66%;
  position: relative;
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  border-radius: 4px;
`;

const detail = () => {
  const { Color } = useStyleContext();
  return (
    <Container>
      <span
        style={{
          ...Font.title.display1,
          color: Color.text.primary,
          width: '100%',
          textAlign: 'start',
        }}
      >
        기술이전 문의내역
      </span>
      <Spacer height={36} />
      <ImageArea src={''} Color={Color} />
      <Spacer height={24} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          boxSizing: 'border-box',
          padding: '24px 20px',
          border: `1px solid ${Color.stroke.gray1}`,
          borderRadius: '4px',
          gap: '14px',
        }}
      >
        <div style={{ width: '100%', textAlign: 'start' }}>
          <span
            style={{
              padding: '2px 8px',
              boxSizing: 'border-box',
              width: 'fit-content',
              color: Color.text.secondary,
              background: Color.background.gray2,
              borderRadius: '4px',
              ...Font.body.caption,
            }}
          >
            답변 전
          </span>
        </div>
        <span
          style={{
            display: 'flex',
            gap: '8px',
            width: '100%',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <Avatar size={'S'} />
          Name
        </span>
        <span
          style={{
            ...Font.title.headline,
            color: Color.text.primary,
          }}
        >
          생체 분자 기술을 이용한 면직물 난연 코팅 제조 방법
        </span>
      </div>
      <Spacer height={36} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
          width: '100%',
          textAlign: 'start',
        }}
      >
        문의내역
      </span>
      <FormTitle label={'제목'} optional={false} />
      <TextField width={'100%'} size={'L'} />
      <FormTitle label={'문의내용'} optional={false} />
      <TextArea height={350} />

      <Spacer height={36} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
          width: '100%',
          textAlign: 'start',
        }}
      >
        답변내역
      </span>
      <FormTitle label={'답변내용'} optional={false} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '350px',
          boxSizing: 'border-box',
          padding: '24px 20px',
          border: `1px solid ${Color.stroke.gray1}`,
          borderRadius: '4px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ ...Font.title.subhead3, color: Color.text.primary }}>
          아직 답변내용이 없습니다.
        </span>
      </div>
    </Container>
  );
};

export default withPageLoadedEffect(detail);
