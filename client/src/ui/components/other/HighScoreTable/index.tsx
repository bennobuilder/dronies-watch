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
            index={0}
            name="Benno"
            discriminator="1234"
            score={47}
            playedDateTime={new Date()}
          />
          <TableItem
            index={1}
            name="Jeff"
            discriminator="5678"
            score={12}
            playedDateTime={new Date()}
          />
          <TableItem
            index={2}
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
`;

const StyledTable = styled.table`
  min-width: 400px;

  color: white; // TODO REMOVE
`;

const TableHeaderRow = styled.tr`
  position: relative;

  text-align: left;
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
`;
