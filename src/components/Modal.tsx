import React, { useContext, useRef } from 'react';
import QRCode from 'react-qr-code';
import styled, { css } from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import Color from '../styles/Color';
import Font from '../styles/Font';
import { DefaultButton, TextButton } from './Button';

interface ModalProps {
  title: string | React.ReactNode;
  content: string | string[];
  image?: string;
  qrvalue?: string;
  buttonType: number;
  buttonDirection?: 'vertical' | 'horizontal';
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick: (e: React.MouseEvent) => void;
  onSecondaryButtonClick?: (e: React.MouseEvent) => void;
  secondaryButtonType?: boolean;
  closeModal?: () => void;
  visible?: boolean;
  reverseButtonOrder?: boolean;
}

const ModalContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  display: flex;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  z-index: ${(props) => (props.visible ? '1000000000' : '0')};
  transition: opacity 0.2s;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgb(0, 0, 0, 0.4);
`;

const ModalWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(calc(100vw - 32px), 480px);
  padding: 32px;
  gap: 32px;
  box-sizing: border-box;
  background: ${(props) =>
    props.isDarkMode ? '' : Color.light.background.white};
  border-radius: 4px;
`;

const Title = styled.h2`
  word-break: keep-all;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 10px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const Image = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 108px;
  width: 108px;
  border: none;
`;

const Content = styled.p`
  word-break: keep-all;
  text-align: center;
`;

const ButtonWrapper = styled.div<{ direction?: 'vertical' | 'horizontal' }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  image,
  qrvalue,
  buttonType,
  buttonDirection = 'vertical',
  primaryButtonLabel,
  secondaryButtonLabel,
  secondaryButtonType,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  closeModal,
  visible,
  reverseButtonOrder,
}) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const [zIndex, setZindex] = React.useState(0);
  React.useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setZindex(0);
      }, 200);
    } else {
      setZindex(1000000000);
    }
  }, [visible]);
  return (
    <ModalContainer
      ref={modalContainerRef}
      visible={visible ?? false}
      style={{
        zIndex,
      }}
      onClick={(e: React.MouseEvent) => {
        if (modalContainerRef.current === e.target) {
          closeModal?.();
        }
      }}
    >
      <ModalWrapper isDarkMode={isDarkMode}>
        <ContentArea className={'ModalContentArea'}>
          <Title>{title}</Title>
          {image && <Image src={image} />}
          {qrvalue && <QRCode value={qrvalue} size={108} />}
          <Content
            style={{
              ...Font.body.bodyLong1,
              color: isDarkMode ? '' : Color.light.text.secondary,
              textAlign: 'center',
            }}
          >
            {typeof content === 'string'
              ? content
              : content.map((str, idx) => (
                  <span>
                    {str}
                    {idx + 1 === content.length ? (
                      <></>
                    ) : (
                      <>
                        <br />
                      </>
                    )}
                  </span>
                ))}
          </Content>
        </ContentArea>
        <ButtonWrapper direction={buttonDirection}>
          {buttonType === 1 && (
            <DefaultButton
              size={'M'}
              onClick={onPrimaryButtonClick}
              text={primaryButtonLabel}
              style={'PRIMARY'}
              state={'DEFAULT'}
              type={'NONE'}
              width={'100%'}
            />
          )}
          {buttonType === 2 && (
            <>
              {!reverseButtonOrder && (
                <DefaultButton
                  size={'M'}
                  onClick={onPrimaryButtonClick}
                  text={primaryButtonLabel}
                  style={'PRIMARY'}
                  state={'DEFAULT'}
                  type={'NONE'}
                  width={
                    buttonDirection === 'vertical' ? '100%' : 'calc(100% - 4px)'
                  }
                />
              )}
              {secondaryButtonType ? (
                <DefaultButton
                  size={'M'}
                  onClick={onSecondaryButtonClick}
                  text={secondaryButtonLabel ?? ''}
                  style={'SECONDARY'}
                  state={'DEFAULT'}
                  type={'NONE'}
                  width={
                    buttonDirection === 'vertical' ? '100%' : 'calc(100% - 4px)'
                  }
                />
              ) : (
                <TextButton
                  height={'40px'}
                  size={'M'}
                  onClick={onSecondaryButtonClick}
                  text={secondaryButtonLabel ?? ''}
                  style={'SECONDARY'}
                  state={'DEFAULT'}
                  type={'NONE'}
                  width={
                    buttonDirection === 'vertical' ? '100%' : 'calc(100% - 4px)'
                  }
                />
              )}
              {reverseButtonOrder && (
                <DefaultButton
                  size={'M'}
                  onClick={onPrimaryButtonClick}
                  text={primaryButtonLabel}
                  style={'PRIMARY'}
                  state={'DEFAULT'}
                  type={'NONE'}
                  width={
                    buttonDirection === 'vertical' ? '100%' : 'calc(100% - 4px)'
                  }
                />
              )}
            </>
          )}
        </ButtonWrapper>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
