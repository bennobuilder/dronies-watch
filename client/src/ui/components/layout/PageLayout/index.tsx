import React from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Head, { HeadProps } from './components/Head';
import { ui } from '../../../../core';
import { useWindowSize } from '../../../hooks/useWindowSize';

// Assets
import PageRulerImg from '../../../../assets/app/side_decoration.png';
import BackgroundRepeatImg from '../../../../assets/app/background_repeat.png';

const PageLayout: React.FC<Props> = (props) => {
  const {
    shouldRenderNavbar,
    shouldRenderHeader,
    shouldRenderFooter,
    meta: metaConfig,
    children,
  } = props;
  const { windowWidth } = useWindowSize();

  return (
    <Container>
      {windowWidth > ui.WIDTH_BREAK_POINTS[1] && <PageRuler />}

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
  flex-direction: column;

  width: 100%;
  overflow: hidden;

  background-image: url(${BackgroundRepeatImg}),
    linear-gradient(
      120deg,
      ${({ theme }) => theme.primitiveColors.black},
      ${({ theme }) => theme.primitiveColors.gray}
    );
  background-position: 50% 0, 0 0;
  background-size: 1600px, auto;
`;

const PageRuler = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: auto;
  bottom: auto;
  width: 96px;
  height: 100%;

  background-image: url(${PageRulerImg});
  background-repeat: repeat-y;
`;

const InnerContainer = styled.div<{ maxWidth: number }>`
  position: relative;

  display: flex;
  flex: 1;
  flex-direction: column;

  max-width: ${({ maxWidth }) => maxWidth}px;
  width: ${ui.INNER_WIDTH}%;

  margin-left: auto;
  margin-right: auto;

  padding: 0;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
`;
