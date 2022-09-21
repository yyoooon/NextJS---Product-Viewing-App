import styled from '@emotion/styled';
import { ReactNode } from 'react';

type MessageContainerProps = {
  children: ReactNode;
};

const MessageContainer = ({ children }: MessageContainerProps) => (
  <Container>
    <Text>{children}</Text>
  </Container>
);

export default MessageContainer;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Text = styled.span`
  font-size: 18px;
`;
