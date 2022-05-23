import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('touchmove', handleResize);
        window.addEventListener('touchstart', handleResize);
        window.addEventListener('touchend', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            // window.removeEventListener('touchmove', handleResize);
        };
    }, []);

    return windowDimensions;
}
