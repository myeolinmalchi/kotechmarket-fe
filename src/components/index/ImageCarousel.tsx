import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../../styles/Color';

interface CarouselProps {
  images: string[];
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  overflow: hidden;
  border-radius: 4px;
  @media (max-width: 600px) {
    height: 210px;
  }
`;

const ImageContainer = styled.div<{ transformX: number; images: string[] }>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ images }) => `${images.length * 100}%`};
  height: 100%;
  transform: ${({ transformX }) => `translateX(-${transformX}%)`};
  transition: transform 0.5s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Indicator = styled.div<{ isActive: boolean }>`
  width: 16px;
  height: 4px;
  border-radius: 4px;
  background-color: ${({ isActive }) =>
    isActive ? Color.light.background.blue1 : Color.light.background.gray1};
  cursor: pointer;
`;

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickIndicator = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((idx) => {
        if (idx >= images.length - 1) {
          return 0;
        } else {
          return idx + 1;
        }
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsScrolling(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    setDeltaX(startX - currentX);
    setDeltaY(startY - currentY);
    setIsScrolling(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        setIsScrolling(true);
        if (deltaX > 0) {
          setActiveIndex((idx) => {
            if (idx >= images.length - 1) {
              return 0;
            } else {
              return idx + 1;
            }
          });
        } else if (deltaX < 0) {
          setActiveIndex((idx) => {
            if (idx <= 0) {
              return images.length - 1;
            } else {
              return idx - 1;
            }
          });
        }
      }
    }
  };

  return (
    <CarouselContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ImageContainer
        images={images}
        transformX={activeIndex * (100 / images.length)}
      >
        {images.map((image, index) => (
          <Image key={index} src={image} />
        ))}
      </ImageContainer>
      <IndicatorContainer>
        {images.map((_, index) => (
          <Indicator
            key={index}
            isActive={activeIndex === index}
            onClick={() => handleClickIndicator(index)}
          />
        ))}
      </IndicatorContainer>
    </CarouselContainer>
  );
};

export default ImageCarousel;
