import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Breadcrumb, Col, Row } from 'antd';

import CardConsumerGroups from '../../containers/CardConsumerGroups';
import commonMessages from '../commonMessages';

const PageStreams = () => (
  <Row>
    <Col span={24} className="pb--8">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <FormattedMessage {...commonMessages.pageStreams} />
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col span={24} className="mb--16">
      <CardConsumerGroups />
    </Col>
  </Row>
);

export default PageStreams;
