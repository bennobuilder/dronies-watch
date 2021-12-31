import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../theme/useTheme';
import Icon from '../../icons';

const LogoText: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { color = theme.colors.layout.hc, onClick, className } = props;

  return (
    <LogoContainer onClick={onClick} className={className}>
      <Logo color={color} width={34} height={34} />
      <LogoEye width={34} height={34} />
      <AppName color={color}>Dronies</AppName>
    </LogoContainer>
  );
};

export default LogoText;

type Props = {
  color?: string;
  onClick?: () => void;
  className?: string; // Required to apply styling via Styled-Components
};

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

  :hover {
    ${Logo} {
      transform: rotateZ(-45deg);
    }

    ${LogoEye} {
      opacity: 1;
    }
  }
`;

const AppName = styled.div<{ color: string }>`
  margin-left: 12px;

  color: ${({ color }) => color};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: bold;
  font-size: 26px;
  text-transform: uppercase;
`;
