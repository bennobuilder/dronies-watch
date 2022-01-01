import React from 'react';
import { initialize, pageview } from 'react-ga';
import { useLocation } from 'react-router-dom';
import googleConfig from '../../config/googleConfig';

// https://stackoverflow.com/questions/34836500/how-to-set-up-google-analytics-for-react-router
export function useAnalytics() {
  const location = useLocation();
  const [initialized, setInitialized] = React.useState(false);

  // Initialize Google Analytics
  React.useEffect(() => {
    if (googleConfig.GA_TRACKING_CODE != null && !initialized) {
      initialize(googleConfig.GA_TRACKING_CODE);
      setInitialized(true);
    }
  }, []);

  // Track Pages with Google Analytics
  React.useEffect(() => {
    if (initialized) pageview(location.pathname + location.search);
  }, [location]);
}
