import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Screens
import HomeScreen from '../ui/pages/home';
import DroniesLabScreen from '../ui/pages/dronieslab';
import FallbackScreen from '../ui/pages/404';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/dronieslab" element={<DroniesLabScreen />} />
      <Route path="*" element={<FallbackScreen />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;