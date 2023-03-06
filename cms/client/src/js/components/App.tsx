import React, { useEffect, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';

import { APP_NAME } from '../config';
import { Data } from '../data';
import Models from './Models';

const { Header, Content } = Layout;

enum UI {
  LOADING = 'LOADING',
  READY = 'READY',
}
enum MAIN_NAV {
  MODELS = 'models',
  CONTENT = 'content'
}

const App = () => {
  const [ state, setState ] = useState(UI.LOADING);
  const [ mainNav, setMainNav ] = useState(MAIN_NAV.MODELS);

  useEffect(() => {
    Data.getData().then(() => {
      setState(UI.READY);
    });
  }, []);

  if (state === UI.LOADING) {
    return (
      <div className="max300 mxauto ta p1 mt3">
        <Spin />
        <small className="block pt1">Loading. Please wait.</small>
      </div>
    )
  }

  let content;

  if (Data.models().length === 0) {
    content = <Models onSave={(model) => {
      setState(UI.LOADING);
      Data.saveModel(model).then(() => {
        setState(UI.READY);
      });
    }}/>;
  } else {
    content = <span>list</span>;
  }
  
  return (
    <Layout>
      <Header className="header">
        <div className="logo mx1">{APP_NAME}</div>
        {Data.models().length > 0 &&
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={[ mainNav ]} items={[
            { key: MAIN_NAV.MODELS, label: 'Models' },
            { key: MAIN_NAV.CONTENT, label: 'Content' }
          ]} />
        }
      </Header>
      <Layout>
        <Content>{content}</Content>
      </Layout>
    </Layout>
  );
};

export default App;