import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../theme/useTheme';

const HighScoreTable: React.FC = () => {
  const theme = useTheme();

  return (
    <div>
      <StyledTable>
        <thead>
          <TableHeaderRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Score</TableHeaderCell>
            <TableHeaderCell>Time ago</TableHeaderCell>
          </TableHeaderRow>
        </thead>
        <tbody>
          <TableBodyRow>
            <TableBodyCell>1</TableBodyCell>
            <TableBodyCell>BennoDev</TableBodyCell>
            <TableBodyCell>48</TableBodyCell>
            <TableBodyCell>15 hours ago</TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell>2</TableBodyCell>
            <TableBodyCell>Jeff</TableBodyCell>
            <TableBodyCell>24</TableBodyCell>
            <TableBodyCell>8 hours ago</TableBodyCell>
          </TableBodyRow>
        </tbody>
      </StyledTable>
    </div>
  );
};

export default HighScoreTable;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const TableHeaderRow = styled.tr`
  background-color: #009879;
  color: #ffffff;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
`;

const TableBodyRow = styled.tr`
  border-bottom: 1px solid #dddddd;

  :nth-of-type(even) {
    background-color: #f3f3f3;
  }

  :last-of-type {
    border-bottom: 2px solid #009879;
  }
`;

const TableBodyCell = styled.td`
  padding: 12px 15px;
`;

const DottedLine = styled.div`
  height: 0;
  border-bottom: 2px dotted ${({ theme }) => theme.colors.layout.rHc};
  opacity: 0.3;
`;

const EdgeContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 15px;
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

const EdgeMiddle = styled.div`
  width: 40%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.layout.rHc};
`;
