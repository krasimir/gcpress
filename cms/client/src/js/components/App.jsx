import React, { useEffect, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';

import { APP_NAME } from '../config';
import { Data } from '../data';

const { Header } = Layout;

const LOADING = 'LOADING';

const App = () => {
  const [ state, setState ] = useState(LOADING);

  useEffect(() => {
    Data.ensureData().then(() => {
      console.log('got it');
    });
  }, []);

  if (state === LOADING) {
    return (
      <div class="max300 mxauto ta p1 mt3">
        <Spin />
        <small class="block pt1">Loading. Please wait.</small>
      </div>
    )
  }
  
  return (
    <Layout>
      <Header className="header">
        <div class="logo">{APP_NAME}</div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['defaultPage']} items={[
          { key: 'models', label: 'Models' },
          { key: 'content', label: 'Content' }
        ]} />
      </Header>
      <Layout>
        
      </Layout>
    </Layout>
  );
};

export default App;