import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../theme/useTheme';
import BottomDivider from './components/BottomDivider';
import TableItem from './components/TableItem';
import TableOutline from './components/TableOutline';

const HighScoreTable: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <StyledTable>
        <TableOutline />

        {/* Table Content */}
        <thead>
          <TableHeaderRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Score</TableHeaderCell>
            <TableHeaderCell>Time ago</TableHeaderCell>
            <BottomDivider />
          </TableHeaderRow>
        </thead>
        <tbody>
          <TableItem
            rank={1}
            name="Benno"
            discriminator="1234"
            score={47}
            playedDateTime={new Date()}
          />
          <TableItem
            rank={2}
            name="Jeff"
            discriminator="5678"
            score={12}
            playedDateTime={new Date()}
          />
          <TableItem
            rank={3}
            name="Frank"
            discriminator="9999"
            score={8}
            playedDateTime={new Date()}
            showDivider={false}
          />
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default HighScoreTable;

const Container = styled.div`
  position: relative;

  padding: 0;
  width: 80%;
`;

const StyledTable = styled.table`
  min-width: 400px;
  width: 100%;

  color: white; // TODO REMOVE
`;

const TableHeaderRow = styled.tr`
  position: relative;

  text-align: left;
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.hc};
`;
