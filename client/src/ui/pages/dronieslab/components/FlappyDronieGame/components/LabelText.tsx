import React from 'react';
import styled from 'styled-components';

const LabelText: React.FC<Props> = (props) => {
  const { label, value, className } = props;

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Container>
  );
};

export default LabelText;

type Props = {
  label: string;
  value: string;
  className?: string; // Required to apply styling via Styled-Components
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 5px 0;
`;

const Label = styled.p`
  margin: 0 10px 0 0;

  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.layout.rHc};
  font-size: 1.5rem;
`;

const Value = styled.p`
  margin: 0;

  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: bold;
  color: ${({ theme }) => theme.primitiveColors.red};
  font-size: 2rem;
`;
