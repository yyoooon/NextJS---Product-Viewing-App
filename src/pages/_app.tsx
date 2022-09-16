import type { AppProps } from 'next/app';
import styled from '@emotion/styled';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

import { RecoilRoot } from 'recoil';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Background />
        <Content>
          <Component {...pageProps} />
        </Content>
      </RecoilRoot>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
