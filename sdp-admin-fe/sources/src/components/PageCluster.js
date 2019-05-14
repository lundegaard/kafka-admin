import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Breadcrumb, Col, Row } from 'antd';

import CardKafkaInfo from '../containers/CardKafkaInfo';
import CardBrokers from '../containers/CardBrokers';
import commonMessages from './commonMessages';

const PageCluster = () => (
  <Row>
    <Col span={24} className="pb--8">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <FormattedMessage {...commonMessages.pageCluster} />
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col span={24} className="mb--16">
      <CardKafkaInfo />
    </Col>

    <Col span={24}>
      <CardBrokers />
    </Col>
  </Row>
);

export default PageCluster;
