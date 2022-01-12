import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../../theme/useTheme';

const LinesBackground: React.FC<Props> = (props) => {
  const theme = useTheme();
  const {
    linesCount = 10,
    opacity = 1,
    color = theme.colors.layout.rHc2,
    className,
    children,
  } = props;

  return (
    <Container className={className}>
      <ContentContainer>{children}</ContentContainer>

      <LinesContainer opacity={opacity}>
        {linesCount !== 0 ? (
          <>
            {Array.from(Array(linesCount)).map((v, i) => (
              <DottedLine key={i} />
            ))}
            <LeftEdgeContainer color={color}>
              {Array.from(Array(linesCount)).map((v, i) =>
                i === 0 || i === linesCount - 1 ? (
                  <EdgeEnd key={i} color={color} />
                ) : (
                  <EdgeMiddle key={i} color={color} />
                ),
              )}
            </LeftEdgeContainer>
            <RightEdgeContainer color={color}>
              {Array.from(Array(linesCount)).map((v, i) =>
                i === 0 || i === linesCount - 1 ? (
                  <EdgeEnd key={i} color={color} />
                ) : (
                  <EdgeMiddle key={i} color={color} />
                ),
              )}
            </RightEdgeContainer>
          </>
        ) : (
          <>
            <LeftEdgeContainer color={color}>
              <EdgeEnd color={color} />
              <EdgeEnd color={color} />
            </LeftEdgeContainer>
            <RightEdgeContainer color={color}>
              <EdgeEnd color={color} />
              <EdgeEnd color={color} />
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
  color?: string;
  className?: string; // Required to apply styling via Styled-Components
};

const Container = styled.div`
  display: table; // https://stackoverflow.com/questions/12708381/display-block-without-100-width
  position: relative;

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

const RightEdgeContainer = styled(EdgeContainer)<{ color: string }>`
  left: 0;
  top: 0;
  right: auto;
  bottom: 0;

  align-items: flex-start;

  border-left: 2px solid ${({ color }) => color};
  border-right-style: none;
`;

const LeftEdgeContainer = styled(EdgeContainer)<{ color: string }>`
  left: auto;
  top: 0;
  right: 0;
  bottom: 0;

  align-items: flex-end;

  border-right: 2px solid ${({ color }) => color};
  border-left-style: none;
`;

const EdgeEnd = styled.div<{ color: string }>`
  width: 100%;
  height: 2px;
  background-color: ${({ color }) => color};
`;

const EdgeMiddle = styled.div<{ color: string }>`
  width: 40%;
  height: 2px;
  background-color: ${({ color }) => color};
`;
