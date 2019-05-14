import { combineReducers } from 'redux';
import {
  defaultTo,
  equals,
  path,
  propEq,
  reject,
  useWith,
} from 'ramda';
import ActionTypes from '../constants/actionTypes';
import { mapNames } from '../utils';

const initialStateTopics = {
  names: [],
  info: [],
};

const initialStateBrokers = {
  list: [],
};

const removeTopicByName = useWith(reject, [equals]);

const removeTopicInfoByName = useWith(reject, [propEq('name')]);

const topics = (state = initialStateTopics, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_TOPIC_SUCCESS: {
      return {
        ...state,
        names: removeTopicByName(action.payload, state.names),
        info: removeTopicInfoByName(action.payload, state.info),
      };
    }
    case ActionTypes.GET_TOPICS_INFO_SUCCESS: {
      if (typeof action.payload === 'undefined') {
        return state;
      }
      return {
        ...state,
        names: mapNames(action.payload),
        info: action.payload,
      };
    }
    case ActionTypes.GET_TOPIC_INFO_SUCCESS: {
      if (typeof action.payload === 'undefined') return state;
      const topicIndex = state.info.findIndex(e => e.name === action.payload.name);
      if (topicIndex < 0) {
        return {
          ...state,
          info: [...state.info, action.payload],
        };
      }
      return {
        ...state,
        info: state.info.map((e, i) => {
          if (i !== topicIndex) { return e; }
          return action.payload;
        }),
      };
    }
    case ActionTypes.SET_CONFIG_TOPIC_INFO_SUCCESS: {
      const topicIndex = state.info.findIndex(e => e.name === action.payload.name);
      return topicIndex < 0 ? state : {
        ...state,
        info: state.info.map((e, i) => {
          if (i !== topicIndex) { return e; }
          return {
            ...e,
            configs: action.payload.configs,
          };
        }),
      };
    }
    default:
      return state;
  }
};

const brokers = (state = initialStateBrokers, action) => {
  if (action.type === ActionTypes.GET_BROKERS_SUCCESS) {
    return {
      list: defaultTo(state.list, action.payload),
    };
  }
  return state;
};

const consumerGroups = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CONSUMER_GROUPS_SUCCESS:
      return payload;
    default:
      return state;
  }
};

export const entitiesReducers = {
  topics,
  brokers,
  consumerGroups,
};

const rootReducer = combineReducers(entitiesReducers);

export default rootReducer;

export const getTopics = path(['topics', 'names']);
export const getTopicsInfo = path(['topics', 'info']);
export const getBrokers = path(['brokers', 'list']);
export const getConsumerGroups = path(['consumerGroups']);
