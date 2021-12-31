import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonWrapper: React.FC<ButtonWrapperProps> = (props) => {
  const { to, onClick, target = '_self', ...other } = props;
  const isRedirect = to != null;
  const isExternalTo = isRedirect ? to.startsWith('http') : false;
  const Element: React.ElementType = isRedirect
    ? isExternalTo
      ? 'a'
      : Link
    : 'div';

  const [isHovering, setIsHovering] = React.useState(false);
  const children =
    typeof props.children === 'function'
      ? props.children(isHovering)
      : props.children;

  return (
    <Container
      {...other}
      as={Element}
      {...(isRedirect ? (isExternalTo ? { href: to } : { to }) : { onClick })}
      target={target}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </Container>
  );
};

export default ButtonWrapper;

export type ButtonWrapperProps = {
  to?: string;
  onClick?: () => void;
  target?: React.HTMLAttributeAnchorTarget;
} & React.ComponentProps<'div'>;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none; // for 'a'
`;
