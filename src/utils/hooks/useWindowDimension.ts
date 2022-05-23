import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const height = document.documentElement.clientHeight;
    return {
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
        return () => {
            window.removeEventListener('resize', handleResize);
            // window.removeEventListener('touchmove', handleResize);
        };
    }, []);

    return windowDimensions;
}
