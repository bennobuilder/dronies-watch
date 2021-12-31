import React from 'react';
import styled from 'styled-components';
import Icon from '../../../../components/icons';
import { ui } from '../../../../../core';
import { Button } from '../../../../components/primitive';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useTheme } from '../../../../theme/useTheme';
import LinesBackground from '../../../../components/primitive/background/LinesBackground';

// Assets
import TrainingProtocolImg from '../../../../../assets/app/training_protocol.png';

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
        <TrainingProtocolContainer>
          <img
            src={TrainingProtocolImg}
            loading="lazy"
            alt="TrainingProtocolImg"
          />
          <TrainingProtocolText>
            <span style={{ fontWeight: 'bold' }}>
              Dronies Lab is an initiative
            </span>{' '}
            that was founded after some Dronies were discovered and destroied by
            humanity. Train your Dronie here to give it a better chance of
            survival.
          </TrainingProtocolText>
        </TrainingProtocolContainer>
        <SocialButtonContainer>
          <SocialButton text="Twitter" icon={Icon.Twitter} />
          <SocialButton text="Discord" icon={Icon.Discord} />
        </SocialButtonContainer>
      </LeftContent>

      {/* Right */}
      {windowWidth > ui.BREAK_POINTS[1] && (
        <LabIcon width={500} height={500} color={theme.colors.layout.p} />
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  z-index: 1;
  margin-top: 80px;

  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled(LinesBackground)`
  margin: 0 0 80px 0;
  padding: 0 40px;
`;

const Title = styled.h1`
  margin: -10px 0 0 0;

  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 6rem;
  font-family: ${({ theme }) => theme.headings.fontFamily};
  white-space: nowrap;

  text-shadow: 0 0 50px
    ${({ theme }) => ui.hexToRgba(theme.colors.layout.p, 0.5)};

  @media (max-width: ${ui.BREAK_POINTS[0]}px) {
    font-size: 4rem;
  }
`;

const LabIcon = styled(Icon.Lab)`
  filter: drop-shadow(0 0 20px ${({ theme }) => theme.colors.layout.p});

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

  @media (max-width: 1200px) {
    margin-right: 0;
  }
`;

const TrainingProtocolContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 80px;
`;

const TrainingProtocolText = styled.p`
  max-width: 450px;
  margin-left: 25px;

  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 1rem;
`;

const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SocialButton = styled(Button)`
  margin-right: 50px;
`;
