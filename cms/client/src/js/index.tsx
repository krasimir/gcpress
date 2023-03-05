import React from 'react';
import { createRoot } from "react-dom/client";
import { ConfigProvider } from 'antd';

import { THEME_COLORS } from './config'
import App from './components/App';

const root = createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        ...THEME_COLORS
      }
    }}>
    <App />
  </ConfigProvider>
);