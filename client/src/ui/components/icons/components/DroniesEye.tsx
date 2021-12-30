import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;

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
        d="M12.0001 13.0909C12.6026 13.0909 13.091 12.6025 13.091 12C13.091 11.3975 12.6026 10.9091 12.0001 10.9091C11.3976 10.9091 10.9092 11.3975 10.9092 12C10.9092 12.6025 11.3976 13.0909 12.0001 13.0909Z"
        fill={color}
      />
      <g opacity="0.75">
        <path
          opacity="0.75"
          d="M12.0002 14.1819C13.2052 14.1819 14.182 13.205 14.182 12.0001C14.182 10.7951 13.2052 9.81824 12.0002 9.81824C10.7952 9.81824 9.81836 10.7951 9.81836 12.0001C9.81836 13.205 10.7952 14.1819 12.0002 14.1819Z"
          fill={color}
        />
      </g>
    </svg>
  );
});

DroniesEye.defaultProps = {
  color: '#FF4127',
  width: 15,
  height: 15,
};

export default DroniesEye;
