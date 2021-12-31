import React from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Head, { HeadProps } from './components/Head';
import { INNER_PADDING } from './static';
import { ui } from '../../../../core';

// Assets
import PageRulerImg from '../../../../assets/app/side_decoration.png';
import BackgroundRepeat from '../../../../assets/app/background_repeat.png';

const PageLayout: React.FC<Props> = (props) => {
  const {
    shouldRenderNavbar,
    shouldRenderHeader,
    shouldRenderFooter,
    meta: metaConfig,
    children,
  } = props;

  return (
    <Container>
      <PageRuler src={PageRulerImg} loading="lazy" />
      {shouldRenderHeader && <Head {...metaConfig} />}
      {shouldRenderNavbar && <Navbar />}
      <InnerContainer maxWidth={ui.MAX_WIDTH}>
        <Main>{children}</Main>
      </InnerContainer>
      {shouldRenderFooter && <Footer />}
    </Container>
  );
};

PageLayout.defaultProps = {
  shouldRenderHeader: true,
  shouldRenderNavbar: true,
  shouldRenderFooter: true,
  meta: {},
};

export default PageLayout;

type Props = {
  shouldRenderNavbar?: boolean;
  shouldRenderHeader?: boolean;
  shouldRenderFooter?: boolean;
  meta?: HeadProps;
};

const Container = styled.div`
  position: relative;

  display: flex;
  flex: 1;

  width: 100%;
  overflow: hidden;

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
  position: relative;

  display: flex;
  flex: 1;
  flex-direction: column;

  max-width: ${({ maxWidth }) => maxWidth}px;
  width: 100%;

  margin-left: auto;
  margin-right: auto;

  padding: 0 ${INNER_PADDING}px;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
`;
