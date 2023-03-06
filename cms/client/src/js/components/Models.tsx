import React, { useState } from 'react';
import { Empty, Button, Breadcrumb } from 'antd';

import { Data } from '../data';
import ModelsForm from './ModelsForm';
import { Model } from '../@types/types.d'

enum UI {
  LIST = 'LIST',
  NEW_MODEL = 'NEW_MODLE',
}

const EMPTY = {
  id: undefined,
  name: undefined,
  fields: undefined
}

export default function Models({ onSave }: { onSave: (model: Model) => void }) {
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
        <ModelsForm model={EMPTY} onSave={onSave}/>
      </div>
    );
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