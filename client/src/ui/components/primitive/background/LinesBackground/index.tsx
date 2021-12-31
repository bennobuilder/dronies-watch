import React from 'react';
import styled from 'styled-components';

const LinesBackground: React.FC<Props> = (props) => {
  const { linesCount = 10, opacity = 1, className, children } = props;

  return (
    <Container className={className}>
      <ContentContainer>{children}</ContentContainer>

      <LinesContainer opacity={opacity}>
        {linesCount !== 0 ? (
          <>
            {Array.from(Array(linesCount)).map(() => (
              <DottedLine />
            ))}
            <LeftEdgeContainer>
              {Array.from(Array(linesCount)).map((v, i) =>
                i === 0 || i === linesCount - 1 ? <EdgeEnd /> : <EdgeMiddle />,
              )}
            </LeftEdgeContainer>
            <RightEdgeContainer>
              {Array.from(Array(linesCount)).map((v, i) =>
                i === 0 || i === linesCount - 1 ? <EdgeEnd /> : <EdgeMiddle />,
              )}
            </RightEdgeContainer>
          </>
        ) : (
          <>
            <LeftEdgeContainer>
              <EdgeEnd />
              <EdgeEnd />
            </LeftEdgeContainer>
            <RightEdgeContainer>
              <EdgeEnd />
              <EdgeEnd />
            </RightEdgeContainer>
          </>
        )}
      </LinesContainer>
    </Container>
  );
};

export default LinesBackground;

type Props = {
  linesCount?: number;
  opacity?: number;
  className?: string; // Required to apply styling via Styled-Components
};

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 20px;
`;

const ContentContainer = styled.div`
  position: relative;

  z-index: 2;
`;

const LinesContainer = styled.div<{ opacity: number }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;

  opacity: ${({ opacity }) => opacity};
  z-index: 1;
`;

const DottedLine = styled.div`
  height: 0;
  border-bottom: 2px dotted ${({ theme }) => theme.colors.layout.rHc};
  opacity: 0.3;
`;

const EdgeContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 15px;
`;

const RightEdgeContainer = styled(EdgeContainer)`
  left: 0;
  top: 0;
  right: auto;
  bottom: 0;

  align-items: flex-start;

  border-left: 2px solid ${({ theme }) => theme.colors.layout.rHc};
  border-right-style: none;
`;

const LeftEdgeContainer = styled(EdgeContainer)`
  left: auto;
  top: 0;
  right: 0;
  bottom: 0;

  align-items: flex-end;

  border-right: 2px solid ${({ theme }) => theme.colors.layout.rHc};
  border-left-style: none;
`;

const EdgeEnd = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.layout.rHc};
`;

const EdgeMiddle = styled.div`
  width: 40%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.layout.rHc};
`;
