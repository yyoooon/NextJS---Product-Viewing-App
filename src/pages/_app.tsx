import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import { Layout } from '@/components';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

setupMSW();
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath || '');
    storage.setItem('currentPath', globalThis.location.pathname);
  };

  useEffect(() => storePathValues, [router.asPath]);
  // 새로 고침 때에는 렌더링이 다 되고 경로가 바뀐다

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Background />
          <Content>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Content>
        </QueryClientProvider>
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
