import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import TabMessages from '../components/CardTopicInfo/TabMessages';
import {
  getTopicInfoMessages,
  getTopicInfoMessagesFetching,
  getTopicInfoNumber,
  getTopicInfoOffset,
  getTopicInfoPartition,
} from '../reducers';
import { callGetTopicMessages, refreshMessages, setOffsetTopicInfo, setPartitionTopicInfo } from '../actions';

export default connect(
  applySpec({
    messagesFetching: getTopicInfoMessagesFetching,
    number: getTopicInfoNumber,
    offset: getTopicInfoOffset,
    partition: getTopicInfoPartition,
    topicMessages: getTopicInfoMessages,
  }),
  {
    getTopicMessages: callGetTopicMessages,
    refreshMessages,
    setOffset: setOffsetTopicInfo,
    setPartition: setPartitionTopicInfo,
  },
)(TabMessages);
