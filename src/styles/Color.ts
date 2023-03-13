type ColorDetail = {
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
        white: string;
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
        white: string;
        blue: string;
        subBlue: string;
        red: string;
        subRed: string;
    };
};

type ColorType = {
    light: ColorDetail;
    dark: ColorDetail;
};

const Color: ColorType = {
    light: {
        action: {
            blue: {
                filled: '#1852FD',
                hover: '#1874FD',
                pressed: '#1339AC',
                disabled: '#D1E9FF',
            },
            gray: {
                filled: '#444444',
                hover: '#7B7B7B',
                pressed: '#111111',
                disabled: '#DEDEDE',
            },
        },
        background: {
            gray2: '#EDEFF0',
            gray1: '#F5F6F7',
            white: '#FFFFFF',
            blue1: '#1852FD',
        },
        stroke: {
            gray4: '#444444',
            gray3: '#ADADAD',
            gray2: '#D8D8D8',
            gray1: '#EEEEEE',
            blue1: '#1852FD',
            red1: '#F04438',
        },
        text: {
            primary: '#111111',
            secondary: '#5D6169',
            third: '#A3A7AE',
            disabled: 'rgba(0, 0, 0, 0.2)',
            white: '#FFFFFF',
            blue: '#1852FD',
            subBlue: '#1874FD',
            red: '#F04438',
            subRed: '#FDA19B',
        },
    },
    dark: {
        action: {
            blue: {
                filled: '#1852FD',
                hover: '#1874FD',
                pressed: '#1339AC',
                disabled: '#CFCFCF',
            },
            gray: {
                filled: '#111111',
                hover: '#7B7B7B',
                pressed: '#111111',
                disabled: '#DEDEDE',
            },
        },
        background: {
            gray2: '#EDEFF0',
            gray1: '#F5F6F7',
            white: '#FFFFFF',
            blue1: '#1852FD',
        },
        stroke: {
            gray4: '#444444',
            gray3: '#ADADAD',
            gray2: '#D8D8D8',
            gray1: '#EEEEEE',
            blue1: '#1852FD',
            red1: '#F04438',
        },
        text: {
            primary: '#111111',
            secondary: '#5D6169',
            third: '#A3A7AE',
            disabled: '#000000',
            white: '#000000',
            blue: '#1852FD',
            subBlue: '#1874FD',
            red: '#F04438',
            subRed: '#FDA19B',
        },
    },
};

export default Color;
