import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Breadcrumb, Col, Row } from 'antd';

import commonMessages from '../commonMessages';
import CardKafkaConnect from '../CardKafkaConnect/CardKafkaConnect';

const PageKafkaConnect = () => (
    <Row>
        <Col span={24} className="pb--8">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>
                    <FormattedMessage {...commonMessages.pageKafkaConnect} />
                </Breadcrumb.Item>
            </Breadcrumb>
        </Col>
        <Col span={24} className="mb--16">
            <CardKafkaConnect/>
        </Col>
    </Row>
);

export default PageKafkaConnect;