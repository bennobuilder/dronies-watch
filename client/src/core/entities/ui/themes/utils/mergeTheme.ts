import { isValidObject } from '@agile-ts/utils';
import { DeepPartial, DefaultTheme } from '../../types';

/**
 * Merges the specified `changes` into the `target` object.
 *
 * @param target - Target object to merge the changes in.
 * @param changes - Array of changes objects to be merged into the target object.
 */
function mergeDeep<DataType extends Record<string, any>>(
  target: DataType,
  ...changes: any[]
): DataType {
  if (changes == null || changes.length === 0 || !isValidObject(target))
    return target;

  // Extract the to proceed change from the changes array
  const change = changes.shift();

  if (isValidObject(change, true)) {
    for (const key in change) {
      // If the target object does have the requested property (key)
      // and the corresponding changes are a valid object,
      // merge the corresponding changes into the target object at the property
      if (target[key] != null && isValidObject(change[key], false))
        mergeDeep(target[key], change[key]);
      // otherwise assign the changes to the target object at the corresponding property
      else Object.assign(target, { [key]: change[key] });
    }
  }

  // Merge the missing changes until no changes are left
  return mergeDeep(target, ...changes);
}

export function mergeTheme(
  currentTheme: DefaultTheme,
  themeOverride?: DeepPartial<DefaultTheme>,
): DefaultTheme {
  if (themeOverride == null) return currentTheme;
  return mergeDeep(currentTheme, themeOverride);
}
