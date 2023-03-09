import React from 'react';
import { Row, Col, Menu } from 'antd';

import { Data } from '../data';

export default function Content() {
  const models = Data.models();

  return (
    <Row className="my2">
      <Col span={6}>
      <Menu
        theme="light"
        mode="vertical"
        defaultSelectedKeys={[ models[0].id ]} items={
          models.map(model => {
            return {
              key: model.id,
              label: model.name
            }
          })
        }
        onSelect={({ key }) => {
          console.log(key);          
        }} />
      </Col>
      <Col span={18}>b</Col>
    </Row>
  );
}