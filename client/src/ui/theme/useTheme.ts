import React from 'react';
import { ThemeContext } from './ThemeProvider';
import { DefaultTheme } from '../../core/entities/ui';
import { ui } from '../../core';

export function useTheme(): DefaultTheme {
  const themeContext = React.useContext(ThemeContext);

  if (themeContext == null) {
    console.error('No Theme Context was found!');
    return ui.DEFAULT_THEME;
  }

  return (
    (themeContext.themes[themeContext.activeThemeKey] as any) ||
    (themeContext.themes[Object.keys(themeContext.themes)[0]] as any)
  );
}
