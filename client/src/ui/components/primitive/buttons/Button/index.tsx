import React from 'react';
import styled from 'styled-components';
import Icon from '../../../icons';
import { getSizeValue, NumberSize } from '../../../../../core/entities/ui';
import ButtonWrapper, { ButtonWrapperProps } from '../ButtonWrapper';
import { useTheme } from '../../../../theme/useTheme';
import { ui } from '../../../../../core';

const iconSizes = {
  xs: 20,
  sm: 26,
  md: 30,
  lg: 36,
  xl: 48,
};

const buttonHeight = {
  xs: 32,
  sm: 54,
  md: 68,
  lg: 78,
  xl: 94,
};

const borderWidth = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 3,
};

const horizontalPadding = {
  xs: 15,
  sm: 20,
  md: 30,
  lg: 35,
  xl: 40,
};

const Button: React.FC<Props> = (props) => {
  const theme = useTheme();
  const {
    leftIcon,
    to,
    onClick,
    size = 'md',
    color = theme.colors.interactive.primary.n0,
    hoverColor = theme.colors.interactive.primary.p1,
    target = '_self',
    className,
    children,
  } = props;
  const _size = ui.getSizeValue(size, iconSizes);

  return (
    <Container
      target={target}
      to={to}
      onClick={onClick}
      color={color}
      hoverColor={hoverColor}
      size={size}
      className={className}
    >
      {(isHovering: boolean) => (
        <>
          {leftIcon != null && (
            <LeftIconContainer>
              {/* https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element */}
              {React.isValidElement(leftIcon) ? (
                leftIcon
              ) : (
                <LeftIcon
                  as={leftIcon}
                  // In case the Element is an Icon
                  width={_size}
                  height={_size}
                  color={isHovering ? hoverColor : color}
                />
              )}
            </LeftIconContainer>
          )}
          <span>{children}</span>
        </>
      )}
    </Container>
  );
};

export default Button;

type Props = {
  leftIcon?: React.ReactElement | ExtractComponents<typeof Icon>;
  size?: NumberSize;
  color?: string;
  hoverColor?: string;
} & ButtonWrapperProps;

type ExtractComponents<T> = {
  [K in keyof T]: T[K] extends typeof Icon.Dronies ? T[K] : never;
}[keyof T];

const LeftIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
`;

const LeftIcon = styled.div`
  transition: color 0.3s, filter 0.3s;
`;

const Container = styled(ButtonWrapper)<{
  color: string;
  hoverColor: string;
  size: NumberSize;
}>`
  display: inline-flex;
  align-items: center;
  flex-direction: row;

  height: ${({ size }) => getSizeValue(size, buttonHeight)}px;
  padding: 0 ${({ size }) => getSizeValue(size, horizontalPadding)}px;

  border: ${({ size }) => getSizeValue(size, borderWidth)}px solid
    ${({ color }) => color};
  color: ${({ color }) => color};

  letter-spacing: 4px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Furore, serif;
  font-size: ${({ size, theme }) => getSizeValue(size, theme.fontSizes)}px;

  cursor: pointer;

  transition: color 0.3s, text-shadow 0.3s, filter 0.3s;

  :hover {
    border-color: ${({ hoverColor }) => hoverColor};
    color: ${({ hoverColor }) => hoverColor};
    filter: drop-shadow(
      0px 0px 5px ${({ hoverColor }) => ui.hexToRgba(hoverColor, 0.5)}
    );

    ${LeftIcon} {
      filter: drop-shadow(
        0px 0px 5px ${({ hoverColor }) => ui.hexToRgba(hoverColor, 0.5)}
      );
    }
  }
`;
