import React, { useState, useEffect, useReducer } from 'react';
import { Button, Card, Form, Input, Descriptions, Typography, Space, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import ModelField, { formatFieldType } from './ModelField';
import { formatId } from './utils';
import { useAreYouSure } from './utils/AreYouSure';
import { Field, Model } from '../@types/types.d'

const { Title, Text } = Typography;

function fieldsReducer(fields, { field, what }) {
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

type ModelsFormProps = {
  model: Model,
  onSave: (model: Model) => void,
  editing: boolean
}

export default function ModelsForm({ model, onSave, editing }: ModelsFormProps) {
  const [ id, setId ] = useState(model.id || '');
  const [ name, setName ] = useState(model.name || '');
  const [ fields, fieldsDispatch ] = useReducer<Field[]>(fieldsReducer, model.fields || []);
  const [ currentField, setCurrentField ] = useState(null);
  const { AreYouSureUI, areYouSure } = useAreYouSure();

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      initialValues={{}}
      onFinish={() => {
        onSave({ name, id, fields });
      }}
      onFinishFailed={() => {}}
      autoComplete="off"
    >
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Title>{editing ? `Model: ${name}` : 'New model'}</Title>
      </Form.Item>

      <Form.Item label="Name" name="name">
        <Input defaultValue={name} onChange={e => {
          if (!editing) {
            setId(formatId(e.target.value));
          }
          setName(e.target.value);
        }} />
      </Form.Item>

      <Form.Item label="ID">
        <Input disabled value={id}/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Space direction='vertical' size={'middle'} className="w100p">
          { fields.length === 0 && <Text>You have no fields yet. Please add one.</Text> }
          { fields.map(field => {
              return (
                <Card title={field.name} style={{minWidth: '100%'}} size="small" extra={
                  <Space direction='horizontal'>
                    <Button icon={<EditOutlined />} type="text" onClick={() => {
                      setCurrentField(field)
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
                    <Descriptions.Item label="Type">{formatFieldType(field.type)}</Descriptions.Item>
                  </Descriptions>
                </Card>
              )
            })}
          <Button onClick={() => setCurrentField({})}>New field</Button>
        </Space>
      </Form.Item>

      {
        fields.length > 0 &&
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" disabled={ name === ''}>
            Save model
          </Button>
        </Form.Item>
      }
      <Modal
        title="Adding a field"
        open={!!currentField}
        footer={null}
        closable={false}>
        <ModelField
          key={uid()}
          field={currentField}
          onCancel={() => setCurrentField(null)}
          onSave={(field) => {
            fieldsDispatch({ field, what: 'SAVE' });
            setCurrentField(false);
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