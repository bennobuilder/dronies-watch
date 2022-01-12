import React, { useEffect } from 'react';
import { useAgile } from '@agile-ts/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import AppRouter from './routing/AppRouter';
import ThemeProvider from './ui/theme/ThemeProvider';
import { ui, user } from './core';

// UI-Themes
const themes = {
  [ui.themes.dark.type]: ui.themes.dark.theme,
};

const App: React.FC = () => {
  const activeTheme = useAgile(ui.THEME_TYPE);

  // TODO think about a better starting point of fetching
  useEffect(() => {
    user.fetchAuthenticatedUser();
  }, []);

  return (
    <ThemeProvider activeThemeKey={activeTheme} themes={themes}>
      {(theme) => (
        <StyledThemeProvider theme={theme}>
          <AppRouter />
        </StyledThemeProvider>
      )}
    </ThemeProvider>
  );
};

export default App;
