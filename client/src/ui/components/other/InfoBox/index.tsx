import React from 'react';
import styled from 'styled-components';
import LinesBackground from '../../primitive/background/LinesBackground';
import Icon from '../../icons';
import { useTheme } from '../../../theme/useTheme';

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

  width: 400px;
  height: 100%;
  min-height: 100px;
  padding: 0 20px;

  z-index: 1;
`;

const Text = styled.p`
  margin: 0 0 0 10px;
  color: ${({ theme }) => theme.colors.layout.hc};
`;
