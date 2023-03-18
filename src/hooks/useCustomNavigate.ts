import React from 'react';
import { navigate } from '@reach/router';
import { NavigationContext } from '../contexts/NavigatingContext';
import { useContext } from 'react';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import { useLocation } from '@gatsbyjs/reach-router';

export const useCustomNavigate = () => {
    const { setIsNavigating } = useContext(NavigationContext);
    const { isDesktop } = useContext(MediaQueryContext);
    const currentLocation = useLocation();

    const customNavigate = (to: string) => {
        if (currentLocation.pathname != to) {
            setIsNavigating(true);
            setTimeout(() => {
                navigate(to);
            }, 200);
        }
    };

    return isDesktop ? customNavigate : navigate;
};
