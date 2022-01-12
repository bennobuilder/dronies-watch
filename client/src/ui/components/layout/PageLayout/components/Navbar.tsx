import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { ui, user } from '../../../../../core';
import Icon from '../../../icons';
import { IconButton, ButtonWrapper, Button } from '../../../primitive';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import LogoText from '../../../other/LogoText';
import { useEventTracker } from '../../../../hooks/useEventTracker';
import config from '../../../../../config';

const Navbar: React.FC<Props> = (props) => {
  const { fixed } = props;
  const { windowWidth } = useWindowSize();
  const trackEvent = useEventTracker('Navbar');
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const currentUser = useAgile(user.CURRENT_USER);

  const navigate = useNavigate();
  const goToHome = () => navigate('/');

  useEffect(() => {
    if (fixed) {
      const scrollHandler = () => {
        setNavbarTransparent(window.scrollY <= ui.NAVBAR_HEIGHT);
      };

      window.addEventListener('scroll', scrollHandler);
    }
  }, [fixed]);

  return (
    <Container fixed={fixed!} navbarTransparent={navbarTransparent}>
      <InnerContainer maxWidth={ui.MAX_WIDTH}>
        <LogoText onClick={goToHome} />

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
          </MenuContainer>
        )}

        <RightContent>
          <AuthButtonContainer>
            {currentUser != null ? (
              <Button
                leftIcon={
                  <UserImage src={currentUser.avatarUri} loading="lazy" />
                }
                size="xs"
                onClick={() => {
                  trackEvent({
                    action: 'pressed-logout-btn',
                    label: `Pressed Logout Button`,
                  });

                  user.revokeAuth();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                leftIcon={DiscordIcon}
                size="xs"
                to={`${config.api.baseUrl}/auth/discord/login`}
                onClick={() => {
                  trackEvent({
                    action: 'pressed-login-btn',
                    label: `Pressed Login Button`,
                  });
                }}
              >
                Login
              </Button>
            )}
          </AuthButtonContainer>

          {windowWidth > ui.WIDTH_BREAK_POINTS[1] && (
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
          )}
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

const Container = styled.div<{ fixed: boolean; navbarTransparent: boolean }>`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'relative')};

  display: flex;
  z-index: 1000;

  width: 100%;
  height: ${ui.NAVBAR_HEIGHT}px;

  padding: 20px 0;

  background: ${({ theme, navbarTransparent }) =>
    navbarTransparent
      ? 'transparent'
      : ui.hexToRgba(theme.colors.layout.bg, 0.9)};

  transition: background 200ms linear;
`;

const InnerContainer = styled.div<{ maxWidth: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: ${ui.INNER_WIDTH}%;
  max-width: ${({ maxWidth }) => maxWidth}px;

  margin-left: auto;
  margin-right: auto;
`;

const RightContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AuthButtonContainer = styled.div`
  margin-right: 20px;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    margin-right: 0;
  }
`;

const UserImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100%;
`;

const MenuContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuText = styled.div`
  position: relative;
  margin: 0 10px 0 10px;
  padding: 20px;

  color: ${({ theme }) => theme.colors.interactive.primary.n0};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  text-transform: uppercase;
  letter-spacing: 2.5px;

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
