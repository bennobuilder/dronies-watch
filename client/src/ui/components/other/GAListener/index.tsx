import React from 'react';
import { initialize, set, pageview } from 'react-ga';
import { useLocation } from 'react-router';

const GAListener: React.FC<Props> = (props) => {
  const { children, trackingId } = props;
  const location = useLocation();
  const [initialized, setInitialized] = React.useState(false);

  // Initialize Google Analytics
  React.useEffect(() => {
    if (trackingId != null && !initialized) {
      initialize(trackingId);
      setInitialized(true);
    }
  }, [trackingId]);

  // Track Pages with Google Analytics
  React.useEffect(() => {
    console.log('Updated Location', { location });
    if (initialized) {
      set({ page: location.pathname });
      pageview(`${location.pathname}${location.search}`);
    }
  }, [location]);

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33006
  return <>{children}</>;
};

export default GAListener;

interface Props {
  trackingId: string;
}
