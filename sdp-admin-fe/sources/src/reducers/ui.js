import { combineReducers } from 'redux';
import { path } from 'ramda';

import ActionTypes from '../constants/actionTypes';
import {
  TAB_KEYS,
  DEFAULT_INTERVALS_DELAY,
  DEFAULT_TOPIC_INFO_MESSAGES_NUMBER,
} from '../constants';
import {
  getFirstPartitionFromTopicInfo,
  getLastMessagesOffsetFromTopicInfo,
  sortTopicMessages,
  sortTopicPartitions,
} from '../utils';

const initLocale = {
  locale: 'en',
};

const initForms = {
  visibleCreateTopic: false,
};

const initTopicList = {
  filterValue: '',
  internalTopicsVisible: false,
};

const initTopicInfo = {
  editingConfig: {
    editingKey: null,
    editingValue: null,
  },
  filterValue: '',
  waitingTopic: null,
  topic: {
    name: null,
    partitions: [],
    configs: [],
  },
  tabKey: TAB_KEYS.TAB1,
  messages: [],
  messagesFetching: false,
  offset: 0,
  partition: 0,
  number: DEFAULT_TOPIC_INFO_MESSAGES_NUMBER,
};

const initBroker = {
  data: {
    id: null,
    configs: [],
  },
  filterValue: '',
  tabKey: TAB_KEYS.TAB1,
};

const broker = (state = initBroker, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_BROKER:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.SET_CONFIG_BROKER_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload,
      };
    default:
      return state;
  }
};

const version = (state = '', action) => {
  if (action.type === ActionTypes.SET_VERSION) {
    return path(['payload'])(action);
  }
  return state;
};

const locale = (state = initLocale) => (state);

const collapsedMenu = (state = false, action) => {
  if (action.type === ActionTypes.MENU_TOGGLE) {
    return !state;
  }
  return state;
};

const forms = (state = initForms, action) => {
  switch (action.type) {
    case ActionTypes.FORM_TOGGLE_VISIBLE_CREATE_TOPIC:
      return {
        ...state,
        visibleCreateTopic: !state.visibleCreateTopic,
      };
    default:
      return state;
  }
};

const topicList = (state = initTopicList, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOPIC_LIST_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload,
      };
    case ActionTypes.TOGGLE_TOPIC_LIST_INTERNAL_TOPICS_VISIBLE:
      return {
        ...state,
        internalTopicsVisible: !state.internalTopicsVisible,
      };
    default:
      return state;
  }
};

const topicInfo = (state = initTopicInfo, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_WAITING_TOPIC:
      return {
        ...state,
        waitingTopic: action.payload,
      };
    case ActionTypes.SHOW_TOPIC_INFO: {
      const topic = action.payload;
      topic.partitions = sortTopicPartitions(topic);
      return {
        ...initTopicInfo,
        topic,
        messages: state.messages,
        partition: getFirstPartitionFromTopicInfo(topic),
        offset: getLastMessagesOffsetFromTopicInfo(topic, getFirstPartitionFromTopicInfo(topic)),
      };
    }
    case ActionTypes.TAB_CHANGE_TOPIC_INFO:
      return {
        ...state,
        tabKey: action.payload,
      };
    case ActionTypes.RESET_CONFIG_EDITING_TOPIC_INFO:
      return {
        ...state,
        editingConfig: initTopicInfo.editingConfig,
      };
    case ActionTypes.SET_CONFIG_EDITING_TOPIC_INFO:
      return {
        ...state,
        editingConfig: action.payload,
      };
    case ActionTypes.SET_CONFIG_EDITING_VALUE_TOPIC_INFO:
      return {
        ...state,
        editingConfig: { ...state.editingConfig, editingValue: action.payload },
      };
    case ActionTypes.SET_CONFIG_TOPIC_INFO_SUCCESS:
      return {
        ...state,
        editingConfig: initTopicInfo.editingConfig,
        topic: { ...state.topic, configs: action.payload.configs },
      };
    case ActionTypes.SET_CONFIG_TOPIC_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload,
      };
    case ActionTypes.SET_PARTITION_TOPIC_INFO:
      return {
        ...state,
        offset: getLastMessagesOffsetFromTopicInfo(state.topic, action.payload),
        partition: action.payload,
      };
    case ActionTypes.SET_NUMBER_TOPIC_INFO:
      return {
        ...state,
        number: action.payload,
      };
    case ActionTypes.SET_OFFSET_TOPIC_INFO:
      return {
        ...state,
        offset: action.payload,
      };
    case ActionTypes.GET_TOPIC_MESSAGES_REQUEST:
      return {
        ...state,
        messagesFetching: true,
      };
    case ActionTypes.GET_TOPIC_MESSAGES_SUCCESS:
      return {
        ...state,
        messagesFetching: false,
        messages: sortTopicMessages(action.payload),
      };
    case ActionTypes.GET_TOPIC_MESSAGES_FAILURE:
      return {
        ...state,
        messagesFetching: false,
        messages: initTopicInfo.messages,
      };
    case ActionTypes.RESET_TOPIC_INFO:
      return {
        ...initTopicInfo,
        tabKey: state.tabKey,
      };
    default:
      return state;
  }
};

const intervalDelay = (state = DEFAULT_INTERVALS_DELAY, action) => {
  switch (action.type) {
    case ActionTypes.SET_INTERVAL_DELAY:
      return action.payload;
    default:
      return state;
  }
};

export const uiReducers = {
  broker,
  collapsedMenu,
  forms,
  intervalDelay,
  locale,
  topicInfo,
  topicList,
  version,
};

const rootReducer = combineReducers(uiReducers);

export default rootReducer;

export const getBroker = path(['broker', 'data']);
export const getBrokerId = path(['broker', 'data', 'id']);
export const getBrokerTabKey = path(['broker', 'tabKey']);
export const getBrokerFilterValue = path(['broker', 'filterValue']);
export const getVersion = path(['version']);
export const getCollapsedMenu = path(['collapsedMenu']);
export const getFormVisibleCreateTopic = path(['forms', 'visibleCreateTopic']);
export const getLocale = path(['locale', 'locale']);
export const getWaitingTopic = path(['topicInfo', 'waitingTopic']);
export const getTopicListFilterValue = path(['topicList', 'filterValue']);
export const getTopicListInternalTopicsVisible = path(['topicList', 'internalTopicsVisible']);
export const getTopicInfo = path(['topicInfo', 'topic']);
export const getTopicInfoEditingConfig = path(['topicInfo', 'editingConfig']);
export const getTopicInfoFilterValue = path(['topicInfo', 'filterValue']);
export const getTopicInfoConfigs = path(['topicInfo', 'topic', 'configs']);
export const getTopicInfoTabKey = path(['topicInfo', 'tabKey']);
export const getTopicInfoOffset = path(['topicInfo', 'offset']);
export const getTopicInfoPartition = path(['topicInfo', 'partition']);
export const getTopicInfoNumber = path(['topicInfo', 'number']);
export const getTopicInfoMessages = path(['topicInfo', 'messages']);
export const getTopicInfoMessagesFetching = path(['topicInfo', 'messagesFetching']);
export const getIntervalDelay = path(['intervalDelay']);
