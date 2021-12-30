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
        <Icon.Dronies color={theme.colors.layout.hc} width={30} height={30} />
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

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;
`;

const AppName = styled.div`
  margin: 0 0 0 10px;

  color: ${({ theme }) => theme.colors.layout.hc};
`;
