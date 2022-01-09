import { sprintf } from '../../../../core/entities/ui';

export const HORIZONTAL_PADDING = 40;

// https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
export const { timeSince } = (() => {
  const timeFormats: TimeFormat[] = [
    {
      value: 60,
      label: 'Just now',
      displayValue: false,
    },
    {
      value: 120, // 60 * 2
      label: '1 minute ago',
      displayValue: false,
    },
    {
      value: 3600, // 60 * 60
      label: '%s minutes ago',
      displayValue: true,
      conversionValue: 60, // 60
    },
    {
      value: 7200, // 60 * 60 * 2
      label: '1 hour ago',
      displayValue: false,
    },
    {
      value: 86400, // 60 * 60 * 24
      label: '%s hours ago',
      displayValue: true,
      conversionValue: 3600, // 60 * 60
    },
    {
      value: 172800, // 60 * 60 * 24 * 2
      label: 'Yesterday',
      displayValue: false,
    },
    {
      value: 604800, // 60 * 60 * 24 * 7
      label: '%s days ago',
      displayValue: true,
      conversionValue: 86400, // 60 * 60 * 24
    },
    {
      value: 1209600, // 60 * 60 * 24 * 7 * 2
      label: 'Last week',
      displayValue: false,
    },
    {
      value: 2419200, // 60 * 60 * 24 * 7 * 4
      label: '%s weeks ago',
      displayValue: true,
      conversionValue: 604800, // 60 * 60 * 24 * 7
    },
    {
      value: 4838400, // 60 * 60 * 24 * 7 * 4 * 2
      label: 'Last month',
      displayValue: false,
    },
    {
      value: 29030400, // 60 * 60 * 24 * 7 * 4 * 12
      label: '%s months ago',
      displayValue: true,
      conversionValue: 2419200, // 60 * 60 * 24 * 7 * 4
    },
    {
      value: 58060800, // 60 * 60 * 24 * 7 * 4* 12 * 2
      label: 'Last year',
      displayValue: false,
    },
    {
      value: 2903040000, // 60 * 60 * 24 * 7 * 4 * 12 * 100
      label: '%s years ago',
      displayValue: true,
      conversionValue: 29030400, // 60 * 60 * 24 * 7 * 4 * 12
    },
    {
      value: 5806080000, // 60 * 60 * 24 * 7 * 4 * 12 * 100 * 2
      label: 'Last century',
      displayValue: false,
    },
    {
      value: 58060800000, // 60 * 60 * 24 * 7 * 4 * 12 * 100 * 20
      label: '%s centuries ago',
      displayValue: true,
      conversionValue: 2903040000, // 60 * 60 * 24 * 7 * 4 * 12 * 100
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const timeSince = (sinceDate: Date) => {
    const seconds = Math.floor((Date.now() - sinceDate.getTime()) / 1000);

    for (const timeFormat of timeFormats) {
      if (seconds < timeFormat.value) {
        if (timeFormat.displayValue && timeFormat.conversionValue != null) {
          return sprintf(
            timeFormat.label,
            Math.floor(seconds / timeFormat.conversionValue).toString(),
          );
        }
        return timeFormat.label;
      }
    }

    return 'A very long time ago';
  };

  return { timeSince };
})();

type TimeFormat = {
  value: number;
  label: string;
  displayValue: boolean;
  conversionValue?: number;
};
