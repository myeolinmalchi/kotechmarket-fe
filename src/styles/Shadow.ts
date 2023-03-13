type ShadowStyleType = {
    boxShadow: string;
};

type ShadowType = {
    light: {
        shadow1: ShadowStyleType;
        shadow2: ShadowStyleType;
        shadow3: ShadowStyleType;
    };

    black: {
        shadow1: ShadowStyleType;
        shadow2: ShadowStyleType;
        shadow3: ShadowStyleType;
    };
};

const Shadow: ShadowType = {
    light: {
        shadow1: {
            boxShadow:
                '0px 0px 1px rgba(66, 66, 66, 0.04), 0px 2px 4px rgba(117, 117, 117, 0.16)',
        },
        shadow2: {
            boxShadow:
                '0px 1px 2px rgba(66, 66, 66, 0.04), 0px 4px 8px rgba(117, 117, 117, 0.16)',
        },
        shadow3: {
            boxShadow:
                '0px 2px 4px rgba(66, 66, 66, 0.04), 0px 8px 16px rgba(117, 117, 117, 0.16)',
        },
    },
    black: {
        shadow1: {
            boxShadow:
                '0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.16)',
        },
        shadow2: {
            boxShadow:
                '0px 1px 2px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.16)',
        },
        shadow3: {
            boxShadow:
                '0px 2px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.16)',
        },
    },
};

export default Shadow;
