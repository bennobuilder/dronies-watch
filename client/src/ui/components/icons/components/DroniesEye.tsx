import React from 'react';

const DroniesEye = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.5 14C13.3284 14 14 13.3284 14 12.5C14 11.6716 13.3284 11 12.5 11C11.6716 11 11 11.6716 11 12.5C11 13.3284 11.6716 14 12.5 14Z"
        fill={color}
      />
      <path
        opacity="0.75"
        d="M12.5 16C14.433 16 16 14.433 16 12.5C16 10.567 14.433 9 12.5 9C10.567 9 9 10.567 9 12.5C9 14.433 10.567 16 12.5 16Z"
        fill={color}
      />
    </svg>
  );
});

DroniesEye.defaultProps = {
  color: '#FF4127',
  width: 15,
  height: 15,
};

export default DroniesEye;

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;
