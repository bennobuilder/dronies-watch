import * as theme from './theme';

export * from './colors';
export * from './heading';
export * from './size';
export * from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends theme.DefaultTheme {}
}
