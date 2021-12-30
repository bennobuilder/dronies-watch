import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;

const Dronies = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { width, height, color, ...others } = props;

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
        d="M4.617 2.704H12A9.296 9.296 0 1 1 2.704 12H0c0 6.627 5.372 12 12 12 2.11 0 4.092-.544 5.814-1.5H22.5v-4.686A11.945 11.945 0 0 0 24 12c0-6.627-5.372-12-12-12H0v1.909l7.183 7.185a5.625 5.625 0 1 0 1.912-1.912L4.617 2.704ZM12 14.921a2.92 2.92 0 1 0 0-5.842 2.92 2.92 0 0 0 0 5.842Z"
        fill={color}
      />
    </svg>
  );
});

Dronies.defaultProps = {
  color: '#ffffff',
  width: 15,
  height: 15,
};

export default Dronies;
