import { useLocation } from '@gatsbyjs/reach-router';
import { navigate } from '@reach/router';
import React from 'react';
import { MediaQueryContext } from '../contexts/MediaQueryProvider';
import { NavigationContext } from '../contexts/NavigatingContext';
import { URLContext } from '../contexts/URLContextProvider';

function withPageLoadedEffect<P extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType
): (props: P) => React.ReactElement {
  return (props: P) => {
    const { setIsNavigating } = React.useContext(NavigationContext);
    const { urlStack, setURL, popURL } = React.useContext(URLContext);
    const currentLocation = useLocation();
    const { isDesktop } = React.useContext(MediaQueryContext);

    const handleBackButton = React.useCallback(() => {
      if (urlStack.length >= 2) {
        if (isDesktop) {
          setIsNavigating(true);
          setTimeout(() => {
            const prevURL = urlStack[urlStack.length - 2];
            popURL();
            popURL();
            navigate(prevURL);
          }, 200);
        } else {
          const prevURL = urlStack[urlStack.length - 2];
          popURL();
          popURL();
          navigate(prevURL);
        }
      }
    }, [urlStack]);

    React.useEffect(() => {
      setURL(currentLocation.pathname);
      history.pushState(null, document.title, currentLocation.href);
      return () => {
        setIsNavigating(false);
      };
    }, []);

    React.useEffect(() => {
      typeof window !== 'undefined' &&
        window.addEventListener('popstate', handleBackButton);
      return () => {
        typeof window !== 'undefined' &&
          window.removeEventListener('popstate', handleBackButton);
      };
    }, [urlStack]);
    return <WrappedComponent {...props} />;
  };
}

export default withPageLoadedEffect;
