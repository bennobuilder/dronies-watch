import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../theme/useTheme';
import { ui } from '../../../../../core';
import Icon from '../../../icons';

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
        <div style={{ position: 'relative' }}>
          <Logo color={theme.colors.layout.hc} width={38} height={38} />
          <LogoEye width={38} height={38} />
        </div>
        <AppName>Dronies</AppName>
      </LogoContainer>
      <RightContainer>
        <MenuContainer>
          <MenuText>GITHUB</MenuText>
          <MenuText>DISCLAIMER</MenuText>
        </MenuContainer>
        <SocialContainer>
          <Slash>//</Slash>
          <Link
            to={{ pathname: 'https://discord.com/invite/8naUgEcYEx' }}
            target="_blank"
          >
            <DiscordIcon
              width={26}
              height={26}
              color={theme.colors.layout.hc}
            />
          </Link>
          <Link
            to={{ pathname: 'https://twitter.com/DroniesNFT' }}
            target="_blank"
          >
            <TwitterIcon
              width={26}
              height={26}
              color={theme.colors.layout.hc}
            />
          </Link>
        </SocialContainer>
      </RightContainer>
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
  margin: 0 0 0 12px;

  color: ${({ theme }) => theme.colors.layout.hc};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: bold;
  font-size: 30px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-right: 50px;
`;

const MenuText = styled.div`
  margin: 0 20px 0 20px;

  color: ${({ theme }) => theme.colors.interactive.primary.p0};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 16px;

  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.layout.hc};
  }
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Slash = styled.div`
  margin: 0 24px 0 0;

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

  :hover {
  }
`;
