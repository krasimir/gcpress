import React from 'react';
import { Empty, Button } from 'antd';

import { Data } from '../data';

export default function Models() {
  if (Data.models().length === 0) {
    return (
      <div class="mt3">
        <Empty description="You have no models yet. Create one by clicking the button below." />
        <div class="max200 mxauto mt3">
          <Button type="primary" block>Create new model</Button>
        </div>
      </div>
    )
  }
  return 'a';
}