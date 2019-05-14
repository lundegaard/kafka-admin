import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import {
  Col, Layout, Row, Select, Tooltip,
} from 'antd';

import messages from './messages';
import LabelSelect from './LabelSelect';
import { MOUSE_ENTER_DELAY, REFRESH_OPTIONS } from '../../constants';
import './styles.less';

const HeaderComponent = ({
  intervalDelay,
  intl: { formatMessage },
  setIntervalDelay,
}) => (
  <Layout.Header className="header color--white">
    <Row>
      <Col span={4} />
      <Col span={16}>
        <h1 className="text--nowrap"><FormattedMessage {...messages.text} /></h1>
      </Col>
      <Col span={4} className="text--right pr--40">
        <Tooltip
          title={formatMessage(messages.refreshInterval)}
          mouseEnterDelay={MOUSE_ENTER_DELAY}
          placement="left"
        >
          <Select
            className="header-refresh-select"
            onChange={value => setIntervalDelay(value.key)}
            value={{
              key: intervalDelay,
              label: <LabelSelect value={intervalDelay} />,
            }}
            showArrow={false}
            labelInValue
          >
            {
              REFRESH_OPTIONS.map(option => (
                <Select.Option
                  key={option.value}
                  value={option.value}
                >
                  {option.name}
                </Select.Option>
              ))
            }
          </Select>
        </Tooltip>
      </Col>
    </Row>
  </Layout.Header>
);

HeaderComponent.propTypes = {
  intervalDelay: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
  setIntervalDelay: PropTypes.func.isRequired,
};

export default injectIntl(HeaderComponent);
