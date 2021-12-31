import React from 'react';

const Spacer: React.FC<Props> = (props) => {
  const height = props.height ?? 100;

  return <div style={{ height }} />;
};

export default Spacer;

export type Props = { height: number };
