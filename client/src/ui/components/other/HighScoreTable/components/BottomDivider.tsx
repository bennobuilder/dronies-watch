import React from 'react';
import styled from 'styled-components';

const BottomDivider: React.FC = () => (
  // 'td' to avoid react error
  <td>
    <EdgeMiddle position="left" />
    <EdgeMiddle position="right" />
    <DottedLine />
  </td>
);

export default BottomDivider;

const EdgeMiddle = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;

  bottom: 0;
  left: ${({ position }) => (position === 'left' ? 0 : undefined)};
  right: ${({ position }) => (position === 'right' ? 0 : undefined)};

  width: 10px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.layout.rHc2};
`;

const DottedLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  height: 0;
  border-bottom: 2px dotted ${({ theme }) => theme.colors.layout.rHc};
  opacity: 0.3;
`;
