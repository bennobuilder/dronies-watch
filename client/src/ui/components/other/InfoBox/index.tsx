import React from 'react';
import styled from 'styled-components';
import LinesBackground from '../../primitive/background/LinesBackground';
import Icon from '../../icons';
import { useTheme } from '../../../theme/useTheme';
import { ui } from '../../../../core';

export const InfoBox: React.FC<Props> = (props) => {
  const { text, className } = props;
  const theme = useTheme();

  return (
    <Container linesCount={0} className={className}>
      <InnerContainer>
        <Icon.Info color={theme.colors.layout.p} width={50} height={50} />
        <Text>{text}</Text>
      </InnerContainer>
    </Container>
  );
};

export default InfoBox;

type Props = {
  text: string;
  className?: string; // Required to apply styling via Styled-Components
};

const Container = styled(LinesBackground)`
  padding: 0;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.layout.lc};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  max-width: 400px;
  height: 100%;
  min-height: 100px;
  padding: 0 20px;

  z-index: 1;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px 20px;
  }
`;

const Text = styled.p`
  margin: 0 0 0 10px;

  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: left;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    margin: 10px 0 0 0;
    text-align: center;
  }
`;
