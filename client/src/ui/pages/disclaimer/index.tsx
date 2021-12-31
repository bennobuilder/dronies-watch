import React from 'react';
import styled from 'styled-components';
import PageLayout from '../../components/layout/PageLayout';

const DisclaimerScreen: React.FC = () => (
  <PageLayout
    meta={{ title: 'Disclaimer' }}
    shouldRenderFooter={false}
    shouldRenderNavbar={false}
  >
    <Container>
      <Text>
        This is not the official{' '}
        <a href="https://twitter.com/DroniesNFT">@DroniesNFT</a> website. Visit
        the official website{' '}
        <a href="https://www.droniesnft.com/#community">here</a>.
      </Text>
    </Container>
  </PageLayout>
);

export default DisclaimerScreen;

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;
`;

const Text = styled.p`
  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 1rem;

  a:link,
  a:visited {
    color: ${({ theme }) => theme.colors.layout.hc};
  }
`;
