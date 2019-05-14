import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Card, Col, Row } from 'antd';

import messages from './messages';
import commonMessages from '../commonMessages';
import { BROKER_SHAPE } from '../../constants/Shapes';

const CardKafkaInfo = ({
  brokers,
  intl: { formatMessage },
  topics,
}) => (
  <Card title={formatMessage(messages.title)}>
    <Row>
      <Col md={8}>
        <h3><FormattedMessage {...commonMessages.pageBrokers} /></h3>
        <span>{brokers.length}</span>
      </Col>
      <Col md={8}>
        <h3><FormattedMessage {...commonMessages.pageTopics} /></h3>
        <span>{topics.length}</span>
      </Col>
    </Row>
  </Card>
);

CardKafkaInfo.propTypes = {
  brokers: PropTypes.arrayOf(PropTypes.shape(BROKER_SHAPE)).isRequired,
  intl: intlShape.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default injectIntl(CardKafkaInfo);
