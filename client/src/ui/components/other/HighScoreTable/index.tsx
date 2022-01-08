import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../theme/useTheme';
import BottomDivider from './components/BottomDivider';
import TableItem from './components/TableItem';
import TableOutline from './components/TableOutline';
import TableHeader from './components/TableHeader';
import { ui } from '../../../../core';

const HighScoreTable: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <InnerContainer>
        <StyledTable>
          <TableOutline />

          {/* Table Content */}
          <thead>
            <TableHeader />
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
      </InnerContainer>
    </Container>
  );
};

export default HighScoreTable;

const Container = styled.div`
  position: relative;
  width: 70%;
  padding: 0;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  overflow-x: auto; // https://www.w3schools.com/howto/howto_css_table_responsive.asp
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 400px;
`;
