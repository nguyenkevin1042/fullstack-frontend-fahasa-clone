import { useEffect, useLayoutEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';


const ScrollToTop = () => {
    let { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return null;
}

export default withRouter(ScrollToTop);