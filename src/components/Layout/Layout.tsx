import React from 'react';
import { Header } from '@/components';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Layout;
