export function getSizeValue<Sizes extends Record<string, string | number>>(
  size: SizesPath<Sizes> | string | number,
  sizes: Sizes,
  defaultSize: SizesPath<Sizes> | string | number = 'md',
): GetSizeValueReturn<Sizes> {
  if (typeof size === 'number') {
    return size;
  }

  // @ts-ignore
  return sizes[size] ?? size ?? sizes[defaultSize] ?? defaultSize;
}

type GetSizeValueReturn<T> =
  | {
      [K in keyof T]: T[K] extends any ? T[K] : never;
    }[keyof T]
  | number;

export type SizesPath<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;
