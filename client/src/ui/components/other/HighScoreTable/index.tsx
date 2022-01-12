import React from 'react';
import styled from 'styled-components';
import TableItem from './components/TableItem';
import TableOutline from './components/TableOutline';
import TableHeader from './components/TableHeader';
import InfoBox from '../InfoBox';
import { HighScoreItem } from '../../../../core/entities/flappydronie';
import { ui } from '../../../../core';

const HighScoreTable: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <Container>
      <InnerContainer>
        {data.length === 0 && (
          <StyledInfoBox text="Recently no high scores were scored, as I've not manged to deploy my backend yet :/" />
        )}
        <TableOutline />
        <StyledTable>
          {/* Table Content */}
          <thead>
            <TableHeader />
          </thead>

          <tbody>
            {data.map((itemData, i) => (
              <TableItem
                key={i}
                rank={itemData.rank}
                name={itemData.name}
                discriminator={itemData.discriminator}
                score={itemData.score}
                playedAt={itemData.playedAt}
                avatarUri={itemData.avatarUri}
              />
            ))}
          </tbody>
        </StyledTable>
      </InnerContainer>
    </Container>
  );
};

export default HighScoreTable;

type Props = {
  data: HighScoreItem[];
};

const Container = styled.div`
  position: relative;
`;

const InnerContainer = styled.div`
  min-height: 600px;
  max-height: 700px;

  overflow-x: auto; // https://www.w3schools.com/howto/howto_css_table_responsive.asp
  overflow-y: auto;

  // Hide Scrollbar
  // https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 400px;
`;

const StyledInfoBox = styled(InfoBox)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    top: 45%;
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    top: 50%;
  }
`;
