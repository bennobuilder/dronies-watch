import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GAListener from '../ui/components/other/GAListener';
import config from '../config';

// Screens
import HomeScreen from '../ui/pages/home';
import DroniesLabScreen from '../ui/pages/dronieslab';
import FallbackScreen from '../ui/pages/404';
import DisclaimerScreen from '../ui/pages/disclaimer';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <GAListener trackingId={config.google.GA_TRACKING_CODE as any}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/lab" element={<DroniesLabScreen />} />
        <Route path="/disclaimer" element={<DisclaimerScreen />} />
        <Route path="*" element={<FallbackScreen />} />
      </Routes>
    </GAListener>
  </BrowserRouter>
);

export default AppRouter;
