import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../../theme/useTheme';
import HighScoreTable from '../../../../components/other/HighScoreTable';

const RecentHighScores: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <HighScoreTable />
    </Container>
  );
};

export default RecentHighScores;

const Container = styled.div`
  position: relative;

  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
`;
