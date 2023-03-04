import React, { useState, useEffect, useReducer } from 'react';
import { Button, Card, Form, Input, Descriptions, Typography, Space, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import ModelField from './ModelField';
import { formatId } from './utils';
import {useAreYouSure} from './utils/AreYouSure';

const { Title, Text } = Typography;

function fieldsReducer(fields, { field, what }) {
  console.log(what);
  if (what === 'SAVE') {
    if (fields.find(f => f.id === field.id)) {
      fields = fields.map(f => {
        if (f.id === field.id) {
          return field;
        }
        return f;
      });
    } else {
      fields = [...fields, field];
    }
  } else if (what === 'DELETE') {
    fields = fields.filter(f => f.id !== field.id);
  }
  return fields;
}

export default function Models() {
  const [ id, setId ] = useState('');
  const [ fields, fieldsDispatch ] = useReducer(fieldsReducer, []);
  const [ isFieldModalOpen, setFieldModalVisibility ] = useState(true);
  const { AreYouSureUI, areYouSure } = useAreYouSure();

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      initialValues={{}}
      onFinish={() => console.log('finish')}
      onFinishFailed={() => console.log('finish failed')}
      autoComplete="off"
    >
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Title>New model</Title>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the model\'s name!' }]}
      >
        <Input onChange={e => {
          setId(formatId(e.target.value));
        }} />
      </Form.Item>

      <Form.Item label="ID">
        <Input disabled value={id}/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Space direction='vertical' size={'middle'} style={{ width: '100%' }}>
          { fields.length === 0 && <Text>You have no fields yet. Please add one.</Text> }
          { fields.map(field => {
              return (
                <Card title={field.name} style={{minWidth: '100%'}} size="small" extra={
                  <Space direction='horizontal'>
                    <Button icon={<EditOutlined />} type="text" onClick={() => {
                      
                    }} />
                    <Button icon={<DeleteOutlined />} type="text" onClick={() => {
                      areYouSure(
                        () => fieldsDispatch({ field, what: 'DELETE' }),
                        'You are about to delete a field. Are you sure?'
                      );
                    }} />
                  </Space>}>
                  <Descriptions>
                    <Descriptions.Item label="ID">{field.id}</Descriptions.Item>
                    <Descriptions.Item label="Type">{field.type}</Descriptions.Item>
                  </Descriptions>
                </Card>
              )
            })}
          <Button onClick={() => setFieldModalVisibility(true)}>New field</Button>
        </Space>
      </Form.Item>

      {
        fields.length > 0 && 
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit">
            Save model
          </Button>
        </Form.Item>
      }
      <Modal
        title="Adding a field"
        open={isFieldModalOpen}
        footer={null}
        closable={false}>
        <ModelField
          key={uid()}
          onCancel={() => setFieldModalVisibility(false)}
          onSave={(field) => {
            fieldsDispatch({ field, what: 'SAVE' });
            setFieldModalVisibility(false);
          }}/>
      </Modal>
      {AreYouSureUI}
    </Form>
  )
}

let u = 0;
function uid() {
  return u++;
}