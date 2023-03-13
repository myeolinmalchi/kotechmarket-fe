import React from 'react';
import { FC, PropsWithChildren, ComponentProps } from 'react';

export const combineComponents = (
    ...components: FC<PropsWithChildren>[]
): FC<PropsWithChildren> => {
    return components.reduce((AccComponent, CurrentComponent) => {
        return ({
            children,
        }: ComponentProps<FC<PropsWithChildren>>): JSX.Element => {
            return (
                <AccComponent>
                    <CurrentComponent>{children}</CurrentComponent>
                </AccComponent>
            );
        };
    });
};
