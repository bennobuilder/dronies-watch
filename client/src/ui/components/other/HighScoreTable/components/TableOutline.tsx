import React from 'react';
import styled from 'styled-components';

const TableOutline: React.FC = () => (
  <>
    <LeftEdgeContainer>
      <EdgeEnd />
      <EdgeEnd />
    </LeftEdgeContainer>
    <RightEdgeContainer>
      <EdgeEnd />
      <EdgeEnd />
    </RightEdgeContainer>
  </>
);

export default TableOutline;

const EdgeContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 20px;
`;

const RightEdgeContainer = styled(EdgeContainer)`
  left: 0;
  top: 0;
  right: auto;
  bottom: 0;

  align-items: flex-start;

  border-left: 2px solid ${({ theme }) => theme.colors.layout.rHc};
  border-right-style: none;
`;

const LeftEdgeContainer = styled(EdgeContainer)`
  left: auto;
  top: 0;
  right: 0;
  bottom: 0;

  align-items: flex-end;

  border-right: 2px solid ${({ theme }) => theme.colors.layout.rHc};
  border-left-style: none;
`;

const EdgeEnd = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.layout.rHc};
`;
