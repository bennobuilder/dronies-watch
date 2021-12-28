import React from 'react';

const Sprite: React.FC<Props> = (props) => {
  const { filename } = props;
  const { x, y, width, height } = props;

  if (!filename) {
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${filename})`,
        backgroundPosition: `${x * -1}px ${y * -1}px`,
        width,
        height,
      }}
      // Added new x,y,w,h to easily access them from outside the component
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
      data-x={x}
      data-y={y}
      data-w={width}
      data-h={height}
    />
  );
};

export default Sprite;

type Props = {
  filename: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
