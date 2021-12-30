import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;

const Twitter = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { width, height, color, strokeWidth, ...others } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ref={ref}
      {...others}
    >
      <path
        d="M24 4.32a9.806 9.806 0 0 1-2.828.78 4.959 4.959 0 0 0 2.165-2.738 9.83 9.83 0 0 1-3.127 1.2A4.906 4.906 0 0 0 16.616 2c-2.72 0-4.924 2.216-4.924 4.949 0 .387.044.765.128 1.127C7.727 7.87 4.1 5.9 1.67 2.906a4.944 4.944 0 0 0-.666 2.488c0 1.717.87 3.231 2.19 4.119a4.886 4.886 0 0 1-2.23-.62v.063a4.945 4.945 0 0 0 3.95 4.852 4.908 4.908 0 0 1-2.224.085 4.932 4.932 0 0 0 4.6 3.437 9.848 9.848 0 0 1-6.115 2.118c-.398 0-.79-.023-1.175-.069a13.886 13.886 0 0 0 7.548 2.223c9.057 0 14.01-7.54 14.01-14.08 0-.214-.006-.428-.015-.64A10.036 10.036 0 0 0 24 4.32Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

Twitter.defaultProps = {
  color: '#000000',
  width: 15,
  height: 15,
  strokeWidth: 2,
};

export default Twitter;
