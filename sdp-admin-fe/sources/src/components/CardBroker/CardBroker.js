import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Card } from 'antd';

import { TAB_KEYS } from '../../constants';
import TabConfigs from '../../containers/BrokerTabConfigs';
import messages from './messages';

const brokerTabList = formatMessage => [
  {
    key: TAB_KEYS.TAB1,
    tab: formatMessage(messages.tabConfigs),
  },
];

const contentList = () => ({
  [TAB_KEYS.TAB1]: <TabConfigs />,
});

const CardBroker = ({
  className,
  intl: { formatMessage },
  tabKey,
}) => (
  <Card
    className={className}
    tabList={brokerTabList(formatMessage)}
  >
    {contentList()[tabKey]}
  </Card>
);

CardBroker.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
  tabKey: PropTypes.string.isRequired,
};

CardBroker.defaultProps = {
  className: null,
};

export default injectIntl(CardBroker);
