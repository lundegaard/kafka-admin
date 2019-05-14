import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Layout, Row, Col } from 'antd';

import messages from './messages';

const FooterComponent = ({ version }) => (
  <Layout.Footer className="footer">
    <Row type="flex" justify="center">
      <Col span={8} />
      <Col span={8}>
        <h4><FormattedMessage {...messages.text} /></h4>
      </Col>
      <Col span={8} className="text--right">
        <h4>{`v${version}`}</h4>
      </Col>
    </Row>
  </Layout.Footer>
);


FooterComponent.propTypes = {
  version: PropTypes.string.isRequired,
};

export default FooterComponent;
