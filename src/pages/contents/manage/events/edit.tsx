// TODO: 문서 편집기 추가
import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import withPageLoadedEffect from '../../../../hocs/withPageLoadedEffect';
import {
  useMediaQueryContext,
  useStyleContext,
} from '../../../../contexts/AppContextProvider';
import { ColorType } from '../../../../types/Style';
import Font from '../../../../styles/Font';
import { RadioButton, RadioField } from '../../../../components/Radio';
import {
  DefaultButton,
  TextButton,
  ToggleButton,
} from '../../../../components/Button';
import { useCustomNavigate } from '../../../../hooks/useCustomNavigate';
import { TextArea, TextField } from '../../../../components/TextFields';
import { CheckBox, CheckBoxField } from '../../../../components/CheckBox';
import {
  ButtonWrapper,
  ColumnWidth,
  FlexWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
} from '../../../../components/Table';
import {
  SearchContainer,
  SmallTitle,
  SubTitle,
} from '../../../../components/Search';
import { DropDown } from '../../../../components/DropDown';
import { useDropDown } from '../../../../hooks/useDropDown';
import { Pagination } from '../../../../components/Pagination';
import Avatar from '../../../../components/Avatar';

const Container = styled.div<{ Color: ColorType }>`
  display: flex;
  flex-direction: column;
  max-width: 682px;
  width: 100%;

  align-items: start;

  & > span {
    width: 100%;
  }

  & > span:first-child {
    color: ${(props) => props.Color.text.blue};
  }

  & > span:nth-child(2) {
    color: ${(props) => props.Color.text.primary};
  }

  & > span:nth-child(3) {
    color: ${(props) => props.Color.text.secondary};
  }
`;

const ClearButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const InfoButton = () => {
  return (
    <ClearButton style={{ marginLeft: '9px' }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00015 0.221313C5.65945 0.221313 4.34886 0.618878 3.2341 1.36373C2.11935 2.10859 1.2505 3.16728 0.737438 4.40593C0.224373 5.64458 0.0901315 7.00755 0.35169 8.32249C0.613248 9.63743 1.25886 10.8453 2.20688 11.7933C3.1549 12.7413 4.36275 13.3869 5.67769 13.6485C6.99263 13.9101 8.35561 13.7758 9.59426 13.2627C10.8329 12.7497 11.8916 11.8808 12.6365 10.7661C13.3813 9.65133 13.7789 8.34073 13.7789 7.00003C13.7771 5.20273 13.0624 3.47954 11.7915 2.20866C10.5206 0.937777 8.79745 0.223039 7.00015 0.221313ZM7.00015 12.7359C5.86571 12.7359 4.75675 12.3995 3.81349 11.7692C2.87024 11.1389 2.13506 10.2431 1.70093 9.19504C1.2668 8.14695 1.15321 6.99367 1.37453 5.88102C1.59585 4.76838 2.14213 3.74635 2.94431 2.94418C3.74648 2.14201 4.76851 1.59572 5.88115 1.37441C6.99379 1.15309 8.14708 1.26668 9.19516 1.70081C10.2433 2.13494 11.1391 2.87012 11.7693 3.81337C12.3996 4.75662 12.736 5.86559 12.736 7.00003C12.7343 8.52074 12.1294 9.97867 11.0541 11.054C9.97879 12.1293 8.52086 12.7341 7.00015 12.7359ZM7.78231 10.3894C7.78231 10.5441 7.73644 10.6953 7.6505 10.8239C7.56455 10.9526 7.44239 11.0528 7.29947 11.112C7.15655 11.1712 6.99929 11.1867 6.84756 11.1565C6.69584 11.1263 6.55647 11.0518 6.44708 10.9425C6.3377 10.8331 6.2632 10.6937 6.23302 10.542C6.20284 10.3903 6.21833 10.233 6.27753 10.0901C6.33673 9.94715 6.43698 9.82499 6.56561 9.73905C6.69424 9.6531 6.84546 9.60723 7.00015 9.60723C7.2076 9.60723 7.40654 9.68963 7.55322 9.83632C7.69991 9.983 7.78231 10.1819 7.78231 10.3894ZM9.34663 5.69643C9.34663 6.22813 9.16606 6.74407 8.83448 7.15972C8.50291 7.57537 8.04 7.86609 7.52159 7.98425V8.04291C7.52159 8.1812 7.46666 8.31383 7.36887 8.41162C7.27108 8.50941 7.13845 8.56435 7.00015 8.56435C6.86186 8.56435 6.72923 8.50941 6.63144 8.41162C6.53365 8.31383 6.47871 8.1812 6.47871 8.04291V7.52147C6.47871 7.38317 6.53365 7.25054 6.63144 7.15275C6.72923 7.05497 6.86186 7.00003 7.00015 7.00003C7.25798 7.00003 7.51002 6.92357 7.7244 6.78033C7.93877 6.63709 8.10586 6.4335 8.20452 6.1953C8.30319 5.95709 8.32901 5.69498 8.27871 5.44211C8.22841 5.18924 8.10425 4.95696 7.92194 4.77465C7.73963 4.59233 7.50735 4.46818 7.25447 4.41788C7.0016 4.36758 6.73949 4.39339 6.50129 4.49206C6.26309 4.59073 6.05949 4.75781 5.91625 4.97219C5.77301 5.18656 5.69656 5.4386 5.69656 5.69643C5.69656 5.83472 5.64162 5.96735 5.54383 6.06514C5.44604 6.16293 5.31341 6.21787 5.17512 6.21787C5.03682 6.21787 4.90419 6.16293 4.8064 6.06514C4.70861 5.96735 4.65368 5.83472 4.65368 5.69643C4.65368 5.07411 4.90089 4.47727 5.34094 4.03722C5.78099 3.59717 6.37783 3.34995 7.00015 3.34995C7.62248 3.34995 8.21932 3.59717 8.65936 4.03722C9.09941 4.47727 9.34663 5.07411 9.34663 5.69643Z"
          fill="#5D6169"
        />
      </svg>
    </ClearButton>
  );
};

const Spacer = styled.div<{ height: number }>`
  margin-bottom: ${(props) => `${props.height}px`};
`;

const GenerationControllerTitle = styled.span``;

const GenerationControllerButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
`;

const GenerationControllerContainer = styled.div<{ Color: ColorType }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${GenerationControllerTitle} {
    color: ${(props) => props.Color.text.secondary};
  }
`;

const GenerationController = ({
  title,
  mode = 'DEFAULT',
}: {
  title: string;
  mode?: 'DEFAULT' | 'REGENERATION' | 'CORRECTION' | 'NONE';
}) => {
  const { Color } = useStyleContext();
  return (
    <GenerationControllerContainer Color={Color}>
      <GenerationControllerTitle style={{ ...Font.body.body1 }}>
        {title}
        <span style={{ color: Color.text.red }}> *</span>
      </GenerationControllerTitle>
      <GenerationControllerButtonArea>
        {mode !== 'NONE' && (
          <>
            {(mode === 'DEFAULT' || mode === 'CORRECTION') && (
              <DefaultButton size={'S'} style={'SECONDARY'}>
                문장교정 (3/3)
              </DefaultButton>
            )}
            {(mode === 'DEFAULT' || mode === 'REGENERATION') && (
              <DefaultButton size={'S'}>
                <svg
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1473_8118)">
                    <path
                      d="M8.74738 3.14586C8.73787 3.21938 8.70267 3.28687 8.64832 3.33578C8.59396 3.38469 8.52414 3.4117 8.45184 3.4118C8.43861 3.41181 8.4254 3.41094 8.41228 3.4092L7.89373 3.33877C8.36577 4.02532 8.59938 4.85457 8.5571 5.69356C8.51482 6.53255 8.19911 7.33268 7.66057 7.96566C7.12204 8.59864 6.39189 9.02779 5.58718 9.18433C4.78248 9.34086 3.94984 9.2157 3.22276 8.82891C2.49568 8.44212 1.91629 7.8161 1.57747 7.05125C1.23866 6.28639 1.16006 5.42698 1.35426 4.61083C1.54847 3.79468 2.00423 3.06906 2.64849 2.5503C3.29274 2.03155 4.08815 1.74972 4.9072 1.75C4.98638 1.75 5.06231 1.78226 5.1183 1.83969C5.17428 1.89711 5.20574 1.975 5.20574 2.05621C5.20574 2.13742 5.17428 2.21531 5.1183 2.27273C5.06231 2.33016 4.98638 2.36242 4.9072 2.36242C4.22085 2.36172 3.55415 2.59749 3.01406 3.03192C2.47397 3.46634 2.09178 4.07425 1.9288 4.75812C1.76583 5.44199 1.8315 6.16218 2.1153 6.80318C2.3991 7.44419 2.88457 7.96884 3.49384 8.293C4.10311 8.61715 4.80087 8.72201 5.47519 8.59076C6.14951 8.45951 6.76131 8.09975 7.21246 7.5692C7.6636 7.03864 7.92795 6.36804 7.96308 5.66496C7.99822 4.96188 7.80211 4.26707 7.40622 3.69198L7.37786 4.36641C7.37456 4.44521 7.34173 4.51967 7.28623 4.57426C7.23072 4.62885 7.15682 4.65937 7.07993 4.65945L7.06679 4.65915C6.9877 4.65565 6.9132 4.62007 6.85967 4.56023C6.80615 4.5004 6.77799 4.4212 6.78139 4.34008L6.84125 2.91421C6.84155 2.90962 6.84274 2.90548 6.84319 2.90104C6.84349 2.89798 6.84319 2.89492 6.84349 2.89186L6.84364 2.88711V2.88696C6.84438 2.88083 6.84662 2.87471 6.84767 2.86858C6.84946 2.8594 6.8514 2.85036 6.85394 2.84164C6.85513 2.83689 6.85588 2.83215 6.85737 2.8274C6.85931 2.82173 6.86244 2.81668 6.86468 2.81102C6.86787 2.8028 6.87141 2.79473 6.87528 2.78683C6.87767 2.78223 6.87931 2.77733 6.88185 2.77274C6.88513 2.76708 6.88931 2.76233 6.89304 2.75682C6.89737 2.75039 6.9017 2.74396 6.90648 2.73783C6.90797 2.73584 6.90916 2.7337 6.91081 2.73186C6.9129 2.72926 6.91424 2.7262 6.91663 2.72359C6.92111 2.71839 6.92648 2.71471 6.93111 2.70981C6.93573 2.70492 6.94036 2.70093 6.94514 2.69665C6.94991 2.69236 6.95394 2.68746 6.95887 2.68379C6.96484 2.67904 6.97156 2.67552 6.97798 2.67123L6.99141 2.66296C6.99693 2.6596 7.00231 2.65562 7.00813 2.65255C7.015 2.64919 7.02201 2.64704 7.02903 2.64413C7.03395 2.64199 7.03903 2.64031 7.04425 2.63847C7.05037 2.63632 7.05619 2.63342 7.06261 2.63173C7.06933 2.62989 7.07605 2.62913 7.08291 2.6279C7.08978 2.62668 7.09634 2.62545 7.10306 2.62454C7.10873 2.62377 7.11426 2.62224 7.12023 2.62193C7.1262 2.62147 7.13247 2.62224 7.13859 2.62224C7.14322 2.62224 7.14754 2.62117 7.15232 2.62132C7.1571 2.62147 7.16098 2.62285 7.16531 2.62316C7.16755 2.62346 7.16978 2.62316 7.17202 2.62346C7.17426 2.62377 7.1765 2.62346 7.17874 2.62362H7.17979L8.49064 2.80198C8.52953 2.80725 8.56702 2.82032 8.60097 2.84045C8.63492 2.86059 8.66467 2.88739 8.68851 2.91933C8.71236 2.95127 8.72983 2.98771 8.73993 3.02658C8.75003 3.06545 8.75257 3.10598 8.74738 3.14586Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1473_8118">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                재생성 (3/3)
              </DefaultButton>
            )}
          </>
        )}
      </GenerationControllerButtonArea>
    </GenerationControllerContainer>
  );
};

const ThumbnailUploader = ({
  thumbnail,
  setThumbnail,
}: {
  thumbnail: FileType | undefined;
  setThumbnail: React.Dispatch<React.SetStateAction<FileType | undefined>>;
}) => {
  const { Color } = useStyleContext();
  return (
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
          width: '40%',
          paddingTop: '26.67%',
          borderRadius: '4px',
          background: Color.background.gray1,
          backgroundImage: `url(${thumbnail?.url})` ?? 'none',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
      <div
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          padding: '0 20px',
          gap: '12px',
        }}
      >
        <span
          style={{
            ...Font.body.body1,
            color: Color.text.secondary,
          }}
        >
          해당 이미지는 해당 컨텐츠 썸네일 이미지로 사용됩니다.
          <br />
          <span
            style={{
              color: Color.text.third,
            }}
          >
            (권장 이미지 사이즈 813*540px)
          </span>
        </span>
        <DefaultButton
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
                  setThumbnail({
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
      </div>
    </div>
  );
};

type SurveyQuestionType = '객관식(단일)' | '객관식(복수)' | '주관식';

type SurveyQuestionUnitProps = {
  index: number;
  isEssential: boolean;
  type: SurveyQuestionType;
  question: string;
  options: string[];
};

const SurveyQuestionUnit = ({
  index,
  isEssential,
  type,
  question,
  options,
}: SurveyQuestionUnitProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        transition: 'opacity 0.2s ease-in-out',
        //opacity: visible ? '1' : '0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <span>{index + 1}번 질문</span>
        <ClearButton>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="5.41504" r="1.25" fill="#5D6169" />
            <circle cx="10" cy="9.99805" r="1.25" fill="#5D6169" />
            <path
              d="M11.25 14.582C11.25 15.2724 10.6904 15.832 10 15.832C9.30964 15.832 8.75 15.2724 8.75 14.582C8.75 13.8917 9.30964 13.332 10 13.332C10.6904 13.332 11.25 13.8917 11.25 14.582Z"
              fill="#5D6169"
            />
          </svg>
        </ClearButton>
      </div>
    </div>
  );
};

const FormTitle = ({
  label,
  optional,
}: {
  label: string;
  optional: boolean;
}) => {
  const { Color } = useStyleContext();
  return (
    <>
      <Spacer height={24} />
      <span
        style={{
          ...Font.body.body1,
          color: Color.text.secondary,
          width: '100%',
          textAlign: 'start',
        }}
      >
        {label}
        {!optional && (
          <>
            <span style={{ color: Color.text.red }}>*</span>
          </>
        )}
      </span>
      <Spacer height={16} />
    </>
  );
};

type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type GenerationFormType = {
  $title: ReactState<string>;
  $thumbnail: ReactState<FileType | undefined>;
  $content: ReactState<string>;
  $keywords: ReactState<string[]>;
  $selectedManger: ReactState<ManagerType | undefined>;
};

const GenerationFormArea = ({
  $title: [title, setTitle],
  $thumbnail: [thumbnail, setThumbnail],
  $content: [content, setContent],
  $keywords: [keywords, setKeywords],
  $selectedManger: [selectedManger, setSelectedManager],
  generated,
  auto,
  $pageMode: [, setPageMode],
  $pageVisible: [, setPageVisible],
}: GenerationFormType & {
  generated: boolean;
  auto: boolean;
  $pageMode: ReactState<'DEFAULT' | 'SEARCH_TECH' | 'SEARCH_MANAGER'>;
  $pageVisible: ReactState<boolean>;
}) => {
  const { Color } = useStyleContext();
  const [visible, setVisible] = useState(false);

  const [detailInfoVisible, setDetailInfoVisible] = useState(false);
  const [surveyVisible, setSurveyVisible] = useState(false);

  const eventPlaceState = useDropDown();

  const [placeType, setPlaceType] = useState<EventPlaceType>();
  const [price, setPrice] = useState<boolean>();
  const [isExternalRecruitment, setIsExternalRecruitment] = useState<boolean>();
  const [hasSurvey, setHasSurvey] = useState<boolean>(false);

  const [questions, setQuestions] = useState<SurveyQuestionUnitProps[]>([]);

  useEffect(() => {
    const idx = eventPlaceState.selected;
    setPlaceType(
      idx === 0
        ? 'OFFLINE'
        : idx === 1
        ? 'ONLINE'
        : idx === 2
        ? 'BOTH'
        : undefined
    );
  }, [eventPlaceState.selected]);

  useEffect(() => {
    setVisible(generated);
  }, [generated]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        transition: 'opacity 0.2s ease-in-out',
        opacity: visible ? '1' : '0',
      }}
    >
      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        행사 기본 정보
      </span>
      <Spacer height={28} />
      <GenerationController
        title={'제목'}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <TextField size={'L'} value={title} setValue={setTitle} />
      <Spacer height={24} />
      <GenerationController
        title={'썸네일'}
        mode={auto ? 'REGENERATION' : 'NONE'}
      />
      <Spacer height={16} />
      <ThumbnailUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
      <Spacer height={24} />
      <GenerationController
        title={'본문내용'}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <TextField size={'L'} value={content} setValue={setContent} />
      <Spacer height={24} />

      {/* 키워드 목록 바인딩 필요 */}
      <GenerationController
        title={'중요 키워드'}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <TextField size={'L'} />
      <Spacer height={60} />
      {/* 키워드 목록 바인딩 필요 */}

      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        행사 정보
      </span>
      <Spacer height={28} />
      {/* 행사 장소 Form */}
      <DetailEventInfo
        {...{
          $visible: [detailInfoVisible, setDetailInfoVisible],
          $placeType: [placeType, setPlaceType],
          $price: [price, setPrice],
          $isExternalRecruitment: [
            isExternalRecruitment,
            setIsExternalRecruitment,
          ],
          $hasSurvey: [hasSurvey, setHasSurvey],
        }}
      />
      {/* 행사 장소 Form */}
      <Spacer height={60} />
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            ...Font.title.headline,
            color: Color.text.secondary,
          }}
        >
          설문조사
        </span>
        <ToggleButton
          isActivated={hasSurvey}
          onClick={() => setHasSurvey(!hasSurvey)}
        />
      </div>
      {/* 설문조사 Form 영역 */}
      {hasSurvey && (
        <>
          <Spacer height={28} />
          {questions.map(({}) => {})}
          <DefaultButton width={'100%'} size={'L'} style={'OUTLINE'}>
            질문 추가하기
          </DefaultButton>
        </>
      )}

      {/* 설문조사 Form 영역 */}
      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        카테고리
      </span>
      <Spacer height={28} />
      <span
        style={{
          ...Font.body.body1,
          color: Color.text.secondary,
          width: '100%',
          textAlign: 'start',
        }}
      >
        카테고리
      </span>
      <Spacer height={12} />
      <CheckBoxField size={'S'} isRow={true} marginTop={0}>
        <CheckBox size={'S'} onChange={() => {}} label={'기술전시회'} />
        <CheckBox size={'S'} onChange={() => {}} label={'기술이전 설명'} />
        <CheckBox size={'S'} onChange={() => {}} label={'강의/교육'} />
      </CheckBoxField>
      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        문의처
      </span>
      <Spacer height={28} />
      <span
        style={{
          ...Font.body.body1,
          color: Color.text.secondary,
          width: '100%',
          textAlign: 'start',
        }}
      >
        담당자 정보 <span style={{ color: Color.text.red }}>*</span>
      </span>
      <Spacer height={16} />
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: '8px',
        }}
      >
        <TextField
          size={'L'}
          state={'DISABLED'}
          width={'calc(85% - 4px)'}
          placeholder={selectedManger?.name ?? '담당자 정보를 등록해주세요'}
        />
        <DefaultButton
          size={'M'}
          height={'52px'}
          width={'calc(15% - 4px)'}
          onClick={() => {
            setPageVisible(false);
            setTimeout(() => {
              setPageMode('SEARCH_MANAGER');
            }, 200);
          }}
        >
          등록하기
        </DefaultButton>
      </div>
      <Spacer height={24} />
    </div>
  );
};

type FileType = {
  file: File;
  url: string;
};

type WriteTextSectionProps = {
  genFormValues: GenerationFormType;
  $generated: ReactState<boolean>;
  $pageMode: ReactState<'DEFAULT' | 'SEARCH_TECH' | 'SEARCH_MANAGER'>;
};

const WriteTextSection = ({
  genFormValues,
  $generated: [generated, setGenerated],
  $pageMode: [pageMode, setPageMode],
}: WriteTextSectionProps) => {
  const [newsSubjectValue, setNewsSubjectValue] = useState('');
  const { Color } = useStyleContext();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        transition: 'opacity 0.2s ease-in-out',
        opacity: visible ? '1' : '0',
      }}
    >
      <TextArea
        height={300}
        placeholder={'test'}
        value={newsSubjectValue}
        setValue={setNewsSubjectValue}
      />
      {!generated && (
        <>
          <Spacer height={24} />
          <DefaultButton
            width={'100%'}
            state={newsSubjectValue.length > 0 ? 'DEFAULT' : 'DISABLED'}
            onClick={() => setGenerated(true)}
          >
            행사 생성하기
          </DefaultButton>
          <Spacer height={18} />
        </>
      )}
      {generated && (
        <>
          <GenerationFormArea
            {...{
              ...genFormValues,
              generated,
              auto: true,
              $pageMode: [pageMode, setPageMode],
              $pageVisible: [visible, setVisible],
            }}
          />
        </>
      )}
      <hr
        style={{
          border: '0',
          width: '100%',
          height: '1px',
          background: Color.stroke.gray1,
          marginBottom: '24px',
        }}
      />
    </div>
  );
};

type ManagerType = {
  name: string;
  src?: string;
  team: string;
  position: string;
  email: string;
  office: string;
  phone: string;
  state: 'active' | 'onleave' | 'terminated';
};

type ManagerPageType = {
  $visible: ReactState<boolean>;
  backHandler: () => void;
  submitHandler: () => void;
  $selectedManger: ReactState<ManagerType | undefined>;
};

const SearchManager = ({
  $visible: [, setVisible],
  backHandler,
  submitHandler,
  $selectedManger: [, setSelectedManager],
}: ManagerPageType) => {
  const { Color } = useStyleContext();
  const { isDesktop } = useMediaQueryContext();
  const categoryState = useDropDown();

  const [managers, setManagers] = useState<ManagerType[]>(
    new Array(10).fill({
      name: '김사무엘',
      team: '부서명',
      position: '직책',
      email: 'test@naver.com',
      office: '02-123-1234',
      phone: '010-1234-5678',
      state: 'active',
    })
  );

  const [reporterIndex, setManagerIndex] = useState<number>();

  useEffect(() => {
    setSelectedManager(managers.find((_, idx) => idx === reporterIndex));
  }, [reporterIndex]);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <SubTitle>뉴스/기자정보</SubTitle>
      <SmallTitle>기자정보</SmallTitle>
      <SearchContainer>
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '담당자',
              value: '1',
            },
            {
              label: '직책',
              value: '2',
            },
            {
              label: '부서',
              value: '3',
            },
          ]}
          type={'DEFAULT'}
          states={categoryState}
          width={isDesktop ? '200px' : 'calc(50% - 4px)'}
          placeholder={'카테고리'}
        />
        <TextField
          state={'DEFAULT'}
          size={'S'}
          width={
            isDesktop
              ? 'calc(100% - 69px - 12px - 200px)'
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
      </SearchContainer>
      <TableWrapper Color={Color}>
        <Table Color={Color}>
          <colgroup>
            <ColumnWidth width="18%" />
            <ColumnWidth width="10%" />
            <ColumnWidth width="10%" />
            <ColumnWidth width="18%" />
            <ColumnWidth width="15%" />
            <ColumnWidth width="15%" />
            <ColumnWidth width="8%" />
            <ColumnWidth width="6%" />
          </colgroup>
          <thead>
            <tr style={{ ...Font.body.caption }}>
              <Th>담당자</Th>
              <Th>부서</Th>
              <Th>직책</Th>
              <Th>이메일</Th>
              <Th>사무실 연락처</Th>
              <Th>휴대폰번호</Th>
              <Th>근무상태</Th>
              <Th>선택</Th>
            </tr>
          </thead>
          <tbody style={{ ...Font.body.caption }}>
            {managers.map(
              (
                { name, src, team, position, email, office, phone, state },
                idx
              ) => (
                <tr>
                  <Td>
                    <FlexWrapper>
                      <Avatar size={'S'} src={src} />
                      {name}
                    </FlexWrapper>
                  </Td>
                  <Td>{team}</Td>
                  <Td>{position}</Td>
                  <Td>{email}</Td>
                  <Td>{office}</Td>
                  <Td>{phone}</Td>
                  <Td>
                    {state === 'active'
                      ? '재직중'
                      : state === 'onleave'
                      ? '휴직중'
                      : '퇴사'}
                  </Td>
                  <Td>
                    <RadioField
                      size="S"
                      style={
                        {
                          alignItems: 'center',
                          justifyContent: 'center',
                        } as React.StyleHTMLAttributes<any>
                      }
                    >
                      <RadioButton
                        size="S"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setManagerIndex(idx);
                          }
                        }}
                        checked={reporterIndex === idx}
                      />
                    </RadioField>
                  </Td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </TableWrapper>
      <Spacer height={24} />
      <ButtonWrapper>
        <DefaultButton style={'OUTLINE'} size="S" onClick={backHandler}>
          뒤로가기
        </DefaultButton>
        <DefaultButton size="S" onClick={submitHandler}>
          등록하기
        </DefaultButton>
      </ButtonWrapper>
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

// 행사 장소 유형
type EventPlaceType = 'ONLINE' | 'OFFLINE' | 'BOTH';

type DetailEventInfoProps = {
  $visible: ReactState<boolean>;
  $placeType: ReactState<EventPlaceType | undefined>;
  $price: ReactState<boolean | undefined>;
  $isExternalRecruitment: ReactState<boolean | undefined>;
  $hasSurvey: ReactState<boolean>;
};

const DetailEventInfo = ({
  $visible: [visible, setVisible],
  $placeType: [placeType, setPlaceType],
  $price: [price, setPrice],
  $isExternalRecruitment: [isExternalRecruitment, setIsExternalRecruitment],
  $hasSurvey: [hasSurvey, setHasSurvey],
}: DetailEventInfoProps) => {
  useEffect(() => {
    setVisible(true);
  }, []);

  const eventPlaceState = useDropDown();
  useEffect(() => {
    const idx = eventPlaceState.selected;
    setPlaceType(
      idx === 0
        ? 'OFFLINE'
        : idx === 1
        ? 'ONLINE'
        : idx === 2
        ? 'BOTH'
        : undefined
    );
  }, [eventPlaceState.selected]);

  const recruitmentState = useDropDown();
  useEffect(() => {
    const idx = recruitmentState.selected;
    setIsExternalRecruitment(idx === 1);
  }, [recruitmentState.selected]);

  const priceState = useDropDown();
  useEffect(() => {
    const idx = priceState.selected;
    setPrice(idx === 1);
  }, [priceState.selected]);

  const bankState = useDropDown();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        transition: 'opacity 0.2s ease-in-out',
        opacity: visible ? '1' : '0',
      }}
    >
      <FormTitle label={'행사 장소'} optional={false} />
      <DropDown
        placeholder={'행사 장소를 선택해주세요.'}
        contents={[
          {
            label: '오프라인',
            value: 'offline',
          },
          {
            label: '온라인',
            value: 'online',
          },
          {
            label: '온/오프라인',
            value: 'online',
          },
        ]}
        type={'DEFAULT'}
        width={'100%'}
        size={'L'}
        states={eventPlaceState}
      />
      {placeType === 'ONLINE' && (
        <>
          <FormTitle label={'온라인 장소'} optional={false} />
          <TextField size={'L'} value={'메타버스 플랫폼'} setValue={() => {}} />
        </>
      )}
      {placeType === 'OFFLINE' && (
        <>
          <FormTitle label={'오프라인 장소'} optional={false} />
          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: '8px',
            }}
          >
            <TextField
              size={'L'}
              state={'DISABLED'}
              width={'calc(85% - 4px)'}
              placeholder={'주소를 선택해주세요.'}
            />
            <DefaultButton
              size={'M'}
              height={'52px'}
              width={'calc(15% - 4px)'}
              onClick={() => {}}
            >
              주소찾기
            </DefaultButton>
          </div>
        </>
      )}
      {placeType === 'BOTH' && (
        <>
          <FormTitle label={'온라인 장소'} optional={false} />
          <TextField size={'L'} value={'메타버스 플랫폼'} setValue={() => {}} />
          <FormTitle label={'오프라인 장소'} optional={false} />
          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: '8px',
            }}
          >
            <TextField
              size={'L'}
              state={'DISABLED'}
              width={'calc(85% - 4px)'}
              placeholder={'주소를 선택해주세요.'}
            />
            <DefaultButton
              size={'M'}
              height={'52px'}
              width={'calc(15% - 4px)'}
              onClick={() => {}}
            >
              주소찾기
            </DefaultButton>
          </div>
          <Spacer height={24} />
          <TextField
            size={'L'}
            placeholder={'상세 주소를 입력해주세요.'}
            value={''}
            setValue={() => {}}
          />
        </>
      )}
      <FormTitle label={'모집방법'} optional={false} />
      <DropDown
        placeholder={'모집 방법을 선택해주세요.'}
        contents={[
          {
            label: '한국기술마켓에서 모집',
            value: 'kotech',
          },
          {
            label: '외부 모집',
            value: 'external',
          },
        ]}
        type={'DEFAULT'}
        width={'100%'}
        size={'L'}
        states={recruitmentState}
      />
      {isExternalRecruitment && (
        <>
          <FormTitle label={'외부 URL'} optional={false} />
          <TextField
            value=""
            setValue={() => {}}
            placeholder={'외부 URL을 입력하세요.'}
          />
        </>
      )}
      <FormTitle label={'모집일정'} optional={false} />
      <TextField
        value=""
        setValue={() => {}}
        placeholder={'2000.01.01 ~ 2000.01.01'}
      />
      <FormTitle label={'행사일정'} optional={false} />
      <TextField
        value=""
        setValue={() => {}}
        placeholder={'2000.01.01 ~ 2000.01.01'}
      />
      <FormTitle label={'가격'} optional={false} />
      <DropDown
        placeholder={'유/무료 여부를 선택해주세요.'}
        contents={[
          {
            label: '무료',
            value: 'free',
          },
          {
            label: '유료',
            value: 'pay',
          },
        ]}
        type={'DEFAULT'}
        width={'100%'}
        size={'L'}
        states={priceState}
      />
      {price && (
        <>
          <FormTitle label={'비용'} optional={false} />
          <TextField value="" setValue={() => {}} />
          {!isExternalRecruitment && (
            <>
              <FormTitle label={'입금은행'} optional={false} />
              <DropDown
                placeholder={'입금 은행을 선택해주세요.'}
                contents={[
                  {
                    label: '무료',
                    value: 'free',
                  },
                  {
                    label: '유료',
                    value: 'pay',
                  },
                ]}
                type={'DEFAULT'}
                width={'100%'}
                size={'L'}
                states={bankState}
              />
              <FormTitle label={'입금 계좌번호'} optional={false} />
              <TextField value="" setValue={() => {}} />
              <FormTitle label={'예금주'} optional={false} />
              <TextField value="" setValue={() => {}} />
            </>
          )}
        </>
      )}
      {placeType === 'ONLINE' ||
        (placeType === 'OFFLINE' && (
          <>
            <FormTitle label={'모집인원'} optional={false} />
            <TextField value="" setValue={() => {}} />
          </>
        ))}
      {placeType === 'BOTH' && (
        <>
          <FormTitle label={'온라인 모집인원'} optional={false} />
          <TextField value="" setValue={() => {}} />
          <FormTitle label={'오프라인 모집인원'} optional={false} />
          <TextField value="" setValue={() => {}} />
        </>
      )}
    </div>
  );
};

const event = () => {
  const { Color } = useStyleContext();

  const [selectedType, setSelectedType] = useState<
    'CHOOSE_PAPER' | 'WRITE_TEXT' | 'NONE'
  >();

  const [newsSubjectValue, setNewsSubjectValue] = useState('');
  const [generated, setGenerated] = useState(false);
  const navigate = useCustomNavigate();

  const { isDesktop } = useMediaQueryContext();

  const [pageMode, setPageMode] = useState<
    'DEFAULT' | 'SEARCH_TECH' | 'SEARCH_MANAGER'
  >('DEFAULT');

  const [visible, setVisible] = useState(true);

  const $title = useState('');
  const $thumbnail = useState<FileType>();
  const $content = useState('');
  const $categories = useState<number[]>([]);
  const $keywords = useState<string[]>([]);

  const [selectedPapers, setSelectedPapers] = useState<
    {
      type: 0 | 1 | 2; // 특허 논문 보고서
      fileName: string;
      author: string;
    }[]
  >([]);

  const [selectedManger, setSelectedManager] = useState<ManagerType>();

  const genFormValues = useMemo(
    () => ({
      $title,
      $thumbnail,
      $content,
      $keywords,
      $selectedManger: [selectedManger, setSelectedManager] as ReactState<
        ManagerType | undefined
      >,
    }),
    [$title[0], $thumbnail[0], $content[0], $categories[0], selectedManger]
  );

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const test =
      selectedManger &&
      $title[0].length > 0 &&
      $thumbnail[0]?.file &&
      $content[0].length > 0 &&
      $keywords[0].length > 0;

    if (test) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [$title[0], $thumbnail[0], $content[0], $keywords[0], selectedManger]);

  useEffect(() => {
    setNewsSubjectValue('');
    setGenerated(false);

    $title[1]('');
    $thumbnail[1](undefined);
    $content[1]('');
    $keywords[1]([]);
    setSelectedManager(undefined);
  }, [selectedType]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        transition: 'opacity 0.2s ease-in-out',
        opacity: visible ? '1' : '0',
      }}
    >
      {pageMode === 'DEFAULT' && (
        <Container
          Color={Color}
          style={{
            opacity: visible ? '1' : '0',
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          <span style={{ ...Font.body.body2, marginBottom: '8px' }}>
            수정하기
          </span>
          <span style={{ ...Font.title.display2, marginBottom: '36px' }}>
            행사
          </span>
          <span style={{ ...Font.title.headline, marginBottom: '28px' }}>
            유형선택
            <InfoButton />
          </span>
          <span
            style={{
              ...Font.body.body1,
              marginBottom: '13px',
              color: Color.text.secondary,
            }}
          >
            유형선택 <span style={{ color: Color.text.red }}>*</span>
          </span>
          <RadioField size={'S'} isRow={true}>
            <RadioButton
              label={'글 입력'}
              size={'S'}
              onChange={() => setSelectedType('WRITE_TEXT')}
              checked={selectedType === 'WRITE_TEXT'}
            />
            <RadioButton
              label={'사용안함'}
              size={'S'}
              onChange={() => setSelectedType('NONE')}
              checked={selectedType === 'NONE'}
            />
          </RadioField>
          {selectedType === 'WRITE_TEXT' && (
            <>
              <Spacer height={32} />
              <WriteTextSection
                {...{
                  genFormValues,
                  $generated: [generated, setGenerated],
                  $pageMode: [pageMode, setPageMode],
                }}
              />
            </>
          )}
          {selectedType === 'NONE' && (
            <>
              <GenerationFormArea
                {...{
                  ...genFormValues,
                  generated: true,
                  auto: false,
                  $pageMode: [pageMode, setPageMode],
                  $pageVisible: [visible, setVisible],
                }}
              />
              <hr
                style={{
                  border: '0',
                  width: '100%',
                  height: '1px',
                  background: Color.stroke.gray1,
                  marginBottom: '24px',
                }}
              />
            </>
          )}
          {!selectedType && (
            <>
              <Spacer height={32} />
              <hr
                style={{
                  border: '0',
                  width: '100%',
                  height: '1px',
                  background: Color.stroke.gray1,
                  marginBottom: '24px',
                }}
              />
            </>
          )}
          {(generated || selectedType === 'NONE') && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
              }}
            >
              <DefaultButton
                style={'OUTLINE'}
                onClick={() => navigate('/contents/upload')}
              >
                돌아가기
              </DefaultButton>
              <DefaultButton
                style={'PRIMARY'}
                state={isValid ? 'DEFAULT' : 'DISABLED'}
              >
                수정하기
              </DefaultButton>
            </div>
          )}
        </Container>
      )}
      {pageMode === 'SEARCH_MANAGER' && (
        <SearchManager
          $visible={[visible, setVisible]}
          backHandler={() => {
            setVisible(false);
            setTimeout(() => {
              setPageMode('DEFAULT');
              setVisible(true);
              setSelectedPapers([]);
            }, 200);
          }}
          submitHandler={() => {
            setVisible(false);
            setTimeout(() => {
              setPageMode('DEFAULT');
              setVisible(true);
            }, 200);
          }}
          $selectedManger={[selectedManger, setSelectedManager]}
        />
      )}
    </div>
  );
};

export default withPageLoadedEffect(event);
