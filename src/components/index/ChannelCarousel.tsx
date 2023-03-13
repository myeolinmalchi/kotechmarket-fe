import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubscribeCard } from '../Card';

interface CarouselProps {
  images: string[];
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 224px;
  overflow: hidden;
  padding: 0 32px;
  margin-bottom: 60px;
  box-sizing: border-box;
`;

const ImageContainer = styled.div<{ transformX: number; images: string[] }>`
  display: flex;
  position: absolute;
  top: 0;
  left: 32px;
  width: ${({ images }) =>
    `calc(${images.length * 25}% - ${images.length * 16}px)`};
  height: 100%;
  transform: ${({ transformX }) => `translateX(${transformX}%)`};
  transition: transform 0.3s ease-in-out;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline: none;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 0px;
`;

const RightArrow = styled(ArrowButton)`
  right: 0px;
`;

const ChannelCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      setCarouselWidth(imageContainerRef.current.offsetWidth);
    }
  }, []);

  const handleClickLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleClickRight = () => {
    if (activeIndex < images.length - 4) {
      console.log('right');
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <CarouselContainer>
      <LeftArrow onClick={handleClickLeft}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.0484 24.8487C19.5798 25.3174 18.82 25.3174 18.3514 24.8487L10.21 16.7073C9.81943 16.3168 9.81943 15.6836 10.21 15.2931L18.3514 7.15167C18.82 6.68304 19.5798 6.68304 20.0484 7.15167C20.5171 7.62029 20.5171 8.38009 20.0484 8.84872L12.897 16.0002L20.0484 23.1517C20.5171 23.6203 20.5171 24.3801 20.0484 24.8487Z"
            fill="#5D6169"
          />
        </svg>
      </LeftArrow>
      <RightArrow onClick={handleClickRight}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.9516 7.15128C12.4202 6.68265 13.18 6.68265 13.6486 7.15128L21.79 15.2927C22.1806 15.6832 22.1806 16.3164 21.79 16.7069L13.6486 24.8483C13.18 25.317 12.4202 25.317 11.9516 24.8483C11.4829 24.3797 11.4829 23.6199 11.9516 23.1513L19.103 15.9998L11.9516 8.84833C11.4829 8.3797 11.4829 7.61991 11.9516 7.15128Z"
            fill="#5D6169"
          />
        </svg>
      </RightArrow>
      <ImageContainer
        images={images}
        transformX={activeIndex * -(100 / images.length)}
        ref={imageContainerRef}
      >
        {images.map((image, index) => (
          <SubscribeCard
            summary={'한줄소개'}
            src={image}
            width={'calc(25% - 16px)'}
            title={'업체 이름'}
            isMobile={false}
            subscribed={false}
          />
        ))}
      </ImageContainer>
    </CarouselContainer>
  );
};

export default ChannelCarousel;
