import { event, EventArgs } from 'react-ga';

export function trackEvent(args: EventArgs) {
  event(args);
}

export function useEventTracker(category = 'unknown') {
  return (params: Omit<EventArgs, 'category'>) => {
    trackEvent({ category, ...params });
  };
}
