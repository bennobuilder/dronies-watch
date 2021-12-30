import React from 'react';
import styled from 'styled-components';
import { MAX_WIDTH } from '../../../../core/entities/ui';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Head from './components/Head';

const PageLayout: React.FC<Props> = (props) => {
  const {
    shouldRenderNavbar,
    shouldRenderHeader,
    shouldRenderFooter,
    children,
  } = props;

  return (
    <Container>
      <InnerContainer maxWidth={MAX_WIDTH}>
        {shouldRenderHeader && <Head />}
        {shouldRenderNavbar && <Navbar />}
        <Main>{children}</Main>
        {shouldRenderFooter && <Footer />}
      </InnerContainer>
    </Container>
  );
};

PageLayout.defaultProps = {
  shouldRenderHeader: true,
  shouldRenderNavbar: true,
  shouldRenderFooter: true,
};

export default PageLayout;

type Props = {
  shouldRenderNavbar?: boolean;
  shouldRenderHeader?: boolean;
  shouldRenderFooter?: boolean;
};

const Container = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.layout.bg};
`;

const InnerContainer = styled.div<{ maxWidth: number }>`
  display: flex;
  flex: 1;

  max-width: ${({ maxWidth }) => maxWidth}px;

  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
`;
