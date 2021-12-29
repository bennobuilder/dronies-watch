import React from 'react';

const SpriteSheet = {
  width: 3840,
  height: 2160,
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
        backgroundSize: `${SpriteSheet.width * scale}px ${
          SpriteSheet.height * scale
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
