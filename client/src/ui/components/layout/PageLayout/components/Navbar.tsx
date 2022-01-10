import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ui } from '../../../../../core';
import Icon from '../../../icons';
import { IconButton, ButtonWrapper } from '../../../primitive';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import LogoText from '../../../other/LogoText';
import { useEventTracker } from '../../../../hooks/useEventTracker';
import config from '../../../../../config';

const Navbar: React.FC<Props> = (props) => {
  const { fixed } = props;
  const { windowWidth } = useWindowSize();
  const trackEvent = useEventTracker('Navbar');

  const navigate = useNavigate();
  const goToHome = () => navigate('/');
  const goToOAuth2Login = () => {
    window.location.href = `${config.api.baseUrl}/auth/discord/login`;
  };

  return (
    <Container fixed={fixed as any}>
      <InnerContainer maxWidth={ui.MAX_WIDTH}>
        <LogoText onClick={goToHome} />
        <RightContent>
          {windowWidth > ui.WIDTH_BREAK_POINTS[1] && (
            <MenuContainer>
              <ButtonWrapper
                to="https://github.com/bennodev19/dronies-watch"
                target="_blank"
                // Analytics
                onClick={() =>
                  trackEvent({
                    action: 'pressed-github-btn',
                    label: `Pressed Github Button`,
                  })
                }
              >
                <MenuText>Github</MenuText>
              </ButtonWrapper>
              <ButtonWrapper
                to="/disclaimer"
                // Analytics
                onClick={() =>
                  trackEvent({
                    action: 'pressed-disclaimer-btn',
                    label: `Pressed Disclaimer Button`,
                  })
                }
              >
                <MenuText>Disclaimer</MenuText>
              </ButtonWrapper>
              <ButtonWrapper
                to={`${config.api.baseUrl}/auth/discord/login`}
                onClick={() => {
                  trackEvent({
                    action: 'pressed-login-btn',
                    label: `Pressed Login Button`,
                  });
                }}
              >
                <MenuText>Login</MenuText>
              </ButtonWrapper>
            </MenuContainer>
          )}

          <SocialContainer>
            <Slash>//</Slash>
            <IconButton
              to="https://discord.com/invite/8naUgEcYEx"
              target="_blank"
              icon={DiscordIcon}
            />
            <IconButton
              to="https://twitter.com/DroniesNFT"
              target="_blank"
              icon={TwitterIcon}
            />
          </SocialContainer>
        </RightContent>
      </InnerContainer>
    </Container>
  );
};

Navbar.defaultProps = {
  fixed: true,
};

export default Navbar;

type Props = {
  fixed?: boolean;
};

const Container = styled.div<{ fixed: boolean }>`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'relative')};

  display: flex;
  z-index: 1000;

  width: 100%;
  height: ${ui.NAVBAR_HEIGHT}px;

  padding: 20px 0;

  background: ${({ theme, fixed }) =>
    fixed ? ui.hexToRgba(theme.colors.layout.bg, 0.8) : 'transparent'};
`;

const InnerContainer = styled.div<{ maxWidth: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth}px;

  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${ui.MAX_WIDTH}px) {
    padding: 0 ${ui.INNER_PADDING}px;
  }
`;

const RightContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-right: 50px;
`;

const MenuText = styled.div`
  position: relative;
  margin: 0 10px 0 10px;
  padding: 20px;

  color: ${({ theme }) => theme.colors.interactive.primary.p0};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  text-transform: uppercase;

  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.layout.hc};

    background: linear-gradient(
          to right,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        0 0,
      linear-gradient(
          to right,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        0 100%,
      linear-gradient(
          to left,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        100% 0,
      linear-gradient(
          to left,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        100% 100%,
      linear-gradient(
          to bottom,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        0 0,
      linear-gradient(
          to bottom,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        100% 0,
      linear-gradient(
          to top,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        0 100%,
      linear-gradient(
          to top,
          ${({ theme }) => theme.colors.layout.rHc} 3px,
          transparent 3px
        )
        100% 100%;

    background-repeat: no-repeat;
    background-size: 10px 10px;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Slash = styled.div`
  margin-right: 24px;

  color: ${({ theme }) => theme.colors.layout.hc};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: bold;
  font-size: 16px;
`;

const TwitterIcon = styled(Icon.Twitter)`
  margin-left: 20px;
  cursor: pointer;
`;

const DiscordIcon = styled(Icon.Discord)`
  cursor: pointer;
`;
