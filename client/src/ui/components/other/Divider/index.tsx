import React from 'react';
import styled from 'styled-components';

const Divider: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <Container className={className}>
      <Line />
      <LineOverlay />
    </Container>
  );
};

export default Divider;

type Props = {
  className?: string; // Required to apply styling via Styled-Components
};

const Container = styled.div`
  position: relative;
`;

const Line = styled.div`
  position: relative;
  z-index: 1;
  height: 0;

  border-bottom: 2px dotted ${({ theme }) => theme.colors.layout.p};
`;

const LineOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  z-index: 2;

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.layout.lc},
    rgba(26, 42, 33, 0) 50%,
    ${({ theme }) => theme.colors.layout.lc}
  );
`;
