import React from 'react';

export const useDropDown = () => {
    const [isOpened, setIsOpened] = React.useState(false);
    const [selected, setSelected] = React.useState(-1);

    const onClickUnit = React.useCallback(
        (idx: number) => () => {
            setIsOpened(false);
            setSelected(idx);
        },
        []
    );

    const onClick = React.useCallback(() => setIsOpened(!isOpened), [isOpened]);

    const value = React.useMemo(
        () => ({ isOpened, selected, onClickUnit, onClick }),
        [isOpened, selected]
    );

    return value;
};
