import React from 'react';

export const SPRITE_SHEET = {
  width: 2145,
  height: 2600,
};

const Sprite: React.FC<Props> = (props) => {
  const { filename } = props;
  let { x, y, width, height } = props;
  const scale = 0.5;

  if (!filename) {
    return null;
  }

  // Apply scale
  x *= scale;
  y *= scale;
  width *= scale;
  height *= scale;

  return (
    <div
      style={{
        backgroundImage: `url(${filename})`,
        backgroundSize: `${SPRITE_SHEET.width * scale}px ${
          SPRITE_SHEET.height * scale
        }px`,
        backgroundPosition: `${x * -1}px ${y * -1}px`,
        backgroundRepeat: 'no-repeat',
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
