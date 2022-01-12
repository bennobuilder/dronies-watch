export interface InteractiveColorVariation {
  m2: string; // Interactive -2 Color
  m1: string; // Interactive -1 Color
  n0: string; // Interactive 0 Color
  p1: string; // Interactive +1 Color
  p2: string; // Interactive +2 Color
}

export interface LayoutColors {
  p: string; // Primary Color
  lc: string; // Low Contrast Color
  hc: string; // High Contrast Color
  rHc: string; // Reduced High Contrast Color
  rHc2: string; // Reduced High Contrast Color
  bg: string; // Background Color
}

export interface DisabledColors {
  d1: string; // Disabled State 1 Color
  d2: string; // Disabled State 2 Color
}

export interface InteractiveColors {
  primary: InteractiveColorVariation;
}

export interface Colors {
  layout: LayoutColors;
  disabled: DisabledColors;
  interactive: InteractiveColors;
}
