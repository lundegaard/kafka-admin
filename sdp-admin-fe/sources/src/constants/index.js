// TODO refactor to PascalCase and add to separate files
import { path } from 'ramda';

export const url = {
  ANY: '*',
  BROKER: '/broker',
  CLUSTER: '/cluster',
  PRODUCER: '/producer',
  ROOT: '/',
  STREAMS: '/streams',
  TOPIC: '/topic',
  TOPICS: '/topics',
  KAFKACONNECT: '/kafkaconnect',
};

export const urlParams = {
  TOPIC_NAME: 'topicName',
  BROKER_ID: 'brokerId',
};

export const ADMIN_API_URL = path(['appConfig', 'ADMIN_API_URL'], window);

export const TAB_KEYS = {
  TAB1: 'tab1',
  TAB2: 'tab2',
  TAB3: 'tab3',
};

export const REFRESH_OPTIONS = [
  {
    name: '1s',
    value: 1000,
  },
  {
    name: '5s',
    value: 5000,
  },
  {
    name: '10s',
    value: 10000,
  },
  {
    name: '15s',
    value: 15000,
  },
  {
    name: '30s',
    value: 30000,
  },
];

export const DEFAULT_TOPIC_INFO_MESSAGES_NUMBER = 20;

export const TOPIC_LIST_PAGINATION_SIZE = 50;

export const NOTIFICATION_VERTICAL_POSITION = 0.43;

export const MOUSE_ENTER_DELAY = 0.3;

export const DEFAULT_INTERVALS_DELAY = 10000;

export const SEARCH_DEBOUNCE_MS = 500;

export const CONFIGS_TO_SHOW = [
  'log.retention.hours',
  'message.max.bytes',
  'delete.topic.enable',
  'auto.create.topics.enable',
];

export const REQUEST_STATE = {
  FAILED: 'failed',
  NONE: 'none',
  REQUESTED: 'requested',
  SUCCESS: 'success',
};

export const INFO_MESSAGES_LEVEL_IMPORTANCE = {
  ERROR: 1,
  WARN: 2,
  INFO: 3,
};

export const INFO_MESSAGES_LEVEL_ALERT_TYPE = {
  ERROR: 'error',
  WARN: 'warning',
  INFO: 'info',
};
