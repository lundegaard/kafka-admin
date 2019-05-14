import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import TabConfigs from '../components/CardTopicInfo/TabConfigs';
import {
  getTopicInfo,
  getTopicInfoConfigs,
  getTopicInfoEditingConfig,
  getTopicInfoFilterValue,
} from '../reducers';
import {
  callSetTopicConfig,
  resetConfigEditingTopicInfo,
  setConfigEditingTopicInfo,
  setConfigEditingValueTopicInfo,
  setConfigTopicFilterValue,
} from '../actions';

export default connect(
  applySpec({
    editingConfig: getTopicInfoEditingConfig,
    filterValue: getTopicInfoFilterValue,
    topicConfigs: getTopicInfoConfigs,
    topic: getTopicInfo,
  }),
  {
    resetEditing: resetConfigEditingTopicInfo,
    setConfig: callSetTopicConfig,
    setEditing: setConfigEditingTopicInfo,
    setEditingValue: setConfigEditingValueTopicInfo,
    setFilterValue: setConfigTopicFilterValue,
  },
)(TabConfigs);
