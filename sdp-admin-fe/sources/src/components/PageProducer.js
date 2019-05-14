import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { Breadcrumb, Col, Row } from 'antd';

import FormCardProducer from '../containers/FormCardProducer';
import commonMessages from './commonMessages';

const PageProducer = ({ intl: { formatMessage }, produceMessage }) => (
  <Row>
    <Col span={24} className="pb--8">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <FormattedMessage {...commonMessages.pageProducer} />
        </Breadcrumb.Item>
      </Breadcrumb>
    </Col>
    <Col span={24}>
      <FormCardProducer onSubmit={values => produceMessage(
        values,
        formatMessage(commonMessages.badRequest),
        formatMessage(commonMessages.sendSuccess),
      )}
      />
    </Col>
  </Row>
);

PageProducer.propTypes = {
  intl: intlShape.isRequired,
  produceMessage: PropTypes.func.isRequired,
};

export default injectIntl(PageProducer);
