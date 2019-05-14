import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Breadcrumb, Col, Row } from 'antd';

import CardBroker from '../../containers/CardBroker';
import Link from '../../containers/Link';
import { url } from '../../constants';
import commonMessages from '../commonMessages';

const PageBroker = ({ brokerId }) => (
  <Row>
    <Col span={24} className="pb--8">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to={url.CLUSTER}>
            <FormattedMessage {...commonMessages.pageCluster} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FormattedMessage {...commonMessages.pageBroker} />
          {`[${brokerId}]`}
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col span={24}>
      <CardBroker />
    </Col>
  </Row>
);

PageBroker.propTypes = {
  brokerId: PropTypes.number.isRequired,
};

export default PageBroker;
