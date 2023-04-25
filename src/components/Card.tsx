// TODO 다크모드 로직 변경
import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useStyleContext } from '../contexts/AppContextProvider';
import { useCustomNavigate } from '../hooks/useCustomNavigate';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import Font from '../styles/Font';
import { ColorType } from '../types/Style';
import Avatar from './Avatar';
import { DefaultButton } from './Button';
import { Tag } from './Tag';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ImageMarkIconArea = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 4px;

  width: 24px;
  height: 24px;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageArea = styled.div<{
  src?: string;
  loaded?: boolean;
  Color: ColorType;
}>`
  background-image: url(${({ src }) => src});
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  //height: 180px;
  padding-top: 66.66%;
  width: 100%;
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  border-radius: 4px;
  position: relative;

  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  animation: ${({ loaded }) =>
    loaded
      ? css`
          ${fadeIn} 0.3s ease-in-out forwards
        `
      : 'none'};

  ${ImageMarkIconArea} {
    border: 1px solid ${(props) => props.Color.stroke.gray1};
    background-color: ${(props) => props.Color.background.gray1};
  }
`;

const ImageMarkIcon = ({ marked }: { marked: boolean }) => {
  if (marked) {
    return (
      <>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.19254 1.14046C6.49144 0.421829 7.50946 0.421828 7.80835 1.14046L9.19635 4.4776L12.7991 4.76643C13.5749 4.82863 13.8895 5.79682 13.2984 6.30316L10.5535 8.65446L11.3921 12.1701C11.5727 12.9272 10.7491 13.5256 10.0849 13.1199L7.00045 11.2359L3.91601 13.1199C3.2518 13.5256 2.42821 12.9272 2.6088 12.1701L3.44741 8.65446L0.702509 6.30316C0.111416 5.79682 0.425998 4.82863 1.20182 4.76643L4.80455 4.4776L6.19254 1.14046Z"
            fill="#FFC63E"
          />
        </svg>
      </>
    );
  } else {
    return (
      <>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.65376 1.33247C6.78185 1.02449 7.21815 1.02449 7.34625 1.33247L8.76356 4.74011C8.81757 4.86995 8.93967 4.95866 9.07984 4.9699L12.7587 5.26483C13.0912 5.29149 13.226 5.70643 12.9727 5.92343L10.1698 8.3244C10.063 8.41588 10.0163 8.55942 10.049 8.6962L10.9053 12.2861C10.9827 12.6106 10.6297 12.867 10.3451 12.6932L7.19547 10.7694C7.07547 10.6961 6.92454 10.6961 6.80453 10.7694L3.65494 12.6932C3.37028 12.867 3.01731 12.6106 3.0947 12.2861L3.95103 8.6962C3.98366 8.55942 3.93702 8.41588 3.83022 8.3244L1.02734 5.92343C0.774013 5.70643 0.908835 5.29149 1.24133 5.26483L4.92016 4.9699C5.06033 4.95866 5.18244 4.86995 5.23644 4.74011L6.65376 1.33247Z"
            stroke="#D8D8D8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    );
  }
};

const ImageBox = ({
  src,
  marked,
  onClick,
}: {
  src?: string;
  marked: boolean;
  onClick?: () => void;
}) => {
  const navigate = useCustomNavigate();
  const imgRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver>();
  const [onPage, setOnPage] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
    });
  };

  const onIntersection = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        io.unobserve(e.target);
        if (src) {
          loadImage(src)
            .then(() => setLoaded(true))
            .catch(() => setLoaded(false));
        }
        setOnPage(true);
      }
    });
  };

  React.useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onIntersection);
    }
    imgRef.current && observerRef.current.observe(imgRef.current);
  }, []);

  const { Color } = useStyleContext();

  return (
    <ImageArea
      Color={Color}
      loaded={loaded}
      ref={imgRef}
      src={
        onPage
          ? src ?? '/images/components/Card/placeholder.png'
          : '/images/components/Card/placeholder.png'
      }
      onClick={onClick}
    >
      <ImageMarkIconArea>
        <ImageMarkIcon marked={marked} />
      </ImageMarkIconArea>
    </ImageArea>
  );
};

const CardContainer = styled.div<{ width: string; isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ isMobile }) => (isMobile ? '8px' : '12px')};
  width: ${(props) => props.width};
`;

const TagContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: ${(props) => (props.isMobile ? '8px' : '12px')};
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardTitle = ({
  title,
  isMobile,
  center,
  onClick,
}: {
  title: string;
  isMobile: boolean;
  center: boolean;
  onClick?: () => void;
}) => {
  return (
    <span
      onClick={onClick}
      style={{
        ...(isMobile ? Font.title.subheadLong2 : Font.title.subheadLong3),
        width: '100%',
        textAlign: center ? 'center' : 'start',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
      }}
    >
      {title}
    </span>
  );
};

const CardDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

const CardAuthorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CardDetailInfo = ({
  author,
  date,
  isProceeding,
}: {
  author?: {
    name: string;
    img?: string;
  };
  date: Date | number;
  isProceeding?: boolean;
}) => {
  const { Color } = useStyleContext();
  return (
    <CardDetailContainer>
      <CardAuthorContainer>
        {author ? (
          <>
            <Avatar size={'S'} src={author.img} />
            <span
              style={{
                ...Font.body.body1,
                color: isProceeding ? Color.text.blue : Color.text.secondary,
              }}
            >
              {author.name}
            </span>
          </>
        ) : (
          <></>
        )}
      </CardAuthorContainer>
      <span
        style={{
          ...Font.body.body1,
          color: isProceeding ? Color.text.blue : Color.text.third,
        }}
      >
        {typeof date === 'number'
          ? isProceeding
            ? `D-${date}`
            : '마감'
          : `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}
      </span>
    </CardDetailContainer>
  );
};

const CardSummary = ({
  content,
  center,
}: {
  content: string;
  center: boolean;
}) => {
  const { Color } = useStyleContext();
  return (
    <span
      style={{
        ...Font.body.bodyLong1,
        width: '100%',
        color: Color.text.secondary,
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '2',
        overflow: 'hidden',
        display: '-webkit-box',
        textAlign: center ? 'center' : 'start',
      }}
    >
      {content}
    </span>
  );
};

export const ContentCard = ({
  src,
  marked,
  width,
  tags,
  title,
  author,
  date,
  isMobile,
}: {
  src?: string;
  marked: boolean;
  width: string;
  tags: Array<string>;
  title: string;
  author?: {
    name: string;
    img?: string;
  };
  date: Date;
  isMobile: boolean;
}) => {
  const tagContainer = useHorizontalScroll();
  const navigate = useCustomNavigate();

  return (
    <CardContainer width={width} isMobile={isMobile}>
      <ImageBox src={src} marked={marked} />
      <TagContainer isMobile={isMobile} ref={tagContainer}>
        {tags.map((tag) => (
          <Tag type={'DEFAULT'} state={'POINT'} size={'S'} text={tag} />
        ))}
      </TagContainer>
      <CardTitle title={title} isMobile={isMobile} center={false} />
      <CardDetailInfo author={author} date={date} />
    </CardContainer>
  );
};

export const NewsCard = ({
  src,
  marked,
  title,
  summary,
  author,
  date,
  width,
  isMobile,
  category,
  id,
}: {
  src?: string;
  title: string;
  marked: boolean;
  summary: string;
  author?: {
    name: string;
    img?: string;
  };
  date: Date;
  width: string;
  isMobile: boolean;
  category?: string;
  id: number;
}) => {
  const navigate = useCustomNavigate();
  const { Color } = useStyleContext();
  return (
    <CardContainer
      width={width}
      isMobile={isMobile}
      onClick={() => navigate(`/news/detail?id=${id}`)}
    >
      <ImageBox src={src} marked={marked} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            ...Font.body.bodyLong1,
            width: '100%',
            textAlign: 'start',
            color: Color.text.secondary,
          }}
        >
          {category}
        </span>
        <CardTitle title={title} isMobile={isMobile} center={false} />
        <CardSummary content={summary} center={false} />
      </div>
      <CardDetailInfo author={author} date={date} />
    </CardContainer>
  );
};

// TODO 카테고리 추가
export const EventCard = ({
  src,
  marked,
  title,
  author,
  date,
  preInfo,
  width,
  isMobile,
  id,
}: {
  src?: string;
  title: string;
  marked: boolean;
  author?: {
    name: string;
    img?: string;
  };
  date: Date;
  preInfo?: {
    date: Date;
    isOffline: boolean;
  };
  width: string;
  isMobile: boolean;
  id: number;
}) => {
  const { Color } = useStyleContext();
  const navigate = useCustomNavigate();
  return (
    <CardContainer
      width={width}
      isMobile={isMobile}
      onClick={() => navigate(`/event/detail?id=${id}`)}
    >
      <ImageBox src={src} marked={marked} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {preInfo ? (
          <>
            <span
              style={{
                ...Font.body.bodyLong1,
                width: '100%',
                textAlign: 'start',
                color: Color.text.secondary,
              }}
            >
              {`${preInfo.date.getFullYear()}.${
                preInfo.date.getMonth() + 1
              }.${preInfo.date.getDate()} · ${
                preInfo.isOffline ? '오프라인' : '온라인'
              }`}
            </span>
          </>
        ) : (
          <></>
        )}
        <CardTitle title={title} isMobile={isMobile} center={false} />
      </div>
      <CardDetailInfo author={author} date={date} />
    </CardContainer>
  );
};

export const SpCard = ({
  src,
  marked,
  width,
  title,
  dday,
  isMobile,
  category,
  isProceeding,
  id,
}: {
  src?: string;
  marked: boolean;
  width: string;
  title: string;
  dday?: number;
  isMobile: boolean;
  category: string;
  isProceeding: boolean;
  id: number;
}) => {
  const { Color } = useStyleContext();
  const navigate = useCustomNavigate();
  return (
    <CardContainer width={width} isMobile={isMobile}>
      <ImageBox
        src={src}
        marked={marked}
        onClick={() => navigate(`/support/detail?id=${id}`)}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            ...Font.body.bodyLong1,
            width: '100%',
            textAlign: 'start',
            color: Color.text.secondary,
          }}
        >
          {category}
        </span>
        <CardTitle
          title={title}
          isMobile={isMobile}
          center={false}
          onClick={() => navigate('/support/detail?id=3')}
        />
      </div>
      <CardDetailInfo date={dday ?? 0} isProceeding={isProceeding} />
    </CardContainer>
  );
};

const RoundImage = styled.div<{ src?: string; Color: ColorType }>`
  width: 100px;
  height: 100px;
  border: 1px solid ${(props) => props.Color.stroke.gray1};
  border-radius: 100px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const SubscribeCard = ({
  src,
  width,
  title,
  summary,
  subscribed,
  isMobile,
  minWidth,
}: {
  src?: string;
  width: string;
  title: string;
  summary: string;
  subscribed: boolean;
  isMobile: boolean;
  minWidth?: string;
}) => {
  const { Color } = useStyleContext();
  return (
    <CardContainer
      width={width}
      isMobile={isMobile}
      style={{ minWidth: minWidth }}
    >
      <RoundImage src={src} Color={Color}></RoundImage>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <CardTitle title={title} isMobile={isMobile} center={true} />
        <CardSummary content={summary} center={true} />
      </div>
      {subscribed ? (
        <DefaultButton
          size={'S'}
          style={'PRIMARY'}
          state={'DEFAULT'}
          type={'NONE'}
          text={'구독 중'}
        />
      ) : (
        <DefaultButton
          size={'S'}
          style={'OUTLINE'}
          state={'DEFAULT'}
          type={'NONE'}
          text={'구독하기'}
        />
      )}
    </CardContainer>
  );
};
