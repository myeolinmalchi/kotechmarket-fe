import React, { useState } from 'react';
import { useContext, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import { useMouseInteraction } from '../hooks/useMouseInteraction';
import Color from '../styles/Color';
import Font from '../styles/Font';

type TagState = 'DEFAULT' | 'DISABLED' | 'POINT';
type TagSize = 'S' | 'M';
type TagType = 'DEFAULT' | 'PLUS' | 'CANCEL';

type TagProps = {
    state: TagState;
    size: TagSize;
    type: TagType;
    onClick?: () => void;
    width?: string;
    text: string;
};

export const Tag = ({ state, size, type, onClick, width, text }: TagProps) => {
    const { isDarkMode } = useContext(DarkModeContext);

    const button = useRef<HTMLButtonElement>(null);
    const { isHovered, isActivated } = useMouseInteraction(button);

    const style = useMemo(
        () => ({
            cursor: 'pointer',
            fontFamily: "'Spoqa Han Sans Neo','sans-serif'",
            display: 'flex',
            alignItems: 'center',
            justifyContents: 'center',
            gap: '8px',
            height: size === 'M' ? '32px' : '30px',
            borderRadius: size === 'M' ? '32px' : '30px',
            width: width ?? 'fit-content',
            whiteSpace: 'nowrap',
            padding: '6px 12px',
            transition: 'all 0.2s',
            ...(() => {
                if (isDarkMode) {
                } else {
                    if (state === 'DEFAULT') {
                        if (isActivated) {
                            return {
                                background: Color.light.background.gray2,
                                color: Color.light.text.secondary,
                                border: `1px solid ${Color.light.stroke.gray1}`,
                            };
                        }
                        if (isHovered) {
                            return {
                                background: Color.light.background.gray1,
                                color: Color.light.text.secondary,
                                border: `1px solid ${Color.light.stroke.gray1}`,
                            };
                        }
                        return {
                            background: Color.light.background.white,
                            color: Color.light.text.secondary,
                            border: `1px solid ${Color.light.stroke.gray1}`,
                        };
                    }
                    if (state === 'DISABLED') {
                        return {
                            background: Color.light.stroke.gray1,
                            color: Color.light.text.disabled,
                            border: `1px solid ${Color.light.stroke.gray1}`,
                        };
                    }
                    if (state === 'POINT') {
                        return {
                            background: Color.light.background.blue1,
                            color: Color.light.text.white,
                            border: `1px solid ${Color.light.stroke.blue1}`,
                        };
                    }
                }
            })(),
        }),
        [isDarkMode, state, size, type, isHovered, isActivated]
    );

    return (
        <button onClick={onClick} style={style} ref={button}>
            <span
                style={{
                    ...(size === 'M' ? Font.body.body1 : Font.body.caption),
                }}
            >
                {text}
            </span>
            {(() => {
                if (type === 'PLUS') {
                    return (
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.66669 1.33332C6.66669 0.965133 6.36821 0.666656 6.00002 0.666656C5.63183 0.666656 5.33335 0.965133 5.33335 1.33332V5.33332H1.33335C0.965163 5.33332 0.666687 5.6318 0.666687 5.99999C0.666687 6.36818 0.965163 6.66666 1.33335 6.66666H5.33335V10.6667C5.33335 11.0348 5.63183 11.3333 6.00002 11.3333C6.36821 11.3333 6.66669 11.0348 6.66669 10.6667V6.66666H10.6667C11.0349 6.66666 11.3334 6.36818 11.3334 5.99999C11.3334 5.6318 11.0349 5.33332 10.6667 5.33332H6.66669V1.33332Z"
                                fill="#5D6169"
                            />
                        </svg>
                    );
                } else if (type === 'CANCEL') {
                    return (
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.66669 1.33332C6.66669 0.965133 6.36821 0.666656 6.00002 0.666656C5.63183 0.666656 5.33335 0.965133 5.33335 1.33332V5.33332H1.33335C0.965163 5.33332 0.666687 5.6318 0.666687 5.99999C0.666687 6.36818 0.965163 6.66666 1.33335 6.66666H5.33335V10.6667C5.33335 11.0348 5.63183 11.3333 6.00002 11.3333C6.36821 11.3333 6.66669 11.0348 6.66669 10.6667V6.66666H10.6667C11.0349 6.66666 11.3334 6.36818 11.3334 5.99999C11.3334 5.6318 11.0349 5.33332 10.6667 5.33332H6.66669V1.33332Z"
                                fill="#5D6169"
                            />
                        </svg>
                    );
                } else {
                    return <></>;
                }
            })()}
        </button>
    );
};
