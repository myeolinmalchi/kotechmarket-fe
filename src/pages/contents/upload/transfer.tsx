// TODO: 문서 편집기 추가
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import withPageLoadedEffect from '../../../hocs/withPageLoadedEffect';
import {
  useMediaQueryContext,
  useStyleContext,
} from '../../../contexts/AppContextProvider';
import { ColorType } from '../../../types/Style';
import Font from '../../../styles/Font';
import { RadioButton, RadioField } from '../../../components/Radio';
import { DefaultButton, TextButton } from '../../../components/Button';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import { TextArea, TextField } from '../../../components/TextFields';
import { CheckBox, CheckBoxField } from '../../../components/CheckBox';
import {
  ButtonWrapper,
  ColumnWidth,
  FlexWrapper,
  Table,
  TableWrapper,
  Td,
  Th,
} from '../../../components/Table';
import {
  SearchContainer,
  SmallTitle,
  SubTitle,
} from '../../../components/Search';
import { DropDown } from '../../../components/DropDown';
import { useDropDown } from '../../../hooks/useDropDown';
import { Pagination } from '../../../components/Pagination';
import Avatar from '../../../components/Avatar';

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
  optional = false,
}: {
  title: string;
  mode?: 'DEFAULT' | 'REGENERATION' | 'CORRECTION' | 'NONE';
  optional?: boolean;
}) => {
  const { Color } = useStyleContext();
  return (
    <GenerationControllerContainer Color={Color}>
      <GenerationControllerTitle style={{ ...Font.body.body1 }}>
        {title}
        {!optional && (
          <>
            <span style={{ color: Color.text.red }}> *</span>
          </>
        )}
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

const FormTitle = ({
  label,
  optional = false,
}: {
  label: string;
  optional?: boolean;
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

type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type PageType =
  | 'DEFAULT'
  | 'SEARCH_TECH'
  | 'SEARCH_REPORTER'
  | 'SEARCH_RELATION_TECH';

type GenerationFormType = {
  /* -----------기술 상세 정보----------- */
  $orgName: ReactState<string>;
  $techName: ReactState<string>;
  $appNumber: ReactState<string>; // 출원번호
  $regNumber: ReactState<string>; // 등록번호
  // 권리구분
  // 권리기간
  $docNumber: ReactState<string>; // 문서번호
  $journal: ReactState<string>; // 저널
  $reference: ReactState<string>; // 출처
  $leadResearcher: ReactState<string>; // 대표 연구자
  $coResearcher: ReactState<string | undefined>; // 공동 연구자
  $thumbnail: ReactState<FileType | undefined>;
  $keywords: ReactState<string[]>;
  /* -----------기술 상세 정보----------- */

  /* ------------기술 정보--------------- */
  $title: ReactState<string>; // 기술 제목
  $techField: ReactState<string>; // 기술 분야
  $categories: ReactState<number[]>; // 카테고리
  /* ------------기술 정보--------------- */

  /* ------------기술 소개--------------- */
  $introTitle: ReactState<string>; // 기술 소개 제목
  $introContent: ReactState<string>; // 기술 소개 내용
  $introThumbnail: ReactState<FileType | undefined>; // 기술 소개 썸네일
  $introThumbnailDescription: ReactState<string>; // 기술 소개 썸네일 설명
  /* ------------기술 소개--------------- */

  /* ------------유튜브 영상--------------- */
  $youtubeURL: ReactState<string>;
  /* ------------유튜브 영상--------------- */

  /* ------------기술 완성도(TRL)--------------- */
  $TRL: ReactState<TRLValue | undefined>;
  /* ------------기술 완성도(TRL)--------------- */

  /* ------------연관 기술 선택--------------- */
  $relationPapers: ReactState<EssentialPaperType[]>;
  /* ------------연관 기술 선택--------------- */

  /* ------------매도/수 절차--------------- */

  /* ------------매도/수 절차--------------- */

  $isRelationPaperSearch: ReactState<boolean>;
};

type TRLValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const GenerationFormArea = ({
  $orgName: [orgName, setOrgName],
  $techName: [techName, setTechName],
  $appNumber: [appNumber, setAppNumber],
  $regNumber: [regNumber, setRegNumber],
  $docNumber: [docNumber, setDocNumber],
  $journal: [journal, setJournal],
  $reference: [reference, setReference],
  $leadResearcher: [leadResearcher, setLeadResearcher],
  $coResearcher: [coResearcher, setCoResearcher],
  $thumbnail: [thumbnail, setThumbnail],
  $keywords: [keywords, setKeywords],
  $title: [title, setTitle],
  $techField: [techField, setTechField],
  $categories: [categories, setCategories],
  $introTitle: [introTitle, setIntroTitle],
  $introContent: [introContent, setIntroContent],
  $introThumbnail: [introThumbnail, setIntroThumbnail],
  $introThumbnailDescription: [
    introThumbnailDescription,
    setIntroThumbnailDescription,
  ],
  $youtubeURL: [youtubeURL, setYoutubeURL],
  $TRL: [TRL, setTRL],
  $relationPapers: [relationPapers, setRelationPapers],
  generated,
  auto,
  $pageMode: [, setPageMode],
  $pageVisible: [pageVisible, setPageVisible],
  $isRelationPaperSearch: [, setIsRelationPaperSearch],
}: GenerationFormType & {
  generated: boolean;
  auto: boolean;
  $pageMode: ReactState<PageType>;
  $pageVisible: ReactState<boolean>;
}) => {
  const { Color } = useStyleContext();
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    setVisible(generated);
  }, [generated]);

  const rightDivStates = useDropDown();
  const TRLStates = useDropDown();

  React.useEffect(() => {
    setTRL(TRLStates.selected as TRLValue);
  }, [TRLStates.selected]);

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
        기술 상세 정보
      </span>
      <FormTitle label={'기관명'} optional={false} />
      <TextField
        size={'L'}
        value={orgName}
        setValue={setOrgName}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />
      <FormTitle label={'기술명'} optional={false} />
      <TextField
        size={'L'}
        value={techName}
        setValue={setTechName}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />
      <FormTitle label={'출원번호'} optional={true} />
      <TextField
        size={'L'}
        value={appNumber}
        setValue={setAppNumber}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />
      <FormTitle label={'등록번호'} optional={true} />
      <TextField
        size={'L'}
        value={regNumber}
        setValue={setRegNumber}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />
      <FormTitle label={'권리구분'} optional={true} />
      <DropDown
        size={'L'}
        contents={[]}
        states={rightDivStates}
        type={'DEFAULT'}
        width={'100%'}
        placeholder={'권리구분을 선택해주세요'}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />
      <FormTitle label={'권리기간'} optional={true} />
      {/* TODO: 입력 FORM 텍스트에서 기간으로 수정 필요 */}
      <TextField
        size={'L'}
        value={''}
        setValue={() => {}}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />

      <FormTitle label={'문서번호'} optional={true} />
      <TextField
        size={'L'}
        value={docNumber}
        setValue={setDocNumber}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />

      <FormTitle label={'저널'} optional={true} />
      <TextField
        size={'L'}
        value={journal}
        setValue={setJournal}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />

      <FormTitle label={'출처'} optional={true} />
      <TextField
        size={'L'}
        value={reference}
        setValue={setReference}
        state={auto ? 'DISABLED' : 'DEFAULT'}
      />

      <FormTitle label={'대표 연구자'} optional={false} />
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
          placeholder={'대표 연구자 정보를 등록해주세요.'}
        />
        <DefaultButton
          size={'M'}
          height={'52px'}
          width={'calc(15% - 4px)'}
          onClick={() => {
            setPageVisible(false);
            setTimeout(() => {
              setPageMode('SEARCH_REPORTER');
            }, 200);
          }}
        >
          등록하기
        </DefaultButton>
      </div>

      <FormTitle label={'공동 연구자'} optional={true} />
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
          placeholder={'공동 연구자 정보를 등록해주세요.'}
        />
        <DefaultButton
          size={'M'}
          height={'52px'}
          width={'calc(15% - 4px)'}
          onClick={() => {
            setPageVisible(false);
            setTimeout(() => {
              setPageMode('SEARCH_REPORTER');
            }, 200);
          }}
        >
          등록하기
        </DefaultButton>
      </div>

      <FormTitle label={'썸네일'} />
      <ThumbnailUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />

      <Spacer height={24} />

      <GenerationController
        title={'중요키워드'}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <TextField size={'L'} value={''} setValue={() => {}} />

      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        기술 정보
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
        title={'기술분야'}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <TextField size={'L'} value={techField} setValue={setTechField} />
      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        기술 소개
      </span>
      <Spacer height={28} />
      <GenerationController
        title={'제목'}
        optional={true}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <TextField size={'L'} value={introTitle} setValue={setIntroTitle} />
      <Spacer height={24} />
      <GenerationController
        optional={true}
        title={'내용'}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <TextArea
        size={'L'}
        value={introContent}
        setValue={setIntroContent}
        height={104}
      />
      <Spacer height={24} />
      <GenerationController
        title={'이미지'}
        mode={auto ? 'DEFAULT' : 'CORRECTION'}
      />
      <Spacer height={16} />
      <ThumbnailUploader
        thumbnail={introThumbnail}
        setThumbnail={setIntroThumbnail}
      />
      <Spacer height={8} />
      <TextField
        placeholder={'이미지 설명을 적어주세요'}
        value={introThumbnailDescription}
        setValue={setIntroThumbnailDescription}
      />

      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        유튜브 영상
      </span>
      <FormTitle label="유튜브 URL" optional={true} />
      <TextField
        placeholder="동영상 링크를 입력해주세요"
        value={youtubeURL}
        setValue={setYoutubeURL}
      />

      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        기술 완성도
      </span>
      <FormTitle label={'기술완성도(TRL)'} optional={false} />
      <DropDown
        type={'DEFAULT'}
        width={'100%'}
        size={'L'}
        placeholder={'기술완성도를 선택해주세요'}
        states={TRLStates}
        contents={[
          {
            label: '선택안함',
            value: '0',
          },
          {
            label: '1단계 기본원리파악',
            value: '1',
          },
          {
            label: '2단계 기본개념정립',
            value: '1',
          },
          {
            label: '3단계 기능 및 개념 검증',
            value: '1',
          },
          {
            label: '4단계 연구실 환경 테스트',
            value: '1',
          },
          {
            label: '5단계 유사환경 테스트',
            value: '1',
          },
          {
            label: '6단계 파일럿 현장 테스트',
            value: '1',
          },
          {
            label: '7단계 상용모델 개발',
            value: '1',
          },
          {
            label: '8단계 실제 환경 최종테스트',
            value: '1',
          },
          {
            label: '9단계 상용운영',
            value: '1',
          },
        ]}
      />
      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        연관 기술 선택
      </span>
      <Spacer height={28} />
      <PaperItemContainer
        Color={Color}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: relationPapers.length === 0 ? 'center' : 'start',
          flexDirection: 'column',
          width: '100%',
          height: '300px',
          border: `1px solid ${Color.stroke.gray1}`,
          borderRadius: '4px',
          gap: '12px',
          boxSizing: 'border-box',
          padding: '24px 18px',
        }}
      >
        {relationPapers.length === 0 && (
          <>
            <span style={{ ...Font.title.subhead3, color: Color.text.primary }}>
              기술문서를 선택해주세요
            </span>
            <TextButton
              style={'PRIMARY'}
              type={'UNDERLINE'}
              onClick={() => {
                setVisible(false);
                setIsRelationPaperSearch(true);
                setTimeout(() => {
                  setPageMode('SEARCH_TECH');
                }, 200);
              }}
            >
              기술 선택하기
            </TextButton>
          </>
        )}
        {relationPapers.length > 0 &&
          relationPapers.map((props, idx) => (
            <>
              <PaperItem
                {...{
                  ...props,
                  clearHandler: () => {
                    setRelationPapers(
                      relationPapers.filter((_, i) => i !== idx)
                    );
                  },
                }}
              />
            </>
          ))}
      </PaperItemContainer>
      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        매도/수 절차
        <DefaultButton size={'S'}>절차 불러오기</DefaultButton>
      </span>
      <Spacer height={24} />
      <DefaultButton size={'L'} style={'OUTLINE'} width={'100%'}>
        추가하기
      </DefaultButton>
      <Spacer height={60} />
      <span
        style={{
          ...Font.title.headline,
          color: Color.text.secondary,
        }}
      >
        문의처
      </span>
      <FormTitle label={'담당자 정보'} optional={false} />
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
          placeholder={'대표 연구자 정보를 등록해주세요.'}
        />
        <DefaultButton
          size={'M'}
          height={'52px'}
          width={'calc(15% - 4px)'}
          onClick={() => {
            setPageVisible(false);
            setTimeout(() => {
              setPageMode('SEARCH_REPORTER');
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
  $pageMode: ReactState<PageType>;
};

const WriteTextSection = ({
  genFormValues,
  $generated: [generated, setGenerated],
  $pageMode: [pageMode, setPageMode],
}: WriteTextSectionProps) => {
  const [newsSubjectValue, setNewsSubjectValue] = React.useState('');
  const { Color } = useStyleContext();

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
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
        placeholder={'소재를 간단히 작성해주세요.'}
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
            뉴스 생성하기
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

type EssentialPaperType = {
  type: 0 | 1 | 2; // 특허 논문 보고서
  fileName: string;
  author: string;
};

type PaperType = EssentialPaperType & {
  paperNo: string;
  name: string;
  year: number;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type ChoosePaperSectionType = {
  genFormValues: GenerationFormType;
  $generated: ReactState<boolean>;
  $pageMode: ReactState<PageType>;
  onClick: () => void;
  $selectedPapers: ReactState<EssentialPaperType[]>;
};

const PaperItem = ({
  type,
  fileName,
  author,
  clearHandler,
}: EssentialPaperType & { clearHandler: () => void }) => {
  const { Color } = useStyleContext();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 20px',
        border: `1px solid ${Color.stroke.gray1}`,
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 'calc(100% - 24px)',
          gap: '8px',
        }}
      >
        <span
          style={{
            ...Font.title.subhead3,
            color: Color.text.primary,
            width: '100%',
          }}
        >
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              background: Color.background.blue1,
              marginRight: '8px',
              ...Font.title.subhead2,
              color: Color.text.default,
            }}
          >
            {type === 0 ? '특허' : type === 1 ? '논문' : '보고서'}
          </span>
          <span>{fileName}</span>
        </span>
        <span
          style={{
            ...Font.body.caption,
            color: Color.text.third,
            width: '100%',
            textAlign: 'start',
          }}
        >
          {author}
        </span>
      </div>
      <ClearButton onClick={clearHandler}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071Z"
            fill="#5D6169"
          />
        </svg>
      </ClearButton>
    </div>
  );
};

const PaperItemContainer = styled.div<{ Color: ColorType }>`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.Color.stroke.gray1};
  }

  overflow-y: scroll;
`;

const ChoosePaperSection = ({
  genFormValues,
  $generated: [generated, setGenerated],
  $pageMode,
  onClick,
  $selectedPapers: [selectedPapers, setSelectedPapers],
}: ChoosePaperSectionType) => {
  const { Color } = useStyleContext();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
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
        boxSizing: 'border-box',
      }}
    >
      <PaperItemContainer
        Color={Color}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: selectedPapers.length === 0 ? 'center' : 'start',
          flexDirection: 'column',
          width: '100%',
          height: '300px',
          border: `1px solid ${Color.stroke.gray1}`,
          borderRadius: '4px',
          gap: '12px',
          boxSizing: 'border-box',
          padding: '24px 18px',
        }}
      >
        {selectedPapers.length === 0 && (
          <>
            <span style={{ ...Font.title.subhead3, color: Color.text.primary }}>
              기술문서를 선택해주세요
            </span>
            <TextButton style={'PRIMARY'} type={'UNDERLINE'} onClick={onClick}>
              기술 선택하기
            </TextButton>
          </>
        )}
        {selectedPapers.length > 0 &&
          selectedPapers.map((props, idx) => (
            <>
              <PaperItem
                {...{
                  ...props,
                  clearHandler: () => {
                    setSelectedPapers(
                      selectedPapers.filter((_, i) => i !== idx)
                    );
                  },
                }}
              />
            </>
          ))}
      </PaperItemContainer>
      {!generated && (
        <>
          <Spacer height={24} />
          <DefaultButton
            width={'100%'}
            state={selectedPapers.length > 0 ? 'DEFAULT' : 'DISABLED'}
            onClick={() => setGenerated(true)}
          >
            뉴스 생성하기
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
              $pageMode,
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

type TechType = {
  $visible: ReactState<boolean>;
  backHandler: () => void;
  submitHandler: () => void;
  setSelectedPapers: SetState<EssentialPaperType[]>;
  setRelationPapers: SetState<EssentialPaperType[]>;
  $isRelationPaperSearch: ReactState<boolean>;
};

const SearchTech = ({
  $visible: [, setVisible],
  backHandler,
  submitHandler,
  setSelectedPapers,
  setRelationPapers,
  $isRelationPaperSearch: [isRelationPaperSearch, setIsRelationPaperSearch],
}: TechType) => {
  const { Color } = useStyleContext();
  const { isDesktop } = useMediaQueryContext();
  const categoryState = useDropDown();

  const [papers, setPapers] = useState<PaperType[]>(
    new Array(10).fill({
      type: 1,
      paperNo: 'TRKO200200002804',
      name: '기술명',
      author: '홍길동',
      year: 2023,
      fileName: '[강소특구 제2캠퍼스]입주신청서 및 사업계획서 양식.hwp',
    })
  );

  const [selectedPaperIndex, setSelectedPaperIndex] = useState<boolean[]>([]);

  useEffect(() => {
    setSelectedPaperIndex(new Array(papers.length).fill(false));
  }, [papers]);

  useEffect(() => {
    if (isRelationPaperSearch) {
      setRelationPapers(() =>
        selectedPaperIndex
          .reduce((acc, c, idx) => (c ? [...acc, idx] : acc), [] as number[])
          .map((i) => ({
            type: papers[i].type,
            fileName: papers[i].fileName,
            author: papers[i].author,
          }))
      );
    } else {
      setSelectedPapers(() =>
        selectedPaperIndex
          .reduce((acc, c, idx) => (c ? [...acc, idx] : acc), [] as number[])
          .map((i) => ({
            type: papers[i].type,
            fileName: papers[i].fileName,
            author: papers[i].author,
          }))
      );
    }
  }, [selectedPaperIndex]);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <SubTitle>뉴스/기술찾기</SubTitle>
      <SmallTitle>기술찾기</SmallTitle>
      <SearchContainer>
        <DropDown
          size={'S'}
          contents={[
            {
              label: '전체',
              value: '0',
            },
            {
              label: '특허',
              value: '1',
            },
            {
              label: '논문',
              value: '2',
            },
            {
              label: '보고서',
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
            <ColumnWidth width="8%" />
            <ColumnWidth width="12%" />
            <ColumnWidth width="30%" />
            <ColumnWidth width="17%" />
            <ColumnWidth width="8%" />
            <ColumnWidth width="17%" />
            <ColumnWidth width="8%" />
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
          <tbody style={{ ...Font.body.caption }}>
            {papers.map(
              ({ type, paperNo, name, author, year, fileName }, idx) => (
                <tr>
                  <Td>
                    {type === 0 ? '특허' : type === 1 ? '논문' : '보고서'}
                  </Td>
                  <Td>{paperNo}</Td>
                  <Td>{name}</Td>
                  <Td>{author}</Td>
                  <Td>{year}</Td>
                  <Td>
                    <FlexWrapper>
                      <TextButton
                        style={'PRIMARY'}
                        type={'UNDERLINE'}
                        size={'SS'}
                      >
                        PDF 보기
                      </TextButton>
                    </FlexWrapper>
                  </Td>
                  <Td>
                    <CheckBoxField
                      size={'S'}
                      marginTop={0}
                      style={
                        {
                          alignItems: 'center',
                          justifyContent: 'center',
                        } as React.StyleHTMLAttributes<any>
                      }
                    >
                      <CheckBox
                        size={'S'}
                        checked={selectedPaperIndex[idx]}
                        onChange={() => {
                          setSelectedPaperIndex(
                            selectedPaperIndex.map((a, i) =>
                              i === idx ? !a : a
                            )
                          );
                        }}
                      />
                    </CheckBoxField>
                  </Td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </TableWrapper>
      <span
        style={{
          width: '100%',
          textAlign: 'start',
          color: Color.text.secondary,
          ...Font.body.body1,
          marginTop: '24px',
          marginBottom: '32px',
        }}
      >
        *PDF가 등록된 기술만 선택이 가능합니다.
      </span>
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

type ReporterType = {
  name: string;
  src?: string;
  team: string;
  position: string;
  email: string;
  office: string;
  phone: string;
  state: 'active' | 'onleave' | 'terminated';
};

type ReporterPageType = {
  $visible: ReactState<boolean>;
  backHandler: () => void;
  submitHandler: () => void;
  $selectedReporter: ReactState<ReporterType | undefined>;
};

const SearchReporter = ({
  $visible: [, setVisible],
  backHandler,
  submitHandler,
  $selectedReporter: [, setSelectedReporter],
}: ReporterPageType) => {
  const { Color } = useStyleContext();
  const { isDesktop } = useMediaQueryContext();
  const categoryState = useDropDown();

  const [reporters, setReporters] = useState<ReporterType[]>(
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

  const [reporterIndex, setReporterIndex] = useState<number>();

  useEffect(() => {
    setSelectedReporter(reporters.find((_, idx) => idx === reporterIndex));
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
            {reporters.map(
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
                            setReporterIndex(idx);
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

const transfer = () => {
  const { Color } = useStyleContext();

  const [selectedType, setSelectedType] = React.useState<
    'CHOOSE_PAPER' | 'WRITE_TEXT' | 'NONE'
  >();

  const [newsSubjectValue, setNewsSubjectValue] = React.useState('');
  const [generated, setGenerated] = React.useState(false);
  const navigate = useCustomNavigate();

  const { isDesktop } = useMediaQueryContext();

  const [pageMode, setPageMode] = useState<PageType>('DEFAULT');

  const [visible, setVisible] = useState(true);

  const $orgName = React.useState<string>('');
  const $techName = React.useState<string>('');
  const $appNumber = React.useState<string>('');
  const $regNumber = React.useState<string>('');
  const $docNumber = React.useState<string>('');
  const $journal = React.useState<string>('');
  const $reference = React.useState<string>('');
  const $leadResearcher = React.useState<string>('');
  const $coResearcher = React.useState<string | undefined>();
  const $thumbnail = React.useState<FileType | undefined>();
  const $keywords = React.useState<string[]>([]);

  const $title = React.useState<string>('');
  const $techField = React.useState<string>('');
  const $categories = React.useState<number[]>([]);

  const $introTitle = React.useState<string>('');
  const $introContent = React.useState<string>('');
  const $introThumbnail = React.useState<FileType | undefined>();
  const $introThumbnailDescription = React.useState<string>('');

  const $youtubeURL = React.useState<string>('');
  const $TRL = React.useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>();
  const $relationPapers = React.useState<EssentialPaperType[]>([]);

  const $isRelationPaperSearch = React.useState<boolean>(false);

  const [selectedPapers, setSelectedPapers] = useState<EssentialPaperType[]>(
    []
  );

  const [selectedReporter, setSelectedReporter] = useState<ReporterType>();

  const genFormValues = React.useMemo(
    () => ({
      $orgName,
      $techName,
      $appNumber,
      $regNumber,
      $docNumber,
      $journal,
      $reference,
      $leadResearcher,
      $coResearcher,
      $thumbnail,
      $keywords,
      $title,
      $techField,
      $categories,
      $introTitle,
      $introContent,
      $introThumbnail,
      $introThumbnailDescription,
      $youtubeURL,
      $TRL,
      $relationPapers,
      $isRelationPaperSearch,
    }),
    [
      $orgName,
      $techName,
      $appNumber,
      $regNumber,
      $docNumber,
      $journal,
      $reference,
      $leadResearcher,
      $coResearcher,
      $thumbnail,
      $keywords,
      $title,
      $techField,
      $categories,
      $introTitle,
      $introContent,
      $introThumbnail,
      $introThumbnailDescription,
      $isRelationPaperSearch,
      $TRL,
      $youtubeURL,
      $relationPapers,
    ]
  );

  const [isValid, setIsValid] = React.useState(false);

  /*
  React.useEffect(() => {
    const test =
      selectedReporter &&
      $title[0].length > 0 &&
      $subtitle[0].length > 0 &&
      $thumbnail[0]?.file &&
      $content[0].length > 0 &&
      $keywords[0].length > 0 &&
      $reporterInfo[0].length > 0 &&
      $categories[0].length > 0;

    if (test) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    $title[0],
    $subtitle[0],
    $thumbnail[0],
    $content[0],
    $keywords[0],
    $reporterInfo[0],
    $categories[0],
    selectedReporter,
  ]);

  React.useEffect(() => {
    setNewsSubjectValue('');
    setGenerated(false);

    $title[1]('');
    $subtitle[1]('');
    $thumbnail[1](undefined);
    $content[1]('');
    $keywords[1]([]);
    $reporterInfo[1]('');
    $categories[1]([]);
    setSelectedReporter(undefined);
  }, [selectedType]);
   */

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
            등록하기
          </span>
          <span style={{ ...Font.title.display2, marginBottom: '36px' }}>
            기술이전
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
              label={'기술문서'}
              size={'S'}
              onChange={() => {
                setSelectedType('CHOOSE_PAPER');
              }}
              checked={selectedType === 'CHOOSE_PAPER'}
            />
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
          {selectedType === 'CHOOSE_PAPER' && (
            <>
              <Spacer height={32} />
              <ChoosePaperSection
                {...{
                  genFormValues,
                  $generated: [generated, setGenerated],
                  $pageMode: [pageMode, setPageMode],
                  onClick: () => {
                    setVisible(false);
                    setTimeout(() => {
                      setPageMode('SEARCH_TECH');
                    }, 200);
                  },
                  $selectedPapers: [selectedPapers, setSelectedPapers],
                }}
              />
            </>
          )}
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
                등록하기
              </DefaultButton>
            </div>
          )}
        </Container>
      )}
      {pageMode === 'SEARCH_REPORTER' && (
        <SearchReporter
          $visible={[visible, setVisible]}
          backHandler={() => {
            setVisible(false);
            $isRelationPaperSearch[1](false);
            setTimeout(() => {
              setPageMode('DEFAULT');
              setVisible(true);
              setSelectedPapers([]);
            }, 200);
          }}
          submitHandler={() => {
            setVisible(false);
            $isRelationPaperSearch[1](false);
            setTimeout(() => {
              setPageMode('DEFAULT');
              setVisible(true);
            }, 200);
          }}
          $selectedReporter={[selectedReporter, setSelectedReporter]}
        />
      )}
      {(pageMode === 'SEARCH_TECH' || pageMode === 'SEARCH_RELATION_TECH') && (
        <SearchTech
          $visible={[visible, setVisible]}
          backHandler={() => {
            setVisible(false);
            setTimeout(() => {
              setPageMode('DEFAULT');
              setVisible(true);
              setSelectedReporter(undefined);
            }, 200);
          }}
          submitHandler={() => {
            setVisible(false);
            setTimeout(() => {
              setPageMode('DEFAULT');
              setVisible(true);
            }, 200);
          }}
          setSelectedPapers={setSelectedPapers}
          setRelationPapers={$relationPapers[1]}
          $isRelationPaperSearch={$isRelationPaperSearch}
        />
      )}
    </div>
  );
};

export default withPageLoadedEffect(transfer);
