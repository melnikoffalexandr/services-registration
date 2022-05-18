import { useEffect } from 'react';

export const useDisableBodyScroll = (visible: boolean) => {
    useEffect(() => {
        const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
        if (visible) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarCompensation}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, [visible]);
};
