type FontStyleType = {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
};

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

const Font: FontType = {
    title: {
        display5: {
            fontSize: '40px',
            fontWeight: '700',
            lineHeight: '52px',
            letterSpacing: '-0.6px',
        },
        display4: {
            fontSize: '36px',
            fontWeight: '700',
            lineHeight: '46px',
            letterSpacing: '-0.6px',
        },
        display3: {
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '42px',
            letterSpacing: '-0.6px',
        },
        display2: {
            fontSize: '28px',
            fontWeight: '700',
            lineHeight: '38px',
            letterSpacing: '-0.6px',
        },
        display1: {
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '34px',
            letterSpacing: '-0.6px',
        },
        headline: {
            fontSize: '20px',
            fontWeight: '700',
            lineHeight: '28px',
            letterSpacing: '-0.6px',
        },
        subhead3: {
            fontSize: '16px',
            fontWeight: '700',
            lineHeight: '22px',
            letterSpacing: '-0.6px',
        },
        subhead2: {
            fontSize: '14px',
            fontWeight: '700',
            lineHeight: '20px',
            letterSpacing: '-0.6px',
        },
        subhead1: {
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '18px',
            letterSpacing: '-0.6px',
        },
        subheadLong3: {
            fontSize: '16px',
            fontWeight: '700',
            lineHeight: '28px',
            letterSpacing: '-0.6px',
        },
        subheadLong2: {
            fontSize: '14px',
            fontWeight: '700',
            lineHeight: '24px',
            letterSpacing: '-0.6px',
        },
    },
    body: {
        body3: {
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '28px',
            letterSpacing: '-0.6px',
        },
        body2: {
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '24px',
            letterSpacing: '-0.6px',
        },
        body1: {
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            letterSpacing: '-0.6px',
        },
        bodyLong2: {
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '28px',
            letterSpacing: '-0.6px',
        },
        bodyLong1: {
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '24px',
            letterSpacing: '-0.6px',
        },
        caption: {
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '18px',
            letterSpacing: '-0.6px',
        },
    },
};

export default Font;
