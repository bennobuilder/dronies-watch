import React from 'react';
import styled from 'styled-components';
import Icon from '../../../../components/icons';
import { ui } from '../../../../../core';
import { Button } from '../../../../components/primitive';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useTheme } from '../../../../theme/useTheme';
import LinesBackground from '../../../../components/primitive/background/LinesBackground';
import TrainingProtocol from './components/TrainingProtocol';

const Header: React.FC = () => {
  const { windowWidth } = useWindowSize();
  const theme = useTheme();

  return (
    <Container>
      {/* Left */}
      <LeftContent>
        <TitleContainer linesCount={5}>
          <Title>DRONIES LAB</Title>
        </TitleContainer>
        <TrainingProtocol />

        <SocialButtonContainer>
          <SocialButton text="Twitter" icon={Icon.Twitter} />
          <SocialButton text="Discord" icon={Icon.Discord} />
        </SocialButtonContainer>
      </LeftContent>

      {/* Right */}
      {windowWidth > ui.WIDTH_BREAK_POINTS[2] && (
        <LabIcon width={500} height={500} color={theme.colors.layout.rHc} />
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  z-index: 1;
  margin-top: 80px;

  width: 100%;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const LeftContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    align-items: center;
  }
`;

const TitleContainer = styled(LinesBackground)`
  position: relative;

  margin: 0 0 80px 0;
  padding: 10px 40px;
`;

const Title = styled.h1`
  margin: -10px 0 0 0;

  font-size: 6rem;
  font-family: ${({ theme }) => theme.headings.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.layout.p};

  text-shadow: 0 0 50px
    ${({ theme }) => ui.hexToRgba(theme.colors.layout.p, 0.5)};

  transition: font-size ${({ theme }) => theme.transitionTimingFunction} 500ms;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    font-size: 4rem;
    white-space: pre-wrap;
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    font-size: 3rem;
  }
`;

const LabIcon = styled(Icon.Lab)`
  filter: drop-shadow(0 0 20px ${({ theme }) => theme.colors.layout.rHc});

  margin-right: -100px;

  animation: spin 10s ${({ theme }) => theme.transitionTimingFunction} infinite;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(-20deg);
    }
    50% {
      transform: rotate(0);
    }
    75% {
      transform: rotate(20deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  transition: margin-right ${({ theme }) => theme.transitionTimingFunction}
    500ms;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[3]}) {
    margin-right: 0;
  }
`;

const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SocialButton = styled(Button)`
  margin: 0 50px 0 0;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    margin: 20px 0 0 0;
    width: 100%;
  }
`;
