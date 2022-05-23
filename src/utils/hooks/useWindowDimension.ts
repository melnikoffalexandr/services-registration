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

        window.addEventListener('re', handleResize);
        window.addEventListener('touchmove', (e) => console.log(e));
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowDimensions;
}
