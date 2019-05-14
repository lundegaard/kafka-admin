import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Card } from 'antd';

import { TAB_KEYS } from '../../constants';
import TabMessages from '../../containers/TabMessages';
import TabConfigs from '../../containers/TopicTabConfigs';
import { TOPIC_INFO_SHAPE } from '../../constants/Shapes';
import { JSONFormattedInput } from '../../utils';
import Editor from '../Editor';
import messages from './messages';

const topicInfoTabList = (formatMessage) => [
  {
    key: TAB_KEYS.TAB1,
    tab: formatMessage(messages.tabMessages),
  },
  {
    key: TAB_KEYS.TAB2,
    tab: formatMessage(messages.tabInfo),
  },
  {
    key: TAB_KEYS.TAB3,
    tab: formatMessage(messages.tabConfigs),
  },
];

const contentList = (topicInfo) => ({
  [TAB_KEYS.TAB1]: <TabMessages topicInfo={topicInfo} />,
  [TAB_KEYS.TAB2]: <Editor
    mode="json"
    theme="github"
    name="TopicInfo"
    readOnly
    showGutter={false}
    value={JSONFormattedInput(topicInfo)}
  />,
  [TAB_KEYS.TAB3]: <TabConfigs />,
});

const CardTopicInfo = ({
  className,
  intl: { formatMessage },
  onTabChange,
  tabKey,
  topicInfo,
}) => (
  <Card
    className={className}
    onTabChange={onTabChange}
    tabList={topicInfoTabList(formatMessage)}
  >
    {contentList(topicInfo)[tabKey]}
  </Card>
);

CardTopicInfo.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabKey: PropTypes.string.isRequired,
  topicInfo: PropTypes.shape(TOPIC_INFO_SHAPE).isRequired,
};

CardTopicInfo.defaultProps = {
  className: null,
};

export default injectIntl(CardTopicInfo);
