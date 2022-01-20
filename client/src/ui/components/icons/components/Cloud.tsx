import React from 'react';

const Cloud = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { width, height, color, ...others } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 217"
      ref={ref}
      {...others}
    >
      <path
        d="M30.5814 149.375H41.4705C40.9521 145.956 40.6824 142.455 40.6824 138.893C40.6824 100.539 71.8228 69.4464 110.236 69.4464C115.615 69.4464 120.852 70.057 125.88 71.2107C140.237 29.7663 179.659 0 226.05 0C281.711 0 327.345 42.8478 331.68 97.3094C339.14 94.1352 347.35 92.3768 355.971 92.3768C388.561 92.3768 415.276 117.479 417.785 149.375H469.418C486.308 149.375 500 164.482 500 183.116C500 201.75 486.308 216.856 469.418 216.856H30.5814C13.6923 216.856 -3.8147e-06 201.75 -3.8147e-06 183.116C-3.8147e-06 164.482 13.6923 149.375 30.5814 149.375Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
});

Cloud.defaultProps = {
  color: '#ffffff',
  width: 500,
  height: 217,
};

export default Cloud;

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;
