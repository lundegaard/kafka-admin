import { notNumeric } from 'ramda-extension';

import { CREATE_TOPIC_FIELDS } from '../../constants/forms';
import messages from './messages';

const validate = (values, { intl: { formatMessage } }) => {
  const errors = {};
  if (!values[CREATE_TOPIC_FIELDS.TOPIC_NAME]) {
    errors[CREATE_TOPIC_FIELDS.TOPIC_NAME] = formatMessage(messages.errorEmptyField);
  }
  if (!values[CREATE_TOPIC_FIELDS.PARTITIONS]) {
    errors[CREATE_TOPIC_FIELDS.PARTITIONS] = formatMessage(messages.errorEmptyField);
  } else if (notNumeric(values[CREATE_TOPIC_FIELDS.PARTITIONS])) {
    errors[CREATE_TOPIC_FIELDS.PARTITIONS] = formatMessage(messages.errorNumber);
  }
  if (!values[CREATE_TOPIC_FIELDS.REPLICATION_FACTOR]) {
    errors[CREATE_TOPIC_FIELDS.REPLICATION_FACTOR] = formatMessage(messages.errorEmptyField);
  } else if (notNumeric(values[CREATE_TOPIC_FIELDS.REPLICATION_FACTOR])) {
    errors[CREATE_TOPIC_FIELDS.REPLICATION_FACTOR] = formatMessage(messages.errorNumber);
  }
  return errors;
};

export default validate;
