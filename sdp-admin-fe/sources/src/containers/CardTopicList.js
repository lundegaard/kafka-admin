import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import CardTopicList from '../components/CardTopicList';

import {
  callCreateTopic,
  callDeleteTopic,
  callGetTopicsInfo,
  formToggleVisibleCreateTopic,
  setTopicListFilterValue,
  toggleTopicListInternalTopicsVisible,
} from '../actions';
import {
  getIntervalDelay,
  getTopicListFilterValue,
  getTopicListInternalTopicsVisible,
  getTopics,
  getTopicsInfo,
} from '../reducers';

export default connect(
  applySpec({
    filterValue: getTopicListFilterValue,
    internalTopicsVisible: getTopicListInternalTopicsVisible,
    intervalDelay: getIntervalDelay,
    topics: getTopics,
    topicsInfo: getTopicsInfo,
  }),
  {
    callCreateTopic,
    callDeleteTopic,
    callGetTopicsInfo,
    formToggleVisibleCreateTopic,
    setFilterValue: setTopicListFilterValue,
    toggleTopicListInternalTopicsVisible,
  },
)(CardTopicList);
