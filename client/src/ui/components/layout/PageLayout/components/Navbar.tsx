import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
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
  justify-content: flex-start;

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
  z-index: 999;

  opacity: 0;

  transition: opacity ${({ theme }) => theme.transitionTimingFunction} 500ms;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;

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
