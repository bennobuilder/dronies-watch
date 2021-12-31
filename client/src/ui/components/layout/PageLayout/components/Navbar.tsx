import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useTheme } from '../../../../theme/useTheme';
import { ui } from '../../../../../core';
import Icon from '../../../icons';
import { IconButton, ButtonWrapper } from '../../../primitive';

const Navbar: React.FC<Props> = (props) => {
  const { absolute } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container absolute={absolute as any} maxWidth={ui.MAX_WIDTH}>
      <LogoContainer
        onClick={() => {
          navigate('/');
        }}
      >
        <Logo color={theme.colors.layout.hc} width={34} height={34} />
        <LogoEye width={34} height={34} />
        <AppName>Dronies</AppName>
      </LogoContainer>
      <RightContent>
        <MenuContainer>
          <ButtonWrapper
            to="https://github.com/bennodev19/dronies-watch"
            target="_blank"
          >
            <MenuText>Github</MenuText>
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              console.log('Disclaimer pressed');
            }}
          >
            <MenuText>Disclaimer</MenuText>
          </ButtonWrapper>
        </MenuContainer>
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
    </Container>
  );
};

Navbar.defaultProps = {
  absolute: true,
};

export default Navbar;

type Props = {
  absolute?: boolean;
};

const Container = styled.div<{ absolute: boolean; maxWidth: number }>`
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  max-width: ${({ maxWidth }) => maxWidth}px;
  width: 100%;
  height: ${ui.NAVBAR_HEIGHT}px;

  padding: 20px 0;
  margin-left: auto;
  margin-right: auto;

  background-color: ${({ theme, absolute }) =>
    !absolute ? theme.colors.layout.bg : 'transparent'};
`;

const Logo = styled(Icon.Dronies)`
  transform: rotateZ(0deg);

  transition: transform ${({ theme }) => theme.transitionTimingFunction} 500ms;
`;

const LogoEye = styled(Icon.DroniesEye)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  opacity: 0;

  transition: opacity ${({ theme }) => theme.transitionTimingFunction} 500ms;
`;

const LogoContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  justify-self: flex-start;

  :hover {
    ${Logo} {
      transform: rotateZ(-45deg);
    }

    ${LogoEye} {
      opacity: 1;
    }
  }
`;

const AppName = styled.div`
  margin-left: 12px;

  color: ${({ theme }) => theme.colors.layout.hc};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: bold;
  font-size: 26px;
  text-transform: uppercase;
`;

const RightContent = styled.div`
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