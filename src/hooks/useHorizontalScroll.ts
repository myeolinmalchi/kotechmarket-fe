import { useRef, useEffect } from 'react';

export function useHorizontalScroll() {
    const elRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY == 0) return;
                e.preventDefault();

                // 스크롤 속도를 조절하기 위한 변수
                const scrollSpeed = 1.5;

                // 현재 위치에서 deltaY 값을 곱해서 스크롤 위치를 조절한다.
                const targetScroll = el.scrollLeft + e.deltaY * scrollSpeed;

                // requestAnimationFrame을 이용해 부드럽게 스크롤한다.
                const smoothScroll = (start: number, end: number) => {
                    const startTime = performance.now();
                    const duration = 200; // 애니메이션의 지속 시간 (ms)

                    const step = (timestamp: number) => {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const currentPosition =
                            start + (end - start) * progress;
                        el.scrollLeft = currentPosition;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        }
                    };

                    requestAnimationFrame(step);
                };

                smoothScroll(el.scrollLeft, targetScroll);
            };

            el.addEventListener('wheel', onWheel);
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);
    return elRef;
}
