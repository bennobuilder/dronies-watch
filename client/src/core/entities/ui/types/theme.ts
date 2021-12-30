import React from 'react';
import { Colors } from './colors';
import { Sizes } from './size';
import { HeadingStyle } from './heading';

export interface DefaultTheme {
  type: string;
  colors: Colors;
  primitiveColors: Record<string, string | string[]>;
  fontFamily: React.CSSProperties['fontFamily'];
  lineHeight: React.CSSProperties['lineHeight'];
  transitionTimingFunction: React.CSSProperties['transitionTimingFunction'];

  fontSizes: Sizes<number>;
  radius: Sizes<number>;
  spacing: Sizes<number>;
  shadows: Sizes<string>;

  headings: {
    fontFamily: React.CSSProperties['fontFamily'];
    fontWeight: React.CSSProperties['fontWeight'];
    sizes: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
  };
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type OverwriteTheme = DeepPartial<DefaultTheme>;

export type ThemePaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;
