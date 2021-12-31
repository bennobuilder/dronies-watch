import React from 'react';
import { DRONIES_URL } from '../../../core/entities/ui';

const HomeScreen: React.FC = () => {
  window.location.href = DRONIES_URL;
  return null;
};

export default HomeScreen;
