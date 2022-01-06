import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../theme/useTheme';
import LinesBackground from '../../primitive/background/LinesBackground';
import BottomDivider from './components/BottomDivider';
import TableItem from './components/TableItem';

const HighScoreTable: React.FC = () => {
  const theme = useTheme();

  return (
    <Container linesCount={0}>
      <StyledTable>
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

const Container = styled(LinesBackground)`
  position: relative;

  padding: 0;
  width: 100%;
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
`;
