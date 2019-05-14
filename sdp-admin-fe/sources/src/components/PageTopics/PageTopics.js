import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Breadcrumb, Col, Row } from 'antd';

import CardTopicList from '../../containers/CardTopicList';
import commonMessages from '../commonMessages';

const PageTopics = () => (
  <Row>
    <Col span={24} className="pb--8">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <FormattedMessage {...commonMessages.pageTopics} />
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col span={24}>
      <CardTopicList />
    </Col>
  </Row>
);

export default PageTopics;
