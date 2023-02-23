import React, { useState } from 'react';
import { Empty, Button, Breadcrumb } from 'antd';

import { Data } from '../data';
import ModelsForm from './ModelsForm';

const LIST = 'LIST';
const NEW_MODEL = 'NEW_MODLE';

export default function Models() {
  const [ state, setState ] = useState(NEW_MODEL);

  if (state === NEW_MODEL) {
    return (
      <div class="mt1 px1">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="javascript:void(0);" onClick={() => setState(LIST)}>All models</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Creating a new model
          </Breadcrumb.Item>
        </Breadcrumb>
        <ModelsForm />
      </div>
    );
  }

  if (Data.models().length === 0) {
    return (
      <div class="mt3">
        <Empty description="You have no models yet. Create one by clicking the button below." />
        <div class="max200 mxauto mt3">
          <Button type="primary" block onClick={() => setState(NEW_MODEL)}>Create new model</Button>
        </div>
      </div>
    )
  }
  return 'a';
}