import React from 'react';
import Icon from '../../../icons';
import { ui } from '../../../../../core';
import { NumberSize } from '../../../../../core/entities/ui';
import { useTheme } from '../../../../theme/useTheme';
import ButtonWrapper, { ButtonWrapperProps } from '../ButtonWrapper';

const iconSizes = {
  xs: 12,
  sm: 16,
  md: 26,
  lg: 32,
  xl: 48,
};

const IconButton: React.FC<Props> = (props) => {
  const theme = useTheme();
  const {
    icon: DeclaredIcon,
    to,
    onClick,
    size = 'md',
    color = theme.colors.layout.hc,
    hoverColor = theme.colors.layout.rHc,
    target = '_self',
    className,
  } = props;
  const _size = ui.getSizeValue(size, iconSizes);

  return (
    <ButtonWrapper
      target={target}
      to={to}
      onClick={onClick}
      className={className}
    >
      {(isHovering: boolean) => (
        <DeclaredIcon
          width={_size}
          height={_size}
          color={isHovering ? hoverColor : color}
          style={
            isHovering
              ? { filter: `drop-shadow(0px 0px 10px ${hoverColor})` }
              : undefined
          }
        />
      )}
    </ButtonWrapper>
  );
};

export default IconButton;

type Props = {
  icon: ExtractComponents<typeof Icon>;
  size?: NumberSize;
  color?: string;
  hoverColor?: string;
} & ButtonWrapperProps;

type ExtractComponents<T> = {
  [K in keyof T]: T[K] extends typeof Icon.Dronies ? T[K] : never;
}[keyof T];
