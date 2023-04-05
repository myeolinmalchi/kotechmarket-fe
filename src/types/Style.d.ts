type FontStyleType = {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
};

// 폰트 타입 유지
type FontType = {
    title: {
        display5: FontStyleType;
        display4: FontStyleType;
        display3: FontStyleType;
        display2: FontStyleType;
        display1: FontStyleType;
        headline: FontStyleType;
        subhead3: FontStyleType;
        subhead2: FontStyleType;
        subhead1: FontStyleType;
        subheadLong3: FontStyleType;
        subheadLong2: FontStyleType;
    };
    body: {
        body3: FontStyleType;
        body2: FontStyleType;
        body1: FontStyleType;
        bodyLong2: FontStyleType;
        bodyLong1: FontStyleType;
        caption: FontStyleType;
    };
};

// 기존 ColorType에서 dark, light 제거
// white => default로 변경
type ColorType = {
    action: {
        blue: {
            filled: string;
            hover: string;
            pressed: string;
            disabled: string;
        };
        gray: {
            filled: string;
            hover: string;
            pressed: string;
            disabled: string;
        };
    };
    background: {
        gray2: string;
        gray1: string;
        default: string;
        blue1: string;
    };
    stroke: {
        gray4: string;
        gray3: string;
        gray2: string;
        gray1: string;
        blue1: string;
        red1: string;
    };
    text: {
        primary: string;
        secondary: string;
        third: string;
        disabled: string;
        default: string;
        blue: string;
        subBlue: string;
        red: string;
        subRed: string;
    };
};

export { ColorType, FontType };
