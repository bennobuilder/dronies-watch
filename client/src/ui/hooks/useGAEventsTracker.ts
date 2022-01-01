import { event } from 'react-ga';

export function useGAEventsTracker(category = 'unknown') {
  return (action = 'unknown', label = 'unknown') => {
    event({ category, action, label });
  };
}
