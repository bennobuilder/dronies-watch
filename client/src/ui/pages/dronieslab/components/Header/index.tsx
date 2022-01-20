import React from 'react';
import styled from 'styled-components';
import Icon from '../../../../components/icons';
import { ui } from '../../../../../core';
import { Button } from '../../../../components/primitive';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import LinesBackground from '../../../../components/primitive/background/LinesBackground';
import TrainingProtocol from './components/TrainingProtocol';
import Cloud from '../../../../components/icons/components/Cloud';
import { useTheme } from '../../../../theme/useTheme';
import { MAX_WIDTH } from '../../../../../core/entities/ui';

// Assets
import BirdInPlaneImg from '../../../../../assets/app/bird_in_plane.png';

const cloudMetaData = [
  { width: 300, speed: 2, bottomOffset: 0, delay: 0 },
  { width: 400, speed: 1, bottomOffset: 50, delay: 12 },
  { width: 130, speed: 3, bottomOffset: 120, delay: 60 },
  { width: 250, speed: 3.5, bottomOffset: 200, delay: 50 },
  { width: 350, speed: 1, bottomOffset: 150, delay: 30 },
  { width: 150, speed: 2, bottomOffset: 300, delay: 20 },
  { width: 200, speed: 3, bottomOffset: 400, delay: 2 },
  { width: 120, speed: 3, bottomOffset: 10, delay: 80 },
];

const Header: React.FC = () => {
  const { windowWidth } = useWindowSize();
  const theme = useTheme();

  return (
    <Container>
      {cloudMetaData.map((meta) => (
        <StyledCloud
          width={meta.width}
          windowWidth={windowWidth}
          cloudWidth={meta.width}
          speed={meta.speed}
          bottomOffset={meta.bottomOffset}
          delay={meta.delay}
          color={theme.colors.layout.p}
        />
      ))}

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
      </LeftContent>

      {/* Right */}
      {/* {windowWidth > ui.WIDTH_BREAK_POINTS[2] && <LabIcon color="#C83521" />} */}
      <BirdInPlaneContainer>
        <BirdInPlane
          src={BirdInPlaneImg}
          loading="lazy"
          alt="TrainingProtocolImg"
        />
      </BirdInPlaneContainer>
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

const BirdInPlaneContainer = styled.div`
  animation: scoping 3s alternate linear infinite;

  @keyframes scoping {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(50px);
    }
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    margin-top: 50px;
  }
`;

const BirdInPlane = styled.img`
  animation: soaring 6s forwards linear infinite;

  @keyframes soaring {
    0% {
      transform: rotate(0deg);
    }
    20% {
      transform: rotate(-15deg);
    }
    40% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(-1deg);
    }
    60% {
      transform: rotate(5);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const StyledCloud = styled(Cloud)<{
  windowWidth: number;
  cloudWidth: number;
  speed: number;
  bottomOffset: number;
  delay: number;
}>`
  position: absolute;
  right: 0;
  left: 0;
  bottom: ${({ bottomOffset }) => bottomOffset}px;

  z-index: 0;
  opacity: 0;

  animation: movement ${({ speed }) => 40 - speed}s forwards linear infinite;
  animation-delay: ${({ delay }) =>
    -delay}s; // https://stackoverflow.com/questions/10540720/how-can-i-start-css3-animations-at-a-specific-spot

  @keyframes movement {
    0% {
      opacity: 0;

      transform: translateX(
        ${({ cloudWidth, windowWidth }) =>
          windowWidth > MAX_WIDTH
            ? -cloudWidth - (windowWidth - MAX_WIDTH) / 2
            : -cloudWidth}px
      );
    }
    10% {
      opacity: 0.2;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translateX(
        2000px
      ); // Static value for consistent speed over different screen sizes
    }
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    bottom: ${({ bottomOffset }) => bottomOffset - 200}px;
  }
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
