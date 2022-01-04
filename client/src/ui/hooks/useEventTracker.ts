import { event, EventArgs } from 'react-ga';
import { ui } from '../../core';

export function trackEvent(args: EventArgs) {
  if (ui.INITIALIZED_GA.value) event(args);
}

export function useEventTracker(category = 'unknown') {
  return (params: Omit<EventArgs, 'category'>) => {
    trackEvent({ category, ...params });
  };
}
