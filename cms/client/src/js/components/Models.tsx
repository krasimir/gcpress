import React, { useState } from 'react';
import { Empty, Button, Breadcrumb } from 'antd';

import { Data } from '../data';
import ModelsForm from './ModelsForm';

enum UI {
  LIST = 'LIST',
  LOADING = 'LOADING',
  NEW_MODEL = 'NEW_MODLE',
}

const EMPTY = {
  id: undefined,
  name: undefined,
  fields: undefined
}

export default function Models() {
  const [ state, setState ] = useState<UI>(UI.LIST);

  if (state === UI.NEW_MODEL) {
    return (
      <div className="mt1 px1">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="javascript:void(0);" onClick={() => setState(UI.LIST)}>All models</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Creating a new model
          </Breadcrumb.Item>
        </Breadcrumb>
        <ModelsForm model={EMPTY} onSave={(model) => {
          setState(UI.LOADING)
          Data.saveModel(model).then(() => {
            setState(UI.LIST);
          });
        }}/>
      </div>
    );
  }

  if (state === UI.LOADING) {
    return 
  }

  if (Data.models().length === 0) {
    return (
      <div className="mt3">
        <Empty description="You have no models yet. Create one by clicking the button below." />
        <div className="max200 mxauto mt3">
          <Button type="primary" block onClick={() => setState(UI.NEW_MODEL)}>Create new model</Button>
        </div>
      </div>
    )
  }
  return <span>a</span>;
}