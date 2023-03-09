import React, { useState, useReducer } from 'react';
import { Empty, Button, Breadcrumb, List, Row, Col, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Data } from '../data';
import ModelsForm from './ModelsForm';
import { Model } from '../@types/types.d'
import { useAreYouSure } from './utils/AreYouSure';

enum UI {
  LIST = 'LIST',
  NEW_MODEL = 'NEW_MODLE',
}

const EMPTY = {
  id: undefined,
  name: undefined,
  fields: undefined
}

export default function Models({ onSave, onDelete }: {
  onSave: (model: Model) => void
  onDelete: (model: Model) => void
}) {
  const [ state, setState ] = useState<UI>(UI.LIST);
  const { AreYouSureUI, areYouSure } = useAreYouSure();
  

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

  return (
    <>
      <List
        className='mt1'
        size="large"
        bordered
        dataSource={Data.models()}
        renderItem={(item: Model) => (
          <List.Item>
            <Row className="w100p">
              <Col span={18}><strong>{item.name}</strong></Col>
              <Col span={6}>
                <Space direction='horizontal' className="right">
                  <Button icon={<EditOutlined />} type="text" onClick={() => {
                    
                  }} />
                  <Button icon={<DeleteOutlined />} type="text" onClick={() => {
                    areYouSure(
                      () => onDelete(item),
                      `You are about to delete a model "${item.name}". Are you sure?`
                    );
                  }} />
                </Space>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      {AreYouSureUI}
    </>
  );
}