import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { o, path } from 'ramda';

import ui, * as fromUi from './ui';
import entities, * as fromEntities from './entities';

export { uiReducers } from './ui';
export { entitiesReducers } from './entities';

const rootReducer = combineReducers({
  ui,
  entities,
  form: formReducer,
});

export default rootReducer;

const getUi = path(['ui']);
const getEntities = path(['entities']);

export const getBroker = o(fromUi.getBroker, getUi);
export const getBrokerId = o(fromUi.getBrokerId, getUi);
export const getBrokerTabKey = o(fromUi.getBrokerTabKey, getUi);
export const getBrokerFilterValue = o(fromUi.getBrokerFilterValue, getUi);
export const getVersion = o(fromUi.getVersion, getUi);
export const getLocale = o(fromUi.getLocale, getUi);
export const getFormVisibleCreateTopic = o(fromUi.getFormVisibleCreateTopic, getUi);

export const getCollapsedMenu = o(fromUi.getCollapsedMenu, getUi);

export const getWaitingTopic = o(fromUi.getWaitingTopic, getUi);
export const getTopicListFilterValue = o(fromUi.getTopicListFilterValue, getUi);
export const getTopicListInternalTopicsVisible = o(
  fromUi.getTopicListInternalTopicsVisible, getUi,
);
export const getTopicInfo = o(fromUi.getTopicInfo, getUi);
export const getTopicInfoEditingConfig = o(fromUi.getTopicInfoEditingConfig, getUi);
export const getTopicInfoFilterValue = o(fromUi.getTopicInfoFilterValue, getUi);
export const getTopicInfoConfigs = o(fromUi.getTopicInfoConfigs, getUi);
export const getTopicInfoTabKey = o(fromUi.getTopicInfoTabKey, getUi);
export const getTopicInfoOffset = o(fromUi.getTopicInfoOffset, getUi);
export const getTopicInfoPartition = o(fromUi.getTopicInfoPartition, getUi);
export const getTopicInfoNumber = o(fromUi.getTopicInfoNumber, getUi);
export const getTopicInfoMessages = o(fromUi.getTopicInfoMessages, getUi);
export const getTopicInfoMessagesFetching = o(fromUi.getTopicInfoMessagesFetching, getUi);
export const getIntervalDelay = o(fromUi.getIntervalDelay, getUi);

export const getTopics = o(fromEntities.getTopics, getEntities);
export const getTopicsInfo = o(fromEntities.getTopicsInfo, getEntities);
export const getBrokers = o(fromEntities.getBrokers, getEntities);
export const getConsumerGroups = o(fromEntities.getConsumerGroups, getEntities);
