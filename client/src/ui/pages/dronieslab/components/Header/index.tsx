import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import Icon from '../../../../components/icons';
import { ui } from '../../../../../core';
import { Button } from '../../../../components/primitive';
import LinesBackground from '../../../../components/primitive/background/LinesBackground';
import TrainingProtocol from './components/TrainingProtocol';
import BirdInPlane from './components/BirdInPlane';
import Clouds from './components/Clouds';
import ToggleSwitch from '../../../../components/primitive/input/ToggleSwitch';

const Header: React.FC = () => {
  const slowPerformance = useAgile(ui.SLOW_PERFORMANCE);

  return (
    <Container>
      {!slowPerformance && <Clouds />}
      {/* Left */}
      <LeftContent>
        <TitleContainer linesCount={10}>
          <Title>
            DRONIES
            <br />
            LAB
          </Title>
        </TitleContainer>
        <TrainingProtocol />

        <SocialButtonContainer>
          <SocialButton leftIcon={Icon.Twitter}>Twitter</SocialButton>
          <SocialButton leftIcon={Icon.Discord}>Discord</SocialButton>
        </SocialButtonContainer>
        <StyledSwitch
          id="performance"
          toggled={slowPerformance}
          onChange={ui.setSlowPerformance}
          size="sm"
          label="Performance Mode"
        />
      </LeftContent>

      {/* Right */}
      {!slowPerformance && <BirdInPlane />}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  z-index: 1;
  margin-top: 100px;

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

const Title = styled.h1`
  margin: -10px 0 0 0;

  font-size: 125px;
  font-family: ${({ theme }) => theme.headings.fontFamily};
  white-space: pre-wrap;
  text-transform: uppercase;
  line-height: 95%;
  color: ${({ theme }) => theme.colors.layout.p};

  text-shadow: 0 0 50px
    ${({ theme }) => ui.hexToRgba(theme.colors.layout.p, 0.5)};

  transition: font-size ${({ theme }) => theme.transitionTimingFunction} 500ms;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    font-size: 5rem;
    white-space: pre-wrap;
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    font-size: 4rem;
  }
`;

const TitleContainer = styled(LinesBackground)`
  position: relative;

  margin: 0 0 60px 0;
  padding: 10px 40px;
`;

const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: ${ui.INNER_WIDTH}%;

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

const StyledSwitch = styled(ToggleSwitch)`
  margin-top: 20px;
`;
