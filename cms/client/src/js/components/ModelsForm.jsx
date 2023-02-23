import React, { useState, useEffect, useReducer } from 'react';
import { Button, Breadcrumb, Form, Input, Checkbox, Typography, Space, Modal } from 'antd';

import ModelField from './ModelField';
import { formatId } from './utils';

const { Title, Text } = Typography;

function fieldsReducer(state, action) {
  console.log(state, action);
  return state;
}

export default function Models() {
  const [ id, setId ] = useState('');
  const [ fields, fieldsDispatch ] = useReducer(fieldsReducer, []);
  const [ isFieldModalOpen, setFieldModalVisibility ] = useState(true);

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
        <Space direction='vertical' size={'middle'}>
          {fields.length === 0 && <Text>You have no fields yet. Please add one.</Text>}
          <Button onClick={() => setFieldModalVisibility(true)}>New field</Button>
        </Space>
      </Form.Item>

      {
        fields.length > 0 && 
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit">
            Submit
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
            fieldsDispatch(field);
            setFieldModalVisibility(false);
          }}/>
      </Modal>
    </Form>
  )
}

let u = 0;
function uid() {
  return u++;
}