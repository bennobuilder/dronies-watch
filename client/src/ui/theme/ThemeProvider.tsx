import React from 'react';
import {
  DefaultTheme,
  OverwriteTheme,
  ThemePaths,
} from '../../core/entities/ui';
import { ui } from '../../core';

export const ThemeContext = React.createContext<ThemeContextType>(
  ui.DEFAULT_THEME_CONTEXT,
);

export const ThemeProvider = <T extends ThemeProviderPropsThemeObject>(
  props: ThemeProviderProps<T>,
) => {
  const themes = props.themes ?? ui.DEFAULT_THEME_CONTEXT.themes;
  const activeThemeKey = props.activeThemeKey ?? Object.keys(themes)[0];

  // Merge specified theme with the default theme
  const mergedThemes = Object.keys(themes).reduce((acc, key) => {
    const theme = themes[key];
    if (theme.type == null) theme.type = key;
    acc[key] = ui.mergeTheme(ui.DEFAULT_THEME, theme);
    return acc;
  }, {} as Record<string, DefaultTheme>);

  const activeTheme = mergedThemes[activeThemeKey];

  const children =
    typeof props.children === 'function'
      ? props.children(activeTheme)
      : props.children;

  return (
    <ThemeContext.Provider
      value={{
        themes: mergedThemes,
        activeThemeKey,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

type ThemeProviderProps<T extends ThemeProviderPropsThemeObject> = {
  themes: T;
  activeThemeKey?: ThemePaths<T>;
  children: React.ReactNode | ((theme: DefaultTheme) => React.ReactNode);
};

type ThemeProviderPropsThemeObject = Record<string, OverwriteTheme>;

type ThemeContextType<
  T extends Record<string, DefaultTheme> = Record<string, DefaultTheme>,
> = {
  themes: T;
  activeThemeKey: ThemePaths<T>;
};
