import React, { useState, useEffect, useReducer } from 'react';
import { Button, Breadcrumb, Form, Input, Checkbox, Typography, Space, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { formatId } from './utils';
import { FIELD_TYPES } from '../config';

const DEFAULT_TYPE = FIELD_TYPES.ONE_OF_MANY;

const { Text } = Typography;

function optionsReducer(state, action) {
  if (action.what === 'ADD') {
    state = [...state, action.value]
  } else if (action.what === 'DELETE') {
    state = state.filter(v => v !== action.value);
  }
  return state;
}

export default function ModelField({ onCancel, onSave }) {
  const [ name, setName ] = useState('');
  const [ id, setId ] = useState('');
  const [ type, setType ] = useState(DEFAULT_TYPE);
  const [ options, optionsDispatch ] = useReducer(optionsReducer, []);
  const [ fieldOptionValue, setFieldOptionValue ] = useState('');

  let hasOptions = type === FIELD_TYPES.ONE_OF_MANY || type === FIELD_TYPES.MANY_OF_MANY;

  let enableSave = true;
  if (id === '') {
    enableSave = false;
  } else {
    if (type === hasOptions) {
      enableSave = options.length > 0;
    }
  }  

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ marginTop: '2em' }}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the field\'s name!' }]}
      >
        <Input onChange={e => {
          setName(e.target.value);
          setId(formatId(e.target.value));
        }} onPressEnter={(e) => e.preventDefault()}/>
      </Form.Item>

      <Form.Item label="ID">
        <Input disabled value={id}/>
      </Form.Item>
      
      <Form.Item label="Type">
        <Select
          defaultValue={DEFAULT_TYPE}
          onChange={(t) => setType(t)}
          options={
            Object.keys(FIELD_TYPES).map(key => {
              return { value: FIELD_TYPES[key], label: formatFieldType(key) }
            })
          }
        />
      </Form.Item>

      {hasOptions && 
        <Form.Item label="Options">
          {options.length > 0 && <div><Space direction='vertical' style={{ marginBottom: '1em' }}>
            { options.map(option => {
              return (
                <Space direction='horizontal'>
                  <Text>{option}</Text>
                  <Button shape='text' icon={<DeleteOutlined />} onClick={() => {
                    optionsDispatch({ what: 'DELETE', value: option });
                  }}/>
                </Space>
              )
            })}
          </Space></div>}
          <Space direction='horizontal'>
            <Input placeholder='name'
              onChange={(e) => setFieldOptionValue(e.target.value)}
              value={fieldOptionValue}
              onPressEnter={(e) => {
                e.preventDefault();
                setFieldOptionValue('');
                optionsDispatch({ what: 'ADD', value: fieldOptionValue });
              }}/>
            <Button shape='circle' icon={<PlusOutlined />}
              disabled={fieldOptionValue === ''}
              onClick={() => {
                setFieldOptionValue('');
                optionsDispatch({ what: 'ADD', value: fieldOptionValue });
              }}/>
          </Space>
        </Form.Item>
      }

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Space direction='horizontal' size='small'>
          <Button type="primary" htmlType="submit" disabled={!enableSave}
            onClick={() => {
              const result = Object.assign({
                name,
                id,
                type,
              }, hasOptions && { options })
              onSave(result)
            }}>
            Save
          </Button>
          <Button htmlType="submit" onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

function formatFieldType(type) {
  let str = type.toLowerCase().split('_').join(' ');
  return str.charAt(0).toUpperCase() + str.slice(1);
}