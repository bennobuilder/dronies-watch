import { URLSearchParams } from 'url';

export function urlEncodeData<
  T extends URLSearchParamsData = URLSearchParamsData,
>(data: T): string {
  return new URLSearchParams(data).toString();
}

type URLSearchParamsData =
  | URLSearchParams
  | string
  | Record<string, string | readonly string[]>
  | Iterable<[string, string]>
  | readonly [string, string][];
