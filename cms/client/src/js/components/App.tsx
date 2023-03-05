import React, { useEffect, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';

import { APP_NAME } from '../config';
import { Data } from '../data';
import Models from './Models';

const { Header, Content } = Layout;

const LOADING = 'LOADING';
const NO_MODELS = 'NO_MODELS';
const READY = 'READY';

const App = () => {
  const [ state, setState ] = useState(LOADING);

  useEffect(() => {
    Data.getData().then(() => {
      if (Data.models().length === 0) {
        setState(NO_MODELS);
      }
    });
  }, []);

  if (state === LOADING) {
    return (
      <div className="max300 mxauto ta p1 mt3">
        <Spin />
        <small className="block pt1">Loading. Please wait.</small>
      </div>
    )
  }

  let content = <span></span>;

  if (state === NO_MODELS) {
    content = <Models />;
  }
  
  return (
    <Layout>
      <Header className="header">
        <div className="logo mx1">{APP_NAME}</div>
        {state === READY && <Menu theme="light" mode="horizontal" defaultSelectedKeys={['defaultPage']} items={[
          { key: 'models', label: 'Models' },
          { key: 'content', label: 'Content' }
        ]} />}
      </Header>
      <Layout>
        <Content>{content}</Content>
      </Layout>
    </Layout>
  );
};

export default App;