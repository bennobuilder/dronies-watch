import React from 'react';
import styled from 'styled-components';
import { MAX_WIDTH } from '../../../../core/entities/ui';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Head from './components/Head';

// Assets
import PageRulerImg from '../../../../assets/app/side_decoration.png';
import BackgroundRepeat from '../../../../assets/app/background_repeat.png';

const PageLayout: React.FC<Props> = (props) => {
  const {
    shouldRenderNavbar,
    shouldRenderHeader,
    shouldRenderFooter,
    children,
  } = props;

  return (
    <Container>
      <PageRuler src={PageRulerImg} loading="lazy" />
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
  position: relative;
  display: flex;
  flex: 1;

  width: 100%;
  height: 100vh;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.layout.bg};
  background-image: url(${BackgroundRepeat}),
    linear-gradient(
      120deg,
      ${({ theme }) => theme.primitiveColors.black},
      ${({ theme }) => theme.primitiveColors.gray}
    );
  background-position: 50% 0, 0 0;
  background-size: 1600px, auto;
`;

const PageRuler = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  right: auto;
  bottom: auto;
  width: 96px;
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
