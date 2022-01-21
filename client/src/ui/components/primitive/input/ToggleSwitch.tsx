import React from 'react';
import { generateId } from '@agile-ts/core';
import styled from 'styled-components';
import {
  getSizeValue,
  hexToRgba,
  NumberSize,
} from '../../../../core/entities/ui';

const switchWidth = {
  xs: 20,
  sm: 40,
  md: 60,
  lg: 80,
  xl: 100,
};

const switchHeight = {
  xs: 10,
  sm: 20,
  md: 30,
  lg: 40,
  xl: 50,
};

const switchLabel = {
  xs: 2,
  sm: 12,
  md: 22,
  lg: 32,
  xl: 42,
};

const ToggleSwitch: React.FC<Props> = (props) => {
  const { id = generateId(), size = 'md', toggled, onChange } = props;

  return (
    <Container>
      <>
        <SwitchInput
          className="switch-checkbox"
          id={id}
          type="checkbox"
          checked={toggled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <SwitchLabel htmlFor={id} size={size}>
          <SwitchButton size={size} />
        </SwitchLabel>
      </>
    </Container>
  );
};

type Props = {
  id?: string;
  size?: NumberSize;
  toggled?: boolean;
  onChange: (checked: boolean) => void;
};

export default ToggleSwitch;

const Container = styled.div`
  position: relative;
`;

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const SwitchLabel = styled.label<{ size: NumberSize }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  width: ${({ size }) => getSizeValue(size, switchWidth)}px;
  height: ${({ size }) => getSizeValue(size, switchHeight)}px;

  border-radius: 100px;
  border: 2px solid ${({ theme }) => hexToRgba(theme.colors.layout.rHc2, 0.5)};

  transition: background-color 0.2s;
`;

const SwitchButton = styled.span<{ size: NumberSize }>`
  position: absolute;
  top: 2px;
  left: 2px;

  content: '';

  width: ${({ size }) => getSizeValue(size, switchLabel)}px;
  height: ${({ size }) => getSizeValue(size, switchLabel)}px;

  border-radius: 45px;
  background: ${({ theme }) => theme.colors.layout.rHc};
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);

  transition: 0.2s;

  ${SwitchInput}:checked + ${SwitchLabel} & {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;
