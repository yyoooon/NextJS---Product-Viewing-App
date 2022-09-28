import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import { Layout } from '@/components';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 페이지 이동 시 전 페이지 경로 저장
  const storePath = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath || '');
    storage.setItem('currentPath', globalThis.location.pathname);
  };

  useEffect(() => storePath, [router.asPath]);

  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Background />
        <Content>
          <Layout>
            <Component {...pageProps} />
          </Layout>
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
