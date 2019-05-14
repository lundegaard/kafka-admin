import PropTypes from 'prop-types';
import { keys } from 'ramda';
import { INFO_MESSAGES_LEVEL_IMPORTANCE } from './index';

export const TOPIC_INFO_SHAPE = {
  name: PropTypes.string,
  partitions: PropTypes.array,
};

export const CONFIG_SHAPE = {
  name: PropTypes.string,
  value: PropTypes.string,
  sensitive: PropTypes.bool,
  default: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export const BROKER_SHAPE = {
  id: PropTypes.number,
  configs: PropTypes.arrayOf(PropTypes.shape(CONFIG_SHAPE)),
};

export const INPUT_SHAPE = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export const COORDINATOR = {
  id: PropTypes.string,
  host: PropTypes.string,
  port: PropTypes.number,
  rack: PropTypes.string,
};

export const ASSIGNMENT = {
  id: PropTypes.string,
  host: PropTypes.string,
  port: PropTypes.number,
  rack: PropTypes.string,
};

export const CONSUMER = {
  clientId: PropTypes.string,
  consumerId: PropTypes.string,
  assignment: PropTypes.arrayOf(PropTypes.shape(ASSIGNMENT)),
  host: PropTypes.string,
};

export const CONSUMER_GROUP = {
  id: PropTypes.string,
  protocolType: PropTypes.string,
  state: PropTypes.string,
  consumers: PropTypes.arrayOf(PropTypes.shape(CONSUMER)),
  assignmentStrategy: PropTypes.string,
  coordinator: PropTypes.shape(COORDINATOR),
};

export const STRING_OR_NUMBER = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const INFO_MESSAGES_SHAPE = {
  level: PropTypes.oneOf(keys(INFO_MESSAGES_LEVEL_IMPORTANCE)),
  description: PropTypes.string,
};
