import React, { useState, useEffect } from 'react';
import { Empty, Button, Breadcrumb, Form, Input, Checkbox } from 'antd';

import { Data } from '../data';

const LIST = 'LIST';
const NEW_MODEL = 'NEW_MODLE';

export default function Models() {
  const [ state, setState ] = useState(LIST);

  if (state === NEW_MODEL) {
    return (
      <div class="mt1 px1">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="javascript:void(0);" onClick={() => setState(LIST)}>Models</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            New model
          </Breadcrumb.Item>
        </Breadcrumb>
        <div class="">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={() => console.log('finish')}
            onFinishFailed={() => console.log('finish failed')}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
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