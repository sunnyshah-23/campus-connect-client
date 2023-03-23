import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnMount() {
    const { pathname } = useLocation();
    const prevPathnameRef = useRef(null);

    useEffect(() => {
        if (prevPathnameRef.current !== pathname) {
            window.scrollTo(0, 0);
            prevPathnameRef.current = pathname;
        }
    }, [pathname]);

    return null;
}

export default ScrollToTopOnMount;
