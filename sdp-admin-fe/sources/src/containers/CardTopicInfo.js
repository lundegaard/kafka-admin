import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import CardTopicInfo from '../components/CardTopicInfo';
import { getTopicInfo, getTopicInfoTabKey } from '../reducers';
import { onTabChangeTopicInfo } from '../actions';

export default connect(
  applySpec({
    topicInfo: getTopicInfo,
    tabKey: getTopicInfoTabKey,
  }),
  {
    onTabChange: onTabChangeTopicInfo,
  },
)(CardTopicInfo);
