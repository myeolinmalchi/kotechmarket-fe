import { useState, useEffect, useCallback } from 'react';
export const useMouseInteraction = (ref: React.RefObject<HTMLElement>) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isActivated, setIsActivated] = useState<boolean>(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleMouseDown = useCallback(() => {
        setIsActivated(true);
    }, []);
    const handleMouseUp = useCallback(() => {
        setIsActivated(false);
    }, []);
    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('mouseenter', handleMouseEnter);
            ref.current.addEventListener('mouseleave', handleMouseLeave);
            ref.current.addEventListener('mousedown', handleMouseDown);
            ref.current.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            ref.current?.removeEventListener('mouseenter', handleMouseEnter);
            ref.current?.removeEventListener('mouseleave', handleMouseLeave);
            ref.current?.removeEventListener('mousedown', handleMouseDown);
            ref.current?.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return { isHovered, isActivated };
};
