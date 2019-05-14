import { getJSON, RSAA } from 'redux-api-middleware';
import { message } from 'antd';
import { reset } from 'redux-form';
import { history } from '../components/history';

import ActionTypes from '../constants/actionTypes';
import { getTopicInfo, getTopicsInfo, getWaitingTopic } from '../reducers';
import { PRODUCER_FIELDS, CREATE_TOPIC_FIELDS, FORMS } from '../constants/forms';
import { NOTIFICATION_VERTICAL_POSITION, ADMIN_API_URL } from '../constants';
import { findTopicInfo, getViewportSize } from '../utils';

export const redirect = (path) => history.push(path);
export const setVersion = (version) => ({ type: ActionTypes.SET_VERSION, payload: version });
export const toggleMenu = () => ({ type: ActionTypes.MENU_TOGGLE });
export const setMessageNotificationToCenter = () => {
  const viewportSize = getViewportSize(window.screen, document);
  message.config({
    top: viewportSize.height * NOTIFICATION_VERTICAL_POSITION,
  });
};
export const formToggleVisibleCreateTopic = () => ({
  type: ActionTypes.FORM_TOGGLE_VISIBLE_CREATE_TOPIC,
});
export const onTabChangeTopicInfo = (key) => ({
  type: ActionTypes.TAB_CHANGE_TOPIC_INFO,
  payload: key,
});
export const resetConfigEditingTopicInfo = () => ({
  type: ActionTypes.RESET_CONFIG_EDITING_TOPIC_INFO,
});
export const setConfigEditingTopicInfo = (editingKey, editingValue) => ({
  type: ActionTypes.SET_CONFIG_EDITING_TOPIC_INFO,
  payload: { editingKey, editingValue },
});
export const setConfigEditingValueTopicInfo = (editingValue) => ({
  type: ActionTypes.SET_CONFIG_EDITING_VALUE_TOPIC_INFO,
  payload: editingValue,
});
export const setConfigTopicInfo = (name, value) => ({
  type: ActionTypes.SET_CONFIG_TOPIC_INFO,
  payload: { name, value },
});
export const setPartitionTopicInfo = (partition) => ({
  type: ActionTypes.SET_PARTITION_TOPIC_INFO,
  payload: partition,
});
export const setNumberTopicInfo = (value) => ({
  type: ActionTypes.SET_NUMBER_TOPIC_INFO,
  payload: value,
});
export const setOffsetTopicInfo = (offset) => ({
  type: ActionTypes.SET_OFFSET_TOPIC_INFO,
  payload: offset,
});
export const setConfigTopicFilterValue = (value) => ({
  type: ActionTypes.SET_CONFIG_TOPIC_FILTER_VALUE,
  payload: value,
});

export const setTopicListFilterValue = (value) => ({
  type: ActionTypes.SET_TOPIC_LIST_FILTER_VALUE,
  payload: value,
});
export const toggleTopicListInternalTopicsVisible = () => ({
  type: ActionTypes.TOGGLE_TOPIC_LIST_INTERNAL_TOPICS_VISIBLE,
});
export const resetTopicInfo = () => ({ type: ActionTypes.RESET_TOPIC_INFO });

export const callGetTopicsInfo = () => ({
  [RSAA]: {
    endpoint: `${ADMIN_API_URL}/admin/topics/details`,
    method: 'GET',
    types: [
      ActionTypes.GET_TOPICS_INFO_REQUEST,
      {
        type: ActionTypes.GET_TOPICS_INFO_SUCCESS,
        payload: (action, state, res) => getJSON(res),
      },
      ActionTypes.GET_TOPICS_INFO_FAILURE,
    ],
  },
});

export const callDeleteTopic = (topic) => (dispatch, getState) => {
  dispatch({
    [RSAA]: {
      endpoint: `${ADMIN_API_URL}/admin/topics`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        name: topic,
      }),
      types: [
        ActionTypes.DELETE_TOPIC_REQUEST,
        {
          type: ActionTypes.DELETE_TOPIC_SUCCESS,
          payload: topic,
        },
        ActionTypes.DELETE_TOPIC_FAILURE,
      ],
    },
  }).then(({ error, payload }) => {
    if (error) {
      return Promise.reject();
    }
    if (getTopicInfo(getState()).name === topic) {
      dispatch(resetTopicInfo());
    }
    return payload;
  });
};


export const callCreateTopic = (formValues) => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: `${ADMIN_API_URL}/admin/topics`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        [CREATE_TOPIC_FIELDS.TOPIC_NAME]: formValues[CREATE_TOPIC_FIELDS.TOPIC_NAME],
        [CREATE_TOPIC_FIELDS.PARTITIONS]: formValues[CREATE_TOPIC_FIELDS.PARTITIONS],
        [CREATE_TOPIC_FIELDS.REPLICATION_FACTOR]:
          formValues[CREATE_TOPIC_FIELDS.REPLICATION_FACTOR],
      }),
      types: [
        ActionTypes.CREATE_TOPIC_REQUEST,
        ActionTypes.CREATE_TOPIC_SUCCESS,
        ActionTypes.CREATE_TOPIC_FAILURE,
      ],
    },
  }).then(({ error, payload }) => {
    if (error) {
      return Promise.reject();
    }
    dispatch(reset(FORMS.CREATE_TOPIC_FORM));
    dispatch(formToggleVisibleCreateTopic());
    setTimeout(() => dispatch(callGetTopicsInfo()), 1000);
    return payload;
  });
};

export const callGetTopicMessages = (topic, partition, number, offset) => ({
  [RSAA]: {
    endpoint: `${ADMIN_API_URL}/admin/topics/messages`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      topic,
      partition,
      number,
      offset,
    }),
    types: [
      ActionTypes.GET_TOPIC_MESSAGES_REQUEST,
      {
        type: ActionTypes.GET_TOPIC_MESSAGES_SUCCESS,
        payload: (action, state, res) => getJSON(res),
      },
      ActionTypes.GET_TOPIC_MESSAGES_FAILURE,
    ],
  },
});

export const callSetTopicConfig = (
  topic,
  name,
  value,
  successMessage,
  failedMessage,
) => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: `${ADMIN_API_URL}/admin/topics/config/update`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        topic,
        name,
        value,
      }),
      types: [
        ActionTypes.SET_CONFIG_TOPIC_INFO_REQUEST,
        {
          type: ActionTypes.SET_CONFIG_TOPIC_INFO_SUCCESS,
          payload: (action, state, res) => getJSON(res)
            .then((json) => ({
              name: topic,
              configs: json,
            })),
        },
        ActionTypes.SET_CONFIG_TOPIC_INFO_FAILURE,
      ],
    },
  }).then(({ error, payload }) => {
    if (error) {
      message.error(failedMessage);
    } else {
      message.success(successMessage);
    }
    return payload;
  });
};

export const saveWaitingTopic = (topic) => ({
  type: ActionTypes.SAVE_WAITING_TOPIC,
  payload: topic,
});

export const onShowTopicInfo = (topic) => (dispatch, getState) => {
  const topicInfo = findTopicInfo(topic)(getTopicsInfo(getState()));
  if (topicInfo === undefined) {
    dispatch(saveWaitingTopic(topic));
  } else {
    dispatch({
      type: ActionTypes.SHOW_TOPIC_INFO,
      payload: topicInfo,
    });
  }
};

export const callGetBrokers = () => ({
  [RSAA]: {
    endpoint: `${ADMIN_API_URL}/admin/brokers/config`,
    method: 'GET',
    types: [
      ActionTypes.GET_BROKERS_REQUEST,
      {
        type: ActionTypes.GET_BROKERS_SUCCESS,
        payload: (action, state, res) => getJSON(res),
      },
      ActionTypes.GET_BROKERS_FAILURE,
    ],
  },
});

export const callProduceMessage = (
  values,
  failedMessage,
  successMessage,
) => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: `${ADMIN_API_URL}/admin/topics/send`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        topic: values[PRODUCER_FIELDS.TOPIC],
        key: values[PRODUCER_FIELDS.KEY],
        value: values[PRODUCER_FIELDS.VALUE],
      }),
      types: [
        ActionTypes.SEND_MESSAGE_REQUEST,
        {
          type: ActionTypes.SEND_MESSAGE_SUCCESS,
          payload: (action, state, res) => getJSON(res),
        },
        ActionTypes.SEND_MESSAGE_FAILURE,
      ],
    },
  }).then(({ error, payload }) => {
    if (error) {
      message.error(failedMessage);
    } else {
      message.success(successMessage);
    }
    return payload;
  });
};

export const callGetConsumerGroups = () => ({
  [RSAA]: {
    endpoint: `${ADMIN_API_URL}/admin/groups/consumerdetails`,
    method: 'GET',
    types: [
      ActionTypes.GET_CONSUMER_GROUPS_REQUEST,
      {
        type: ActionTypes.GET_CONSUMER_GROUPS_SUCCESS,
        payload: (action, state, res) => getJSON(res),
      },
      ActionTypes.GET_CONSUMER_GROUPS_FAILURE,
    ],
  },
});

export const selectBroker = (broker) => ({
  type: ActionTypes.SELECT_BROKER,
  payload: broker,
});

export const setConfigBrokerFilterValue = (value) => ({
  type: ActionTypes.SET_CONFIG_BROKER_FILTER_VALUE,
  payload: value,
});

export const setIntervalDelay = (value) => ({
  type: ActionTypes.SET_INTERVAL_DELAY,
  payload: value,
});

export const refreshMessages = (topic) => (dispatch) => dispatch(callGetTopicsInfo()).then(() => {
  dispatch(onShowTopicInfo(topic));
});

export const init = (version) => (dispatch, getState) => {
  Promise.all([
    dispatch(setVersion(version)),
    dispatch(callGetTopicsInfo()),
    dispatch(callGetBrokers()),
    setMessageNotificationToCenter(),
  ]).then(() => {
    const waitingTopic = getWaitingTopic(getState());
    if (waitingTopic !== null) {
      dispatch(onShowTopicInfo(waitingTopic));
    }
  });
};
