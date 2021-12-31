export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type NumberSize = Size | number;
export type Sizes<T> = Record<Size, T>;
